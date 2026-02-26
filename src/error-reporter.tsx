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
  clickup_task_id?: string;
  sla_urgency: "urgent" | "normal" | "not urgent";
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
    __tixlyErrorReporterDotEnvPath?: string;
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

const CLICKUP_PROJECT_ID_ENV = "VITE_CLICKUP_PROJECT_ID";
const CLICKUP_PROJECT_ID_ENV_FALLBACK = "VITE_CLICKUP_PROJECT_ID";
const CLICKUP_TASK_ID_KEY = " VITE_CLICKUP_TASK_ID";

function readRuntimeEnv(name: string): string | null {
  try {
    const metaEnv = (import.meta as any)?.env;
    if (metaEnv && typeof metaEnv[name] === "string" && metaEnv[name].trim())
      return metaEnv[name].trim();
  } catch {}

  try {
    const proc = (globalThis as any).process;
    if (
      proc?.env &&
      typeof proc.env[name] === "string" &&
      proc.env[name].trim()
    )
      return proc.env[name].trim();
  } catch {}

  return null;
}

function readDotEnvVariable(name: string): string | null {
  const req = (globalThis as any).require as undefined | ((id: string) => any);
  const proc = (globalThis as any).process as any;

  if (!req || !proc?.cwd) return null;

  let fs: any;
  let path: any;
  try {
    fs = req("fs");
    path = req("path");
  } catch {
    return null;
  }

  const envPath =
    (globalThis as any).__tixlyErrorReporterDotEnvPath ||
    path.join(proc.cwd(), ".env");

  try {
    if (!fs.existsSync(envPath)) return null;
    const fileText = fs.readFileSync(envPath, "utf8") as string;
    const lines = fileText.split(/\r?\n/);
    const matcher = new RegExp(
      `^\\s*(?:export\\s+)?${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*=\\s*(.*)\\s*$`,
    );

    for (const line of lines) {
      if (!line || line.trim().startsWith("#")) continue;
      const m = matcher.exec(line);
      if (!m) continue;
      const raw = (m[1] || "").trim();
      if (!raw) return null;
      if (
        (raw.startsWith('"') && raw.endsWith('"')) ||
        (raw.startsWith("'") && raw.endsWith("'"))
      ) {
        try {
          return JSON.parse(raw);
        } catch {
          return raw.slice(1, -1);
        }
      }
      return raw;
    }

    return null;
  } catch {
    return null;
  }
}

function readConfiguredClickUpProjectId(): string | null {
  const fromRuntime = readRuntimeEnv(CLICKUP_PROJECT_ID_ENV);
  if (fromRuntime) return fromRuntime;

  const fromRuntimeFallback = readRuntimeEnv(CLICKUP_PROJECT_ID_ENV_FALLBACK);
  if (fromRuntimeFallback) return fromRuntimeFallback;

  const fromDotEnv = readDotEnvVariable(CLICKUP_PROJECT_ID_ENV);
  if (fromDotEnv?.trim()) return fromDotEnv.trim();

  const fromDotEnvFallback = readDotEnvVariable(CLICKUP_PROJECT_ID_ENV_FALLBACK);
  if (fromDotEnvFallback?.trim()) return fromDotEnvFallback.trim();

  try {
    const fromStorage =
      localStorage.getItem(CLICKUP_PROJECT_ID_ENV) ||
      localStorage.getItem(CLICKUP_PROJECT_ID_ENV_FALLBACK);
    return fromStorage?.trim() || null;
  } catch {
    return null;
  }
}

async function writeDotEnvVariable(
  name: string,
  value: string,
): Promise<{ ok: boolean; error?: string }> {
  const req = (globalThis as any).require as undefined | ((id: string) => any);
  const proc = (globalThis as any).process as any;

  if (!req || !proc?.cwd) {
    return { ok: false, error: "dotEnvWriteUnavailable" };
  }

  let fs: any;
  let path: any;
  try {
    fs = req("fs");
    path = req("path");
  } catch {
    return { ok: false, error: "dotEnvWriteUnavailable" };
  }

  const envPath =
    (globalThis as any).__tixlyErrorReporterDotEnvPath ||
    path.join(proc.cwd(), ".env");

  let fileText = "";
  let newline = "\n";
  try {
    if (fs.existsSync(envPath)) {
      fileText = fs.readFileSync(envPath, "utf8") as string;
      newline = fileText.includes("\r\n") ? "\r\n" : "\n";
    }
  } catch {
    return { ok: false, error: "dotEnvReadFailed" };
  }

  const formatValue = (raw: string) => {
    const trimmed = raw.trim();
    const needsQuotes =
      trimmed === "" ||
      /[\s#"'\r\n]/.test(trimmed) ||
      trimmed.includes("=");
    return needsQuotes ? JSON.stringify(trimmed) : trimmed;
  };

  const lines = fileText ? fileText.split(/\r?\n/) : [];
  const pattern = new RegExp(`^\\s*${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*=`);
  const existingIndex = lines.findIndex((l) => pattern.test(l));

  if (!value.trim()) {
    if (existingIndex !== -1) lines.splice(existingIndex, 1);
  } else {
    const nextLine = `${name}=${formatValue(value)}`;
    if (existingIndex === -1) {
      if (lines.length > 0 && lines[lines.length - 1]?.trim() !== "") {
        lines.push(nextLine);
      } else if (lines.length > 0 && lines[lines.length - 1]?.trim() === "") {
        lines.splice(lines.length - 1, 0, nextLine);
      } else {
        lines.push(nextLine);
      }
    } else {
      lines[existingIndex] = nextLine;
    }
  }

  const nextText = lines.join(newline).replace(/\s+$/g, "") + newline;
  try {
    fs.writeFileSync(envPath, nextText, "utf8");
    return { ok: true };
  } catch {
    return { ok: false, error: "dotEnvWriteFailed" };
  }
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

    .er-modal-overlay {
      position: fixed;
      inset: 0;
      background: radial-gradient(
          circle at 50% 10%,
          rgba(2, 132, 199, 0.1),
          rgba(15, 23, 42, 0.2) 40%,
          rgba(2, 6, 23, 0.45)
        );
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      padding: 20px;
      animation: er-fade-in 0.2s ease-out;
    }

    .er-modal {
      width: min(440px, calc(100vw - 40px));
      background: hsla(var(--background, 0 0% 100%), 0.95);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid hsla(var(--border, 214.3 31.8% 91.4%), 0.8);
      border-radius: calc(var(--er-radius) + 4px);
      box-shadow:
        0 20px 60px -10px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.5) inset;
      overflow: hidden;
      animation: er-modal-scale 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .er-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 16px;
      background: transparent;
    }

    .er-modal-title {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .er-modal-icon {
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: linear-gradient(135deg, hsla(var(--primary, 195 100% 43%), 0.1), hsla(var(--primary, 195 100% 43%), 0.05));
      color: var(--er-primary);
      border: 1px solid hsla(var(--primary, 195 100% 43%), 0.1);
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      flex-shrink: 0;
    }
    .er-modal-icon svg { width: 18px; height: 18px; }

    .er-modal-title-text { display: flex; flex-direction: column; gap: 3px; }
    .er-modal-title-text span:first-child {
      font-weight: 600;
      font-size: 16px;
      color: var(--er-foreground);
      line-height: 1.2;
    }
    .er-modal-subtitle {
      font-size: 13px;
      color: var(--er-muted-foreground);
      font-weight: 400;
      line-height: 1.4;
    }

    .er-modal .er-body {
      padding: 8px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .er-hint-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .er-env-chip {
      display: none;
    }

    .er-modal .er-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--er-foreground);
      font-family: inherit;
    }

    .er-modal .er-input {
      padding: 12px 14px;
      font-size: 14px;
      border-radius: 10px;
      border: 1px solid hsla(var(--border, 214.3 31.8% 91.4%), 1);
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      transition: all 0.2s ease;
      color: var(--er-foreground);
      font-family: inherit;
    }
    .er-modal .er-input::placeholder { color: hsla(var(--muted-foreground, 208 20% 45%), 0.6); }
    .er-modal .er-input:focus {
      outline: none;
      border-color: var(--er-primary);
      box-shadow: 0 0 0 4px hsla(var(--primary, 195 100% 43%), 0.15);
    }

    .er-help {
      font-size: 13px;
      color: var(--er-muted-foreground);
      line-height: 1.5;
      font-family: inherit;
    }

    .er-inline-status {
      font-size: 13px;
      color: var(--er-primary);
      font-weight: 500;
      min-height: 20px;
      display: flex;
      align-items: center;
      font-family: inherit;
    }

    .er-modal .er-footer {
      padding: 16px 24px;
      background: hsla(var(--muted, 210 20% 96%), 0.3);
      border-top: 1px solid hsla(var(--border, 214.3 31.8% 91.4%), 0.6);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .er-modal .er-btn {
      border-radius: 8px;
      padding: 10px 18px;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
      border: 1px solid transparent;
      font-family: inherit;
    }
    
    .er-modal .er-btn:not(.primary) {
      background: var(--er-bg);
      border-color: var(--er-border);
      color: var(--er-foreground);
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .er-modal .er-btn:not(.primary):hover {
      background: var(--er-muted);
      border-color: var(--er-border);
    }

    .er-modal .er-btn.primary {
      background: var(--er-primary);
      color: white;
      box-shadow: 0 4px 12px hsla(var(--primary, 195 100% 43%), 0.25);
    }
    .er-modal .er-btn.primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px hsla(var(--primary, 195 100% 43%), 0.35);
      filter: brightness(1.1);
    }
    .er-modal .er-btn.primary:active {
      transform: translateY(0);
      box-shadow: 0 2px 6px hsla(var(--primary, 195 100% 43%), 0.25);
    }
    .er-modal .er-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    .er-modal .er-icon-btn { 
      border-radius: 8px; 
      padding: 8px; 
      color: var(--er-muted-foreground);
    }
    .er-modal .er-icon-btn:hover { 
      background: hsla(var(--muted, 210 20% 96%), 1); 
      color: var(--er-foreground);
    }

    

    @keyframes er-modal-scale {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
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
      settings: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.28.53.5 1.1.5 1.69V11a1 1 0 0 0 1 1h.1a2 2 0 0 1 0 4H21a1 1 0 0 0-1 1v.1c0 .59-.22 1.16-.6 1.69z"/></svg>`,
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
        { class: "er-icon-btn", "aria-label": "Settings" },
        [],
      ),
      createEl(
        "button",
        { class: "er-icon-btn", "aria-label": "Minimize" },
        [],
      ),
      createEl("button", { class: "er-icon-btn", "aria-label": "Close" }, []),
    ]),
  ]);
  header.querySelector('[aria-label="Settings"]')!.innerHTML =
    getIcon("settings");
  
  // Hide settings button if BOTH project ID and task ID are already configured
  if (readConfiguredClickUpProjectId() && localStorage.getItem(CLICKUP_TASK_ID_KEY)) {
    header.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden");
  }

  header.querySelector('[aria-label="Minimize"]')!.innerHTML =
    getIcon("minimize");
  header.querySelector('[aria-label="Close"]')!.innerHTML = getIcon("close");
  widget.appendChild(header);

  const modalOverlay = createEl("div", { class: "er-modal-overlay er-hidden" });
  const modal = createEl("div", { class: "er-modal" });
  const modalHeader = createEl("div", { class: "er-modal-header" }, [
    createEl("div", { class: "er-modal-title" }, [
      createEl("span", { class: "er-modal-icon", "aria-hidden": "true" }),
      createEl("div", { class: "er-modal-title-text" }, [
        createEl("span", {}, [text("ClickUp Project ID")]),
      ]),
    ]),
    createEl("button", { class: "er-icon-btn", "aria-label": "Close Settings" }),
  ]);
  modalHeader.querySelector('[aria-label="Close Settings"]')!.innerHTML =
    getIcon("close");
  (modalHeader.querySelector(".er-modal-icon") as HTMLElement).innerHTML =
    getIcon("settings");
  modal.appendChild(modalHeader);

  const modalBody = createEl("div", { class: "er-body" });
  
  // Project ID Field
  modalBody.appendChild(
    createEl("div", { class: "er-hint-row" }, [
      createEl("label", { class: "er-label" }, [text("Project ID")]),
    ]),
  );
  const clickUpProjectIdInput = createEl("input", {
    class: "er-input",
    type: "text",
    inputmode: "numeric",
    placeholder: "Enter your ClickUp Project ID…",
  }) as HTMLInputElement;
  modalBody.appendChild(clickUpProjectIdInput);

  // ClickUp Task ID Field
  modalBody.appendChild(
    createEl("div", { class: "er-hint-row" }, [
      createEl("label", { class: "er-label" }, [text("ClickUp Task ID")]),
    ]),
  );
  const clickUpTaskIdInput = createEl("input", {
    class: "er-input",
    type: "text",
    placeholder: "Enter associated ClickUp Task ID…",
  }) as HTMLInputElement;
  modalBody.appendChild(clickUpTaskIdInput);

  modalBody.appendChild(
    createEl("div", { class: "er-help" }, [
      text("Values are stored locally and reused automatically."),
    ]),
  );
  const modalInlineStatus = createEl("div", { class: "er-inline-status" }, [
    text(""),
  ]);
  modalBody.appendChild(modalInlineStatus);
  modal.appendChild(modalBody);

  const modalFooter = createEl("div", { class: "er-footer" });
  const modalCancel = createEl("button", { class: "er-btn" }, [text("Cancel")]);
  const modalSave = createEl("button", { class: "er-btn primary" }, [
    text("Save"),
  ]) as HTMLButtonElement;
  modalFooter.appendChild(modalCancel);
  modalFooter.appendChild(modalSave);
  modal.appendChild(modalFooter);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

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
    createEl("label", { class: "er-label" }, [text("SLA Urgency")]),
  );
  const slaSelect = createEl("select", { class: "er-input" }, [
    createEl("option", { value: "urgent" }, [text("urgent")]),
    createEl("option", { value: "normal", selected: "true" }, [text("normal")]),
    createEl("option", { value: "not urgent" }, [text("not urgent")]),
  ]) as HTMLSelectElement;
  body.appendChild(slaSelect);

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

  function setModalStatus(msg: string | null) {
    modalInlineStatus.textContent = msg || "";
  }

  function closeModal() {
    modalOverlay.classList.add("er-hidden");
    setModalStatus(null);
  }

  function openModal() {
    const currentProjectId = readConfiguredClickUpProjectId();
    clickUpProjectIdInput.value = currentProjectId || "";
    
    const currentTaskId = localStorage.getItem(CLICKUP_TASK_ID_KEY);
    clickUpTaskIdInput.value = currentTaskId || "";

    modalOverlay.classList.remove("er-hidden");
    setModalStatus(null);
    setTimeout(() => clickUpProjectIdInput.focus(), 0);
  }

  async function saveSettings() {
    const projectId = clickUpProjectIdInput.value.trim();
    const taskId = clickUpTaskIdInput.value.trim();

    if (!projectId || !taskId) {
      setModalStatus("Both Project ID and Task ID are required");
      return;
    }

    // Save Task ID to localStorage
    if (taskId) {
      localStorage.setItem(CLICKUP_TASK_ID_KEY, taskId);
    } else {
      localStorage.removeItem(CLICKUP_TASK_ID_KEY);
    }

    try {
      if (projectId) localStorage.setItem(CLICKUP_PROJECT_ID_ENV, projectId);
      else localStorage.removeItem(CLICKUP_PROJECT_ID_ENV);
    } catch {}

    modalSave.disabled = true;
    setModalStatus("Saving...");
    
    // We only try to write Project ID to .env as Task ID is purely local
    const res = await writeDotEnvVariable(CLICKUP_PROJECT_ID_ENV, projectId);
    modalSave.disabled = false;

    if (res.ok) {
      setModalStatus("Saved to .env");
      // Only hide settings button if BOTH are configured
      if (projectId && taskId) {
        header.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden");
      }
      setTimeout(() => closeModal(), 700);
      return;
    }

    if (res.error === "dotEnvWriteUnavailable") {
      setModalStatus("Saved locally");
      if (projectId && taskId) {
        header.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden");
      }
      setTimeout(() => closeModal(), 700);
      return;
    }

    setModalStatus("Saved locally (.env write failed)");
    if (projectId && taskId) {
      header.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden");
    }
    setTimeout(() => closeModal(), 900);
  }

  async function submitReport() {
    const configuredProjectKey = readConfiguredClickUpProjectId();
    const storedTaskId = localStorage.getItem(CLICKUP_TASK_ID_KEY) || undefined;
    
    const selectedUrgency =
      (slaSelect.value as "urgent" | "normal" | "not urgent") || "normal";

    const payload: ErrorReportPayload = {
      project_key: configuredProjectKey || deriveProjectKey(),
      module: deriveModule(),
      tab: deriveTab(),
      description: desc.value.trim(),
      reported_by: deriveReportedBy(),
      clickup_task_id: storedTaskId,
      sla_urgency: selectedUrgency,
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
      let data: any;
      try {
        data = await res.json();
      } catch {
        const txt = await res.text().catch(() => "");
        data = { success: false, error: txt || `HTTP ${res.status}` };
      }

      if (data.success) {
        showStatus("Message sent", "success");
        desc.value = "";
        setTimeout(() => {
          visible = false;
          updateVisibility();
        }, 2000);
      } else {
        let msg = "";
        if (Array.isArray(data.errors) && data.errors.length) {
          msg = String(data.errors[0]);
        } else if (Array.isArray(data.details) && data.details.length) {
          const detail = data.details[0];
          msg = typeof detail === "string" ? detail : String(detail);
          if (typeof detail === "string" && detail.includes("error:")) {
            msg = detail.split("error:")[1].trim().replace(/["{}]/g, "");
          }
        } else if (typeof data.error === "string" && data.error.trim()) {
          msg = data.error.trim();
        } else {
          msg = "Failed to send report";
        }
        if (msg.length > 60) msg = msg.substring(0, 57) + "...";
        showStatus(msg, "error");
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

  header
    .querySelector('button[aria-label="Settings"]')!
    .addEventListener("click", (e) => {
      e.stopPropagation();
      openModal();
    });

  cancel.addEventListener("click", () => {
    visible = false;
    updateVisibility();
  });

  submit.addEventListener("click", () => {
    if (!loading) submitReport();
  });

  modalOverlay.addEventListener("mousedown", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  modalCancel.addEventListener("click", () => closeModal());
  modalHeader
    .querySelector('button[aria-label="Close Settings"]')!
    .addEventListener("click", () => closeModal());
  modalSave.addEventListener("click", () => saveSettings());
  clickUpProjectIdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveSettings();
    if (e.key === "Escape") closeModal();
  });
  clickUpTaskIdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveSettings();
    if (e.key === "Escape") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Drag logic
  let dragging = false,
    offsetX = 0,
    offsetY = 0;
  header.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("button")) return;
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
