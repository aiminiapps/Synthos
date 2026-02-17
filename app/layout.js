'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi'
import { wagmiConfig, projectId } from '@/lib/web3'
import { useState } from 'react'

import './globals.css'

// Create Web3Modal
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

export default function RootLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <html lang="en">
            <head>
                <title>SYNTHOS - AI Training & Web3 Rewards</title>
                <meta name="description" content="Train AI systems and earn crypto rewards with SYNTHOS" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased bg-industrial-black text-gray-text">
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    )
}
