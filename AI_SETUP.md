# 🤖 Настройка AI генерации изображений

## 📋 Что установлено:

1. **OpenAI SDK** - для работы с API генерации изображений
2. **API роут** `/api/generate-image.js` - серверная функция для Vercel
3. **Интеграция** в AI дизайнер - реальные вызовы вместо mock данных

## 🔑 Настройка OpenAI API:

### 1. Получите API ключ:
- Зайдите на https://platform.openai.com/api-keys
- Создайте новый API ключ
- Скопируйте его

### 2. Настройте переменные окружения:

Создайте файл `.env.local` в корне проекта:
```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Для Vercel деплоя:
- Зайдите в настройки проекта на Vercel
- Добавьте переменную окружения `OPENAI_API_KEY`

## 🚀 Как активировать реальную генерацию:

1. **Раскомментируйте код** в `/api/generate-image.js`:
```javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: `${prompt} in ${style} style`,
  size: size,
  quality: quality,
  n: 1,
});

res.status(200).json({
  success: true,
  data: {
    url: response.data[0].url,
    prompt: prompt,
    style: style,
    created: response.created
  }
});
```

2. **Закомментируйте mock код**:
```javascript
// const mockImageUrl = `https://picsum.photos/1024/1024?random=${Date.now()}`;
```

## 💰 Стоимость:

- **DALL-E 3**: ~$0.04 за изображение 1024x1024
- **DALL-E 3 HD**: ~$0.08 за изображение 1024x1024
- **DALL-E 2**: ~$0.02 за изображение 1024x1024

## 🛡️ Безопасность:

- API ключ хранится на сервере (Vercel)
- Клиент не имеет доступа к ключу
- Можно добавить rate limiting и аутентификацию

## 🧪 Тестирование:

Сейчас используется mock генерация с случайными изображениями для демонстрации функционала без затрат на API.
