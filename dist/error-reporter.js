function Z(){return window.location.pathname.split("/")[1]||"dashboard"}function G(){return window.location.href}function ee(){return window.location.hostname.split(".")[0]}function re(){return localStorage.getItem("tixly_user_name")||"Anonymous"}var S="VITE_CLICKUP_PROJECT_ID",B="VITE_CLICKUP_PROJECT_ID";function F(r){try{let n=import.meta?.env;if(n&&typeof n[r]=="string"&&n[r].trim())return n[r].trim()}catch{}try{let n=globalThis.process;if(n?.env&&typeof n.env[r]=="string"&&n.env[r].trim())return n.env[r].trim()}catch{}return null}function J(r){let n=globalThis.require,l=globalThis.process;if(!n||!l?.cwd)return null;let o,d;try{o=n("fs"),d=n("path")}catch{return null}let a=globalThis.__tixlyErrorReporterDotEnvPath||d.join(l.cwd(),".env");try{if(!o.existsSync(a))return null;let p=o.readFileSync(a,"utf8").split(/\r?\n/),u=new RegExp(`^\\s*(?:export\\s+)?${r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*=\\s*(.*)\\s*$`);for(let y of p){if(!y||y.trim().startsWith("#"))continue;let i=u.exec(y);if(!i)continue;let s=(i[1]||"").trim();if(!s)return null;if(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))try{return JSON.parse(s)}catch{return s.slice(1,-1)}return s}return null}catch{return null}}function D(){let r=F(S);if(r)return r;let n=F(B);if(n)return n;let l=J(S);if(l?.trim())return l.trim();let o=J(B);if(o?.trim())return o.trim();try{return(localStorage.getItem(S)||localStorage.getItem(B))?.trim()||null}catch{return null}}async function te(r,n){let l=globalThis.require,o=globalThis.process;if(!l||!o?.cwd)return{ok:!1,error:"dotEnvWriteUnavailable"};let d,a;try{d=l("fs"),a=l("path")}catch{return{ok:!1,error:"dotEnvWriteUnavailable"}}let c=globalThis.__tixlyErrorReporterDotEnvPath||a.join(o.cwd(),".env"),p="",u=`
`;try{d.existsSync(c)&&(p=d.readFileSync(c,"utf8"),u=p.includes(`\r
`)?`\r
`:`
`)}catch{return{ok:!1,error:"dotEnvReadFailed"}}let y=f=>{let m=f.trim();return m===""||/[\s#"'\r\n]/.test(m)||m.includes("=")?JSON.stringify(m):m},i=p?p.split(/\r?\n/):[],s=new RegExp(`^\\s*${r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*=`),b=i.findIndex(f=>s.test(f));if(!n.trim())b!==-1&&i.splice(b,1);else{let f=`${r}=${y(n)}`;b===-1?i.length>0&&i[i.length-1]?.trim()!==""?i.push(f):i.length>0&&i[i.length-1]?.trim()===""?i.splice(i.length-1,0,f):i.push(f):i[b]=f}let E=i.join(u).replace(/\s+$/g,"")+u;try{return d.writeFileSync(c,E,"utf8"),{ok:!0}}catch{return{ok:!1,error:"dotEnvWriteFailed"}}}function e(r,n,l){let o=document.createElement(r);return n&&Object.entries(n).forEach(([d,a])=>o.setAttribute(d,a)),l&&l.forEach(d=>o.appendChild(d)),o}function h(r){return document.createTextNode(r)}async function ne(r,n,l,o=2,d=500){let a;for(let c=0;c<=o;c++)try{let p=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",apikey:l},body:JSON.stringify(n)});if(!p.ok)throw new Error(`HTTP ${p.status}`);return p}catch(p){a=p,await new Promise(u=>setTimeout(u,d*Math.pow(2,c)))}throw a instanceof Error?a:new Error(String(a))}function oe(){let r=document.createElement("style");return r.textContent=`
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
  `,r}function ae(r){if(!r||!r.endpoints?.Bug||!r.endpoints?.["New Ticket"]||!r.apiKey)throw new Error("ErrorReporter: Missing required configuration.");if(window.__tixlyErrorReporterInitialized)return window.__tixlyErrorReporterAPI;window.__tixlyErrorReporterInitialized=!0;let n=r.endpoints,l=r.apiKey,o=e("div",{class:"er-root"}),d=oe();document.head.appendChild(d),document.body.appendChild(o);let a=!1,c=!1,p=!1,u=t=>({bug:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',send:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.28.53.5 1.1.5 1.69V11a1 1 0 0 0 1 1h.1a2 2 0 0 1 0 4H21a1 1 0 0 0-1 1v.1c0 .59-.22 1.16-.6 1.69z"/></svg>'})[t]||"",y=e("button",{class:"er-badge"});y.innerHTML=`${u("bug")} <span>Report Error</span>`,o.appendChild(y);let i=e("div",{class:"er-widget er-hidden"}),s=e("div",{class:"er-header"},[e("span",{},[h("Error Reporter")]),e("div",{class:"er-header-actions"},[e("button",{class:"er-icon-btn","aria-label":"Settings"},[]),e("button",{class:"er-icon-btn","aria-label":"Minimize"},[]),e("button",{class:"er-icon-btn","aria-label":"Close"},[])])]);s.querySelector('[aria-label="Settings"]').innerHTML=u("settings"),D()&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),s.querySelector('[aria-label="Minimize"]').innerHTML=u("minimize"),s.querySelector('[aria-label="Close"]').innerHTML=u("close"),i.appendChild(s);let b=e("div",{class:"er-modal-overlay er-hidden"}),E=e("div",{class:"er-modal"}),f=e("div",{class:"er-modal-header"},[e("div",{class:"er-modal-title"},[e("span",{class:"er-modal-icon","aria-hidden":"true"}),e("div",{class:"er-modal-title-text"},[e("span",{},[h("ClickUp Project ID")])])]),e("button",{class:"er-icon-btn","aria-label":"Close Settings"})]);f.querySelector('[aria-label="Close Settings"]').innerHTML=u("close"),f.querySelector(".er-modal-icon").innerHTML=u("settings"),E.appendChild(f);let m=e("div",{class:"er-body"});m.appendChild(e("div",{class:"er-hint-row"},[e("label",{class:"er-label"},[h("Project ID")])]));let C=e("input",{class:"er-input",type:"text",inputmode:"numeric",placeholder:"Enter your ClickUp Project ID\u2026"});m.appendChild(C),m.appendChild(e("div",{class:"er-help"},[h("Press Enter or click Save. This value is stored and reused automatically.")]));let N=e("div",{class:"er-inline-status"},[h("")]);m.appendChild(N),E.appendChild(m);let j=e("div",{class:"er-footer"}),K=e("button",{class:"er-btn"},[h("Cancel")]),I=e("button",{class:"er-btn primary"},[h("Save")]);j.appendChild(K),j.appendChild(I),E.appendChild(j),b.appendChild(E),document.body.appendChild(b);let L=e("div",{class:"er-body"});L.appendChild(e("label",{class:"er-label"},[h("Report Type")]));let $=e("select",{class:"er-input"},[e("option",{value:"Bug"},[h("Bug")]),e("option",{value:"New Ticket"},[h("New Ticket")])]);L.appendChild($),L.appendChild(e("label",{class:"er-label"},[h("Description")]));let R=e("textarea",{class:"er-textarea",placeholder:"What happened? How can we fix it?"});L.appendChild(R),i.appendChild(L);let H=e("div",{class:"er-footer"}),W=e("button",{class:"er-btn"},[h("Cancel")]),M=e("button",{class:"er-btn primary"});M.innerHTML="<span>Submit</span>",H.appendChild(W),H.appendChild(M),i.appendChild(H);let k=e("div",{class:"er-status er-hidden"});i.appendChild(k),o.appendChild(i);function v(){i.classList.toggle("er-hidden",!a||c),y.classList.toggle("er-hidden",a&&!c),a&&!c&&R.focus()}function _(t,x=null){if(!t){k.classList.add("er-hidden");return}k.textContent=t,k.className=`er-status er-${x}`,k.classList.remove("er-hidden","er-fading"),(x==="success"||x==="error")&&setTimeout(()=>{k.classList.add("er-fading"),setTimeout(()=>k.classList.add("er-hidden"),400)},4e3)}function T(t){N.textContent=t||""}function w(){b.classList.add("er-hidden"),T(null)}function X(){let t=D();C.value=t||"",b.classList.remove("er-hidden"),T(null),setTimeout(()=>C.focus(),0)}async function U(){let t=C.value.trim();try{t?localStorage.setItem(S,t):localStorage.removeItem(S)}catch{}I.disabled=!0,T("Saving...");let x=await te(S,t);if(I.disabled=!1,x.ok){T("Saved to .env"),s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>w(),700);return}if(x.error==="dotEnvWriteUnavailable"){T("Saved locally"),s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>w(),700);return}T("Saved locally (.env write failed)"),s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>w(),900)}async function Q(){let x={project_key:D()||ee(),module:Z(),tab:G(),description:R.value.trim(),reported_by:re()};if(!x.description){_("Please describe the issue","error");return}p=!0,M.disabled=!0,_("Sending report...","loading");try{let g=await(await ne(n[$.value],x,l)).json();if(g.success)_("Message sent","success"),R.value="",setTimeout(()=>{a=!1,v()},2e3);else{let q=g.error||"Failed to send report";if(g.details&&g.details[0]){let z=g.details[0];typeof z=="string"&&z.includes("error:")?q=z.split("error:")[1].trim().replace(/["{}]/g,""):q=z}throw new Error(q)}}catch(P){let g=P.message||"Could not send report";g.includes("HTTP")&&(g="Server error. Please try again later."),g.length>60&&(g=g.substring(0,57)+"..."),_(g,"error")}finally{p=!1,M.disabled=!1}}y.addEventListener("click",()=>{a=!a,c=!1,v()}),s.querySelector('button[aria-label="Minimize"]').addEventListener("click",()=>{c=!0,v()}),s.querySelector('button[aria-label="Close"]').addEventListener("click",()=>{a=!1,v()}),s.querySelector('button[aria-label="Settings"]').addEventListener("click",t=>{t.stopPropagation(),X()}),W.addEventListener("click",()=>{a=!1,v()}),M.addEventListener("click",()=>{p||Q()}),b.addEventListener("mousedown",t=>{t.target===b&&w()}),K.addEventListener("click",()=>w()),f.querySelector('button[aria-label="Close Settings"]').addEventListener("click",()=>w()),I.addEventListener("click",()=>U()),C.addEventListener("keydown",t=>{t.key==="Enter"&&U(),t.key==="Escape"&&w()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&w()});let A=!1,Y=0,O=0;s.addEventListener("mousedown",t=>{if(t.button!==0||t.target?.closest("button"))return;A=!0;let P=o.getBoundingClientRect();Y=t.clientX-P.left,O=t.clientY-P.top,document.body.style.userSelect="none"}),document.addEventListener("mouseup",()=>{A=!1,document.body.style.userSelect=""}),document.addEventListener("mousemove",t=>{A&&(o.style.left=`${Math.max(0,Math.min(window.innerWidth-o.offsetWidth,t.clientX-Y))}px`,o.style.top=`${Math.max(0,Math.min(window.innerHeight-o.offsetHeight,t.clientY-O))}px`,o.style.right="auto",o.style.bottom="auto")});let V={open:()=>{a=!0,c=!1,v()},close:()=>{a=!1,v()},toggle:()=>{a=!a,c=!1,v()}};return window.__tixlyErrorReporterAPI=V,v(),V}export{ae as initErrorReporter};
//# sourceMappingURL=error-reporter.js.map
