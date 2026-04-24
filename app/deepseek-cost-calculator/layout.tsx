import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DeepSeek-V4 API Cost Calculator | Latest 2026 Pricing',
  description: 'Calculate DeepSeek-V4 API costs accurately. Compare pricing across all DeepSeek models including V4, V3, Coder-V2, and R1. Free cost estimator for developers.',
  keywords: 'DeepSeek-V4, DeepSeek API cost calculator, DeepSeek pricing, DeepSeek Coder, API cost estimator, AI model pricing',
  openGraph: {
    title: 'DeepSeek-V4 API Cost Calculator',
    description: 'Calculate DeepSeek-V4 API costs accurately with our free calculator',
    type: 'website',
  },
}

export default function DeepSeekLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
