import Link from 'next/link'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  tags: string[]
  trending?: boolean
}

export default function ToolCard({ title, description, href, icon: Icon, tags, trending }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="tool-card h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          {trending && (
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
              Trending
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight className="w-5 h-5 text-primary-600" />
        </div>
      </div>
    </Link>
  )
}
