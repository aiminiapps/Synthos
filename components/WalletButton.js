'use client'

import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiWalletLine, RiLogoutBoxLine, RiShieldCheckLine, RiLoader4Line } from 'react-icons/ri'
import {
    generateNonce,
    createSignInMessage,
    SessionManager,
    AuthState
} from '@/lib/auth'

export default function WalletButton() {
    const [isMounted, setIsMounted] = useState(false)
    const { open } = useWeb3Modal()
    const { address, isConnected, chain } = useAccount()
    const { disconnect } = useDisconnect()
    const { signMessageAsync } = useSignMessage()

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [showChainWarning, setShowChainWarning] = useState(false)

    // Prevent SSR issues
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Check authentication status on mount and when address changes
    useEffect(() => {
        if (address) {
            const authStatus = AuthState.getAuthStatus(address)
            setIsAuthenticated(authStatus.isAuthenticated)

            // Auto-authenticate if session exists
            if (authStatus.isAuthenticated) {
                SessionManager.refreshSession()
            }
        } else {
            setIsAuthenticated(false)
        }
    }, [address])

    // Check if on correct chain (BNB Chain)
    useEffect(() => {
        if (isConnected && chain) {
            const isBNBChain = chain.id === 56 || chain.id === 97 // BSC Mainnet or Testnet
            setShowChainWarning(!isBNBChain)
        } else {
            setShowChainWarning(false)
        }
    }, [isConnected, chain])

    // Handle authentication with signature
    const handleAuthenticate = async () => {
        if (!address || isAuthenticating) return

        setIsAuthenticating(true)

        try {
            const nonce = generateNonce()
            const message = createSignInMessage(address, nonce)

            // Request signature from wallet
            const signature = await signMessageAsync({ message })

            if (signature) {
                // Save authenticated session
                SessionManager.saveSession(address, signature, nonce)
                setIsAuthenticated(true)

                console.log('✅ Authentication successful')
            }
        } catch (error) {
            console.error('Authentication failed:', error)
            alert('Authentication cancelled or failed. Please try again.')
        } finally {
            setIsAuthenticating(false)
        }
    }

    const handleDisconnect = () => {
        SessionManager.clearSession()
        setIsAuthenticated(false)
        disconnect()
    }

    const handleConnect = () => {
        if (isConnected && !isAuthenticated) {
            handleAuthenticate()
        } else {
            open()
        }
    }

    const truncateAddress = (addr) => {
        if (!addr) return ''
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    // Don't render on server
    if (!isMounted) {
        return (
            <button className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg bg-neon text-industrial-black border-2 border-neon">
                <RiWalletLine className="text-xl" />
                <span>Connect Wallet</span>
            </button>
        )
    }

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isConnected ? (isAuthenticated ? handleDisconnect : handleAuthenticate) : handleConnect}
                disabled={isAuthenticating}
                className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-200 border-2 shadow-lg ${isAuthenticated
                    ? 'bg-success/10 border-success text-success hover:bg-success hover:text-industrial-black'
                    : isConnected
                        ? 'bg-warning/10 border-warning text-warning hover:bg-warning hover:text-industrial-black'
                        : 'bg-neon hover:bg-neon-bright text-industrial-black border-neon hover:shadow-neon-bright/50'
                    } ${isAuthenticating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isAuthenticating ? (
                    <>
                        <RiLoader4Line className="text-xl animate-spin" />
                        <span>Signing...</span>
                    </>
                ) : isAuthenticated ? (
                    <>
                        <RiShieldCheckLine className="text-xl" />
                        <span>{truncateAddress(address)}</span>
                        <RiLogoutBoxLine className="text-lg opacity-70" />
                    </>
                ) : isConnected ? (
                    <>
                        <RiShieldCheckLine className="text-xl" />
                        <span>Sign to Authenticate</span>
                    </>
                ) : (
                    <>
                        <RiWalletLine className="text-xl" />
                        <span>Connect Wallet</span>
                    </>
                )}
            </motion.button>

            {/* Chain Warning */}
            <AnimatePresence>
                {showChainWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 bg-warning/10 border-2 border-warning text-warning px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap z-50"
                    >
                        ⚠️ Please switch to BNB Chain
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Authentication Status Indicator */}
            {isConnected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-industrial-black ${isAuthenticated ? 'bg-success' : 'bg-warning'
                        }`}
                />
            )}
        </div>
    )
}
