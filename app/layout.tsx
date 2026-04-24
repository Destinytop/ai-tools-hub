import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Tools Hub - Free AI Tools for Creators & Developers',
  description: 'Free AI tools including Sora Prompt Generator, DeepSeek Cost Calculator, and LLMs.txt Generator. Boost your productivity with our AI-powered utilities.',
  keywords: 'AI tools, Sora prompt generator, DeepSeek API calculator, llms.txt generator, AI video prompts, API cost calculator',
  verification: {
    google: 'po2OcWbZO9eZCCbxFRRD08l4uOqG_yGh6zBgUXGXhzQ',
  },
  openGraph: {
    title: 'AI Tools Hub - Free AI Tools',
    description: 'Free AI tools for creators and developers',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
