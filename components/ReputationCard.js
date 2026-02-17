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
            className="glass-effect p-6 rounded-xl"
        >
            <div className="flex items-center gap-3 mb-4">
                <RiTrophyLine className="text-3xl text-neon" />
                <h3 className="text-xl font-bold">Your Reputation</h3>
            </div>

            {/* Level Badge */}
            <div className="text-center mb-6 p-6 bg-industrial-dark rounded-lg">
                <div className="text-sm text-gray-muted mb-1">Current Level</div>
                <div className="text-4xl font-black text-neon mb-2">{currentLevel.level}</div>
                <div className="text-lg font-semibold text-gray-text">{currentLevel.name}</div>
                <div className="mt-3 px-4 py-2 bg-neon/10 border border-neon/30 rounded-full inline-block">
                    <span className="text-sm font-semibold text-neon">
                        {currentLevel.multiplier}x Reward Multiplier
                    </span>
                </div>
            </div>

            {/* Progress to Next Level */}
            {pointsToNext > 0 && (
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-secondary">Progress to Next Level</span>
                        <span className="text-neon font-semibold">{pointsToNext} points needed</span>
                    </div>
                    <div className="h-3 bg-industrial-dark rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-neon-dark to-neon rounded-full"
                        />
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="space-y-3 pt-4 border-t border-gray-border">
                <div className="flex justify-between">
                    <span className="text-gray-secondary">Reputation Score</span>
                    <span className="font-semibold">{userProfile.reputation_score}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-secondary">Total Contributions</span>
                    <span className="font-semibold">{userProfile.total_contributions}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-secondary">Rewards Earned</span>
                    <span className="font-semibold text-neon">{userProfile.total_rewards} SYNTH</span>
                </div>
            </div>

            {/* Next Level Preview */}
            {pointsToNext > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-neon/5 border border-neon/20 rounded-lg"
                >
                    <div className="flex items-center gap-2 text-sm">
                        <RiArrowUpLine className="text-neon" />
                        <span className="text-gray-secondary">Next up: </span>
                        <span className="font-semibold text-neon">
                            Level {currentLevel.level + 1}
                        </span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}
