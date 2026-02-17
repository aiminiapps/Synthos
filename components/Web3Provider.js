'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig, projectId } from '@/lib/web3'
import { useState } from 'react'

// Create Web3Modal instance at module level
if (typeof window !== 'undefined') {
    createWeb3Modal({
        wagmiConfig,
        projectId,
        themeMode: 'dark',
        themeVariables: {
            '--w3m-accent': '#C6FF1A',
            '--w3m-color-mix': '#0B0F0C',
            '--w3m-color-mix-strength': 20,
        }
    })
}

export function Web3Provider({ children }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
