import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const script = `
    (function() {
      const agentId = "${agentId}";
      const baseUrl = "${baseUrl}";
      const config = window.AIAgentConfig || {};
      
      const bottom = config.bottom || '20px';
      const right = config.right || '20px';
      const width = config.width || '400px';
      const height = config.height || '600px';
      
      // Create widget container
      const container = document.createElement('div');
      container.id = 'ai-agent-widget-' + agentId;
      container.className = config.initiallyMinimized ? 'minimized' : '';
      document.body.appendChild(container);

      // Add styles
      const style = document.createElement('style');
      style.textContent = \`
        #ai-agent-widget-\${agentId} {
          position: fixed;
          bottom: \${bottom};
          right: \${right};
          z-index: 999999;
          width: \${width};
          height: \${height};
          max-height: 85vh;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          background: transparent;
        }
        #ai-agent-widget-\${agentId}.minimized {
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
        }
        #ai-agent-widget-\${agentId} iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .ai-agent-toggle-\${agentId} {
          position: fixed;
          bottom: \${bottom};
          right: \${right};
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: \${config.primaryColor || '#0ea5e9'};
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          cursor: pointer;
          z-index: 999998;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: none;
        }
        .ai-agent-toggle-\${agentId}:hover {
          transform: scale(1.1);
        }
        .ai-agent-toggle-\${agentId}.hidden {
          transform: scale(0);
          opacity: 0;
        }
      \`;
      document.head.appendChild(style);

      // Create toggle button
      const toggle = document.createElement('button');
      toggle.className = 'ai-agent-toggle-' + agentId + (config.initiallyMinimized ? '' : ' hidden');
      toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
      toggle.onclick = () => {
        container.classList.remove('minimized');
        toggle.classList.add('hidden');
      };
      document.body.appendChild(toggle);

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = \`\${baseUrl}/agent/\${agentId}?embed=true\`;
      container.appendChild(iframe);

      // Listen for toggle messages from iframe
      window.addEventListener('message', (event) => {
        if (event.data.type === 'TOGGLE_WIDGET') {
          container.classList.add('minimized');
          toggle.classList.remove('hidden');
        }
      });
    })();
  `;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
