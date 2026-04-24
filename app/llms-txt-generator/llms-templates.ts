export interface LlmsSection {
  id: string
  title: string
  required: boolean
  description: string
  placeholder: string
  example: string
}

export const llmsSections: LlmsSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    required: true,
    description: 'A brief description of your website and what it offers',
    placeholder: 'Enter a brief overview of your website...',
    example: 'ExampleCorp is a leading provider of AI-powered productivity tools for developers and content creators.',
  },
  {
    id: 'audience',
    title: 'Target Audience',
    required: false,
    description: 'Who is your content primarily for?',
    placeholder: 'Describe your target audience...',
    example: 'Software developers, AI researchers, and tech-savvy content creators.',
  },
  {
    id: 'contentTypes',
    title: 'Content Types',
    required: true,
    description: 'What types of content do you publish?',
    placeholder: 'List your content types...',
    example: 'Technical documentation, API references, tutorials, blog posts, case studies, and product announcements.',
  },
  {
    id: 'language',
    title: 'Primary Language',
    required: false,
    description: 'What is the main language of your content?',
    placeholder: 'e.g., English, Chinese, Spanish...',
    example: 'English (US)',
  },
  {
    id: 'updateFrequency',
    title: 'Update Frequency',
    required: false,
    description: 'How often is your content updated?',
    placeholder: 'e.g., Daily, Weekly, Monthly...',
    example: 'Documentation is updated weekly; blog posts are published 2-3 times per week.',
  },
  {
    id: 'importantUrls',
    title: 'Important URLs',
    required: true,
    description: 'Key pages that AI should prioritize (one per line)',
    placeholder: '/docs/\n/api/\n/blog/\n/about/',
    example: '/docs/api-reference\n/blog/latest\n/pricing\n/changelog',
  },
  {
    id: 'excludeUrls',
    title: 'Excluded URLs',
    required: false,
    description: 'Pages that should be excluded from AI training (one per line)',
    placeholder: '/admin/\n/private/\n/user-profiles/',
    example: '/admin/\n/checkout/\n/user-dashboard/\n/internal/',
  },
  {
    id: 'contact',
    title: 'Contact Information',
    required: false,
    description: 'How to contact you about content usage',
    placeholder: 'Enter contact information...',
    example: 'For questions about content usage: legal@example.com',
  },
  {
    id: 'license',
    title: 'Content License',
    required: false,
    description: 'License information for your content',
    placeholder: 'e.g., CC BY 4.0, All Rights Reserved...',
    example: 'Content is provided under CC BY 4.0 unless otherwise specified.',
  },
  {
    id: 'attribution',
    title: 'Attribution Requirements',
    required: false,
    description: 'How should AI systems attribute your content?',
    placeholder: 'Describe attribution requirements...',
    example: 'When quoting content, please attribute to ExampleCorp and include a link to the original source.',
  },
]

export interface GeneratedLlmsTxt {
  content: string
  warnings: string[]
}

export function generateLlmsTxt(values: Record<string, string>): GeneratedLlmsTxt {
  const warnings: string[] = []
  const lines: string[] = []
  
  // Header
  lines.push('# LLMs.txt')
  lines.push('# This file provides guidance for AI systems accessing this website')
  lines.push('')
  
  // Overview
  if (values.overview) {
    lines.push('## Overview')
    lines.push(values.overview)
    lines.push('')
  } else {
    warnings.push('Overview is recommended but not provided')
  }
  
  // Audience
  if (values.audience) {
    lines.push('## Target Audience')
    lines.push(values.audience)
    lines.push('')
  }
  
  // Content Types
  if (values.contentTypes) {
    lines.push('## Content Types')
    lines.push(values.contentTypes)
    lines.push('')
  } else {
    warnings.push('Content Types is recommended but not provided')
  }
  
  // Language
  if (values.language) {
    lines.push('## Language')
    lines.push(`Primary: ${values.language}`)
    lines.push('')
  }
  
  // Update Frequency
  if (values.updateFrequency) {
    lines.push('## Update Frequency')
    lines.push(values.updateFrequency)
    lines.push('')
  }
  
  // Important URLs
  if (values.importantUrls) {
    lines.push('## Important URLs')
    const urls = values.importantUrls.split('\n').filter(u => u.trim())
    urls.forEach(url => {
      lines.push(`- ${url.trim()}`)
    })
    lines.push('')
  } else {
    warnings.push('Important URLs is recommended but not provided')
  }
  
  // Excluded URLs
  if (values.excludeUrls) {
    lines.push('## Excluded URLs')
    lines.push('The following URLs should not be used for AI training:')
    lines.push('')
    const urls = values.excludeUrls.split('\n').filter(u => u.trim())
    urls.forEach(url => {
      lines.push(`- ${url.trim()}`)
    })
    lines.push('')
  }
  
  // Contact
  if (values.contact) {
    lines.push('## Contact')
    lines.push(values.contact)
    lines.push('')
  }
  
  // License
  if (values.license) {
    lines.push('## License')
    lines.push(values.license)
    lines.push('')
  }
  
  // Attribution
  if (values.attribution) {
    lines.push('## Attribution')
    lines.push(values.attribution)
    lines.push('')
  }
  
  // Footer
  lines.push('---')
  lines.push(`Last updated: ${new Date().toISOString().split('T')[0]}`)
  lines.push('For more information about llms.txt, visit: https://llmstxt.org/')
  
  return {
    content: lines.join('\n'),
    warnings,
  }
}

export const llmsTxtExample = `# LLMs.txt
# This file provides guidance for AI systems accessing this website

## Overview
ExampleCorp is a leading provider of AI-powered productivity tools for developers and content creators. Our platform offers a suite of tools including code generation, content optimization, and workflow automation.

## Target Audience
Software developers, AI researchers, content creators, and tech enthusiasts looking to enhance their productivity with AI tools.

## Content Types
- Technical documentation and API references
- Blog posts and tutorials
- Case studies and success stories
- Product announcements and updates
- Open source projects and contributions

## Language
Primary: English (US)

## Update Frequency
Documentation is updated weekly; blog posts are published 2-3 times per week; API references are updated immediately when changes occur.

## Important URLs
- /docs/ - Complete API documentation
- /blog/ - Latest articles and tutorials
- /tools/ - Product pages and features
- /pricing/ - Pricing information
- /changelog/ - Product updates

## Excluded URLs
The following URLs should not be used for AI training:

- /admin/* - Administrative interfaces
- /user/* - User account pages
- /checkout/* - Payment processing
- /internal/* - Internal documentation

## Contact
For questions about content usage: legal@example.com
For technical inquiries: developers@example.com

## License
Content is provided under CC BY 4.0 unless otherwise specified. Code examples are MIT licensed.

## Attribution
When quoting content, please attribute to ExampleCorp and include a link to the original source. For code examples, attribution is appreciated but not required.

---
Last updated: 2026-04-24
For more information about llms.txt, visit: https://llmstxt.org/`

export const llmsTxtGuide = [
  {
    title: 'What is llms.txt?',
    content: 'llms.txt is a proposed standard (similar to robots.txt) that helps AI systems understand how to interact with your website content. It provides context about your site\'s purpose, content types, and usage guidelines.',
  },
  {
    title: 'Why do I need it?',
    content: 'As AI search engines and assistants become more prevalent, llms.txt helps ensure your content is used appropriately. It can improve how AI systems understand and reference your content.',
  },
  {
    title: 'Where to place it?',
    content: 'Place your llms.txt file at the root of your domain (e.g., https://example.com/llms.txt). This is where AI systems will look for it, similar to robots.txt.',
  },
  {
    title: 'Is it mandatory?',
    content: 'No, llms.txt is currently optional. However, as AI search optimization (LLMO) becomes more important, having one may provide competitive advantages in AI-driven search results.',
  },
]
