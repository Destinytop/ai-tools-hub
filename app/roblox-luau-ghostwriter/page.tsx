'use client'

import { useState, useMemo } from 'react'
import { Code, Copy, Check, Sparkles, TrendingUp, Gamepad2, BookOpen, Lightbulb, ExternalLink } from 'lucide-react'
import { 
  luauTemplates, 
  luauCategories,
  luauTips,
  generateLuauCode,
  type LuauTemplate 
} from './luau-templates'
import { copyToClipboard } from '@/lib/utils'

export default function RobloxLuauGhostwriter() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<LuauTemplate | null>(null)
  const [templateValues, setTemplateValues] = useState<Record<string, string>>({})
  const [generatedCode, setGeneratedCode] = useState('')
  const [copied, setCopied] = useState(false)

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'all') return luauTemplates
    return luauTemplates.filter(t => t.category === selectedCategory)
  }, [selectedCategory])

  const extractVariables = (template: string): string[] => {
    const matches = template.match(/\{([^}]+)\}/g)
    if (!matches) return []
    const uniqueVars = Array.from(new Set(matches.map(m => m.slice(1, -1))))
    return uniqueVars
  }

  const handleTemplateSelect = (template: LuauTemplate) => {
    setSelectedTemplate(template)
    setTemplateValues({})
    setGeneratedCode('')
  }

  const handleValueChange = (variable: string, value: string) => {
    setTemplateValues(prev => ({ ...prev, [variable]: value }))
  }

  const handleGenerate = () => {
    if (!selectedTemplate) return
    const code = generateLuauCode(selectedTemplate, templateValues)
    setGeneratedCode(code)
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedCode)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const variables = selectedTemplate ? extractVariables(selectedTemplate.template) : []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-6">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Roblox Luau Ghostwriter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered code generator for Roblox Luau scripting. 
            Perfect for beginners and experienced developers alike.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              30K+ Monthly Searches
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
              <Sparkles className="w-4 h-4 mr-1" />
              Low Competition
            </span>
          </div>
        </div>

        {/* Tips Section */}
        <div className="card mb-8 bg-orange-50 border-orange-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Luau Coding Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {luauTips.map((tip) => (
                  <div key={tip.id} className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-orange-800">{tip.title}</p>
                    <p className="text-xs text-orange-600 mt-1">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Template Selection */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-600" />
                Choose Template
              </h2>
              
              {/* Category Filter */}
              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select"
                >
                  {luauCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Templates List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {luauCategories.find(c => c.id === template.category)?.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Code Builder */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="space-y-6">
                {/* Template Info */}
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedTemplate.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <p className="text-sm text-gray-400 mb-2">Example:</p>
                    <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{selectedTemplate.example}</pre>
                  </div>
                </div>

                {/* Variable Inputs */}
                {variables.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Customize Your Code</h3>
                    <div className="space-y-4">
                      {variables.map((variable) => (
                        <div key={variable}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {variable.replace(/_/g, ' ')}
                          </label>
                          <input
                            type="text"
                            value={templateValues[variable] || ''}
                            onChange={(e) => handleValueChange(variable, e.target.value)}
                            placeholder={`Enter ${variable.replace(/_/g, ' ')}...`}
                            className="input font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Luau Code
                </button>

                {/* Generated Code */}
                {generatedCode && (
                  <div className="card border-red-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Code className="w-5 h-5 text-red-600" />
                        Generated Code
                      </h3>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-blue-300 font-mono whitespace-pre-wrap">{generatedCode}</pre>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>How to use:</strong> Copy this code and paste it into a Script or LocalScript in Roblox Studio. 
                        Make sure to place it in the correct location (Workspace, StarterPlayer, etc.)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center py-16">
                <Code className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Template</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a code template from the left panel to start generating Luau scripts for your Roblox game.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="https://create.roblox.com/docs" 
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900">Roblox Docs</h3>
            </div>
            <p className="text-sm text-gray-600">Official Roblox Creator Documentation for Luau scripting.</p>
            <div className="flex items-center gap-1 text-red-600 text-sm mt-3">
              Learn More <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a 
            href="https://devforum.roblox.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">DevForum</h3>
            </div>
            <p className="text-sm text-gray-600">Community forum for Roblox developers. Get help and share ideas.</p>
            <div className="flex items-center gap-1 text-blue-600 text-sm mt-3">
              Visit Forum <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <div className="card bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900">Need More Help?</h3>
            </div>
            <p className="text-sm text-gray-600">Check out Roblox Studio tutorials on YouTube for visual learning.</p>
            <a 
              href="https://www.youtube.com/results?search_query=roblox+luau+tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-orange-600 text-sm mt-3"
            >
              Watch Tutorials <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="mt-8 card bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Game Faster</h3>
              <p className="text-gray-600">
                Need game assets or plugins? Check out the Roblox Creator Marketplace for tools to speed up development.
              </p>
            </div>
            <a 
              href="https://create.roblox.com/store" 
              className="btn-primary whitespace-nowrap flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse Assets
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Ko-fi Section */}
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
