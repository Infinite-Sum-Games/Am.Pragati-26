import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'react-hot-toast'


import Footer from '../components/Footer'
import TanStackQueryDevtools from '../providers/tanstack-query-devtools'

import type { QueryClient } from '@tanstack/react-query'
import ClickSpark from '@/components/ClickSpark'
import RetroCursor from '@/components/RetroCursor'

interface MyRouterContext {
  queryClient: QueryClient
}

// Routes without navbar and footer
const baseRoutesWithoutChrome = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/otp',
  '/reset-otp',
  '/coming-soon',
  '/maintenance',
  '/404',
]

const routesWithoutNavbar = new Set(baseRoutesWithoutChrome)
const routesWithoutFooter = new Set([
  ...baseRoutesWithoutChrome
])

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const showNavbar = !routesWithoutNavbar.has(pathname)
  const showFooter = !routesWithoutFooter.has(pathname)

  return (
    <>
      <Outlet />
      {showFooter && <Footer />}
      <Toaster position="top-right" />
      <ClickSpark />
      <RetroCursor />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  )
}
