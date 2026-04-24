import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sora Prompt Generator for TikTok | Free AI Video Prompts',
  description: 'Generate high-quality Sora AI video prompts optimized for TikTok viral content. Free prompt templates for cinematic, nature, urban, and creative videos.',
  keywords: 'Sora prompt generator, TikTok video prompts, AI video generation, Sora AI, viral video prompts',
  openGraph: {
    title: 'Sora Prompt Generator for TikTok',
    description: 'Generate high-quality Sora AI video prompts optimized for TikTok viral content',
    type: 'website',
  },
}

export default function SoraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
