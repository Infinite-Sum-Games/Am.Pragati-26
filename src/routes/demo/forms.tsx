import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

export const Route = createFileRoute('/demo/forms')({
  component: FormsDemo,
})

const signupSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignupValues = z.infer<typeof signupSchema>

function FormsDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SignupValues) => {
    // simulate API call
    await new Promise((r) => setTimeout(r, 400))
    toast.success(`Signup valid for ${values.email}`)
    reset({
      name: values.name,
      email: values.email,
      password: '',
    })
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">React Hook Form + Zod</h1>
        <p className="mt-1 text-sm text-slate-600">
          Example signup form with schema validation.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Name" error={errors.name?.message}>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="Jane Doe"
              {...register('name')}
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="jane@example.com"
              type="email"
              {...register('email')}
            />
          </Field>

          <Field label="Password" error={errors.password?.message}>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="********"
              type="password"
              {...register('password')}
            />
          </Field>

          <button
            className="w-full rounded-md bg-slate-900 px-3 py-2 font-medium text-white disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>

          <p className="text-xs text-slate-500">
            You can reuse this pattern for Login, Profile, Event Registration, etc.
          </p>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-800">
        {label}
      </label>
      {children}
      {error ? <div className="mt-1 text-sm text-red-600">{error}</div> : null}
    </div>
  )
}
