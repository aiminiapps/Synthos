'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import WalletButton from '@/components/WalletButton'
import { RiCpuLine, RiTokenSwapLine, RiShieldStarLine, RiArrowRightLine } from 'react-icons/ri'

export default function HomePage() {
    const router = useRouter()

    const features = [
        {
            icon: RiCpuLine,
            title: 'Train AI Systems',
            description: 'Complete micro-tasks that help improve AI intelligence through data labeling and validation'
        },
        {
            icon: RiTokenSwapLine,
            title: 'Earn Crypto Rewards',
            description: 'Receive SYNTR tokens directly to your wallet for every contribution you make'
        },
        {
            icon: RiShieldStarLine,
            title: 'Build Reputation',
            description: 'Level up your profile, unlock better rewards, and climb the leaderboard'
        }
    ]

    const steps = [
        { number: '01', title: 'Connect Wallet', description: 'Link your Web3 wallet to get started' },
        { number: '02', title: 'Complete Tasks', description: 'Label data, validate AI outputs, and contribute' },
        { number: '03', title: 'Earn Rewards', description: 'Receive tokens sent directly to your wallet' },
    ]

    return (
        <div className="min-h-screen bg-industrial-black mesh-bg">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass-elevated border-b border-gray-divider">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold"
                    >
                        <span className="text-neon text-glow">SYNTHOS</span>
                    </motion.div>
                    <WalletButton />
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                            Train AI,
                            <br />
                            <span className="text-neon text-glow animate-glow-pulse">Earn Crypto</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-secondary mb-8 max-w-3xl mx-auto">
                            Join the decentralized AI revolution. Complete micro-tasks, improve AI systems,
                            and get rewarded with tokens sent directly to your wallet.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/ai')}
                            className="px-8 py-4 bg-gradient-neon text-industrial-black font-bold text-lg rounded-lg transition-all duration-200 flex items-center gap-2 group shadow-neon-lg hover:shadow-neon"
                        >
                            Enter Dashboard
                            <RiArrowRightLine className="text-xl group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
                    >
                        {[
                            { value: '10K+', label: 'Active Contributors' },
                            { value: '$250K+', label: 'Rewards Distributed' },
                            { value: '1M+', label: 'Tasks Completed' },
                        ].map((stat, index) => (
                            <div key={index} className="card-luxury p-6 rounded-xl">
                                <div className="text-4xl font-black text-neon mb-2 text-glow-soft">{stat.value}</div>
                                <div className="text-gray-secondary">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-industrial-dark">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            How <span className="text-neon">SYNTHOS</span> Works
                        </h2>
                        <p className="text-gray-secondary text-lg">
                            Three simple steps to start earning crypto
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="glass-effect p-8 rounded-xl hover:border-neon/50 transition-all duration-300">
                                    <div className="text-6xl font-black text-neon/20 mb-4">{step.number}</div>
                                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-secondary">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-neon/30" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Why Choose <span className="text-neon">SYNTHOS</span>
                        </h2>
                        <p className="text-gray-secondary text-lg">
                            The future of AI training meets blockchain technology
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="glass-effect p-8 rounded-xl hover:border-neon/50 transition-all duration-300 group"
                            >
                                <feature.icon className="text-5xl text-neon mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-secondary">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-industrial-dark to-industrial-black">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Start Earning?
                        </h2>
                        <p className="text-xl text-gray-secondary mb-8">
                            Connect your wallet and join thousands of contributors training the next generation of AI
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/ai')}
                            className="px-10 py-5 bg-neon hover:bg-neon-bright text-industrial-black font-bold text-xl rounded-lg transition-all duration-200 flex items-center gap-3 mx-auto group shadow-2xl hover:shadow-neon/60"
                        >
                            Launch Dashboard
                            <RiArrowRightLine className="text-2xl group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-border py-8 px-6">
                <div className="max-w-6xl mx-auto text-center text-gray-muted">
                    <p>&copy; 2026 SYNTHOS. All rights reserved.</p>
                    <p className="mt-2 text-sm">Powered by Web3 & AI</p>
                </div>
            </footer>
        </div>
    )
}
