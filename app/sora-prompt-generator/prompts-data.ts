export interface PromptTemplate {
  id: string
  category: string
  name: string
  template: string
  description: string
  example: string
}

export const promptCategories = [
  { id: 'all', name: 'All Categories' },
  { id: 'cinematic', name: 'Cinematic Scenes' },
  { id: 'nature', name: 'Nature & Landscapes' },
  { id: 'urban', name: 'Urban & City' },
  { id: 'abstract', name: 'Abstract & Artistic' },
  { id: 'character', name: 'Character & Portrait' },
  { id: 'product', name: 'Product Showcase' },
  { id: 'story', name: 'Storytelling' },
]

export const promptTemplates: PromptTemplate[] = [
  // Cinematic Scenes
  {
    id: 'cinematic-1',
    category: 'cinematic',
    name: 'Epic Drone Shot',
    template: 'A sweeping aerial drone shot over {location}, golden hour lighting, cinematic color grading, 8K resolution, professional cinematography, {mood} atmosphere, lens flare, dynamic camera movement',
    description: 'Perfect for breathtaking landscape reveals',
    example: 'A sweeping aerial drone shot over a misty mountain range, golden hour lighting, cinematic color grading, 8K resolution, professional cinematography, epic atmosphere, lens flare, dynamic camera movement',
  },
  {
    id: 'cinematic-2',
    category: 'cinematic',
    name: 'Intense Close-Up',
    template: 'Extreme close-up of {subject}, shallow depth of field, dramatic side lighting, {emotion} expression, film grain texture, anamorphic lens characteristics, shallow focus, cinematic',
    description: 'Emotional character moments',
    example: 'Extreme close-up of a weathered sailor, shallow depth of field, dramatic side lighting, determined expression, film grain texture, anamorphic lens characteristics, shallow focus, cinematic',
  },
  {
    id: 'cinematic-3',
    category: 'cinematic',
    name: 'Action Sequence',
    template: 'Fast-paced action scene featuring {subject}, slow motion at 120fps, dynamic camera angles, motion blur, {setting}, high energy, professional stunt choreography, cinematic',
    description: 'High-energy action content',
    example: 'Fast-paced action scene featuring a parkour runner, slow motion at 120fps, dynamic camera angles, motion blur, urban rooftop setting, high energy, professional stunt choreography, cinematic',
  },
  
  // Nature & Landscapes
  {
    id: 'nature-1',
    category: 'nature',
    name: 'Serene Landscape',
    template: 'Breathtaking {landscape_type} at {time_of_day}, {weather_condition}, mirror-like reflections, vibrant colors, peaceful atmosphere, nature documentary style, 4K quality',
    description: 'Calming nature content',
    example: 'Breathtaking alpine lake at sunrise, light fog, mirror-like reflections, vibrant colors, peaceful atmosphere, nature documentary style, 4K quality',
  },
  {
    id: 'nature-2',
    category: 'nature',
    name: 'Wildlife Moment',
    template: 'Intimate wildlife shot of {animal} in its natural habitat, {behavior}, National Geographic style, telephoto lens compression, golden hour lighting, sharp focus on eyes',
    description: 'Stunning wildlife footage',
    example: 'Intimate wildlife shot of a Bengal tiger in its natural habitat, stalking prey, National Geographic style, telephoto lens compression, golden hour lighting, sharp focus on eyes',
  },
  {
    id: 'nature-3',
    category: 'nature',
    name: 'Time-Lapse Sky',
    template: 'Stunning time-lapse of {sky_phenomenon}, star trails, smooth motion, 4K resolution, astrophotography style, {location}, vibrant colors transitioning through night',
    description: 'Mesmerizing sky time-lapses',
    example: 'Stunning time-lapse of the Milky Way, star trails, smooth motion, 4K resolution, astrophotography style, desert landscape, vibrant colors transitioning through night',
  },
  
  // Urban & City
  {
    id: 'urban-1',
    category: 'urban',
    name: 'Neon City Night',
    template: 'Cyberpunk cityscape at night, neon lights reflecting on wet streets, {city_type}, fog atmosphere, blade runner aesthetic, cinematic color grading, 8K, moody lighting',
    description: 'Futuristic urban vibes',
    example: 'Cyberpunk cityscape at night, neon lights reflecting on wet streets, Tokyo-inspired, fog atmosphere, blade runner aesthetic, cinematic color grading, 8K, moody lighting',
  },
  {
    id: 'urban-2',
    category: 'urban',
    name: 'Street Life',
    template: 'Candid street photography style video of {subject} in {city}, documentary style, natural lighting, authentic moments, {time_of_day}, urban culture',
    description: 'Authentic street moments',
    example: 'Candid street photography style video of a street musician in New York, documentary style, natural lighting, authentic moments, late afternoon, urban culture',
  },
  {
    id: 'urban-3',
    category: 'urban',
    name: 'Architectural Flow',
    template: 'Smooth architectural showcase of {building_type}, camera movement along facade, geometric patterns, {lighting_condition}, modern design aesthetic, professional real estate style',
    description: 'Stunning architecture shots',
    example: 'Smooth architectural showcase of a modern glass skyscraper, camera movement along facade, geometric patterns, blue hour lighting, modern design aesthetic, professional real estate style',
  },
  
  // Abstract & Artistic
  {
    id: 'abstract-1',
    category: 'abstract',
    name: 'Fluid Dynamics',
    template: 'Mesmerizing macro shot of {liquid} in motion, slow motion, vibrant {color} hues, abstract patterns forming, high-speed camera, artistic, fluid dynamics visualization',
    description: 'Hypnotic liquid motion',
    example: 'Mesmerizing macro shot of ink in water in motion, slow motion, vibrant purple and blue hues, abstract patterns forming, high-speed camera, artistic, fluid dynamics visualization',
  },
  {
    id: 'abstract-2',
    category: 'abstract',
    name: 'Light Painting',
    template: 'Creative light painting with {light_source}, long exposure effect, {color_scheme}, abstract trails, dark background, artistic photography style, mesmerizing patterns',
    description: 'Creative light art',
    example: 'Creative light painting with LED strips, long exposure effect, rainbow colors, abstract trails, dark background, artistic photography style, mesmerizing patterns',
  },
  
  // Character & Portrait
  {
    id: 'character-1',
    category: 'character',
    name: 'Fashion Portrait',
    template: 'High-fashion portrait of {subject}, {style} aesthetic, dramatic studio lighting, haute couture, editorial style, {color_palette}, professional fashion photography',
    description: 'Fashion-forward portraits',
    example: 'High-fashion portrait of a model, avant-garde aesthetic, dramatic studio lighting, haute couture, editorial style, monochromatic with gold accents, professional fashion photography',
  },
  {
    id: 'character-2',
    category: 'character',
    name: 'Emotional Story',
    template: 'Cinematic portrait telling a story of {emotion}, {subject}, environmental portrait style, natural window light, shallow depth of field, documentary feel, authentic',
    description: 'Story-driven portraits',
    example: 'Cinematic portrait telling a story of hope, elderly craftsman in workshop, environmental portrait style, natural window light, shallow depth of field, documentary feel, authentic',
  },
  
  // Product Showcase
  {
    id: 'product-1',
    category: 'product',
    name: 'Luxury Product',
    template: 'Premium product showcase of {product}, rotating on platform, studio lighting with soft shadows, {material} texture detail, commercial photography style, 4K, aspirational',
    description: 'High-end product videos',
    example: 'Premium product showcase of a luxury watch, rotating on platform, studio lighting with soft shadows, brushed metal texture detail, commercial photography style, 4K, aspirational',
  },
  {
    id: 'product-2',
    category: 'product',
    name: 'Tech Unboxing',
    template: 'Satisfying unboxing experience of {tech_product}, ASMR style audio, clean aesthetic, overhead camera angle, pristine condition, {color_scheme}, modern tech review style',
    description: 'Satisfying tech content',
    example: 'Satisfying unboxing experience of the latest smartphone, ASMR style audio, clean aesthetic, overhead camera angle, pristine condition, white and silver, modern tech review style',
  },
  
  // Storytelling
  {
    id: 'story-1',
    category: 'story',
    name: 'Journey Montage',
    template: 'Inspiring travel montage featuring {destination}, diverse shots sequence, uplifting music visualization, golden hour transitions, adventure spirit, wanderlust aesthetic, cinematic',
    description: 'Travel inspiration videos',
    example: 'Inspiring travel montage featuring Iceland, diverse shots sequence, uplifting music visualization, golden hour transitions, adventure spirit, wanderlust aesthetic, cinematic',
  },
  {
    id: 'story-2',
    category: 'story',
    name: 'Transformation',
    template: 'Before and after transformation of {subject}, split screen effect, dramatic lighting change, {transformation_type}, inspirational, time progression, reveal moment',
    description: 'Transformation stories',
    example: 'Before and after transformation of a room renovation, split screen effect, dramatic lighting change, interior design makeover, inspirational, time progression, reveal moment',
  },
]

export const tiktokOptimizations = [
  { id: 'hook', name: 'Strong Hook', description: 'Start with attention-grabbing moment' },
  { id: 'pacing', name: 'Fast Pacing', description: 'Quick cuts to maintain engagement' },
  { id: 'trending', name: 'Trending Audio', description: 'Sync with popular sounds' },
  { id: 'text', name: 'Text Overlay', description: 'Add captions for accessibility' },
  { id: 'vertical', name: '9:16 Format', description: 'Optimized for mobile viewing' },
  { id: 'loop', name: 'Seamless Loop', description: 'Perfect loop for repeat views' },
]

export const styleModifiers = [
  '8K resolution', 'cinematic', 'hyper-realistic', 'professional photography',
  'film grain', 'anamorphic lens', 'shallow depth of field', 'golden hour',
  'blue hour', 'neon lighting', 'natural lighting', 'studio lighting',
  'documentary style', 'music video style', 'commercial style', 'vlog style',
  'slow motion', 'time-lapse', 'hyperlapse', 'drone footage',
  'handheld', 'gimbal smooth', 'static tripod', 'dynamic movement',
]

export function generatePrompt(
  template: PromptTemplate,
  values: Record<string, string>,
  selectedModifiers: string[]
): string {
  let prompt = template.template
  
  // Replace template variables
  Object.entries(values).forEach(([key, value]) => {
    prompt = prompt.replace(`{${key}}`, value || `{${key}}`)
  })
  
  // Add style modifiers
  if (selectedModifiers.length > 0) {
    prompt += ', ' + selectedModifiers.join(', ')
  }
  
  return prompt
}
