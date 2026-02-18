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
            className="glass-elevated p-6 rounded-xl border border-gray-divider"
        >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                    <RiTrophyLine className="text-xl text-warning" />
                </div>
                <span>Top Contributors</span>
            </h3>

            <div className="space-y-3">
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
                                whileHover={{ scale: 1.02 }}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${isCurrentUser
                                    ? 'bg-neon/5 border-neon/30 shadow-neon-sm'
                                    : 'bg-industrial-surface/50 border-transparent hover:border-gray-border hover:bg-industrial-surface'
                                    }`}
                            >
                                {/* Rank */}
                                <div className="w-8 flex items-center justify-center font-bold">
                                    {getMedalIcon(rank)}
                                </div>

                                {/* Address */}
                                <div className="flex-1">
                                    <div className={`font-bold font-mono ${isCurrentUser ? 'text-neon' : 'text-gray-primary'}`}>
                                        {truncateAddress(user.wallet_address)}
                                        {isCurrentUser && (
                                            <span className="ml-2 text-[10px] uppercase bg-neon text-industrial-black px-2 py-0.5 rounded-full font-bold">You</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-muted mt-1 flex items-center gap-2">
                                        <span className="bg-industrial-black px-1.5 py-0.5 rounded border border-gray-border">Lvl {user.level}</span>
                                        <span>•</span>
                                        <span>{user.total_contributions} tasks</span>
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="text-right">
                                    <div className="font-black text-neon text-lg">{user.reputation_score}</div>
                                    <div className="text-[10px] font-bold text-gray-muted uppercase tracking-wider">PTS</div>
                                </div>
                            </motion.div>
                        )
                    })
                ) : (
                    <div className="text-center py-12 text-gray-secondary">
                        <p>No contributors yet</p>
                        <p className="text-sm text-gray-muted mt-2">Be the first to climb the ranks!</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
