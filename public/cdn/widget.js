(function() {
  const script = document.currentScript;
  const agentId = script.getAttribute('data-agent-id');
  const baseUrl = new URL(script.src).origin;

  if (!agentId) {
    console.error('AI Agent: agentId is missing. Please add data-agent-id to your script tag.');
    return;
  }

  // Create Iframe Container
  const container = document.createElement('div');
  container.id = 'ai-agent-widget-container';
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '0',
    right: '0',
    zIndex: '2147483647',
    width: '450px',
    height: '650px',
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    overflow: 'hidden'
  });

  const iframe = document.createElement('iframe');
  iframe.src = `${baseUrl}/chat/${agentId}`;
  Object.assign(iframe.style, {
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'transparent',
    pointerEvents: 'auto',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  container.appendChild(iframe);
  document.body.appendChild(container);

  // Communication logic (e.g. for resizing if needed)
  window.addEventListener('message', (event) => {
    if (event.origin !== baseUrl) return;
    if (event.data.type === 'ai-agent-resize') {
       container.style.width = event.data.width || '450px';
       container.style.height = event.data.height || '650px';
    }
  });

  console.log('AI Agent: Initialized successfully.');
})();
