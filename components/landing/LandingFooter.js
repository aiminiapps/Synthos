'use client'

import Image from 'next/image'

function XIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

export default function LandingFooter() {
    return (
        <footer className="border-t py-10 px-4 sm:px-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <Image src="/logo.png" alt="SYNTHOS" width={100} height={28} />

                {/* X (Twitter) link */}
                <a
                    href="https://x.com/Aisynthos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 group"
                    style={{
                        borderColor: 'rgba(198,255,26,0.25)',
                        background: 'rgba(198,255,26,0.06)',
                        color: '#C6FF1A',
                    }}
                >
                    <XIcon size={14} />
                    <span className="text-xs font-semibold tracking-wide">@SYNTHOS_AI</span>
                </a>

                <div className="flex items-center gap-5 text-white/30 text-xs">
                    <span>© 2026 SYNTHOS. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}
