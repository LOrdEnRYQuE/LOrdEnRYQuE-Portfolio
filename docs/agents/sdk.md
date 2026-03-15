# AI Agent Cross-Platform SDK Architecture

This document outlines the architectural patterns for integrating the AI Agent system into non-web environments (Mobile, Desktop, and CLI).

## Core Principles
1. **Headless Integration**: Use the `/api/agents/[agentId]/chat` streaming endpoint via standard HTTP/Server-Sent Events (SSE).
2. **Configuration Synchronization**: Fetch agent branding (colors, icons, personality) via `GET /api/agents/[agentId]` to maintain UI consistency.
3. **Optimistic Rendering**: Show user messages immediately while the AI response streams.

---

## 📱 Mobile Integration (React Native / Flutter)

### React Native Implementation
Mobile apps should use a custom hook to manage the streaming state.

```javascript
// useAIAgent.js
export function useAIAgent(agentId) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content) => {
    // Add user message optimistically
    const userMsg = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const response = await fetch(`${API_BASE}/api/agents/${agentId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userMsg] })
    });

    // Handle Streaming Response (Simplified)
    const reader = response.body.getReader();
    let aiResponse = "";
    while(true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = new TextDecoder().decode(value);
      aiResponse += chunk;
      updateLastMessageInUI(aiResponse);
    }
    setIsTyping(false);
  };

  return { messages, isTyping, sendMessage };
}
```

---

## 💻 Desktop Integration (Electron)

In Electron, the integration should happen in the **Main Process** if local persistence is needed, or the **Renderer Process** for simple chat views.

### Pattern: IPC-bound Chat
1. **Renderer** sends an `agent:message` event to Main.
2. **Main** handles the request to the AI proxy, ensuring API keys (if any) are never exposed to the frontend.
3. **Main** streams progress back to the Renderer via `window.webContents.send`.

---

## 🔗 Custom Webhooks
You can trigger external automation (e.g., Zapier, Make) by listening to specific intent keywords in the chat stream or by implementing a custom middleware on the `chat` API.
