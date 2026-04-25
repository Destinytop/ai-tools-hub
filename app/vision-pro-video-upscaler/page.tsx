'use client'

import { useState } from 'react'
import { Video, Monitor, Sparkles, TrendingUp, ExternalLink, Check, Info, ArrowRight, Star, Zap, Eye } from 'lucide-react'

interface UpscaleOption {
  id: string
  name: string
  description: string
  targetResolution: string
  features: string[]
  affiliateUrl: string
  price: string
  rating: number
}

const upscaleOptions: UpscaleOption[] = [
  {
    id: 'topaz',
    name: 'Topaz Video AI',
    description: 'Professional-grade video enhancement with AI-powered upscaling, perfect for Vision Pro spatial video preparation.',
    targetResolution: 'Up to 8K',
    features: [
      'AI upscaling up to 8K resolution',
      'Frame interpolation for smooth playback',
      'Stabilization and enhancement',
      'Batch processing support',
      'Spatial video optimization presets'
    ],
    affiliateUrl: 'https://www.topazlabs.com/video-ai',
    price: '$299 (One-time)',
    rating: 4.9
  },
  {
    id: 'avclabs',
    name: 'AVCLabs Video Enhancer',
    description: 'AI video enhancer with excellent quality restoration, great for old footage conversion.',
    targetResolution: 'Up to 4K',
    features: [
      'AI-powered upscaling',
      'Face enhancement technology',
      'Colorization for B&W videos',
      'Noise reduction',
      'GPU acceleration support'
    ],
    affiliateUrl: 'https://www.avclabs.com/video-enhancer.html',
    price: '$39.95/month',
    rating: 4.6
  },
  {
    id: 'hitpaw',
    name: 'HitPaw Video Enhancer',
    description: 'User-friendly AI video upscaler with one-click enhancement for beginners.',
    targetResolution: 'Up to 8K',
    features: [
      'One-click AI enhancement',
      'Multiple AI models',
      'Animation video support',
      'Face model for portraits',
      'Preview before export'
    ],
    affiliateUrl: 'https://www.hitpaw.com/video-enhancer.html',
    price: '$42.99/month',
    rating: 4.5
  }
]

const visionProSpecs = [
  { label: 'Display Resolution', value: '3660×3200 per eye' },
  { label: 'Video Format', value: 'Spatial Video (MV-HEVC)' },
  { label: 'Recommended FPS', value: '90Hz / 100Hz' },
  { label: 'Field of View', value: 'Approximately 100°' },
]

const tips = [
  {
    title: 'Resolution Matters',
    content: 'For the best Vision Pro experience, aim for at least 4K source material. The higher the resolution, the more immersive the spatial video.'
  },
  {
    title: 'Frame Rate',
    content: 'Vision Pro supports 90Hz and 100Hz. Use AI frame interpolation to smooth out lower frame rate content.'
  },
  {
    title: 'Aspect Ratio',
    content: '16:9 content works best. Avoid ultra-wide or vertical videos for optimal spatial viewing.'
  },
  {
    title: 'Audio Quality',
    content: 'Spatial audio enhances immersion. Ensure your audio is high-quality and properly synced.'
  }
]

export default function VisionProVideoUpscaler() {
  const [selectedOption, setSelectedOption] = useState<UpscaleOption | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl mb-6">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Video Upscaler for Apple Vision Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your videos into stunning 4K/8K spatial content optimized for Apple Vision Pro. 
            Find the best AI upscaling tools for immersive viewing.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              High Value Traffic
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
              <Sparkles className="w-4 h-4 mr-1" />
              22K+ Monthly Searches
            </span>
          </div>
        </div>

        {/* Vision Pro Specs */}
        <div className="card mb-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Apple Vision Pro Specifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visionProSpecs.map((spec) => (
              <div key={spec.label} className="bg-white/10 rounded-lg p-3">
                <p className="text-gray-400 text-sm">{spec.label}</p>
                <p className="font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended AI Video Upscalers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upscaleOptions.map((option) => (
              <div
                key={option.id}
                className={`card h-full flex flex-col transition-all cursor-pointer ${
                  selectedOption?.id === option.id
                    ? 'ring-2 ring-purple-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{option.rating}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                    {option.targetResolution}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {option.description}
                </p>

                <div className="mb-4">
                  <p className="text-lg font-bold text-purple-600">{option.price}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {option.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={option.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Tool Details */}
        {selectedOption && (
          <div className="card mb-8 border-purple-200 bg-purple-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Why {selectedOption.name}?
                </h3>
                <p className="text-gray-600 mb-4">{selectedOption.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedOption.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={selectedOption.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 flex-shrink-0"
              >
                Get {selectedOption.name}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Tips for Vision Pro Video Optimization
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Guide */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended Workflow
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Source Selection', desc: 'Start with the highest quality source video available. Old SD videos can be upscaled but results vary.' },
              { step: 2, title: 'Pre-processing', desc: 'Remove noise and stabilize shaky footage before upscaling for best results.' },
              { step: 3, title: 'AI Upscaling', desc: 'Use Topaz Video AI or similar tools to upscale to 4K or 8K resolution.' },
              { step: 4, title: 'Frame Interpolation', desc: 'Increase frame rate to 60fps or higher for smooth Vision Pro playback.' },
              { step: 5, title: 'Format Conversion', desc: 'Convert to MV-HEVC format for spatial video compatibility with Vision Pro.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate CTA */}
        <div className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Transform Your Videos?
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get professional-grade AI upscaling with Topaz Video AI. 
              The industry standard for content creators preparing for spatial computing.
            </p>
            <a
              href="https://www.topazlabs.com/video-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Video className="w-5 h-5" />
              Try Topaz Video AI
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-purple-200 text-sm mt-4">
              Affiliate Link - We may earn a commission at no extra cost to you
            </p>
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
