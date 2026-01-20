import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { useAuthStore } from '../../store/auth-store'

export const Route = createFileRoute('/demo/zustand')({
  component: ZustandDemo,
})

function ZustandDemo() {
  const token = useAuthStore((s) => s.token)
  const setToken = useAuthStore((s) => s.setToken)
  const clear = useAuthStore((s) => s.clear)

  const [value, setValue] = useState('')

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-200">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Zustand Store</h1>
        <p className="mt-1 text-sm text-slate-600">
          Example persisted auth token store.
        </p>

        <div className="mt-6 space-y-3">
          <div className="rounded-md border bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Current token</div>
            <div className="mt-1 break-all font-mono text-sm">
              {token ?? '(null)'}
            </div>
          </div>

          <input
            className="w-full rounded-md border px-3 py-2"
            placeholder="Paste token here…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-md bg-emerald-700 px-3 py-2 font-medium text-white"
              onClick={() => setToken(value || null)}
            >
              Save
            </button>
            <button
              type="button"
              className="flex-1 rounded-md bg-slate-800 px-3 py-2 font-medium text-white"
              onClick={() => {
                clear()
                setValue('')
              }}
            >
              Clear
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Refresh the page — the token persists via localStorage.
          </p>
        </div>
      </div>
    </div>
  )
}
