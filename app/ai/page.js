'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WalletButton from '@/components/WalletButton'
import TasksSection from '@/components/TasksSection'
import ReputationCard from '@/components/ReputationCard'
import LeaderboardTable from '@/components/LeaderboardTable'
import RewardHistory from '@/components/RewardHistory'
import {
    RiBriefcaseLine,
    RiTrophyLine,
    RiCoinLine,
    RiFlashlightLine,
    RiArrowUpLine,
    RiLoader4Line,
    RiRobot2Line,
    RiShieldCheckLine,
} from 'react-icons/ri'
import Image from 'next/image'

export default function DashboardPage() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const [userProfile, setUserProfile] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
            return
        }
        fetchData()
    }, [address, isConnected, router, refreshKey])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [profileRes, tasksRes] = await Promise.all([
                fetch(`/api/profile?address=${address}`),
                fetch('/api/tasks')
            ])
            const [profileData, tasksData] = await Promise.all([
                profileRes.json(),
                tasksRes.json()
            ])
            setUserProfile(profileData)
            setTasks(tasksData)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-[#080C09] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white/40 mb-4">Please connect your wallet to access the dashboard</p>
                    <WalletButton />
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080C09] flex items-center justify-center">
                <div className="text-center">
                    <RiLoader4Line className="text-[#C6FF1A] text-4xl animate-spin mx-auto mb-4" />
                    <p className="text-white/40 text-sm">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    const stats = [
        {
            label: 'SYNTR Balance',
            value: userProfile?.total_rewards || 0,
            suffix: 'SYNTR',
            icon: RiCoinLine,
            color: '#C6FF1A',
            glow: 'shadow-[0_0_20px_rgba(198,255,26,0.15)]',
            border: 'border-[#C6FF1A]/20',
            bg: 'bg-gradient-to-br from-[#C6FF1A]/10 to-[#C6FF1A]/3',
        },
        {
            label: 'Contributions',
            value: userProfile?.total_contributions || 0,
            suffix: 'tasks',
            icon: RiBriefcaseLine,
            color: '#34D399',
            glow: '',
            border: 'border-white/8',
            bg: 'bg-white/3',
        },
        {
            label: 'Level',
            value: userProfile?.level || 1,
            suffix: '',
            icon: RiTrophyLine,
            color: '#FBBF24',
            glow: '',
            border: 'border-white/8',
            bg: 'bg-white/3',
        },
        {
            label: 'Reputation',
            value: userProfile?.reputation_score || 0,
            suffix: 'pts',
            icon: RiFlashlightLine,
            color: '#60A5FA',
            glow: '',
            border: 'border-white/8',
            bg: 'bg-white/3',
        },
    ]

    return (
        <div className="min-h-screen bg-[#080C09]" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 0%, rgba(198,255,26,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(96,165,250,0.03) 0%, transparent 60%)' }}>

            {/* ── Header ── */}
            <header className="sticky top-0 z-50">
                {/* Floating island container */}
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 pt-3 pb-1">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3 rounded-2xl border"
                        style={{
                            background: 'rgba(8,12,9,0.85)',
                            borderColor: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(24px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(198,255,26,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                    >
                        {/* ── Logo ── */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
                        >
                            <Image src="/logo.png" alt="Logo" width={150} height={70} />
                        </motion.div>

                        {/* ── Center nav ── */}
                        <nav className="hidden md:flex items-center gap-1">
                            {[
                                { label: 'Home', path: '/' },
                                { label: 'Dashboard', path: '/ai', active: true },
                            ].map(item => (
                                <button
                                    key={item.label}
                                    onClick={() => router.push(item.path)}
                                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
                                    style={{
                                        color: item.active ? '#C6FF1A' : 'rgba(255,255,255,0.4)',
                                        background: item.active ? 'rgba(198,255,26,0.08)' : 'transparent',
                                        border: item.active ? '1px solid rgba(198,255,26,0.2)' : '1px solid transparent',
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* ── Right side ── */}
                        <div className="flex items-center gap-2.5 shrink-0">
                            {/* BSC live badge */}
                            <div
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                                style={{
                                    borderColor: 'rgba(52,211,153,0.2)',
                                    background: 'rgba(52,211,153,0.06)',
                                }}
                            >
                                <span className="relative flex h-1.5 w-1.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-60" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34D399]" />
                                </span>
                                <span className="text-[#34D399] text-[10px] font-bold uppercase tracking-wider">BSC</span>
                            </div>

                            {/* Wallet button */}
                            <WalletButton />
                        </div>
                    </motion.div>
                </div>
            </header>


            {/* ── Main Content ── */}
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8">

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={`rounded-2xl border p-5 ${stat.border} ${stat.bg} ${stat.glow}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                                    <stat.icon style={{ color: stat.color }} className="text-sm" />
                                </div>
                            </div>
                            <div className="flex items-end gap-1.5">
                                <span className="text-2xl font-black text-white">{stat.value.toLocaleString()}</span>
                                {stat.suffix && <span className="text-white/30 text-sm font-medium mb-0.5">{stat.suffix}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Left: Tasks (2/3 width) */}
                    <div className="xl:col-span-2 space-y-6">
                        <TasksSection
                            tasks={tasks}
                            userAddress={address}
                            userLevel={userProfile?.level || 1}
                            onTaskComplete={() => setRefreshKey(k => k + 1)}
                        />
                        <RewardHistory userAddress={address} />
                    </div>

                    {/* Right: Reputation + Leaderboard (1/3 width) */}
                    <div className="space-y-6">
                        {/* Level Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="rounded-2xl border border-white/8 bg-white/3 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <RiShieldCheckLine className="text-[#C6FF1A] text-lg" />
                                <h3 className="text-white font-bold text-sm">Level Progress</h3>
                                <span className="ml-auto text-[#C6FF1A] font-black text-lg">Lv.{userProfile?.level || 1}</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((userProfile?.reputation_score || 0) % 100)}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className="h-2 rounded-full bg-gradient-to-r from-[#C6FF1A] to-[#A3E635]"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-white/30">
                                <span>{(userProfile?.reputation_score || 0) % 100} / 100 XP</span>
                                <span>Next: Lv.{(userProfile?.level || 1) + 1}</span>
                            </div>
                        </motion.div>

                        <ReputationCard userProfile={userProfile} />
                        <LeaderboardTable currentUserAddress={address} />
                    </div>
                </div>
            </div>
        </div>
    )
}
