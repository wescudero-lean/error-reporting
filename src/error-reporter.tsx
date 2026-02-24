/**
 * Tixly Error Reporter 
 * A lightweight, customizable error reporting widget for web applications.
 * 
 * Features:
 * - Floating button to report errors
 * - Form to submit bug reports
 * - Customizable endpoints for different types of reports
 * - Auto-detection of module, tab, and project key
 * - Integration with Tixly's ticketing system  
 */ 
type ErrorReportPayload = {
  project_key: string;
  module: string;
  tab: string;
  description: string;
  reported_by: string;
};

type ErrorReporterAPI = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

declare global {
  interface Window {
    __tixlyErrorReporterInitialized?: boolean;
    __tixlyErrorReporterAPI?: ErrorReporterAPI;
  }
}


export type ErrorReporterConfig = {
  endpoints: {
    Bug: string;
    "New Ticket": string;
  };
  apiKey: string;
};

function deriveModule() {
  return window.location.pathname.split("/")[1] || "dashboard";
}
function deriveTab() {
  return window.location.href;
}
function deriveProjectKey() {
  return window.location.hostname.split(".")[0];
}
function deriveReportedBy() {
  return localStorage.getItem("tixly_user_name") || "Anonymous";
}

function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  children?: (HTMLElement | Text)[],
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (children) children.forEach((c) => el.appendChild(c));
  return el;
}
function text(t: string) {
  return document.createTextNode(t);
}

async function fetchWithRetry(
  url: string,
  payload: ErrorReportPayload,
  apiKey: string,
  attempts = 2,
  delay = 500,
) {
  let lastErr: unknown;
  for (let i = 0; i <= attempts; i++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: apiKey },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

function renderStyles(): HTMLStyleElement {
  const style = document.createElement("style");
  style.textContent = `
    .er-root {
      --er-primary: hsl(var(--primary, 195 100% 43%));
      --er-bg: hsl(var(--background, 0 0% 100%));
      --er-foreground: hsl(var(--foreground, 208 100% 21%));
      --er-border: hsl(var(--border, 214.3 31.8% 91.4%));
      --er-muted: hsl(var(--muted, 210 20% 96%));
      --er-muted-foreground: hsl(var(--muted-foreground, 208 20% 45%));
      --er-radius: var(--radius, 0.75rem);
      
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      color: var(--er-foreground);
    }
    
    .er-badge {
      background: var(--er-primary);
      color: #fff;
      border-radius: 999px;
      padding: 12px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 600;
      font-size: 14px;
    }
    .er-badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      filter: brightness(1.1);
    }
    .er-badge:active { transform: translateY(0); }

    .er-widget {
      width: 340px;
      background: hsla(var(--background, 0 0% 100%), 0.85);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid var(--er-border);
      border-radius: var(--er-radius);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: er-fade-in 0.3s ease-out;
    }

    @keyframes er-fade-in {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .er-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid var(--er-border);
      cursor: move;
      background: hsla(var(--muted, 210 20% 96%), 0.5);
    }
    .er-header span { font-weight: 600; font-size: 14px; }
    
    .er-header-actions { display: flex; gap: 4px; }
    
    .er-icon-btn {
      background: transparent;
      border: none;
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--er-muted-foreground);
      transition: background 0.2s;
    }
    .er-icon-btn:hover { background: var(--er-muted); color: var(--er-foreground); }

    .er-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .er-label { font-size: 12px; font-weight: 500; color: var(--er-muted-foreground); margin-bottom: -4px; }
    
    .er-input, .er-textarea {
      background: var(--er-bg);
      border: 1px solid var(--er-border);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
      color: var(--er-foreground);
      font-family: inherit;
    }
    .er-input:focus, .er-textarea:focus {
      outline: none;
      border-color: var(--er-primary);
      box-shadow: 0 0 0 3px hsla(var(--primary, 195 100% 43%), 0.1);
    }
    
    .er-textarea { min-height: 100px; resize: none; }

    .er-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 16px;
      background: hsla(var(--muted, 210 20% 96%), 0.3);
      border-top: 1px solid var(--er-border);
    }

    .er-btn {
      border: 1px solid var(--er-border);
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      background: var(--er-bg);
      transition: all 0.2s;
      color: var(--er-foreground);
    }
    .er-btn:hover { background: var(--er-muted); }
    .er-btn.primary {
      background: var(--er-primary);
      border-color: var(--er-primary);
      color: white;
    }
    .er-btn.primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .er-btn.primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .er-status {
      font-size: 12px;
      padding: 10px 16px;
      text-align: center;
      border-top: 1px solid var(--er-border);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .er-status.er-fading { opacity: 0; transform: translateY(-4px); }
    .er-success { background: #f0fdf4; color: #166534; }
    .er-error { background: #fef2f2; color: #991b1b; }
    .er-loading { background: hsla(var(--primary, 195 100% 43%), 0.05); color: var(--er-primary); }
    
    .er-hidden { display: none !important; }
  `;
  return style;
}

export function initErrorReporter(config: ErrorReporterConfig): ErrorReporterAPI {
  if (
    !config ||
    !config.endpoints?.Bug ||
    !config.endpoints?.["New Ticket"] ||
    !config.apiKey
  ) {
    throw new Error("ErrorReporter: Missing required configuration.");
  }

  if (window.__tixlyErrorReporterInitialized)
    return window.__tixlyErrorReporterAPI as ErrorReporterAPI;
  window.__tixlyErrorReporterInitialized = true;

  const ENDPOINTS = config.endpoints;
  const API_KEY = config.apiKey;

  const root = createEl("div", { class: "er-root" });
  const style = renderStyles();
  document.head.appendChild(style);
  document.body.appendChild(root);

  let visible = false,
    minimized = false,
    loading = false;

  // Icons Utility
  const getIcon = (name: string) => {
    const icons: Record<string, string> = {
      bug: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>`,
      close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
      minimize: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
      send: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
    };
    return icons[name] || "";
  };

  // Badge (FAB)
  const badge = createEl("button", { class: "er-badge" });
  badge.innerHTML = `${getIcon("bug")} <span>Report Error</span>`;
  root.appendChild(badge);

  // Widget
  const widget = createEl("div", { class: "er-widget er-hidden" });
  const header = createEl("div", { class: "er-header" }, [
    createEl("span", {}, [text("Error Reporter")]),
    createEl("div", { class: "er-header-actions" }, [
      createEl(
        "button",
        { class: "er-icon-btn", "aria-label": "Minimize" },
        [],
      ),
      createEl("button", { class: "er-icon-btn", "aria-label": "Close" }, []),
    ]),
  ]);
  header.querySelector('[aria-label="Minimize"]')!.innerHTML =
    getIcon("minimize");
  header.querySelector('[aria-label="Close"]')!.innerHTML = getIcon("close");
  widget.appendChild(header);

  const body = createEl("div", { class: "er-body" });

  body.appendChild(
    createEl("label", { class: "er-label" }, [text("Report Type")]),
  );
  const typeSelect = createEl("select", { class: "er-input" }, [
    createEl("option", { value: "Bug" }, [text("Bug")]),
    createEl("option", { value: "New Ticket" }, [text("New Ticket")]),
  ]);
  body.appendChild(typeSelect);

  body.appendChild(
    createEl("label", { class: "er-label" }, [text("Description")]),
  );
  const desc = createEl("textarea", {
    class: "er-textarea",
    placeholder: "What happened? How can we fix it?",
  }) as HTMLTextAreaElement;
  body.appendChild(desc);

  widget.appendChild(body);

  const footer = createEl("div", { class: "er-footer" });
  const cancel = createEl("button", { class: "er-btn" }, [text("Cancel")]);
  const submit = createEl("button", { class: "er-btn primary" });
  submit.innerHTML = `<span>Submit</span>`;

  footer.appendChild(cancel);
  footer.appendChild(submit);
  widget.appendChild(footer);

  const status = createEl("div", { class: "er-status er-hidden" });
  widget.appendChild(status);

  root.appendChild(widget);

  function updateVisibility() {
    widget.classList.toggle("er-hidden", !visible || minimized);
    badge.classList.toggle("er-hidden", visible && !minimized);
    if (visible && !minimized) desc.focus();
  }

  function showStatus(
    msg: string | null,
    type: "success" | "error" | "loading" | null = null,
  ) {
    if (!msg) {
      status.classList.add("er-hidden");
      return;
    }
    status.textContent = msg;
    status.className = `er-status er-${type}`;
    status.classList.remove("er-hidden", "er-fading");

    if (type === "success" || type === "error") {
      setTimeout(() => {
        status.classList.add("er-fading");
        setTimeout(() => status.classList.add("er-hidden"), 400);
      }, 4000);
    }
  }

  async function submitReport() {
    const payload: ErrorReportPayload = {
      project_key: deriveProjectKey(),
      module: deriveModule(),
      tab: deriveTab(),
      description: desc.value.trim(),
      reported_by: deriveReportedBy(),
    };

    if (!payload.description) {
      showStatus("Please describe the issue", "error");
      return;
    }

    loading = true;
    (submit as HTMLButtonElement).disabled = true;
    showStatus("Sending report...", "loading");

    try {
      const res = await fetchWithRetry(
        ENDPOINTS[typeSelect.value as "Bug" | "New Ticket"],
        payload,
        API_KEY,
      );

      const data = await res.json();

      if (data.success) {
        showStatus("Message sent", "success");
        desc.value = "";
        setTimeout(() => {
          visible = false;
          updateVisibility();
        }, 2000);
      } else {
        // Extract error message from structured response
        let msg = data.error || "Failed to send report";
        if (data.details && data.details[0]) {
          const detail = data.details[0];
          if (typeof detail === "string" && detail.includes("error:")) {
            msg = detail.split("error:")[1].trim().replace(/["{}]/g, "");
          } else {
            msg = detail;
          }
        }
        throw new Error(msg);
      }
    } catch (e: any) {
      let errorMsg = e.message || "Could not send report";

      if (errorMsg.includes("HTTP")) {
        errorMsg = "Server error. Please try again later.";
      }

      // Limit length to keep it minimalist
      if (errorMsg.length > 60) errorMsg = errorMsg.substring(0, 57) + "...";

      showStatus(errorMsg, "error");
    } finally {
      loading = false;
      (submit as HTMLButtonElement).disabled = false;
    }
  }

  badge.addEventListener("click", () => {
    visible = !visible;
    minimized = false;
    updateVisibility();
  });

  header
    .querySelector('button[aria-label="Minimize"]')!
    .addEventListener("click", () => {
      minimized = true;
      updateVisibility();
    });

  header
    .querySelector('button[aria-label="Close"]')!
    .addEventListener("click", () => {
      visible = false;
      updateVisibility();
    });

  cancel.addEventListener("click", () => {
    visible = false;
    updateVisibility();
  });

  submit.addEventListener("click", () => {
    if (!loading) submitReport();
  });

  // Drag logic
  let dragging = false,
    offsetX = 0,
    offsetY = 0;
  header.addEventListener("mousedown", (e) => {
    dragging = true;
    const rect = root.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "";
  });
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    root.style.left = `${Math.max(0, Math.min(window.innerWidth - root.offsetWidth, e.clientX - offsetX))}px`;
    root.style.top = `${Math.max(0, Math.min(window.innerHeight - root.offsetHeight, e.clientY - offsetY))}px`;
    root.style.right = "auto";
    root.style.bottom = "auto";
  });

  const api: ErrorReporterAPI = {
    open: () => {
      visible = true;
      minimized = false;
      updateVisibility();
    },
    close: () => {
      visible = false;
      updateVisibility();
    },
    toggle: () => {
      visible = !visible;
      minimized = false;
      updateVisibility();
    },
  };
  window.__tixlyErrorReporterAPI = api;
  updateVisibility();
  return api;
}
