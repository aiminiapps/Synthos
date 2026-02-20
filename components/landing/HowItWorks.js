'use client'

import { motion } from 'framer-motion'
import { RiGlobalLine, RiRobot2Line, RiFlashlightLine } from 'react-icons/ri'

const steps = [
    { num: '01', icon: RiGlobalLine, color: '#C6FF1A', title: 'Connect Wallet', desc: 'Link your BNB Chain wallet in one click — no KYC, no gatekeeping.' },
    { num: '02', icon: RiRobot2Line, color: '#60A5FA', title: 'Complete Tasks', desc: 'Label data, validate AI outputs, answer research prompts and earn.' },
    { num: '03', icon: RiFlashlightLine, color: '#FBBF24', title: 'Earn On-Chain', desc: 'Rewards flow to your wallet instantly. Claim, stake, or compound.' },
]

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py- px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-4 mb-3 tracking-tight">
                        How <span style={{ color: '#C6FF1A' }}>SYNTHOS</span> Works
                    </h2>
                    <p className="text-white/35 text-base max-w-sm mx-auto">Three steps from zero to earning crypto on-chain</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative rounded-2xl border p-7 group transition-all duration-300"
                            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = `${step.color}28`
                                e.currentTarget.style.background = `${step.color}04`
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                            }}
                        >
                            {/* Watermark number */}
                            <div className="absolute top-5 right-6 text-5xl font-black leading-none select-none"
                                style={{ color: `${step.color}10` }}>
                                {step.num}
                            </div>
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 shrink-0"
                                style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                                <step.icon style={{ color: step.color }} className="text-lg" />
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-white/38 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
