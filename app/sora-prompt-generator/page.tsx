'use client'

import { useState, useMemo } from 'react'
import { Sparkles, Copy, Check, RefreshCw, Wand2, Video, TrendingUp, Info } from 'lucide-react'
import { 
  promptTemplates, 
  promptCategories, 
  tiktokOptimizations,
  styleModifiers,
  generatePrompt,
  type PromptTemplate 
} from './prompts-data'
import { copyToClipboard } from '@/lib/utils'

export default function SoraPromptGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [templateValues, setTemplateValues] = useState<Record<string, string>>({})
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>(['cinematic', '8K resolution'])
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [showTips, setShowTips] = useState(true)

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'all') return promptTemplates
    return promptTemplates.filter(t => t.category === selectedCategory)
  }, [selectedCategory])

  const extractVariables = (template: string): string[] => {
    const matches = template.match(/\{([^}]+)\}/g)
    return matches ? matches.map(m => m.slice(1, -1)) : []
  }

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template)
    setTemplateValues({})
    setGeneratedPrompt('')
  }

  const handleValueChange = (variable: string, value: string) => {
    setTemplateValues(prev => ({ ...prev, [variable]: value }))
  }

  const handleGenerate = () => {
    if (!selectedTemplate) return
    const prompt = generatePrompt(selectedTemplate, templateValues, selectedModifiers)
    setGeneratedPrompt(prompt)
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedPrompt)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const toggleModifier = (modifier: string) => {
    setSelectedModifiers(prev => 
      prev.includes(modifier) 
        ? prev.filter(m => m !== modifier)
        : [...prev, modifier]
    )
  }

  const variables = selectedTemplate ? extractVariables(selectedTemplate.template) : []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sora Prompt Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate high-quality prompts for Sora AI video generation. 
            Optimized for TikTok viral content.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending #1
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
              <Video className="w-4 h-4 mr-1" />
              45K+ Monthly Searches
            </span>
          </div>
        </div>

        {/* TikTok Tips */}
        {showTips && (
          <div className="card mb-8 border-purple-200 bg-purple-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">TikTok Optimization Tips</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tiktokOptimizations.map((tip) => (
                      <div key={tip.id} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2" />
                        <div>
                          <p className="text-sm font-medium text-purple-800">{tip.name}</p>
                          <p className="text-xs text-purple-600">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowTips(false)}
                className="text-purple-400 hover:text-purple-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Template Selection */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary-600" />
                Choose Template
              </h2>
              
              {/* Category Filter */}
              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select"
                >
                  {promptCategories.map((cat) => (
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
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Modifiers */}
            <div className="card mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Style Modifiers</h3>
              <div className="flex flex-wrap gap-2">
                {styleModifiers.map((modifier) => (
                  <button
                    key={modifier}
                    onClick={() => toggleModifier(modifier)}
                    className={`px-3 py-1 text-sm rounded-full border transition-all ${
                      selectedModifiers.includes(modifier)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {modifier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Prompt Builder */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="space-y-6">
                {/* Template Info */}
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedTemplate.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-500 mb-1">Example:</p>
                    <p className="text-sm text-gray-700 italic">{selectedTemplate.example}</p>
                  </div>
                </div>

                {/* Variable Inputs */}
                {variables.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Customize Your Prompt</h3>
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
                            className="input"
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
                  Generate Sora Prompt
                </button>

                {/* Generated Prompt */}
                {generatedPrompt && (
                  <div className="card border-primary-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">Your Prompt</h3>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
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
                    </div>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm leading-relaxed">
                      {generatedPrompt}
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Pro Tip:</strong> Copy this prompt and paste it into Sora or your preferred AI video generator. 
                        For best TikTok results, aim for 15-30 second videos with strong hooks in the first 3 seconds.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center py-16">
                <Wand2 className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Template</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a prompt template from the left panel to start generating your Sora video prompts.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need AI Video Editing Tools?</h3>
              <p className="text-gray-600">
                Check out these recommended tools to edit and enhance your AI-generated videos for TikTok.
              </p>
            </div>
            <a 
              href="#" 
              className="btn-primary whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Video Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
