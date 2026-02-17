'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RiTrophyLine, RiMedalLine } from 'react-icons/ri'

export default function LeaderboardTable({ currentUserAddress }) {
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch('/api/leaderboard')
                const data = await res.json()
                setLeaderboard(data)
            } catch (error) {
                console.error('Error fetching leaderboard:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboard()
    }, [])

    const getMedalIcon = (rank) => {
        if (rank === 1) return <RiTrophyLine className="text-2xl text-warning" />
        if (rank === 2) return <RiMedalLine className="text-2xl text-gray-text" />
        if (rank === 3) return <RiMedalLine className="text-2xl text-neon-dark" />
        return <span className="text-gray-muted font-semibold">#{rank}</span>
    }

    const truncateAddress = (addr) => {
        if (!addr) return ''
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    if (loading) {
        return (
            <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <RiTrophyLine className="text-neon" />
                    Leaderboard
                </h3>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-industrial-surface rounded shimmer" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl"
        >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <RiTrophyLine className="text-neon" />
                Top Contributors
            </h3>

            <div className="space-y-2">
                {leaderboard.length > 0 ? (
                    leaderboard.slice(0, 10).map((user, index) => {
                        const rank = index + 1
                        const isCurrentUser = user.wallet_address?.toLowerCase() === currentUserAddress?.toLowerCase()

                        return (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isCurrentUser
                                        ? 'bg-neon/10 border-2 border-neon'
                                        : 'bg-industrial-surface hover:bg-industrial-elevated'
                                    }`}
                            >
                                {/* Rank */}
                                <div className="w-8 flex items-center justify-center">
                                    {getMedalIcon(rank)}
                                </div>

                                {/* Address */}
                                <div className="flex-1">
                                    <div className={`font-semibold ${isCurrentUser ? 'text-neon' : 'text-gray-text'}`}>
                                        {truncateAddress(user.wallet_address)}
                                        {isCurrentUser && (
                                            <span className="ml-2 text-xs text-neon">(You)</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-muted">
                                        Level {user.level} • {user.total_contributions} contributions
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="text-right">
                                    <div className="font-bold text-neon">{user.reputation_score}</div>
                                    <div className="text-xs text-gray-muted">points</div>
                                </div>
                            </motion.div>
                        )
                    })
                ) : (
                    <div className="text-center py-8 text-gray-secondary">
                        <p>No contributors yet</p>
                        <p className="text-sm text-gray-muted mt-1">Be the first!</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
