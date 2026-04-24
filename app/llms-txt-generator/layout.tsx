import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLMs.txt Generator | Free AI Search Optimization Tool',
  description: 'Generate llms.txt files to optimize your website for AI search engines. Free tool for LLMO (LLM Optimization) - similar to robots.txt but for AI crawlers.',
  keywords: 'llms.txt generator, LLMO, AI search optimization, LLM SEO, robots.txt for AI',
  openGraph: {
    title: 'LLMs.txt Generator',
    description: 'Generate llms.txt files to optimize your website for AI search engines',
    type: 'website',
  },
}

export default function LlmsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
