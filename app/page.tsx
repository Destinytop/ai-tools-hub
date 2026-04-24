import ToolCard from '@/components/ToolCard'
import { Sparkles, Calculator, FileText, Zap, TrendingUp, Shield, FileCode, Monitor, Gamepad2 } from 'lucide-react'

const tools = [
  {
    title: 'Perplexity to Markdown',
    description: 'Convert Perplexity AI pages to clean Markdown. Perfect for importing into Notion, Obsidian, or any Markdown editor.',
    href: '/perplexity-to-markdown/',
    icon: FileCode,
    tags: ['Perplexity', 'Markdown', 'Productivity'],
    trending: true,
  },
  {
    title: 'Roblox Luau Ghostwriter',
    description: 'AI-powered code generator for Roblox Luau scripting. Perfect for beginners and experienced developers.',
    href: '/roblox-luau-ghostwriter/',
    icon: Gamepad2,
    tags: ['Roblox', 'Luau', 'Game Dev'],
    trending: true,
  },
  {
    title: 'Vision Pro Video Upscaler',
    description: 'Transform videos into 4K/8K spatial content optimized for Apple Vision Pro. Find the best AI upscaling tools.',
    href: '/vision-pro-video-upscaler/',
    icon: Monitor,
    tags: ['Vision Pro', 'Video AI', 'Spatial'],
    trending: true,
  },
  {
    title: 'Sora Prompt Generator',
    description: 'Generate high-quality, viral-worthy prompts for Sora AI video generation. Optimized for TikTok and social media content.',
    href: '/sora-prompt-generator/',
    icon: Sparkles,
    tags: ['Sora', 'TikTok', 'Video AI'],
    trending: false,
  },
  {
    title: 'DeepSeek Coder API Cost Calculator',
    description: 'Calculate exact API costs for DeepSeek Coder models. Plan your budget with real-time pricing estimates.',
    href: '/deepseek-cost-calculator/',
    icon: Calculator,
    tags: ['DeepSeek', 'API', 'Pricing'],
    trending: false,
  },
  {
    title: 'LLMs.txt Generator',
    description: 'Generate llms.txt files to optimize your website for AI search engines. Improve your LLM SEO ranking.',
    href: '/llms-txt-generator/',
    icon: FileText,
    tags: ['SEO', 'LLM', 'Generator'],
    trending: false,
  },
]

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'All tools run instantly in your browser with no waiting time.',
  },
  {
    icon: TrendingUp,
    title: 'Always Updated',
    description: 'We keep our tools updated with the latest AI trends and pricing.',
  },
  {
    icon: Shield,
    title: '100% Free',
    description: 'All tools are completely free to use with no hidden costs.',
  },
]

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Free <span className="gradient-text">AI Tools</span> for
              <br />
              Creators & Developers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Boost your productivity with our collection of free AI-powered tools. 
              From Sora prompts to API cost calculators, we have got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#tools" className="btn-primary text-lg px-8 py-3">
                Explore Tools
              </a>
              <a href="/perplexity-to-markdown/" className="btn-secondary text-lg px-8 py-3">
              Try Perplexity Converter
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-crafted tools designed to help you work smarter with AI technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We build tools that we would want to use ourselves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-8 lg:p-16 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to boost your AI workflow?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Start using our free tools today and see the difference they can make.
            </p>
            <a
              href="/perplexity-to-markdown/"
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
