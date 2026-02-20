'use client'

import { motion } from 'framer-motion'
import { RiBrainLine, RiTokenSwapLine, RiShieldStarLine } from 'react-icons/ri'

const features = [
    {
        icon: RiBrainLine,
        color: '#C6FF1A',
        title: 'Train AI Systems',
        description: 'Complete precision micro-tasks that fine-tune next-generation AI through expert data labeling and validation.',
    },
    {
        icon: RiTokenSwapLine,
        color: '#60A5FA',
        title: 'Earn Crypto Rewards',
        description: 'Receive SYNTR tokens sent directly to your wallet — no middlemen, no delays, fully on-chain.',
    },
    {
        icon: RiShieldStarLine,
        color: '#A78BFA',
        title: 'Build Reputation',
        description: 'Level up your on-chain identity, unlock multiplied rewards, and rise through 60k+ contributors.',
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" className="py-28 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-[#60A5FA] text-[10px] font-bold uppercase tracking-[0.22em] mb-3 px-3 py-1 rounded-full border border-[#60A5FA]/18"
                        style={{ background: 'rgba(96,165,250,0.05)' }}>
                        Why SYNTHOS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-4 mb-3 tracking-tight">
                        Built for <span style={{ color: '#C6FF1A' }}>Serious Contributors</span>
                    </h2>
                    <p className="text-white/35 text-base max-w-sm mx-auto">Every design decision puts more earnings in your wallet</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {features.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-2xl border p-7 transition-all duration-300"
                            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = `${feat.color}28`
                                e.currentTarget.style.background = `${feat.color}04`
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                                style={{ background: `${feat.color}10`, border: `1px solid ${feat.color}20` }}>
                                <feat.icon style={{ color: feat.color }} className="text-xl" />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                            <p className="text-white/38 text-sm leading-relaxed">{feat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
