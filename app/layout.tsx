import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Tools Hub - Free AI Tools for Creators & Developers',
  description: 'Free AI tools including Perplexity to Markdown Converter, Roblox Luau Ghostwriter, Vision Pro Video Upscaler, Sora Prompt Generator, DeepSeek Cost Calculator, and LLMs.txt Generator.',
  keywords: 'AI tools, Perplexity to Markdown, Roblox Luau ghostwriter, Apple Vision Pro video upscaler, Sora prompt generator, DeepSeek API calculator, llms.txt generator, AI video prompts, API cost calculator, Luau scripting, spatial video',
  other: {
    'google-site-verification': 'po2OcWbZO9eZCCbxFRRD08l4uOqG_yGh6zBgUXGXhzQ',
  },
  openGraph: {
    title: 'AI Tools Hub - Free AI Tools',
    description: 'Free AI tools for creators and developers including Perplexity converter, Roblox ghostwriter, and Vision Pro upscaler',
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
