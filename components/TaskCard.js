'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import RewardAnimation from './RewardAnimation'

export default function TaskCard({ task, userAddress, userLevel, onComplete }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showReward, setShowReward] = useState(false)
    const [rewardData, setRewardData] = useState(null)

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return 'text-success border-success'
            case 'medium':
                return 'text-warning border-warning'
            case 'hard':
                return 'text-error border-error'
            default:
                return 'text-gray-secondary border-gray-border'
        }
    }

    const handleSubmit = async () => {
        if (!selectedAnswer) return

        setIsSubmitting(true)

        try {
            // Submit task
            const submitRes = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    taskId: task.id,
                    answer: selectedAnswer,
                    userAddress,
                }),
            })

            const submitData = await submitRes.json()

            if (submitData.success) {
                // Show reward animation
                setRewardData({
                    amount: submitData.reward_amount,
                    txHash: submitData.tx_hash,
                })
                setShowReward(true)

                // After animation, call onComplete to refresh
                setTimeout(() => {
                    setShowReward(false)
                    onComplete()
                }, 5000)
            }
        } catch (error) {
            console.error('Error submitting task:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-6 rounded-xl hover:border-neon/50 transition-all cursor-pointer"
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                {/* Task Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(task.difficulty)}`}>
                                {task.difficulty.toUpperCase()}
                            </span>
                            <span className="text-neon font-semibold">+{task.base_reward} SYNTH</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{task.title}</h3>
                        <p className="text-gray-secondary text-sm">{task.description}</p>
                    </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-border"
                        >
                            {/* Options */}
                            <div className="space-y-3 mb-4">
                                {task.options?.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedAnswer(option)
                                        }}
                                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedAnswer === option
                                                ? 'border-neon bg-neon/10'
                                                : 'border-gray-border hover:border-gray-muted'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {selectedAnswer === option && (
                                                <RiCheckLine className="text-neon text-xl" />
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSubmit()
                                    }}
                                    disabled={!selectedAnswer || isSubmitting}
                                    className="flex-1 px-6 py-3 bg-neon hover:bg-neon-bright text-industrial-black font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Processing...' : 'Submit Contribution'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsExpanded(false)
                                        setSelectedAnswer(null)
                                    }}
                                    className="px-6 py-3 border-2 border-gray-border hover:border-error text-gray-text hover:text-error font-semibold rounded-lg transition-all"
                                >
                                    <RiCloseLine className="text-xl" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Reward Animation */}
            <AnimatePresence>
                {showReward && <RewardAnimation rewardData={rewardData} />}
            </AnimatePresence>
        </>
    )
}
