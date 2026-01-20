import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/demo/framer-motion')({
  component: FramerMotionDemo,
})

function FramerMotionDemo() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-indigo-200">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold">Framer Motion</h1>
        <p className="mt-1 text-sm text-slate-600">Simple entrance animation.</p>

        <motion.div
          className="mt-6 rounded-xl border bg-white p-6 shadow"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="text-lg font-medium">Animated Card</div>
          <p className="mt-2 text-sm text-slate-600">
            Use this for page transitions, modals, and subtle UI motion.
          </p>

          <div className="mt-4 flex gap-2">
            <motion.button
              type="button"
              className="rounded-md bg-indigo-700 px-3 py-2 font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Hover / Tap me
            </motion.button>
            <motion.div
              className="rounded-md bg-indigo-100 px-3 py-2 text-indigo-900"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              wobble
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
