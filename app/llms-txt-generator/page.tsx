'use client'

import { useState, useMemo } from 'react'
import { FileText, Download, Copy, Check, Info, BookOpen, Globe, Shield, Sparkles } from 'lucide-react'
import { 
  llmsSections, 
  generateLlmsTxt,
  llmsTxtExample,
  llmsTxtGuide,
} from './llms-templates'
import { copyToClipboard } from '@/lib/utils'

export default function LlmsTxtGenerator() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'guide'>('edit')
  const [copied, setCopied] = useState(false)
  const [showExample, setShowExample] = useState(false)

  const generated = useMemo(() => {
    return generateLlmsTxt(values)
  }, [values])

  const handleValueChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }))
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(generated.content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([generated.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'llms.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadExample = () => {
    setValues({
      overview: 'ExampleCorp is a leading provider of AI-powered productivity tools for developers and content creators.',
      audience: 'Software developers, AI researchers, and tech-savvy content creators.',
      contentTypes: 'Technical documentation, API references, tutorials, blog posts, case studies, and product announcements.',
      language: 'English (US)',
      updateFrequency: 'Documentation is updated weekly; blog posts are published 2-3 times per week.',
      importantUrls: '/docs/\n/blog/\n/pricing/\n/changelog/',
      excludeUrls: '/admin/\n/checkout/\n/user-dashboard/\n/internal/',
      contact: 'For questions about content usage: legal@example.com',
      license: 'Content is provided under CC BY 4.0 unless otherwise specified.',
      attribution: 'When quoting content, please attribute to ExampleCorp and include a link to the original source.',
    })
  }

  const clearAll = () => {
    setValues({})
  }

  const completionPercentage = useMemo(() => {
    const requiredFields = llmsSections.filter(s => s.required)
    const filledRequired = requiredFields.filter(s => values[s.id]?.trim()).length
    return Math.round((filledRequired / requiredFields.length) * 100)
  }, [values])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LLMs.txt Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate llms.txt files to optimize your website for AI search engines. 
            Improve your LLMO (LLM Optimization) ranking.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full">
              <Globe className="w-4 h-4 mr-1" />
              SEO Essential
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-600 text-sm font-medium rounded-full">
              <Sparkles className="w-4 h-4 mr-1" />
              12K+ Monthly Searches
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion</span>
            <span className="text-sm font-medium text-primary-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Fill in the required fields (marked with *) to generate a complete llms.txt file
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'edit'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Edit Content
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preview & Download
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Guide
            </button>
          </div>
        </div>

        {activeTab === 'edit' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Website Information</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={loadExample}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Load Example
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={clearAll}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {llmsSections.map((section) => (
                    <div key={section.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {section.title}
                        {section.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <p className="text-xs text-gray-500 mb-2">{section.description}</p>
                      {section.id === 'importantUrls' || section.id === 'excludeUrls' ? (
                        <textarea
                          value={values[section.id] || ''}
                          onChange={(e) => handleValueChange(section.id, e.target.value)}
                          placeholder={section.placeholder}
                          rows={4}
                          className="textarea font-mono text-sm"
                        />
                      ) : (
                        <textarea
                          value={values[section.id] || ''}
                          onChange={(e) => handleValueChange(section.id, e.target.value)}
                          placeholder={section.placeholder}
                          rows={section.id === 'overview' || section.id === 'contentTypes' ? 3 : 2}
                          className="textarea"
                        />
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Example: {section.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Tips */}
              <div className="card bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Quick Tips</h3>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• Be specific about your content types</li>
                      <li>• List your most important pages first</li>
                      <li>• Clearly mark pages AI should avoid</li>
                      <li>• Include contact info for questions</li>
                      <li>• Update regularly as your site grows</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="card bg-emerald-50 border-emerald-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2">Why LLMs.txt Matters</h3>
                    <p className="text-sm text-emerald-700">
                      As AI search engines like Perplexity, Claude, and ChatGPT become primary discovery tools, 
                      llms.txt helps these systems understand and properly attribute your content. 
                      Early adoption can provide SEO advantages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Generated llms.txt</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
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
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>

                {generated.warnings.length > 0 && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-2">Warnings:</p>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {generated.warnings.map((warning, i) => (
                        <li key={i}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{generated.content}</pre>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
                  <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                    <li>Download your llms.txt file</li>
                    <li>Upload it to your website root (e.g., https://yoursite.com/llms.txt)</li>
                    <li>Test by visiting the URL to ensure it loads correctly</li>
                    <li>Update it regularly as your site content changes</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Example Output</h3>
                <button
                  onClick={() => setShowExample(!showExample)}
                  className="text-sm text-primary-600 hover:text-primary-700 mb-4"
                >
                  {showExample ? 'Hide Example' : 'Show Example'}
                </button>
                {showExample && (
                  <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono text-gray-700 overflow-x-auto max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{llmsTxtExample}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {llmsTxtGuide.map((item, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <h3 className="font-semibold text-emerald-900 mb-4">Best Practices</h3>
                <ul className="space-y-3 text-emerald-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Keep your llms.txt concise but informative - aim for 200-500 words</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Update it monthly or when making significant site changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Use clear, specific language that AI systems can easily parse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Include licensing info to protect your intellectual property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">5.</span>
                    <span>Link to it from your footer or about page for visibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Affiliate Section */}
        <div className="mt-12 card bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need help with LLMO?</h3>
              <p className="text-gray-600">
                Get professional LLM Optimization services to improve your AI search visibility.
              </p>
            </div>
            <a 
              href="#" 
              className="btn-primary whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn About LLMO
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
