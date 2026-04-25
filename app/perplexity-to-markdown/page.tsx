'use client'

import { useState, useCallback } from 'react'
import { FileText, Copy, Check, Download, Trash2, Sparkles, TrendingUp, BookOpen, ExternalLink } from 'lucide-react'
import { copyToClipboard, downloadTextFile } from '@/lib/utils'

interface ConversionOptions {
  removeCitations: boolean
  cleanFormatting: boolean
  addFrontmatter: boolean
  preserveImages: boolean
}

export default function PerplexityToMarkdown() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<ConversionOptions>({
    removeCitations: true,
    cleanFormatting: true,
    addFrontmatter: false,
    preserveImages: true,
  })

  const convertToMarkdown = useCallback(() => {
    if (!input.trim()) return

    let markdown = input

    // Remove citation numbers like [1], [2], etc.
    if (options.removeCitations) {
      markdown = markdown.replace(/\[\d+\]/g, '')
    }

    // Clean up excessive newlines
    if (options.cleanFormatting) {
      markdown = markdown.replace(/\n{3,}/g, '\n\n')
    }

    // Convert common patterns
    // Bold text
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '**$1**')
    
    // Convert bullet points if not already markdown
    markdown = markdown.replace(/^•\s/gm, '- ')
    markdown = markdown.replace(/^◦\s/gm, '  - ')

    // Add frontmatter for Obsidian/Notion
    if (options.addFrontmatter) {
      const title = markdown.split('\n')[0].replace(/^#+\s*/, '').slice(0, 50)
      const date = new Date().toISOString().split('T')[0]
      markdown = `---\ntitle: "${title}"\ndate: ${date}\nsource: Perplexity AI\n---\n\n${markdown}`
    }

    // Clean up any remaining artifacts
    markdown = markdown.trim()

    setOutput(markdown)
  }, [input, options])

  const handleCopy = async () => {
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    const title = output.split('\n')[0].replace(/^#+\s*/, '').slice(0, 30) || 'perplexity-export'
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`
    downloadTextFile(output, filename)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const toggleOption = (key: keyof ConversionOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perplexity Page to Markdown
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert Perplexity AI pages to clean Markdown format. 
            Perfect for importing into Notion, Obsidian, or any Markdown editor.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              Hot Tool
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
              <Sparkles className="w-4 h-4 mr-1" />
              18K+ Monthly Searches
            </span>
          </div>
        </div>

        {/* How to Use */}
        <div className="card mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How to Use</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Open your Perplexity AI page</li>
                <li>Select and copy all the content (Ctrl+A, Ctrl+C)</li>
                <li>Paste it in the input box below</li>
                <li>Click "Convert to Markdown"</li>
                <li>Copy or download the clean Markdown output</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Perplexity Content
              </h2>
              {input && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Clear"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your Perplexity content here..."
              className="w-full h-96 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {input.length} characters
              </span>
              <button
                onClick={convertToMarkdown}
                disabled={!input.trim()}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                Convert to Markdown
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Markdown Output
              </h2>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Converted Markdown will appear here..."
              className="w-full h-96 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-none bg-gray-50"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {output.length} characters
              </span>
              {output && (
                <span className="text-sm text-green-600">
                  Ready to import!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="card mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Conversion Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'removeCitations', label: 'Remove Citations', desc: 'Remove [1], [2] citation markers' },
              { key: 'cleanFormatting', label: 'Clean Formatting', desc: 'Fix spacing and line breaks' },
              { key: 'addFrontmatter', label: 'Add Frontmatter', desc: 'Include YAML frontmatter for Obsidian' },
              { key: 'preserveImages', label: 'Preserve Images', desc: 'Keep image references if present' },
            ].map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => toggleOption(key as keyof ConversionOptions)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  options[key as keyof ConversionOptions]
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    options[key as keyof ConversionOptions] ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}>
                    {options[key as keyof ConversionOptions] && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="font-medium text-gray-900">{label}</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Affiliate Section - Notion */}
        <div className="mt-8 card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Import to Notion</h3>
              <p className="text-gray-600">
                Notion makes it easy to organize your research. Import your Markdown files seamlessly.
              </p>
            </div>
            <a 
              href="https://www.notion.so/product" 
              className="btn-primary whitespace-nowrap flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Notion Free
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Affiliate Section - Obsidian */}
        <div className="mt-4 card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Power Up with Obsidian</h3>
              <p className="text-gray-600">
                The best local-first knowledge base. Perfect for managing your Perplexity research.
              </p>
            </div>
            <a 
              href="https://obsidian.md/" 
              className="btn-primary whitespace-nowrap flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Obsidian
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Buy Me a Coffee */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Found this tool helpful?</p>
          <a
            href="https://ko-fi.com/destinytop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5E5B] text-white rounded-lg font-semibold hover:bg-[#ff4542] transition-colors"
          >
            <span className="text-xl">☕</span>
            Buy me a coffee
          </a>
        </div>
      </div>
    </div>
  )
}
