'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RiHistoryLine, RiCheckLine, RiTimeLine } from 'react-icons/ri'

export default function RewardHistory({ userAddress }) {
    const [rewards, setRewards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const res = await fetch(`/api/rewards?address=${userAddress}`)
                const data = await res.json()
                setRewards(data)
            } catch (error) {
                console.error('Error fetching rewards:', error)
            } finally {
                setLoading(false)
            }
        }

        if (userAddress) {
            fetchRewards()
        }
    }, [userAddress])

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <RiCheckLine className="text-success" />
            case 'sent':
                return <RiCheckLine className="text-neon" />
            default:
                return <RiTimeLine className="text-warning animate-spin" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'text-success'
            case 'sent':
                return 'text-neon'
            default:
                return 'text-warning'
        }
    }

    if (loading) {
        return (
            <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <RiHistoryLine className="text-neon" />
                    Recent Rewards
                </h3>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-industrial-surface rounded shimmer" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <RiHistoryLine className="text-neon" />
                Recent Rewards
            </h3>

            <div className="space-y-3">
                {rewards.length > 0 ? (
                    rewards.slice(0, 5).map((reward, index) => (
                        <motion.div
                            key={reward.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-4 bg-industrial-surface rounded-lg hover:bg-industrial-elevated transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">
                                    {getStatusIcon(reward.status)}
                                </div>
                                <div>
                                    <div className="font-semibold text-neon">+{reward.amount} SYNTR</div>
                                    <div className="text-xs text-gray-muted">
                                        {new Date(reward.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className={`text-sm font-semibold ${getStatusColor(reward.status)}`}>
                                {reward.status}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-secondary">
                        <RiHistoryLine className="text-4xl mx-auto mb-2 opacity-50" />
                        <p>No rewards yet</p>
                        <p className="text-sm text-gray-muted mt-1">Complete tasks to earn rewards</p>
                    </div>
                )}
            </div>
        </div>
    )
}
