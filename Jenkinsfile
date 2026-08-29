pipeline {
  agent any

  parameters {
    string(name: 'GIT_REPO_URL', defaultValue: 'https://git.amrita.edu/CB.EN.U4CSE22038/Am-Pragati-26.git', description: 'GitLab clone URL')
    string(name: 'GIT_BRANCH', defaultValue: 'main', description: 'Branch to build')
    string(name: 'GIT_CREDENTIALS_ID', defaultValue: 'gitlab-pat', description: 'Jenkins credentials ID (Username + PAT)')
    string(name: 'APP_NAME', defaultValue: 'pragati', description: 'App / deployment name')
    string(name: 'DEPLOY_NAMESPACE', defaultValue: 'apps', description: 'Kubernetes namespace')
    string(name: 'CONTAINER_PORT', defaultValue: '3000', description: 'Container listen port')
    string(name: 'SERVICE_TYPE', defaultValue: 'NodePort', description: 'ClusterIP | NodePort | LoadBalancer')
    string(name: 'NODE_PORT', defaultValue: '30080', description: 'NodePort (only if SERVICE_TYPE=NodePort); use 0 for auto')
    string(name: 'REPLICAS', defaultValue: '1', description: 'Replica count')
    string(name: 'GITLAB_HOST', defaultValue: 'git.amrita.edu', description: 'GitLab hostname')
    string(name: 'GITLAB_PROJECT_PATH', defaultValue: 'CB.EN.U4CSE22038/Am-Pragati-26', description: 'GitLab project path (group/project)')
    string(name: 'GITLAB_PROJECT_ID', defaultValue: '1037', description: 'GitLab numeric project ID (for Package Registry API)')
    string(name: 'IMAGE_NAME', defaultValue: 'pragati', description: 'Image/package name (lowercase)')
    string(name: 'REGISTRY_HOST', defaultValue: 'git.amrita.edu:5050', description: 'Container Registry host:port')
    string(name: 'VITE_BACKEND_URL', defaultValue: '', description: 'Optional build-arg for Vite apps')
    booleanParam(name: 'PUSH_CONTAINER_REGISTRY', defaultValue: true, description: 'Try docker push to GitLab CR')
    booleanParam(name: 'PUSH_PACKAGE_REGISTRY', defaultValue: true, description: 'Upload image tar to GitLab Generic Package Registry')
    booleanParam(name: 'DEPLOY_TO_K3S', defaultValue: true, description: 'Deploy/upgrade the app on this k3s cluster')
    booleanParam(name: 'IMPORT_IMAGE_TO_K3S', defaultValue: true, description: 'Import image into local k3s (needed when CR is unreachable)')
  }

  environment {
    GITLAB_CREDS = credentials("${params.GIT_CREDENTIALS_ID}")
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Checkout') {
      steps {
        cleanWs()
        checkout([$class: 'GitSCM',
          branches: [[name: "*/${params.GIT_BRANCH}"]],
          userRemoteConfigs: [[
            url: "${params.GIT_REPO_URL}",
            credentialsId: "${params.GIT_CREDENTIALS_ID}"
          ]]
        ])
        script {
          env.GIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
          env.IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_SHA}"
          def path = params.GITLAB_PROJECT_PATH.toLowerCase()
          env.CR_IMAGE = "${params.REGISTRY_HOST}/${path}/${params.IMAGE_NAME}:${env.IMAGE_TAG}"
          env.CR_IMAGE_LATEST = "${params.REGISTRY_HOST}/${path}/${params.IMAGE_NAME}:latest"
          env.LOCAL_IMAGE = "${params.IMAGE_NAME}:${env.IMAGE_TAG}"
          env.LOCAL_IMAGE_LATEST = "${params.IMAGE_NAME}:latest"
          env.PACKAGE_VERSION = env.IMAGE_TAG.replaceAll('[^A-Za-z0-9._-]', '-')
        }
      }
    }

    stage('Build image') {
      steps {
        sh '''
          set -eux
          docker version
          docker build \
            --build-arg "VITE_BACKEND_URL=${VITE_BACKEND_URL}" \
            -t "${LOCAL_IMAGE}" \
            -t "${LOCAL_IMAGE_LATEST}" \
            -t "${CR_IMAGE}" \
            -t "${CR_IMAGE_LATEST}" \
            .
        '''
      }
    }

    stage('Push Container Registry') {
      when { expression { return params.PUSH_CONTAINER_REGISTRY } }
      steps {
        sh '''
          set +e
          echo "${GITLAB_CREDS_PSW}" | docker login -u "${GITLAB_CREDS_USR}" --password-stdin "${REGISTRY_HOST}"
          LOGIN=$?
          if [ "$LOGIN" -ne 0 ]; then
            echo "WARN: docker login to ${REGISTRY_HOST} failed (is the registry up on :5050?)"
            exit 0
          fi
          docker push "${CR_IMAGE}"
          PUSH1=$?
          docker push "${CR_IMAGE_LATEST}"
          PUSH2=$?
          if [ "$PUSH1" -ne 0 ] || [ "$PUSH2" -ne 0 ]; then
            echo "WARN: Container Registry push failed — continuing (Package Registry / local k3s import can still work)"
            exit 0
          fi
          echo "Pushed ${CR_IMAGE}"
        '''
      }
    }

    stage('Push Package Registry') {
      when { expression { return params.PUSH_PACKAGE_REGISTRY } }
      steps {
        sh '''
          set -eux
          TAR="/tmp/${IMAGE_NAME}-${PACKAGE_VERSION}.tar"
          docker save -o "${TAR}" "${LOCAL_IMAGE}"
          # GitLab Generic Package Registry
          CODE=$(curl -sk --header "PRIVATE-TOKEN: ${GITLAB_CREDS_PSW}" \
            --upload-file "${TAR}" \
            -o /tmp/pkg-upload.json -w "%{http_code}" \
            "https://${GITLAB_HOST}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/generic/${IMAGE_NAME}/${PACKAGE_VERSION}/${IMAGE_NAME}-${PACKAGE_VERSION}.tar")
          echo "Package upload HTTP ${CODE}"
          cat /tmp/pkg-upload.json || true
          case "${CODE}" in
            201|200) ;;
            *) echo "ERROR: generic package upload failed"; exit 1 ;;
          esac
          rm -f "${TAR}"
          echo "Package URL: https://${GITLAB_HOST}/${GITLAB_PROJECT_PATH}/-/packages"
        '''
      }
    }

    stage('Import image to k3s') {
      when { expression { return params.IMPORT_IMAGE_TO_K3S && params.DEPLOY_TO_K3S } }
      steps {
        sh '''
          set -eux
          TAR="/tmp/${IMAGE_NAME}-${PACKAGE_VERSION}-k3s.tar"
          docker save -o "${TAR}" "${LOCAL_IMAGE}"
          # Prefer sudo k3s ctr when available on the node via hostPath tools;
          # fallback: kubectl run with host dockershim is not needed on k3s.
          if command -v k3s >/dev/null 2>&1; then
            k3s ctr images import "${TAR}"
          elif [ -x /usr/local/bin/k3s ]; then
            /usr/local/bin/k3s ctr images import "${TAR}"
          else
            # Jenkins pod: use a one-shot privileged import job on the node
            cat > /tmp/import-job.yaml <<YAML
apiVersion: batch/v1
kind: Job
metadata:
  name: image-import-${BUILD_NUMBER}
  namespace: devops-tools
spec:
  ttlSecondsAfterFinished: 120
  template:
    spec:
      restartPolicy: Never
      hostNetwork: true
      containers:
        - name: import
          image: rancher/k3s:v1.36.4-k3s1
          command: ["ctr", "images", "import", "/image.tar"]
          securityContext:
            privileged: true
          volumeMounts:
            - name: image
              mountPath: /image.tar
              subPath: image.tar
            - name: containerd
              mountPath: /run/k3s/containerd
            - name: k3svar
              mountPath: /var/lib/rancher/k3s
      volumes:
        - name: image
          configMap:
            name: does-not-work
YAML
            echo "k3s binary not in PATH; using docker→containerd via nsenter helper"
            # Copy tar to host path and import with nsenter from a privileged pod
            HOST_TAR="/tmp/${IMAGE_NAME}-${PACKAGE_VERSION}-k3s.tar"
            # Write tar into a hostPath via a privileged pod after copying with kubectl cp is hard;
            # instead stream through a privileged pod with docker.sock already mounted on jenkins.
            docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
              -v "${TAR}:/image.tar:ro" \
              --pid=host --privileged \
              alpine:3.20 \
              sh -c "apk add --no-cache util-linux >/dev/null && nsenter -t 1 -m -u -i -n -p -- /usr/local/bin/k3s ctr images import /image.tar" \
              || docker run --rm -v "${TAR}:/image.tar:ro" --pid=host --privileged alpine:3.20 \
              sh -c "apk add --no-cache util-linux >/dev/null && nsenter -t 1 -m -u -i -n -p -- ctr -n k8s.io images import /image.tar"
          fi
          rm -f "${TAR}"
        '''
      }
    }

    stage('Deploy') {
      when { expression { return params.DEPLOY_TO_K3S } }
      steps {
        sh '''
          set -eux
          export APP_NAME DEPLOY_NAMESPACE CONTAINER_PORT SERVICE_TYPE REPLICAS
          export IMAGE="${LOCAL_IMAGE}"
          export IMAGE_PULL_POLICY=Never
          if [ "${NODE_PORT}" = "0" ] || [ -z "${NODE_PORT}" ]; then
            export NODE_PORT=""
          fi

          # Prefer CR image if push likely worked and import is disabled
          if [ "${IMPORT_IMAGE_TO_K3S}" != "true" ] && [ "${PUSH_CONTAINER_REGISTRY}" = "true" ]; then
            IMAGE="${CR_IMAGE}"
            IMAGE_PULL_POLICY=IfNotPresent
          fi
          export IMAGE IMAGE_PULL_POLICY

          mkdir -p out
          # envsubst-like replacement without depending on gettext
          python3 - <<'PY'
import os, re
src = open("k8s/deploy.yaml").read()
# NODE_PORT line handling
node_port = os.environ.get("NODE_PORT", "").strip()
svc = os.environ.get("SERVICE_TYPE", "NodePort")
if svc != "NodePort" or not node_port:
    src = re.sub(r"\\n\\s*nodePort: \\$\\{NODE_PORT\\}", "", src)
repl = {
  "APP_NAME": os.environ["APP_NAME"],
  "DEPLOY_NAMESPACE": os.environ["DEPLOY_NAMESPACE"],
  "CONTAINER_PORT": os.environ["CONTAINER_PORT"],
  "SERVICE_TYPE": os.environ["SERVICE_TYPE"],
  "REPLICAS": os.environ["REPLICAS"],
  "IMAGE": os.environ["IMAGE"],
  "IMAGE_PULL_POLICY": os.environ["IMAGE_PULL_POLICY"],
  "NODE_PORT": node_port or "30080",
}
out = src
for k,v in repl.items():
  out = out.replace("${"+k+"}", str(v))
open("out/deploy.yaml","w").write(out)
print(out)
PY

          kubectl apply -f out/deploy.yaml
          kubectl -n "${DEPLOY_NAMESPACE}" rollout status deployment/"${APP_NAME}" --timeout=180s
          kubectl -n "${DEPLOY_NAMESPACE}" get pods,svc -l app="${APP_NAME}" -o wide
        '''
      }
    }
  }

  post {
    success {
      echo "OK: image=${LOCAL_IMAGE} tag=${IMAGE_TAG} package=${IMAGE_NAME}/${PACKAGE_VERSION}"
    }
    always {
      sh 'docker image ls | head -20 || true'
    }
  }
}
