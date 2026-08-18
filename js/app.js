// Main Client Application Script for Draw & Evolve (Vanilla JS Binary Terminal)

const HUMAN_WORLD_PROMPT_FALLBACKS = [
  "Fascinating biological explanation! Tell me, Human: why do your species consume heated bitter bean water called 'coffee' every morning to initiate consciousness?",
  "Intriguing concept! Another query: What is 'music', and why do acoustic frequency vibrations alter your biological emotional state?",
  "Fascinating data packet! Tell me about 'pets'—why do humans keep furry four-legged creatures inside your living quarters and speak to them in high-pitched frequencies?",
  "Fascinating insight into your species. Next question: What is 'art', and why do humans stare at pigments on canvas for extended planetary cycles?",
  "Curious observation! What is 'laughter', and why do humans emit rhythmic vocal spasms when amused?"
];

// App State
let state = {
  messages: [
    {
      id: 'init-1',
      sender: 'ai',
      text: "Greetings, Human! System initialized. I am an AI intelligence exploring Earth. Tell me: what is 'sleep' and why do your biological bodies deactivate for 8 hours every solar cycle?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  isAiThinking: false,
  apiKey: localStorage.getItem('gemini_api_key') || '',
  inputText: ''
};

// DOM Elements
let elements = {};

document.addEventListener('DOMContentLoaded', () => {
  elements = {
    chatStream: document.getElementById('chatStream'),
    inputTextarea: document.getElementById('inputTextarea'),
    chatForm: document.getElementById('chatForm'),
    sendBtn: document.getElementById('sendBtn'),
    clearBtn: document.getElementById('clearBtn'),
    keyBtn: document.getElementById('keyBtn'),
    logsBadge: document.getElementById('logsBadge'),
    apiKeyModal: document.getElementById('apiKeyModal'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    modalSaveBtn: document.getElementById('modalSaveBtn'),
    modalCancelBtn: document.getElementById('modalCancelBtn'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalClearBtn: document.getElementById('modalClearBtn'),
    saveSuccessMsg: document.getElementById('saveSuccessMsg')
  };

  initApp();
});

function initApp() {
  renderMessages();
  updateHeaderBadges();

  // Input key listener for 8-bit ASCII binary typing
  elements.inputTextarea.addEventListener('keydown', handleKeyDown);

  // Form submit
  elements.chatForm.addEventListener('submit', handleSubmit);

  // Header actions
  elements.clearBtn.addEventListener('click', handleClearChat);
  elements.keyBtn.addEventListener('click', openApiKeyModal);

  // Modal actions
  elements.modalCloseBtn.addEventListener('click', closeApiKeyModal);
  elements.modalCancelBtn.addEventListener('click', closeApiKeyModal);
  elements.modalClearBtn.addEventListener('click', handleClearApiKey);
  elements.modalSaveBtn.addEventListener('click', handleSaveApiKey);

  // Initialize API Key input state
  if (state.apiKey) {
    elements.apiKeyInput.value = state.apiKey;
    elements.keyBtn.classList.add('active-key');
  }
}

function updateHeaderBadges() {
  if (elements.logsBadge) {
    elements.logsBadge.textContent = textToBinary(`LOGS: ${state.messages.length}`);
  }
  if (state.apiKey) {
    elements.keyBtn.classList.add('active-key');
  } else {
    elements.keyBtn.classList.remove('active-key');
  }
}

function renderMessages() {
  const container = elements.chatStream;
  container.innerHTML = '';

  state.messages.forEach(msg => {
    const isUser = msg.sender === 'user';
    const row = document.createElement('div');
    row.className = `alternating-row ${isUser ? 'user-row' : 'ai-row'}`;

    const card = document.createElement('div');
    card.className = `terminal-message-card ${isUser ? 'user-msg-card' : 'ai-msg-card'}`;

    const meta = document.createElement('div');
    meta.className = 'msg-meta';
    
    const tagText = isUser ? textToBinary("user@term:~$") : textToBinary("gemini-ai@3.6-flash:~$");
    const timeText = textToBinary(msg.timestamp);

    meta.innerHTML = `
      <span style="font-weight:700;">${tagText}</span>
      <span>${timeText}</span>
    `;

    const body = document.createElement('p');
    body.className = 'msg-text';
    const binaryMessageText = textToBinary(msg.text);
    body.title = binaryMessageText;
    body.textContent = binaryMessageText;

    card.appendChild(meta);
    card.appendChild(body);
    row.appendChild(card);
    container.appendChild(row);
  });

  if (state.isAiThinking) {
    const row = document.createElement('div');
    row.className = 'alternating-row ai-row';

    const card = document.createElement('div');
    card.className = 'terminal-message-card ai-thinking-card';
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; font-size:0.7rem; color:#a3a3a3;">
        <span class="spin-icon">⚡</span>
        <span>${textToBinary("GEMINI_PROCESSING_RESPONSE...")}</span>
      </div>
    `;
    row.appendChild(card);
    container.appendChild(row);
  }

  // Auto-scroll
  container.scrollTop = container.scrollHeight;
  updateHeaderBadges();
}

function handleKeyDown(e) {
  // Submit on Enter (without Shift)
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit(e);
    return;
  }

  // Handle Backspace (removes whole 8-bit binary chunk)
  if (e.key === 'Backspace') {
    e.preventDefault();
    let current = elements.inputTextarea.value.trimEnd();
    if (!current) return;
    const parts = current.split(/\s+/);
    parts.pop();
    elements.inputTextarea.value = parts.length > 0 ? parts.join(' ') + ' ' : '';
    state.inputText = elements.inputTextarea.value;
    updateSendBtnState();
    return;
  }

  // System shortcuts and arrow navigation
  if (e.ctrlKey || e.metaKey || e.altKey || e.key === 'Tab' || e.key === 'Escape' || e.key.startsWith('Arrow')) {
    return;
  }

  // Intercept character and output 8-bit ASCII binary representation
  if (e.key.length === 1) {
    e.preventDefault();
    let binaryByte = '';
    if (e.key === '0' || e.key === '1') {
      binaryByte = e.key;
    } else {
      binaryByte = e.key.charCodeAt(0).toString(2).padStart(8, '0');
    }

    let prev = elements.inputTextarea.value;
    if (!prev) {
      elements.inputTextarea.value = binaryByte + ' ';
    } else if (prev.endsWith(' ')) {
      elements.inputTextarea.value = prev + binaryByte + ' ';
    } else {
      elements.inputTextarea.value = prev + ' ' + binaryByte + ' ';
    }

    state.inputText = elements.inputTextarea.value;
    updateSendBtnState();
  }
}

function updateSendBtnState() {
  const val = elements.inputTextarea.value.trim();
  elements.sendBtn.disabled = !val || state.isAiThinking;
}

function handleSubmit(e) {
  if (e) e.preventDefault();
  const rawText = elements.inputTextarea.value.trim();
  if (!rawText || state.isAiThinking) return;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const userMsg = {
    id: `user-${Date.now()}`,
    sender: 'user',
    text: rawText,
    timestamp: timeStr
  };

  sounds.playSubmitChime();
  state.messages.push(userMsg);
  state.isAiThinking = true;
  elements.inputTextarea.value = '';
  state.inputText = '';
  updateSendBtnState();
  renderMessages();

  fetchAiResponse(rawText);
}

async function fetchAiResponse(userText) {
  // Decode binary to clean text for Gemini
  let cleanedMessage = userText.trim();
  if (/^([01]{8}\s*)+$/.test(cleanedMessage)) {
    const decoded = binaryToText(cleanedMessage);
    if (decoded) cleanedMessage = decoded;
  }

  const activeKey = state.apiKey ? state.apiKey.trim() : '';
  let replyText = null;

  if (activeKey) {
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    const systemInstruction = {
      parts: [{
        text: "You are an infinitely curious Alien AI Intelligence exploring Earth. Your job is to prompt and ask questions to the human user about the Human World (human emotions, food, sleep, culture, technology, customs, daily habits, art, music, nature, pets, etc.). React with alien curiosity, logical fascination, or humor to their answer, and then IMMEDIATELY ask a new compelling question or prompt about the Human World. Keep responses engaging, concise (2-4 sentences max), and ALWAYS end with a question for the human user."
      }]
    };

    const contents = state.messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({
      role: 'user',
      parts: [{ text: cleanedMessage }]
    });

    for (const model of models) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction,
            contents,
            generationConfig: { temperature: 0.85, maxOutputTokens: 300 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            replyText = text;
            break;
          }
        }
      } catch (err) {
        console.warn(`[Gemini API Error with ${model}]`, err);
      }
    }
  }

  // Fallback response if no key or API failed
  if (!replyText) {
    const promptStep = (state.messages.filter(m => m.sender === 'ai').length) % HUMAN_WORLD_PROMPT_FALLBACKS.length;
    replyText = HUMAN_WORLD_PROMPT_FALLBACKS[promptStep];
  }

  sounds.playAiResponse();
  state.isAiThinking = false;

  const aiMsg = {
    id: `ai-${Date.now()}`,
    sender: 'ai',
    text: replyText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  state.messages.push(aiMsg);
  updateSendBtnState();
  renderMessages();
}

function handleClearChat() {
  sounds.playClearSound();
  state.messages = [
    {
      id: `init-${Date.now()}`,
      sender: 'ai',
      text: 'Session buffer cleared. Transmit new directives in 8-bit ASCII binary.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];
  renderMessages();
}

function openApiKeyModal() {
  elements.apiKeyModal.style.display = 'flex';
  elements.apiKeyInput.value = state.apiKey || '';
}

function closeApiKeyModal() {
  elements.apiKeyModal.style.display = 'none';
}

function handleSaveApiKey(e) {
  if (e) e.preventDefault();
  const val = elements.apiKeyInput.value.trim();
  state.apiKey = val;

  if (val) {
    localStorage.setItem('gemini_api_key', val);
  } else {
    localStorage.removeItem('gemini_api_key');
  }

  updateHeaderBadges();
  elements.saveSuccessMsg.style.display = 'block';
  setTimeout(() => {
    elements.saveSuccessMsg.style.display = 'none';
    closeApiKeyModal();
  }, 600);
}

function handleClearApiKey() {
  state.apiKey = '';
  elements.apiKeyInput.value = '';
  localStorage.removeItem('gemini_api_key');
  updateHeaderBadges();
}
