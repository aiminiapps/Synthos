'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WalletButton from '@/components/WalletButton'
import TaskCard from '@/components/TaskCard'
import ReputationCard from '@/components/ReputationCard'
import LeaderboardTable from '@/components/LeaderboardTable'
import RewardHistory from '@/components/RewardHistory'
import {
    RiBriefcaseLine,
    RiTrophyLine,
    RiCoinLine,
    RiFlashlightLine
} from 'react-icons/ri'

export default function DashboardPage() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const [userProfile, setUserProfile] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
            return
        }

        // Fetch user profile and tasks
        const fetchData = async () => {
            try {
                // Fetch user profile
                const profileRes = await fetch(`/api/profile?address=${address}`)
                const profileData = await profileRes.json()
                setUserProfile(profileData)

                // Fetch available tasks
                const tasksRes = await fetch('/api/tasks')
                const tasksData = await tasksRes.json()
                setTasks(tasksData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [address, isConnected, router])

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-industrial-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-secondary mb-4">Please connect your wallet to access the dashboard</p>
                    <WalletButton />
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-industrial-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon mx-auto mb-4"></div>
                    <p className="text-gray-secondary">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-industrial-black mesh-bg">
            {/* Header */}
            <header className="sticky top-0 z-50 glass-elevated border-b border-gray-divider">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push('/')}
                        className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <span className="text-neon text-glow">SYNTHOS</span>
                        <span className="text-gray-muted text-sm ml-3 border-l border-gray-divider pl-3">AI Dashboard</span>
                    </motion.div>
                    <WalletButton />
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-luxury p-6 rounded-xl"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <RiCoinLine className="text-2xl text-neon drop-shadow-md" />
                            <span className="text-gray-secondary text-sm font-medium">Reward Balance</span>
                        </div>
                        <div className="text-3xl font-black text-neon text-glow-soft">
                            {userProfile?.total_rewards || 0} <span className="text-lg opacity-80">SYNTH</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-effect p-6 rounded-xl border border-gray-border/50"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <RiBriefcaseLine className="text-2xl text-success" />
                            <span className="text-gray-secondary text-sm font-medium">Contributions</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-primary">
                            {userProfile?.total_contributions || 0}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-effect p-6 rounded-xl border border-gray-border/50"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <RiTrophyLine className="text-2xl text-warning" />
                            <span className="text-gray-secondary text-sm font-medium">Level</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-primary">
                            {userProfile?.level || 1}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-effect p-6 rounded-xl border border-gray-border/50"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <RiFlashlightLine className="text-2xl text-neon-soft" />
                            <span className="text-gray-secondary text-sm font-medium">Reputation</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-primary">
                            {userProfile?.reputation_score || 0}
                        </div>
                    </motion.div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tasks */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <RiBriefcaseLine className="text-neon" />
                                Available Tasks
                            </h2>
                            <div className="space-y-4">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            userAddress={address}
                                            userLevel={userProfile?.level || 1}
                                            onComplete={() => {
                                                // Refresh data after task completion
                                                window.location.reload()
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="glass-effect p-12 rounded-xl text-center">
                                        <p className="text-gray-secondary">No tasks available at the moment</p>
                                        <p className="text-gray-muted text-sm mt-2">Check back soon for new opportunities!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reward History */}
                        <RewardHistory userAddress={address} />
                    </div>

                    {/* Right Column - Reputation & Leaderboard */}
                    <div className="space-y-6">
                        <ReputationCard userProfile={userProfile} />
                        <LeaderboardTable currentUserAddress={address} />
                    </div>
                </div>
            </div>
        </div>
    )
}
