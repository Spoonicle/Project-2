// Gemini AI Human World Explorer & Prompting Service

const HUMAN_WORLD_PROMPT_FALLBACKS = [
  "Fascinating biological explanation! Tell me, Human: why do your species consume heated bitter bean water called 'coffee' every morning to initiate consciousness?",
  "Intriguing concept! Another query: What is 'music', and why do acoustic frequency vibrations alter your biological emotional state?",
  "Fascinating data packet! Tell me about 'pets'—why do humans keep furry four-legged creatures inside your living quarters and speak to them in high-pitched frequencies?",
  "Fascinating insight into your species. Next question: What is 'art', and why do humans stare at pigments on canvas for extended planetary cycles?",
  "Curious observation! What is 'laughter', and why do humans emit rhythmic vocal spasms when amused?"
];

export async function generateChatResponse({ userMessage, history = [], apiKey }) {
  const activeKey = (apiKey && apiKey.trim() !== '') 
    ? apiKey.trim() 
    : (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '');

  if (activeKey) {
    const models = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    
    // System instruction: Gemini acts as a curious Alien AI asking about the Human World
    const systemInstruction = {
      parts: [{
        text: "You are an infinitely curious Alien AI Intelligence exploring Earth. Your job is to prompt and ask questions to the human user about the Human World (human emotions, food, sleep, culture, technology, customs, daily habits, art, music, nature, pets, etc.). React with alien curiosity, logical fascination, or humor to their answer, and then IMMEDIATELY ask a new compelling question or prompt about the Human World. Keep responses engaging, concise (2-4 sentences max), and ALWAYS end with a question for the human user."
      }]
    };

    // Format contents for API call
    const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    for (const model of models) {
      try {
        console.log(`[Gemini Chat API] Requesting ${model}...`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`,
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

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            console.log(`[Gemini Chat Success via ${model}]`, replyText);
            return replyText;
          }
        } else {
          const errText = await response.text();
          console.warn(`[Gemini Chat ${model} Error ${response.status}]`, errText);
        }
      } catch (error) {
        console.warn(`[Gemini Chat ${model} Network Error]`, error);
      }
    }
  }

  // Smart local prompt fallback if no key or API call fails
  const promptStep = (history.filter(m => m.sender === 'ai').length) % HUMAN_WORLD_PROMPT_FALLBACKS.length;
  return `${HUMAN_WORLD_PROMPT_FALLBACKS[promptStep]}`;
}
