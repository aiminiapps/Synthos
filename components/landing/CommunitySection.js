'use client'

import { motion } from 'framer-motion'
import { RiStarFill } from 'react-icons/ri'

const testimonials = [
    { name: 'oxBTC', role: 'DeFi Veteran', stars: 5, quote: 'Best on-chain earning platform I have used. Tasks are fair and rewards hit my wallet instantly.' },
    { name: 'CryptoSarah', role: 'AI Researcher', stars: 5, quote: 'Synthos turned idle hours into real passive income. The AI tasks are actually interesting too.' },
    { name: 'Satsuma.bnb', role: 'Data Labeler', stars: 5, quote: 'Climbed to top 500 in two weeks. The reputation system is brilliantly designed.' },
]

export default function CommunitySection() {
    return (
        <section id="community" className="py-28 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-[#A78BFA] text-[10px] font-bold uppercase tracking-[0.22em] mb-3 px-3 py-1 rounded-full border border-[#A78BFA]/18"
                        style={{ background: 'rgba(167,139,250,0.05)' }}>
                        Community
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-4 tracking-tight">
                        Loved by Contributors
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-2xl border p-6 flex flex-col"
                            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: t.stars }).map((_, j) => (
                                    <RiStarFill key={j} className="text-[#FBBF24] text-xs" />
                                ))}
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                                    style={{ background: 'rgba(198,255,26,0.1)', color: '#C6FF1A' }}>
                                    {t.name[0]}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-semibold leading-tight">{t.name}</div>
                                    <div className="text-white/28 text-[11px]">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
