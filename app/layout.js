import { Web3Provider } from '@/components/Web3Provider'
import './globals.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>SYNTHOS - AI Training & Web3 Rewards</title>
                <meta name="description" content="Train AI systems and earn crypto rewards with SYNTHOS" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased bg-industrial-black text-gray-text">
                <Web3Provider>
                    {children}
                </Web3Provider>
            </body>
        </html>
    )
}
