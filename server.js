import { serve } from "bun";

const DIST = "dist";

serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // If root or any path
    if (path === "/" || path === "") {
      path = "/index.html";
    }

    // Try to serve file
    const file = Bun.file(DIST + path);

    // If file doesn't exist, fallback to index.html (SPA)
    if (!file.size) {
      return new Response(Bun.file(DIST + "/index.html"));
    }

    return new Response(file);
  },
});

console.log("Pragati 2026 frontend running on port 3000");