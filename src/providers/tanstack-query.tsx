import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // TTL-ish behavior:
        // - `staleTime`: how long data is considered fresh
        // - `gcTime`: how long inactive cache stays in memory
        staleTime: 30_000,
        gcTime: 5 * 60_000,

        // Background refresh behavior
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,

        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  })

  return {
    queryClient,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: ReactNode
  queryClient: QueryClient
}) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
