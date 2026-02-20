'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import WalletButton from '@/components/WalletButton'
import {
    RiCpuLine, RiTokenSwapLine, RiShieldStarLine,
    RiArrowRightLine, RiMenuLine, RiCloseLine,
    RiRobot2Line, RiFlashlightLine, RiGlobalLine,
    RiBarChartLine, RiArrowUpLine, RiBrainLine,
    RiCheckLine, RiStarFill,
} from 'react-icons/ri'

// ─── Floating particle ────────────────────────────────────────────────────────
function Particle({ style }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={style}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 4 }}
        />
    )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCount({ target, suffix = '' }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started) {
                setStarted(true)
                let start = 0
                const step = target / 60
                const timer = setInterval(() => {
                    start += step
                    if (start >= target) { setCount(target); clearInterval(timer) }
                    else setCount(Math.floor(start))
                }, 16)
            }
        }, { threshold: 0.5 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, started])

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Nav link ─────────────────────────────────────────────────────────────────
function NavLink({ label, href, onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 group"
        >
            {label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C6FF1A] group-hover:w-full transition-all duration-300" />
        </button>
    )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const heroRef = useRef(null)
    const { scrollY } = useScroll()
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
    const heroY = useTransform(scrollY, [0, 400], [0, 60])

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 24)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const particles = Array.from({ length: 18 }, (_, i) => ({
        width: 2 + (i % 4),
        height: 2 + (i % 4),
        left: `${(i * 5.6) % 100}%`,
        top: `${(i * 7.3) % 100}%`,
        background: i % 3 === 0 ? '#C6FF1A' : i % 3 === 1 ? '#60A5FA' : '#A78BFA',
    }))

    const features = [
        {
            icon: RiBrainLine,
            color: '#C6FF1A',
            glow: 'rgba(198,255,26,0.15)',
            title: 'Train AI Systems',
            description: 'Complete precision micro-tasks that fine-tune next-generation AI through expert data labeling and validation.',
        },
        {
            icon: RiTokenSwapLine,
            color: '#60A5FA',
            glow: 'rgba(96,165,250,0.15)',
            title: 'Earn Crypto Rewards',
            description: 'Receive SYNTR tokens sent directly to your wallet — no middlemen, no delays, fully on-chain.',
        },
        {
            icon: RiShieldStarLine,
            color: '#A78BFA',
            glow: 'rgba(167,139,250,0.15)',
            title: 'Build Reputation',
            description: 'Level up your on-chain identity, unlock multiplied rewards, and rise through 60k+ contributors.',
        },
    ]

    const steps = [
        { num: '01', icon: RiGlobalLine, color: '#C6FF1A', title: 'Connect Wallet', desc: 'Link your BNB Chain wallet in one click — no KYC, no gatekeeping.' },
        { num: '02', icon: RiRobot2Line, color: '#60A5FA', title: 'Complete Tasks', desc: 'Label data, validate AI outputs, answer research prompts and earn.' },
        { num: '03', icon: RiFlashlightLine, color: '#FBBF24', title: 'Earn On-Chain', desc: 'Rewards flow to your wallet instantly. Claim, stake, or compound.' },
    ]

    const stats = [
        { value: 10, suffix: 'K+', label: 'Active Contributors', icon: RiGlobalLine, color: '#C6FF1A' },
        { value: 250, suffix: 'K+', label: 'SYNTR Distributed', prefix: '$', icon: RiTokenSwapLine, color: '#60A5FA' },
        { value: 1, suffix: 'M+', label: 'Tasks Completed', icon: RiBarChartLine, color: '#A78BFA' },
        { value: 99, suffix: '%', label: 'Uptime Guarantee', icon: RiCheckLine, color: '#34D399' },
    ]

    return (
        <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ background: '#060A07' }}
        >
            {/* ── Background mesh ── */}
            <div className="fixed inset-0 pointer-events-none" aria-hidden>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(198,255,26,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(96,165,250,0.05) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════
                NAVBAR
            ══════════════════════════════════════════════════════════════ */}
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{ paddingTop: scrolled ? 8 : 16, paddingBottom: scrolled ? 8 : 12 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between gap-6 px-5 py-3 rounded-2xl transition-all duration-500"
                        style={{
                            background: scrolled ? 'rgba(6,10,7,0.92)' : 'rgba(6,10,7,0.6)',
                            border: '1px solid',
                            borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(24px)',
                            boxShadow: scrolled
                                ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(198,255,26,0.06)'
                                : '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        {/* Logo */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2.5 shrink-0"
                        >
                            <Image src="/logo.png" alt="SYNTHOS" width={130} height={36} />
                        </motion.button>

                        {/* Desktop nav links */}
                        <nav className="hidden md:flex items-center gap-7">
                            {[
                                { label: 'How It Works', id: 'how-it-works' },
                                { label: 'Features', id: 'features' },
                                { label: 'Community', id: 'community' },
                            ].map(item => (
                                <NavLink
                                    key={item.label}
                                    label={item.label}
                                    onClick={() => {
                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                />
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            {/* Dashboard link */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => router.push('/ai')}
                                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/6 transition-all"
                            >
                                Dashboard
                                <RiArrowRightLine className="text-xs" />
                            </motion.button>

                            <WalletButton />

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white transition-colors"
                                onClick={() => setMobileOpen(v => !v)}
                            >
                                {mobileOpen ? <RiCloseLine className="text-lg" /> : <RiMenuLine className="text-lg" />}
                            </button>
                        </div>
                    </motion.div>

                    {/* Mobile drawer */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 rounded-2xl border border-white/8 overflow-hidden md:hidden"
                                style={{ background: 'rgba(6,10,7,0.97)', backdropFilter: 'blur(24px)' }}
                            >
                                <div className="px-5 py-4 space-y-1">
                                    {[
                                        { label: 'How It Works', id: 'how-it-works' },
                                        { label: 'Features', id: 'features' },
                                        { label: 'Community', id: 'community' },
                                    ].map(item => (
                                        <button
                                            key={item.label}
                                            onClick={() => {
                                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                                                setMobileOpen(false)
                                            }}
                                            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                    <div className="pt-2 border-t border-white/6">
                                        <button
                                            onClick={() => { router.push('/ai'); setMobileOpen(false) }}
                                            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#C6FF1A] hover:bg-[#C6FF1A]/8 transition-all"
                                        >
                                            → Launch Dashboard
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">

                {/* Floating particles */}
                {particles.map((p, i) => (
                    <Particle key={i} style={{ width: p.width, height: p.height, left: p.left, top: p.top, background: p.background, filter: 'blur(0.5px)' }} />
                ))}

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(198,255,26,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="relative z-10 text-center max-w-5xl mx-auto"
                >
                    {/* Announcement pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
                        style={{
                            borderColor: 'rgba(198,255,26,0.25)',
                            background: 'rgba(198,255,26,0.06)',
                        }}
                    >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF1A] opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C6FF1A]" />
                        </span>
                        <span className="text-[#C6FF1A] text-xs font-bold uppercase tracking-widest">Now Live on BNB Chain</span>
                        <RiArrowRightLine className="text-[#C6FF1A] text-xs" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-black leading-[1.05] tracking-tight mb-6"
                        style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
                    >
                        <span className="text-white">Train AI.</span>
                        <br />
                        <span
                            className="inline-block"
                            style={{
                                background: 'linear-gradient(135deg, #C6FF1A 0%, #A3E635 40%, #60A5FA 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 40px rgba(198,255,26,0.3))',
                            }}
                        >
                            Earn Crypto.
                        </span>
                        <br />
                        <span className="text-white/30" style={{ fontSize: '70%', fontWeight: 700 }}>Repeat.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-white/50 mb-10 leading-relaxed max-w-2xl mx-auto"
                        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                    >
                        SYNTHOS connects human intelligence with AI training — complete micro-tasks,
                        validate outputs, and receive <span className="text-white/80 font-semibold">SYNTR tokens</span> directly
                        to your wallet on BNB Chain.
                    </motion.p>

                    {/* CTA row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        {/* Primary CTA */}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push('/ai')}
                            className="relative flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base overflow-hidden group"
                            style={{
                                background: 'linear-gradient(135deg, #C6FF1A, #9ECC00)',
                                color: '#060A07',
                                boxShadow: '0 0 40px rgba(198,255,26,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
                            }}
                        >
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)' }}
                            />
                            <RiFlashlightLine className="text-lg relative z-10" />
                            <span className="relative z-10">Launch Dashboard</span>
                            <RiArrowRightLine className="text-base relative z-10 group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>

                        {/* Secondary CTA */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base border transition-all"
                            style={{
                                color: 'rgba(255,255,255,0.65)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.04)',
                            }}
                        >
                            How it Works
                        </motion.button>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-20"
                    >
                        {[
                            { icon: RiShieldStarLine, label: 'Non-custodial', color: '#34D399' },
                            { icon: RiCheckLine, label: 'Audited Smart Contracts', color: '#60A5FA' },
                            { icon: RiGlobalLine, label: 'BNB Chain Native', color: '#FBBF24' },
                        ].map(({ icon: Icon, label, color }) => (
                            <div key={label} className="flex items-center gap-1.5">
                                <Icon style={{ color }} className="text-sm" />
                                <span className="text-white/35 text-xs font-medium">{label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ y: -3 }}
                                className="rounded-2xl border p-5 text-center group cursor-default"
                                style={{
                                    borderColor: 'rgba(255,255,255,0.07)',
                                    background: 'rgba(255,255,255,0.025)',
                                    backdropFilter: 'blur(12px)',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${stat.color}30`
                                    e.currentTarget.style.boxShadow = `0 0 24px ${stat.color}15`
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <stat.icon style={{ color: stat.color }} className="text-xl mx-auto mb-2 opacity-70" />
                                <div
                                    className="text-2xl font-black mb-1"
                                    style={{ color: stat.color }}
                                >
                                    {stat.prefix || ''}
                                    <AnimatedCount target={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-white/35 text-[11px] font-medium leading-tight">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-white/20 text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
                    />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                HOW IT WORKS
            ══════════════════════════════════════════════════════════════ */}
            <section id="how-it-works" className="py-28 px-4 sm:px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-[#C6FF1A] text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#C6FF1A]/20 bg-[#C6FF1A]/6">
                            Simple Process
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4 leading-tight">
                            How <span style={{ color: '#C6FF1A' }}>SYNTHOS</span> Works
                        </h2>
                        <p className="text-white/40 text-lg max-w-xl mx-auto">Three steps from zero to earning crypto on-chain</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="relative rounded-2xl border p-7 group cursor-default"
                                style={{
                                    borderColor: 'rgba(255,255,255,0.07)',
                                    background: 'rgba(255,255,255,0.02)',
                                    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${step.color}30`
                                    e.currentTarget.style.boxShadow = `0 0 30px ${step.color}12`
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                {/* Step number watermark */}
                                <div className="absolute top-5 right-6 text-6xl font-black leading-none select-none"
                                    style={{ color: `${step.color}12` }}>
                                    {step.num}
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                    style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}>
                                    <step.icon style={{ color: step.color }} className="text-xl" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>

                                {/* Connector line */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                                        <div className="w-6 h-px" style={{ background: `linear-gradient(90deg, ${step.color}60, transparent)` }} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FEATURES
            ══════════════════════════════════════════════════════════════ */}
            <section id="features" className="py-28 px-4 sm:px-6 relative"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(198,255,26,0.02) 50%, transparent)' }}>
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-[#60A5FA] text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#60A5FA]/20 bg-[#60A5FA]/6">
                            Why SYNTHOS
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
                            Built for <span style={{ color: '#C6FF1A' }}>Serious Contributors</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-xl mx-auto">Every design decision puts more earnings in your wallet</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="rounded-2xl border p-7 group"
                                style={{
                                    borderColor: 'rgba(255,255,255,0.07)',
                                    background: 'rgba(255,255,255,0.02)',
                                    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${feat.color}30`
                                    e.currentTarget.style.boxShadow = `0 0 30px ${feat.glow}`
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                    style={{ background: `${feat.color}12`, border: `1px solid ${feat.color}25` }}>
                                    <feat.icon style={{ color: feat.color }} className="text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{feat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                COMMUNITY / TESTIMONIALS
            ══════════════════════════════════════════════════════════════ */}
            <section id="community" className="py-28 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-14"
                    >
                        <span className="inline-block text-[#A78BFA] text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border border-[#A78BFA]/20 bg-[#A78BFA]/6">
                            Community
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
                            Loved by Contributors
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { name: 'oxBTC', role: 'DeFi Veteran', stars: 5, quote: 'Best on-chain earning platform I have used. Tasks are fair and rewards hit my wallet instantly.' },
                            { name: 'CryptoSarah', role: 'AI Researcher', stars: 5, quote: 'Synthos turned idle hours into real passive income. The AI tasks are actually interesting too.' },
                            { name: 'Satsuma.bnb', role: 'Data Labeler', stars: 5, quote: 'Climbed to top 500 in two weeks. The reputation system is brilliantly designed.' },
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl border p-6 text-left"
                                style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                            >
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: t.stars }).map((_, j) => (
                                        <RiStarFill key={j} className="text-[#FBBF24] text-sm" />
                                    ))}
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                                        style={{ background: 'rgba(198,255,26,0.12)', color: '#C6FF1A' }}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-semibold">{t.name}</div>
                                        <div className="text-white/30 text-[11px]">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                CTA BANNER
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl border overflow-hidden text-center py-16 px-8"
                        style={{
                            borderColor: 'rgba(198,255,26,0.15)',
                            background: 'linear-gradient(135deg, rgba(198,255,26,0.06) 0%, rgba(6,10,7,1) 60%, rgba(96,165,250,0.04) 100%)',
                            boxShadow: '0 0 80px rgba(198,255,26,0.08)',
                        }}
                    >
                        {/* Grid overlay */}
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(rgba(198,255,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,26,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#C6FF1A]/25 bg-[#C6FF1A]/8">
                                <RiArrowUpLine className="text-[#C6FF1A] text-sm" />
                                <span className="text-[#C6FF1A] text-xs font-bold uppercase tracking-widest">Start Earning Today</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                                Ready to Join 10,000+<br />Contributors?
                            </h2>
                            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
                                Connect your wallet, complete your first task, and get rewarded in minutes.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => router.push('/ai')}
                                    className="relative flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden group"
                                    style={{
                                        background: 'linear-gradient(135deg, #C6FF1A, #9ECC00)',
                                        color: '#060A07',
                                        boxShadow: '0 0 40px rgba(198,255,26,0.35)',
                                    }}
                                >
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                        style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)' }} />
                                    <RiFlashlightLine className="text-lg relative z-10" />
                                    <span className="relative z-10">Enter Dashboard</span>
                                    <RiArrowRightLine className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER
            ══════════════════════════════════════════════════════════════ */}
            <footer className="border-t border-white/5 py-10 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <Image src="/logo.png" alt="SYNTHOS" width={100} height={28} />
                    </div>
                    <div className="flex items-center gap-6 text-white/25 text-xs">
                        <span>© 2026 SYNTHOS. All rights reserved.</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="hidden sm:inline">Powered by BNB Chain & AI</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                        <span className="text-[#34D399] text-xs font-semibold">All Systems Operational</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
