export interface PricingTier {
  model: string
  inputPrice: number
  outputPrice: number
  contextWindow: number
  description: string
}

export interface UsageEstimate {
  dailyRequests: number
  avgInputTokens: number
  avgOutputTokens: number
}

export const deepseekModels: PricingTier[] = [
  {
    model: 'DeepSeek-V4',
    inputPrice: 0.50,
    outputPrice: 2.00,
    contextWindow: 128000,
    description: 'Latest flagship model with superior reasoning and coding capabilities',
  },
  {
    model: 'DeepSeek-V4 (256K)',
    inputPrice: 0.80,
    outputPrice: 3.00,
    contextWindow: 256000,
    description: 'Extended context version for enterprise-scale applications',
  },
  {
    model: 'DeepSeek-V3',
    inputPrice: 0.07,
    outputPrice: 1.10,
    contextWindow: 64000,
    description: 'General purpose model, excellent for most coding tasks',
  },
  {
    model: 'DeepSeek-V3 (128K)',
    inputPrice: 0.14,
    outputPrice: 2.20,
    contextWindow: 128000,
    description: 'Extended context version for large codebases',
  },
  {
    model: 'DeepSeek-Coder-V2',
    inputPrice: 0.14,
    outputPrice: 0.28,
    contextWindow: 128000,
    description: 'Specialized coding model, best for code generation',
  },
  {
    model: 'DeepSeek-R1',
    inputPrice: 0.55,
    outputPrice: 2.19,
    contextWindow: 64000,
    description: 'Reasoning model for complex problem solving',
  },
  {
    model: 'DeepSeek-R1 (API Discount)',
    inputPrice: 0.07,
    outputPrice: 0.28,
    contextWindow: 64000,
    description: 'Discounted pricing for high-volume API users',
  },
]

export const tokenEstimates = {
  // Average tokens per code-related task
  codeReview: { input: 2000, output: 500, description: 'Code review request' },
  functionGeneration: { input: 300, output: 800, description: 'Generate a function' },
  bugFix: { input: 1500, output: 600, description: 'Debug and fix code' },
  documentation: { input: 1000, output: 1500, description: 'Generate documentation' },
  refactoring: { input: 2000, output: 2000, description: 'Refactor codebase' },
  testGeneration: { input: 800, output: 1200, description: 'Generate unit tests' },
  explanation: { input: 500, output: 1000, description: 'Explain code' },
  completion: { input: 200, output: 300, description: 'Code completion' },
}

export const comparisonModels = [
  { name: 'GPT-4', inputPrice: 2.50, outputPrice: 10.00 },
  { name: 'GPT-4o', inputPrice: 2.50, outputPrice: 10.00 },
  { name: 'GPT-4o-mini', inputPrice: 0.15, outputPrice: 0.60 },
  { name: 'Claude 3.5 Sonnet', inputPrice: 3.00, outputPrice: 15.00 },
  { name: 'Claude 3.5 Haiku', inputPrice: 0.25, outputPrice: 1.25 },
  { name: 'Gemini 1.5 Pro', inputPrice: 1.25, outputPrice: 5.00 },
  { name: 'Gemini 1.5 Flash', inputPrice: 0.075, outputPrice: 0.30 },
]

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  inputPrice: number,
  outputPrice: number
): number {
  // Prices are per 1M tokens
  const inputCost = (inputTokens / 1000000) * inputPrice
  const outputCost = (outputTokens / 1000000) * outputPrice
  return inputCost + outputCost
}

export function calculateMonthlyCost(
  dailyRequests: number,
  avgInputTokens: number,
  avgOutputTokens: number,
  inputPrice: number,
  outputPrice: number
): {
  daily: number
  monthly: number
  yearly: number
  inputTokensMonthly: number
  outputTokensMonthly: number
} {
  const dailyInputTokens = dailyRequests * avgInputTokens
  const dailyOutputTokens = dailyRequests * avgOutputTokens
  
  const daily = calculateCost(dailyInputTokens, dailyOutputTokens, inputPrice, outputPrice)
  const monthly = daily * 30
  const yearly = daily * 365
  
  return {
    daily,
    monthly,
    yearly,
    inputTokensMonthly: dailyInputTokens * 30,
    outputTokensMonthly: dailyOutputTokens * 30,
  }
}

export function formatCurrency(amount: number): string {
  if (amount < 0.01) {
    return `$${amount.toFixed(4)}`
  }
  if (amount < 1) {
    return `$${amount.toFixed(3)}`
  }
  if (amount < 1000) {
    return `$${amount.toFixed(2)}`
  }
  return `$${amount.toFixed(0)}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}
