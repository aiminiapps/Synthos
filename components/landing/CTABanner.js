'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { RiArrowRightLine, RiFlashlightLine, RiArrowUpLine } from 'react-icons/ri'

export default function CTABanner() {
    const router = useRouter()
    return (
        <section className="py-28 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl border overflow-hidden text-center py-16 px-8"
                    style={{
                        borderColor: 'rgba(198,255,26,0.14)',
                        background: 'rgba(198,255,26,0.03)',
                    }}
                >
                    {/* Subtle dot-grid */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(198,255,26,0.5), transparent)' }} />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full"
                            style={{ border: '1px solid rgba(198,255,26,0.2)', background: 'rgba(198,255,26,0.06)' }}>
                            <RiArrowUpLine className="text-[#C6FF1A] text-xs" />
                            <span className="text-[#C6FF1A] text-[10px] font-bold uppercase tracking-[0.2em]">Start Earning Today</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                            Ready to Join 10,000+<br />Contributors?
                        </h2>
                        <p className="text-white/40 text-base mb-10 max-w-md mx-auto leading-relaxed">
                            Connect your wallet, complete your first task, and get rewarded in minutes.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push('/ai')}
                            className="relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm overflow-hidden group"
                            style={{
                                background: '#C6FF1A',
                                color: '#060A07',
                                boxShadow: '0 2px 20px rgba(198,255,26,0.2)',
                            }}
                        >
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)' }} />
                            <RiFlashlightLine className="text-base relative z-10 shrink-0" />
                            <span className="relative z-10">Enter Dashboard</span>
                            <RiArrowRightLine className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
