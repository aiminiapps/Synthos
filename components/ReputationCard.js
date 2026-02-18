'use client'

import { motion } from 'framer-motion'
import { getUserLevel, getPointsToNextLevel } from '@/lib/reputation'
import { RiTrophyLine, RiArrowUpLine } from 'react-icons/ri'

export default function ReputationCard({ userProfile }) {
    if (!userProfile) return null

    const currentLevel = getUserLevel(userProfile.reputation_score)
    const pointsToNext = getPointsToNextLevel(userProfile.reputation_score)
    const progress = pointsToNext === 0
        ? 100
        : ((currentLevel.minPoints > 0 ? userProfile.reputation_score - currentLevel.minPoints : userProfile.reputation_score) /
            (pointsToNext > 0 ? pointsToNext : 1)) * 100

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-elevated p-6 rounded-xl border border-neon/10"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neon/10 rounded-lg">
                    <RiTrophyLine className="text-2xl text-neon" />
                </div>
                <h3 className="text-xl font-bold text-gray-primary">Your Reputation</h3>
            </div>

            {/* Level Badge */}
            <div className="text-center mb-8 p-6 bg-industrial-black/40 rounded-xl border border-gray-divider relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-neon opacity-5 group-hover:opacity-10 transition-opacity" />

                <div className="text-xs font-bold text-gray-muted uppercase tracking-wider mb-2">Current Rank</div>
                <div className="text-5xl font-black text-neon text-glow mb-2">{currentLevel.level}</div>
                <div className="text-lg font-bold text-gray-primary mb-4">{currentLevel.name}</div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                    <span className="text-sm font-bold text-neon">
                        {currentLevel.multiplier}x Reward Multiplier
                    </span>
                </div>
            </div>

            {/* Progress to Next Level */}
            {pointsToNext > 0 && (
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-secondary font-medium">To Next Level</span>
                        <span className="text-neon font-bold">{pointsToNext} PTS</span>
                    </div>
                    <div className="h-3 bg-industrial-black rounded-full overflow-hidden border border-gray-divider">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-neon shadow-neon-sm rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="space-y-4 pt-6 border-t border-gray-divider">
                <div className="flex justify-between items-center">
                    <span className="text-gray-secondary text-sm">Reputation Score</span>
                    <span className="font-bold text-gray-primary bg-industrial-surface px-3 py-1 rounded-lg border border-gray-border">{userProfile.reputation_score}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-secondary text-sm">Total Contributions</span>
                    <span className="font-bold text-gray-primary bg-industrial-surface px-3 py-1 rounded-lg border border-gray-border">{userProfile.total_contributions}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-secondary text-sm">Rewards Earned</span>
                    <span className="font-bold text-neon bg-neon/10 px-3 py-1 rounded-lg border border-neon/20">{userProfile.total_rewards} SYNTH</span>
                </div>
            </div>

            {/* Next Level Preview */}
            {pointsToNext > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-gradient-to-r from-industrial-surface to-industrial-elevated border border-gray-divider rounded-xl"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-neon/5 rounded-full border border-neon/10">
                            <RiArrowUpLine className="text-neon" />
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-secondary block">Next Rank</span>
                            <span className="font-bold text-gray-primary">
                                Level {currentLevel.level + 1}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}
