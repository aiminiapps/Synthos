/**
 * SYNTHOS Token Reward System
 * Sends real SYNTR tokens (BEP-20) to user wallets on BNB Chain
 */

import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet } from 'viem/chains'

// ─── Config from env ───────────────────────────────────────────────────────────
const REWARD_WALLET_PRIVATE_KEY = process.env.REWARD_WALLET_PRIVATE_KEY
const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS
const TOKEN_DECIMALS = parseInt(process.env.NEXT_PUBLIC_TOKEN_DECIMALS || '18')
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://bsc-testnet.publicnode.com'

// ─── Minimal BEP-20 ABI (only what we need) ────────────────────────────────────
const ERC20_ABI = [
    {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
    },
    {
        name: 'decimals',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint8' }],
    },
]

/**
 * Send SYNTR tokens to a user wallet
 * @param {string} toAddress - Recipient wallet address
 * @param {number} amount - Amount of SYNTR tokens to send (human-readable)
 * @returns {{ success: boolean, txHash?: string, error?: string }}
 */
export async function sendSYNTRReward(toAddress, amount) {
    if (!REWARD_WALLET_PRIVATE_KEY) {
        console.warn('⚠️ REWARD_WALLET_PRIVATE_KEY not set — skipping real transfer')
        return { success: false, error: 'Reward wallet not configured' }
    }

    if (!TOKEN_CONTRACT_ADDRESS) {
        console.warn('⚠️ TOKEN_CONTRACT_ADDRESS not set — skipping real transfer')
        return { success: false, error: 'Token contract not configured' }
    }

    try {
        // Ensure private key has 0x prefix
        const rawKey = REWARD_WALLET_PRIVATE_KEY.startsWith('0x')
            ? REWARD_WALLET_PRIVATE_KEY
            : `0x${REWARD_WALLET_PRIVATE_KEY}`

        const account = privateKeyToAccount(rawKey)

        const publicClient = createPublicClient({
            chain: bscTestnet,
            transport: http(RPC_URL),
        })

        const walletClient = createWalletClient({
            account,
            chain: bscTestnet,
            transport: http(RPC_URL),
        })

        // Convert amount to token units (e.g. 10 SYNTR → 10 * 10^18)
        const tokenAmount = parseUnits(amount.toString(), TOKEN_DECIMALS)

        console.log(`💸 Sending ${amount} SYNTR to ${toAddress}...`)
        console.log(`   Contract: ${TOKEN_CONTRACT_ADDRESS}`)
        console.log(`   From: ${account.address}`)

        // Check reward wallet balance first
        const balance = await publicClient.readContract({
            address: TOKEN_CONTRACT_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [account.address],
        })

        if (balance < tokenAmount) {
            const balanceFormatted = formatUnits(balance, TOKEN_DECIMALS)
            console.error(`❌ Insufficient SYNTR balance: ${balanceFormatted} SYNTR available, need ${amount}`)
            return {
                success: false,
                error: `Insufficient reward wallet balance (${balanceFormatted} SYNTR available)`,
            }
        }

        // Execute the transfer
        const txHash = await walletClient.writeContract({
            address: TOKEN_CONTRACT_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [toAddress, tokenAmount],
        })

        console.log(`✅ SYNTR transfer submitted! TX: ${txHash}`)

        // Wait for confirmation (1 block)
        const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
            confirmations: 1,
            timeout: 30_000, // 30s timeout
        })

        if (receipt.status === 'success') {
            console.log(`✅ SYNTR transfer confirmed! TX: ${txHash}`)
            return { success: true, txHash }
        } else {
            console.error(`❌ SYNTR transfer reverted. TX: ${txHash}`)
            return { success: false, error: 'Transaction reverted on-chain', txHash }
        }

    } catch (error) {
        console.error('❌ SYNTR transfer error:', error.message)
        return { success: false, error: error.message }
    }
}

/**
 * Get reward wallet SYNTR balance (for health checks)
 */
export async function getRewardWalletBalance() {
    if (!REWARD_WALLET_PRIVATE_KEY || !TOKEN_CONTRACT_ADDRESS) return null

    try {
        const rawKey = REWARD_WALLET_PRIVATE_KEY.startsWith('0x')
            ? REWARD_WALLET_PRIVATE_KEY
            : `0x${REWARD_WALLET_PRIVATE_KEY}`

        const account = privateKeyToAccount(rawKey)

        const publicClient = createPublicClient({
            chain: bscTestnet,
            transport: http(RPC_URL),
        })

        const balance = await publicClient.readContract({
            address: TOKEN_CONTRACT_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [account.address],
        })

        return formatUnits(balance, TOKEN_DECIMALS)
    } catch {
        return null
    }
}
