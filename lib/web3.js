import { defaultWagmiConfig } from '@web3modal/wagmi'
import { http } from 'viem'
import { polygonMumbai, polygon } from 'viem/chains'

// WalletConnect Project ID
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Metadata for Web3Modal
const metadata = {
    name: 'SYNTHOS',
    description: 'Web3 AI Training & Reward Platform',
    url: 'https://synthos.ai',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Define chains based on environment
const chains = [polygonMumbai, polygon]

// Wagmi config
export const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    transports: {
        [polygonMumbai.id]: http(),
        [polygon.id]: http(),
    },
})

// ERC-20 Token ABI (minimal for transfers)
export const tokenABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint8" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "type": "function"
    }
]
