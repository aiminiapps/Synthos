'use client'

import Image from 'next/image'

export default function LandingFooter() {
    return (
        <footer className="border-t py-10 px-4 sm:px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <Image src="/logo.png" alt="SYNTHOS" width={100} height={28} />
                <div className="flex items-center gap-5 text-white/22 text-xs">
                    <span>© 2026 SYNTHOS. All rights reserved.</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">Powered by BNB Chain & AI</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    <span className="text-[#34D399] text-xs font-semibold">All Systems Operational</span>
                </div>
            </div>
        </footer>
    )
}
