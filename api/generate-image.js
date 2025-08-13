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
    // ========== DEMO MODE (раскомментируйте для реальной генерации) ==========
    
    // import OpenAI from 'openai';
    // const openai = new OpenAI({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
    
    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: `${prompt} in ${style} style`,
    //   size: size,
    //   quality: quality,
    //   n: 1,
    // });
    
    // res.status(200).json({
    //   success: true,
    //   data: {
    //     url: response.data[0].url,
    //     prompt: prompt,
    //     style: style,
    //     created: response.created
    //   }
    // });

    // ========== MOCK MODE (для демо без затрат на API) ==========
    
    // Симуляция времени генерации
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockImageUrl = `https://picsum.photos/1024/1024?random=${Date.now()}`;
    
    res.status(200).json({
      success: true,
      data: {
        url: mockImageUrl,
        prompt: prompt,
        style: style,
        created: Math.floor(Date.now() / 1000)
      }
    });

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
}
