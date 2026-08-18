const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static assets from project root
app.use(express.static(__dirname));

// Proxy endpoint for Gemini Chat API requests (prevents CORS issues if needed)
app.post('/api/chat', async (req, res) => {
  try {
    const { apiKey, model = 'gemini-1.5-flash', systemInstruction, contents } = req.body;
    const keyToUse = apiKey || process.env.GEMINI_API_KEY;

    if (!keyToUse) {
      return res.status(400).json({ error: 'No Gemini API key provided.' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction,
          contents,
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 300
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).send(errText);
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('[Server /api/chat Error]:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 DRAW & EVOLVE (ASCII BINARY TERMINAL SERVER)`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
