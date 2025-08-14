// API роут для генерации изображений через OpenAI
// Для Vercel Serverless Functions

export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, style, size = '1024x1024', quality = 'standard' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // ========== REAL OPENAI GENERATION ==========
    
    const { OpenAI } = await import('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Улучшенный промпт для fashion дизайна
    const enhancedPrompt = `${prompt}. ${style ? `Style: ${style}.` : ''} Professional fashion website design, luxury aesthetic, clean minimalist layout, high-end fashion brand quality, sophisticated typography, premium materials, elegant composition`;
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: size,
      quality: quality,
      n: 1,
    });
    
    res.status(200).json({
      success: true,
      data: {
        url: response.data[0].url,
        prompt: enhancedPrompt,
        style: style,
        created: response.created
      }
    });

    // ========== FALLBACK TO MOCK MODE IF API FAILS ==========

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback to mock mode if OpenAI fails
    console.log('Falling back to mock mode...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockImageUrl = `https://picsum.photos/1024/1024?random=${Date.now()}`;
    
    res.status(200).json({
      success: true,
      data: {
        url: mockImageUrl,
        prompt: prompt,
        style: style,
        created: Math.floor(Date.now() / 1000),
        fallback: true,
        error: 'OpenAI API unavailable, using placeholder image'
      }
    });
  }
}
