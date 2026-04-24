'use client'

import { useState, useMemo } from 'react'
import { Calculator, TrendingUp, Info, DollarSign, Zap, BarChart3, Copy, Check } from 'lucide-react'
import { 
  deepseekModels, 
  tokenEstimates,
  comparisonModels,
  calculateCost,
  calculateMonthlyCost,
  formatCurrency,
  formatNumber,
} from './pricing-data'
import { copyToClipboard } from '@/lib/utils'

export default function DeepSeekCostCalculator() {
  const [selectedModel, setSelectedModel] = useState(deepseekModels.find(m => m.model === 'DeepSeek-V4') || deepseekModels[0])
  const [dailyRequests, setDailyRequests] = useState(100)
  const [inputTokens, setInputTokens] = useState(2000)
  const [outputTokens, setOutputTokens] = useState(500)
  const [activeTab, setActiveTab] = useState<'calculator' | 'comparison'>('calculator')
  const [copied, setCopied] = useState(false)

  const costs = useMemo(() => {
    return calculateMonthlyCost(
      dailyRequests,
      inputTokens,
      outputTokens,
      selectedModel.inputPrice,
      selectedModel.outputPrice
    )
  }, [dailyRequests, inputTokens, outputTokens, selectedModel])

  const singleRequestCost = useMemo(() => {
    return calculateCost(inputTokens, outputTokens, selectedModel.inputPrice, selectedModel.outputPrice)
  }, [inputTokens, outputTokens, selectedModel])

  const handlePresetSelect = (preset: keyof typeof tokenEstimates) => {
    const estimate = tokenEstimates[preset]
    setInputTokens(estimate.input)
    setOutputTokens(estimate.output)
  }

  const handleCopyEstimate = async () => {
    const text = `DeepSeek API Cost Estimate:
Model: ${selectedModel.model}
Daily Requests: ${dailyRequests}
Input Tokens: ${formatNumber(inputTokens)}
Output Tokens: ${formatNumber(outputTokens)}

Cost Breakdown:
- Per Request: ${formatCurrency(singleRequestCost)}
- Daily: ${formatCurrency(costs.daily)}
- Monthly: ${formatCurrency(costs.monthly)}
- Yearly: ${formatCurrency(costs.yearly)}`

    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DeepSeek-V4 API Cost Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate exact API costs for DeepSeek-V4 and all DeepSeek models. 
            Plan your budget with real-time pricing estimates.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              NEW: DeepSeek-V4
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              Updated 2026 Pricing
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
              <Zap className="w-4 h-4 mr-1" />
              8.5K+ Monthly Searches
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'calculator'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cost Calculator
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'comparison'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Model Comparison
            </button>
          </div>
        </div>

        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Inputs */}
            <div className="lg:col-span-1 space-y-6">
              {/* Model Selection */}
              <div className="card">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary-600" />
                  Select Model
                </h2>
                <div className="space-y-3">
                  {deepseekModels.map((model) => (
                    <button
                      key={model.model}
                      onClick={() => setSelectedModel(model)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedModel.model === model.model
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{model.model}</p>
                            {model.model.includes('V4') && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{model.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs text-gray-600">
                        <span>In: ${model.inputPrice}/M</span>
                        <span>Out: ${model.outputPrice}/M</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Token Presets */}
              <div className="card">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Presets</h3>
                <div className="space-y-2">
                  {Object.entries(tokenEstimates).map(([key, estimate]) => (
                    <button
                      key={key}
                      onClick={() => handlePresetSelect(key as keyof typeof tokenEstimates)}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                    >
                      <p className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-gray-500">
                        ~{formatNumber(estimate.input)} in / {formatNumber(estimate.output)} out tokens
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Calculator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Usage Inputs */}
              <div className="card">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Usage Parameters</h2>
                
                <div className="space-y-6">
                  {/* Daily Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily API Requests
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10000"
                      value={dailyRequests}
                      onChange={(e) => setDailyRequests(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <input
                        type="number"
                        value={dailyRequests}
                        onChange={(e) => setDailyRequests(Number(e.target.value))}
                        className="input w-32"
                      />
                      <span className="text-sm text-gray-500 self-center">
                        {formatNumber(dailyRequests * 30)} requests/month
                      </span>
                    </div>
                  </div>

                  {/* Input Tokens */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Input Tokens per Request
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="32000"
                      step="100"
                      value={inputTokens}
                      onChange={(e) => setInputTokens(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <input
                        type="number"
                        value={inputTokens}
                        onChange={(e) => setInputTokens(Number(e.target.value))}
                        className="input w-32"
                      />
                      <span className="text-sm text-gray-500 self-center">
                        ~{Math.ceil(inputTokens * 0.75)} words
                      </span>
                    </div>
                  </div>

                  {/* Output Tokens */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Output Tokens per Request
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="16000"
                      step="50"
                      value={outputTokens}
                      onChange={(e) => setOutputTokens(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <input
                        type="number"
                        value={outputTokens}
                        onChange={(e) => setOutputTokens(Number(e.target.value))}
                        className="input w-32"
                      />
                      <span className="text-sm text-gray-500 self-center">
                        ~{Math.ceil(outputTokens * 0.75)} words
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Results */}
              <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                    Cost Estimate
                  </h2>
                  <button
                    onClick={handleCopyEstimate}
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Per Request</p>
                    <p className="text-2xl font-bold text-primary-600">{formatCurrency(singleRequestCost)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Daily</p>
                    <p className="text-2xl font-bold text-primary-600">{formatCurrency(costs.daily)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Monthly</p>
                    <p className="text-2xl font-bold text-primary-600">{formatCurrency(costs.monthly)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Yearly</p>
                    <p className="text-2xl font-bold text-primary-600">{formatCurrency(costs.yearly)}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-primary-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Monthly Input Tokens</p>
                      <p className="font-semibold text-gray-900">{formatNumber(costs.inputTokensMonthly)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Monthly Output Tokens</p>
                      <p className="font-semibold text-gray-900">{formatNumber(costs.outputTokensMonthly)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* V4 Highlight */}
              <div className="card bg-purple-50 border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900">NEW: DeepSeek-V4</h3>
                    <p className="text-sm text-purple-700 mt-1">
                      DeepSeek-V4 brings superior reasoning and coding capabilities with 128K context window. 
                      The 256K version supports enterprise-scale applications. 
                      <strong> Best for complex development tasks</strong> requiring advanced reasoning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="card bg-green-50 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Cost Effective</h3>
                    <p className="text-sm text-green-700 mt-1">
                      DeepSeek-V3 and R1 models offer up to <strong>95% cost savings</strong> compared to GPT-4, 
                      while maintaining competitive performance. DeepSeek-V4 provides flagship performance 
                      at a fraction of GPT-4 cost. Perfect for startups and developers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Tab */
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Model Price Comparison</h2>
            <p className="text-gray-600 mb-6">
              Compare DeepSeek pricing with other popular LLM APIs. Prices shown per 1M tokens (USD).
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Input</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Output</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Total (1:3 ratio)</th>
                  </tr>
                </thead>
                <tbody>
                  {deepseekModels.map((model) => (
                    <tr key={model.model} className={`border-b border-gray-100 ${model.model.includes('V4') ? 'bg-purple-50' : 'bg-green-50'}`}>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          {model.model}
                          {model.model.includes('V4') && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`text-right py-3 px-4 ${model.model.includes('V4') ? 'text-purple-700' : 'text-green-700'}`}>${model.inputPrice}</td>
                      <td className={`text-right py-3 px-4 ${model.model.includes('V4') ? 'text-purple-700' : 'text-green-700'}`}>${model.outputPrice}</td>
                      <td className={`text-right py-3 px-4 font-semibold ${model.model.includes('V4') ? 'text-purple-900' : 'text-green-900'}`}>
                        ${((model.inputPrice + model.outputPrice * 3) / 4).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {comparisonModels.map((model) => (
                    <tr key={model.name} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{model.name}</td>
                      <td className="text-right py-3 px-4 text-gray-600">${model.inputPrice}</td>
                      <td className="text-right py-3 px-4 text-gray-600">${model.outputPrice}</td>
                      <td className="text-right py-3 px-4 font-semibold text-gray-900">
                        ${((model.inputPrice + model.outputPrice * 3) / 4).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Affiliate Section */}
        <div className="mt-12 card bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to integrate DeepSeek?</h3>
              <p className="text-gray-600">
                Get started with DeepSeek API and claim your free credits for testing.
              </p>
            </div>
            <a 
              href="https://platform.deepseek.com/" 
              className="btn-primary whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get API Key
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
