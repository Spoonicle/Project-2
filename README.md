# DRAW & EVOLVE - ASCII Binary Human World Explorer
An interactive live terminal web application featuring real-time 8-bit ASCII binary input generation, dual-terminal chat streams, Web Audio API synthesizers, and curious Alien AI dialog via Google Gemini 3.6 Flash.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Running the Server
To launch the Express server locally:

```bash
npm start
```

or for development mode:

```bash
npm run dev
```

Navigate to **`http://localhost:3000`** in your browser.

---

## ⌨️ Interaction & Terminal Features

1. **ASCII Binary Typing Interceptor**: Pressing keys on the keyboard automatically converts characters into their corresponding 8-bit ASCII binary representation (`01000001 01001001...`) in real-time.
2. **Backspace Byte Removal**: Pressing `Backspace` removes full 8-bit binary character blocks at a time.
3. **Dual Terminal Chat Stream**: Message history is displayed in an alternating Y-axis terminal stream (User on Left, Gemini AI on Right).
4. **Web Audio Synthesizer**: Sound effects for directive submissions, AI response arrivals, action clears, and UI feedback powered by the Web Audio API.
5. **Gemini API Key Modal**: Enter your Gemini API key via the top terminal header modal to connect directly to live Gemini AI responses, with built-in fallbacks if no key is provided.

---

## 🔗 Project Links & Submissions

- **Artist Statement**: [Google Doc](https://docs.google.com/document/d/1J_kvZtqGx9oIvLuy8ojuATvE0JD7lBoKSXrxek-nsI8/edit?tab=t.0)
- **Video Demonstration**: [YouTube](https://youtu.be/HGscZLdsBcM)
