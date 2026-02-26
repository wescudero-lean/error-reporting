function de(){return window.location.pathname.split("/")[1]||"dashboard"}function ce(){return window.location.href}function pe(){return window.location.hostname.split(".")[0]}function ue(){return localStorage.getItem("tixly_user_name")||"Anonymous"}var R="VITE_CLICKUP_PROJECT_ID",Y="VITE_CLICKUP_PROJECT_ID",U="VITE_CLICKUP_TASK_ID";function J(t){try{let a=import.meta?.env;if(a&&typeof a[t]=="string"&&a[t].trim())return a[t].trim()}catch{}try{let a=globalThis.process;if(a?.env&&typeof a.env[t]=="string"&&a.env[t].trim())return a.env[t].trim()}catch{}return null}function X(t){let a=globalThis.require,l=globalThis.process;if(!a||!l?.cwd)return null;let n,u;try{n=a("fs"),u=a("path")}catch{return null}let o=globalThis.__tixlyErrorReporterDotEnvPath||u.join(l.cwd(),".env");try{if(!n.existsSync(o))return null;let m=n.readFileSync(o,"utf8").split(/\r?\n/),g=new RegExp(`^\\s*(?:export\\s+)?${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*=\\s*(.*)\\s*$`);for(let v of m){if(!v||v.trim().startsWith("#"))continue;let i=g.exec(v);if(!i)continue;let s=(i[1]||"").trim();if(!s)return null;if(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))try{return JSON.parse(s)}catch{return s.slice(1,-1)}return s}return null}catch{return null}}function O(){let t=J(R);if(t)return t;let a=J(Y);if(a)return a;let l=X(R);if(l?.trim())return l.trim();let n=X(Y);if(n?.trim())return n.trim();try{return(localStorage.getItem(R)||localStorage.getItem(Y))?.trim()||null}catch{return null}}function F(){let t=U,a=J(t);if(a?.trim())return a.trim();let l=X(t);if(l?.trim())return l.trim();try{return localStorage.getItem(t)?.trim()||null}catch{return null}}async function ie(t,a){let l=globalThis.require,n=globalThis.process;if(!l||!n?.cwd)return{ok:!1,error:"dotEnvWriteUnavailable"};let u,o;try{u=l("fs"),o=l("path")}catch{return{ok:!1,error:"dotEnvWriteUnavailable"}}let f=globalThis.__tixlyErrorReporterDotEnvPath||o.join(n.cwd(),".env"),m="",g=`
`;try{u.existsSync(f)&&(m=u.readFileSync(f,"utf8"),g=m.includes(`\r
`)?`\r
`:`
`)}catch{return{ok:!1,error:"dotEnvReadFailed"}}let v=h=>{let b=h.trim();return b===""||/[\s#"'\r\n]/.test(b)||b.includes("=")?JSON.stringify(b):b},i=m?m.split(/\r?\n/):[],s=new RegExp(`^\\s*${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*=`),y=i.findIndex(h=>s.test(h));if(!a.trim())y!==-1&&i.splice(y,1);else{let h=`${t}=${v(a)}`;y===-1?i.length>0&&i[i.length-1]?.trim()!==""?i.push(h):i.length>0&&i[i.length-1]?.trim()===""?i.splice(i.length-1,0,h):i.push(h):i[y]=h}let I=i.join(g).replace(/\s+$/g,"")+g;try{return u.writeFileSync(f,I,"utf8"),{ok:!0}}catch{return{ok:!1,error:"dotEnvWriteFailed"}}}function e(t,a,l){let n=document.createElement(t);return a&&Object.entries(a).forEach(([u,o])=>n.setAttribute(u,o)),l&&l.forEach(u=>n.appendChild(u)),n}function c(t){return document.createTextNode(t)}async function fe(t,a,l,n=2,u=500){let o;for(let f=0;f<=n;f++)try{return await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",apikey:l},body:JSON.stringify(a)})}catch(m){o=m,await new Promise(g=>setTimeout(g,u*Math.pow(2,f)))}throw o instanceof Error?o:new Error(String(o))}function ge(){let t=document.createElement("style");return t.textContent=`
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
  `,t}function he(t){if(!t||!t.endpoints?.Bug||!t.endpoints?.["New Ticket"]||!t.apiKey)throw new Error("ErrorReporter: Missing required configuration.");if(window.__tixlyErrorReporterInitialized)return window.__tixlyErrorReporterAPI;window.__tixlyErrorReporterInitialized=!0;let a=t.endpoints,l=t.apiKey,n=e("div",{class:"er-root"}),u=ge();document.head.appendChild(u),document.body.appendChild(n);let o=!1,f=!1,m=!1,g=r=>({bug:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',send:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.28.53.5 1.1.5 1.69V11a1 1 0 0 0 1 1h.1a2 2 0 0 1 0 4H21a1 1 0 0 0-1 1v.1c0 .59-.22 1.16-.6 1.69z"/></svg>'})[r]||"",v=e("button",{class:"er-badge"});v.innerHTML=`${g("bug")} <span>Report Error</span>`,n.appendChild(v);let i=e("div",{class:"er-widget er-hidden"}),s=e("div",{class:"er-header"},[e("span",{},[c("Error Reporter")]),e("div",{class:"er-header-actions"},[e("button",{class:"er-icon-btn","aria-label":"Settings"},[]),e("button",{class:"er-icon-btn","aria-label":"Minimize"},[]),e("button",{class:"er-icon-btn","aria-label":"Close"},[])])]);s.querySelector('[aria-label="Settings"]').innerHTML=g("settings"),O()&&F()&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),s.querySelector('[aria-label="Minimize"]').innerHTML=g("minimize"),s.querySelector('[aria-label="Close"]').innerHTML=g("close"),i.appendChild(s);let y=e("div",{class:"er-modal-overlay er-hidden"}),I=e("div",{class:"er-modal"}),h=e("div",{class:"er-modal-header"},[e("div",{class:"er-modal-title"},[e("span",{class:"er-modal-icon","aria-hidden":"true"}),e("div",{class:"er-modal-title-text"},[e("span",{},[c("ClickUp Project ID")])])]),e("button",{class:"er-icon-btn","aria-label":"Close Settings"})]);h.querySelector('[aria-label="Close Settings"]').innerHTML=g("close"),h.querySelector(".er-modal-icon").innerHTML=g("settings"),I.appendChild(h);let b=e("div",{class:"er-body"});b.appendChild(e("div",{class:"er-hint-row"},[e("label",{class:"er-label"},[c("Project ID")])]));let _=e("input",{class:"er-input",type:"text",inputmode:"numeric",placeholder:"Enter your ClickUp Project ID\u2026"});b.appendChild(_),b.appendChild(e("div",{class:"er-hint-row"},[e("label",{class:"er-label"},[c("ClickUp Task ID")])]));let H=e("input",{class:"er-input",type:"text",placeholder:"Enter associated ClickUp Task ID\u2026"});b.appendChild(H),b.appendChild(e("div",{class:"er-help"},[c("Values are stored locally and reused automatically.")]));let Q=e("div",{class:"er-inline-status"},[c("")]);b.appendChild(Q),I.appendChild(b);let q=e("div",{class:"er-footer"}),Z=e("button",{class:"er-btn"},[c("Cancel")]),A=e("button",{class:"er-btn primary"},[c("Save")]);q.appendChild(Z),q.appendChild(A),I.appendChild(q),y.appendChild(I),document.body.appendChild(y);let x=e("div",{class:"er-body"});x.appendChild(e("label",{class:"er-label"},[c("Report Type")]));let G=e("select",{class:"er-input"},[e("option",{value:"Bug"},[c("Bug")]),e("option",{value:"New Ticket"},[c("New Ticket")])]);x.appendChild(G),x.appendChild(e("label",{class:"er-label"},[c("Email")]));let K=e("input",{class:"er-input",type:"email",placeholder:"Enter your email\u2026"});try{let r=localStorage.getItem("tixly_user_email");r&&(K.value=r)}catch{}x.appendChild(K),x.appendChild(e("label",{class:"er-label"},[c("Name")]));let B=e("input",{class:"er-input",type:"text",placeholder:"Enter your name\u2026"});try{let r=localStorage.getItem("tixly_user_name");r&&(B.value=r)}catch{}x.appendChild(B),x.appendChild(e("label",{class:"er-label"},[c("SLA Urgency")]));let ee=e("select",{class:"er-input"},[e("option",{value:"urgent"},[c("urgent")]),e("option",{value:"normal",selected:"true"},[c("normal")]),e("option",{value:"not urgent"},[c("not urgent")])]);x.appendChild(ee),x.appendChild(e("label",{class:"er-label"},[c("Description")]));let D=e("textarea",{class:"er-textarea",placeholder:"What happened? How can we fix it?"});x.appendChild(D),i.appendChild(x);let N=e("div",{class:"er-footer"}),re=e("button",{class:"er-btn"},[c("Cancel")]),j=e("button",{class:"er-btn primary"});j.innerHTML="<span>Submit</span>",N.appendChild(re),N.appendChild(j),i.appendChild(N);let C=e("div",{class:"er-status er-hidden"});i.appendChild(C),n.appendChild(i);function k(){i.classList.toggle("er-hidden",!o||f),v.classList.toggle("er-hidden",o&&!f),o&&!f&&D.focus()}function L(r,p=null){if(!r){C.classList.add("er-hidden");return}C.textContent=r,C.className=`er-status er-${p}`,C.classList.remove("er-hidden","er-fading"),(p==="success"||p==="error")&&setTimeout(()=>{C.classList.add("er-fading"),setTimeout(()=>C.classList.add("er-hidden"),400)},4e3)}function T(r){Q.textContent=r||""}function E(){y.classList.add("er-hidden"),T(null)}function se(){let r=O();_.value=r||"";let p=F();H.value=p||"",y.classList.remove("er-hidden"),T(null),setTimeout(()=>_.focus(),0)}async function $(){let r=_.value.trim(),p=H.value.trim();if(!r||!p){T("Both Project ID and Task ID are required");return}p?localStorage.setItem(U,p):localStorage.removeItem(U);try{r?localStorage.setItem(R,r):localStorage.removeItem(R)}catch{}A.disabled=!0,T("Saving...");let S=await ie(R,r),M=await ie(U,p);if(A.disabled=!1,S.ok&&M.ok){T("Saved to .env"),r&&p&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>E(),700);return}if(S.error==="dotEnvWriteUnavailable"||M.error==="dotEnvWriteUnavailable"){T("Saved locally"),r&&p&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>E(),700);return}T("Saved locally (.env write failed)"),r&&p&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>E(),900)}async function le(){let r=O(),p=F()||void 0,S=ee.value||"normal",M=(K.value||"").trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(M)){L("Please enter a valid email","error");return}try{localStorage.setItem("tixly_user_email",M)}catch{}let W=(B.value||"").trim()||ue();try{W&&localStorage.setItem("tixly_user_name",W)}catch{}let oe={project_key:r||pe(),module:de(),tab:ce(),description:D.value.trim(),reported_by:M,reported_by_name:W,clickup_task_id:p,sla_urgency:S};if(!oe.description){L("Please describe the issue","error");return}m=!0,j.disabled=!0,L("Sending report...","loading");try{let z=await fe(a[G.value],oe,l),d;try{d=await z.json()}catch{d={success:!1,error:await z.text().catch(()=>"")||`HTTP ${z.status}`}}if(d.success)L("Message sent","success"),D.value="",setTimeout(()=>{o=!1,k()},2e3);else{let w="";if(Array.isArray(d.errors)&&d.errors.length)w=String(d.errors[0]);else if(Array.isArray(d.details)&&d.details.length){let P=d.details[0];w=typeof P=="string"?P:String(P),typeof P=="string"&&P.includes("error:")&&(w=P.split("error:")[1].trim().replace(/["{}]/g,""))}else typeof d.error=="string"&&d.error.trim()?w=d.error.trim():w="Failed to send report";w.length>60&&(w=w.substring(0,57)+"..."),L(w,"error")}}catch(z){let d=z.message||"Could not send report";d.includes("HTTP")&&(d="Server error. Please try again later."),d.length>60&&(d=d.substring(0,57)+"..."),L(d,"error")}finally{m=!1,j.disabled=!1}}v.addEventListener("click",()=>{o=!o,f=!1,k()}),s.querySelector('button[aria-label="Minimize"]').addEventListener("click",()=>{f=!0,k()}),s.querySelector('button[aria-label="Close"]').addEventListener("click",()=>{o=!1,k()}),s.querySelector('button[aria-label="Settings"]').addEventListener("click",r=>{r.stopPropagation(),se()}),re.addEventListener("click",()=>{o=!1,k()}),j.addEventListener("click",()=>{m||le()}),y.addEventListener("mousedown",r=>{r.target===y&&E()}),Z.addEventListener("click",()=>E()),h.querySelector('button[aria-label="Close Settings"]').addEventListener("click",()=>E()),A.addEventListener("click",()=>$()),_.addEventListener("keydown",r=>{r.key==="Enter"&&$(),r.key==="Escape"&&E()}),H.addEventListener("keydown",r=>{r.key==="Enter"&&$(),r.key==="Escape"&&E()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&E()});let V=!1,te=0,ae=0;s.addEventListener("mousedown",r=>{if(r.button!==0||r.target?.closest("button"))return;V=!0;let S=n.getBoundingClientRect();te=r.clientX-S.left,ae=r.clientY-S.top,document.body.style.userSelect="none"}),document.addEventListener("mouseup",()=>{V=!1,document.body.style.userSelect=""}),document.addEventListener("mousemove",r=>{V&&(n.style.left=`${Math.max(0,Math.min(window.innerWidth-n.offsetWidth,r.clientX-te))}px`,n.style.top=`${Math.max(0,Math.min(window.innerHeight-n.offsetHeight,r.clientY-ae))}px`,n.style.right="auto",n.style.bottom="auto")});let ne={open:()=>{o=!0,f=!1,k()},close:()=>{o=!1,k()},toggle:()=>{o=!o,f=!1,k()}};return window.__tixlyErrorReporterAPI=ne,k(),ne}export{he as initErrorReporter};
//# sourceMappingURL=error-reporter.js.map
