'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles, Calculator, FileText } from 'lucide-react'

const tools = [
  {
    name: 'Sora Prompt Generator',
    href: '/sora-prompt-generator/',
    icon: Sparkles,
    description: 'Generate high-quality prompts for Sora AI video generation',
  },
  {
    name: 'DeepSeek Cost Calculator',
    href: '/deepseek-cost-calculator/',
    icon: Calculator,
    description: 'Calculate API costs for DeepSeek Coder',
  },
  {
    name: 'LLMs.txt Generator',
    href: '/llms-txt-generator/',
    icon: FileText,
    description: 'Generate llms.txt for AI search optimization',
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AI Tools Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-gray-600 hover:text-primary-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
