import { useState } from 'react';

export default function TestGeneration() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          style: 'luxury fashion',
          size: '1024x1024',
          quality: 'high'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Generation failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FEFEFE',
      padding: '40px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '300',
          color: '#000000',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          🎨 Test Image Generation
        </h1>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <div style={{
            marginBottom: '20px'
          }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              color: '#333333',
              marginBottom: '8px'
            }}>
              Prompt:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              style={{
                width: '100%',
                height: '120px',
                padding: '12px',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            onClick={generateImage}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#CCCCCC' : '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 24px',
              fontSize: '14px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FFE6E6',
            color: '#CC0000',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #FFCCCC'
          }}>
            ❌ Error: {error}
          </div>
        )}

        {result && (
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '300',
              color: '#000000',
              marginBottom: '20px'
            }}>
              ✨ Generated Image:
            </h3>

            {result.fallback && (
              <div style={{
                backgroundColor: '#FFF3CD',
                color: '#856404',
                padding: '12px',
                borderRadius: '4px',
                marginBottom: '20px',
                border: '1px solid #FFEAA7'
              }}>
                ⚠️ Using placeholder image (OpenAI API not configured)
              </div>
            )}

            <img
              src={result.url}
              alt="Generated"
              style={{
                width: '100%',
                maxWidth: '512px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                marginBottom: '20px'
              }}
            />

            <div style={{
              fontSize: '14px',
              color: '#666666',
              lineHeight: '1.6'
            }}>
              <p><strong>Prompt:</strong> {result.prompt}</p>
              <p><strong>Style:</strong> {result.style}</p>
              <p><strong>Created:</strong> {new Date(result.created * 1000).toLocaleString()}</p>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#F8F9FA',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#666666'
        }}>
          <h4 style={{ color: '#333333', marginBottom: '16px' }}>🔧 OpenRouter Setup:</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Set your OpenRouter API key: <code>export OPENROUTER_API_KEY="sk-or-v1-..."</code></li>
            <li>Get your key from <a href="https://openrouter.ai/keys" target="_blank" style={{color: '#007bff'}}>openrouter.ai/keys</a></li>
            <li>Add credits to your OpenRouter account</li>
            <li>Model used: <code>openai/dall-e-3</code></li>
            <li>For Vercel: Add <code>OPENROUTER_API_KEY</code> in Environment Variables</li>
          </ul>
          
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#E3F2FD',
            borderRadius: '4px',
            border: '1px solid #BBDEFB'
          }}>
            <strong>💡 Преимущества OpenRouter:</strong>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>Доступ к множеству AI моделей</li>
              <li>Конкурентные цены</li>
              <li>Простая интеграция</li>
              <li>Надежная работа</li>
            </ul>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <a
            href="/"
            style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            ← Back to Calculator
          </a>
        </div>
      </div>
    </div>
  );
}
