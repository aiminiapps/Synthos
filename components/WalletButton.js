'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { motion } from 'framer-motion'
import { RiWalletLine, RiLogoutBoxLine } from 'react-icons/ri'

export default function WalletButton() {
    const { open } = useWeb3Modal()
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    const handleClick = () => {
        if (isConnected) {
            disconnect()
        } else {
            open()
        }
    }

    const truncateAddress = (addr) => {
        if (!addr) return ''
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="flex items-center gap-2 px-6 py-3 bg-neon hover:bg-neon-bright text-industrial-black font-semibold rounded-lg transition-all duration-200 border-2 border-neon shadow-lg hover:shadow-neon-bright/50"
        >
            {isConnected ? (
                <>
                    <RiLogoutBoxLine className="text-xl" />
                    <span>{truncateAddress(address)}</span>
                </>
            ) : (
                <>
                    <RiWalletLine className="text-xl" />
                    <span>Connect Wallet</span>
                </>
            )}
        </motion.button>
    )
}
