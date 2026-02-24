function re(){return window.location.pathname.split("/")[1]||"dashboard"}function te(){return window.location.href}function ne(){return window.location.hostname.split(".")[0]}function ae(){return localStorage.getItem("tixly_user_name")||"Anonymous"}var I="VITE_CLICKUP_PROJECT_ID",N="VITE_CLICKUP_PROJECT_ID",_=" VITE_CLICKUP_TASK_ID";function Q(t){try{let n=import.meta?.env;if(n&&typeof n[t]=="string"&&n[t].trim())return n[t].trim()}catch{}try{let n=globalThis.process;if(n?.env&&typeof n.env[t]=="string"&&n.env[t].trim())return n.env[t].trim()}catch{}return null}function Z(t){let n=globalThis.require,l=globalThis.process;if(!n||!l?.cwd)return null;let a,d;try{a=n("fs"),d=n("path")}catch{return null}let o=globalThis.__tixlyErrorReporterDotEnvPath||d.join(l.cwd(),".env");try{if(!a.existsSync(o))return null;let p=a.readFileSync(o,"utf8").split(/\r?\n/),f=new RegExp(`^\\s*(?:export\\s+)?${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*=\\s*(.*)\\s*$`);for(let y of p){if(!y||y.trim().startsWith("#"))continue;let i=f.exec(y);if(!i)continue;let s=(i[1]||"").trim();if(!s)return null;if(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))try{return JSON.parse(s)}catch{return s.slice(1,-1)}return s}return null}catch{return null}}function U(){let t=Q(I);if(t)return t;let n=Q(N);if(n)return n;let l=Z(I);if(l?.trim())return l.trim();let a=Z(N);if(a?.trim())return a.trim();try{return(localStorage.getItem(I)||localStorage.getItem(N))?.trim()||null}catch{return null}}async function oe(t,n){let l=globalThis.require,a=globalThis.process;if(!l||!a?.cwd)return{ok:!1,error:"dotEnvWriteUnavailable"};let d,o;try{d=l("fs"),o=l("path")}catch{return{ok:!1,error:"dotEnvWriteUnavailable"}}let c=globalThis.__tixlyErrorReporterDotEnvPath||o.join(a.cwd(),".env"),p="",f=`
`;try{d.existsSync(c)&&(p=d.readFileSync(c,"utf8"),f=p.includes(`\r
`)?`\r
`:`
`)}catch{return{ok:!1,error:"dotEnvReadFailed"}}let y=g=>{let h=g.trim();return h===""||/[\s#"'\r\n]/.test(h)||h.includes("=")?JSON.stringify(h):h},i=p?p.split(/\r?\n/):[],s=new RegExp(`^\\s*${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s*=`),x=i.findIndex(g=>s.test(g));if(!n.trim())x!==-1&&i.splice(x,1);else{let g=`${t}=${y(n)}`;x===-1?i.length>0&&i[i.length-1]?.trim()!==""?i.push(g):i.length>0&&i[i.length-1]?.trim()===""?i.splice(i.length-1,0,g):i.push(g):i[x]=g}let T=i.join(f).replace(/\s+$/g,"")+f;try{return d.writeFileSync(c,T,"utf8"),{ok:!0}}catch{return{ok:!1,error:"dotEnvWriteFailed"}}}function e(t,n,l){let a=document.createElement(t);return n&&Object.entries(n).forEach(([d,o])=>a.setAttribute(d,o)),l&&l.forEach(d=>a.appendChild(d)),a}function m(t){return document.createTextNode(t)}async function ie(t,n,l,a=2,d=500){let o;for(let c=0;c<=a;c++)try{let p=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",apikey:l},body:JSON.stringify(n)});if(!p.ok)throw new Error(`HTTP ${p.status}`);return p}catch(p){o=p,await new Promise(f=>setTimeout(f,d*Math.pow(2,c)))}throw o instanceof Error?o:new Error(String(o))}function se(){let t=document.createElement("style");return t.textContent=`
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
  `,t}function le(t){if(!t||!t.endpoints?.Bug||!t.endpoints?.["New Ticket"]||!t.apiKey)throw new Error("ErrorReporter: Missing required configuration.");if(window.__tixlyErrorReporterInitialized)return window.__tixlyErrorReporterAPI;window.__tixlyErrorReporterInitialized=!0;let n=t.endpoints,l=t.apiKey,a=e("div",{class:"er-root"}),d=se();document.head.appendChild(d),document.body.appendChild(a);let o=!1,c=!1,p=!1,f=r=>({bug:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',send:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.28.53.5 1.1.5 1.69V11a1 1 0 0 0 1 1h.1a2 2 0 0 1 0 4H21a1 1 0 0 0-1 1v.1c0 .59-.22 1.16-.6 1.69z"/></svg>'})[r]||"",y=e("button",{class:"er-badge"});y.innerHTML=`${f("bug")} <span>Report Error</span>`,a.appendChild(y);let i=e("div",{class:"er-widget er-hidden"}),s=e("div",{class:"er-header"},[e("span",{},[m("Error Reporter")]),e("div",{class:"er-header-actions"},[e("button",{class:"er-icon-btn","aria-label":"Settings"},[]),e("button",{class:"er-icon-btn","aria-label":"Minimize"},[]),e("button",{class:"er-icon-btn","aria-label":"Close"},[])])]);s.querySelector('[aria-label="Settings"]').innerHTML=f("settings"),U()&&localStorage.getItem(_)&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),s.querySelector('[aria-label="Minimize"]').innerHTML=f("minimize"),s.querySelector('[aria-label="Close"]').innerHTML=f("close"),i.appendChild(s);let x=e("div",{class:"er-modal-overlay er-hidden"}),T=e("div",{class:"er-modal"}),g=e("div",{class:"er-modal-header"},[e("div",{class:"er-modal-title"},[e("span",{class:"er-modal-icon","aria-hidden":"true"}),e("div",{class:"er-modal-title-text"},[e("span",{},[m("ClickUp Project ID")])])]),e("button",{class:"er-icon-btn","aria-label":"Close Settings"})]);g.querySelector('[aria-label="Close Settings"]').innerHTML=f("close"),g.querySelector(".er-modal-icon").innerHTML=f("settings"),T.appendChild(g);let h=e("div",{class:"er-body"});h.appendChild(e("div",{class:"er-hint-row"},[e("label",{class:"er-label"},[m("Project ID")])]));let S=e("input",{class:"er-input",type:"text",inputmode:"numeric",placeholder:"Enter your ClickUp Project ID\u2026"});h.appendChild(S),h.appendChild(e("div",{class:"er-hint-row"},[e("label",{class:"er-label"},[m("ClickUp Task ID")])]));let P=e("input",{class:"er-input",type:"text",placeholder:"Enter associated ClickUp Task ID\u2026"});h.appendChild(P),h.appendChild(e("div",{class:"er-help"},[m("Values are stored locally and reused automatically.")]));let $=e("div",{class:"er-inline-status"},[m("")]);h.appendChild($),T.appendChild(h);let A=e("div",{class:"er-footer"}),W=e("button",{class:"er-btn"},[m("Cancel")]),R=e("button",{class:"er-btn primary"},[m("Save")]);A.appendChild(W),A.appendChild(R),T.appendChild(A),x.appendChild(T),document.body.appendChild(x);let L=e("div",{class:"er-body"});L.appendChild(e("label",{class:"er-label"},[m("Report Type")]));let V=e("select",{class:"er-input"},[e("option",{value:"Bug"},[m("Bug")]),e("option",{value:"New Ticket"},[m("New Ticket")])]);L.appendChild(V),L.appendChild(e("label",{class:"er-label"},[m("Description")]));let j=e("textarea",{class:"er-textarea",placeholder:"What happened? How can we fix it?"});L.appendChild(j),i.appendChild(L);let D=e("div",{class:"er-footer"}),Y=e("button",{class:"er-btn"},[m("Cancel")]),M=e("button",{class:"er-btn primary"});M.innerHTML="<span>Submit</span>",D.appendChild(Y),D.appendChild(M),i.appendChild(D);let E=e("div",{class:"er-status er-hidden"});i.appendChild(E),a.appendChild(i);function v(){i.classList.toggle("er-hidden",!o||c),y.classList.toggle("er-hidden",o&&!c),o&&!c&&j.focus()}function z(r,u=null){if(!r){E.classList.add("er-hidden");return}E.textContent=r,E.className=`er-status er-${u}`,E.classList.remove("er-hidden","er-fading"),(u==="success"||u==="error")&&setTimeout(()=>{E.classList.add("er-fading"),setTimeout(()=>E.classList.add("er-hidden"),400)},4e3)}function C(r){$.textContent=r||""}function w(){x.classList.add("er-hidden"),C(null)}function G(){let r=U();S.value=r||"";let u=localStorage.getItem(_);P.value=u||"",x.classList.remove("er-hidden"),C(null),setTimeout(()=>S.focus(),0)}async function q(){let r=S.value.trim(),u=P.value.trim();if(!r||!u){C("Both Project ID and Task ID are required");return}u?localStorage.setItem(_,u):localStorage.removeItem(_);try{r?localStorage.setItem(I,r):localStorage.removeItem(I)}catch{}R.disabled=!0,C("Saving...");let k=await oe(I,r);if(R.disabled=!1,k.ok){C("Saved to .env"),r&&u&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>w(),700);return}if(k.error==="dotEnvWriteUnavailable"){C("Saved locally"),r&&u&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>w(),700);return}C("Saved locally (.env write failed)"),r&&u&&s.querySelector('[aria-label="Settings"]')?.classList.add("er-hidden"),setTimeout(()=>w(),900)}async function ee(){let r=U(),u=localStorage.getItem(_)||void 0,k={project_key:r||ne(),module:re(),tab:te(),description:j.value.trim(),reported_by:ae(),clickup_task_id:u};if(!k.description){z("Please describe the issue","error");return}p=!0,M.disabled=!0,z("Sending report...","loading");try{let b=await(await ie(n[V.value],k,l)).json();if(b.success)z("Message sent","success"),j.value="",setTimeout(()=>{o=!1,v()},2e3);else{let B=b.error||"Failed to send report";if(b.details&&b.details[0]){let H=b.details[0];typeof H=="string"&&H.includes("error:")?B=H.split("error:")[1].trim().replace(/["{}]/g,""):B=H}throw new Error(B)}}catch(X){let b=X.message||"Could not send report";b.includes("HTTP")&&(b="Server error. Please try again later."),b.length>60&&(b=b.substring(0,57)+"..."),z(b,"error")}finally{p=!1,M.disabled=!1}}y.addEventListener("click",()=>{o=!o,c=!1,v()}),s.querySelector('button[aria-label="Minimize"]').addEventListener("click",()=>{c=!0,v()}),s.querySelector('button[aria-label="Close"]').addEventListener("click",()=>{o=!1,v()}),s.querySelector('button[aria-label="Settings"]').addEventListener("click",r=>{r.stopPropagation(),G()}),Y.addEventListener("click",()=>{o=!1,v()}),M.addEventListener("click",()=>{p||ee()}),x.addEventListener("mousedown",r=>{r.target===x&&w()}),W.addEventListener("click",()=>w()),g.querySelector('button[aria-label="Close Settings"]').addEventListener("click",()=>w()),R.addEventListener("click",()=>q()),S.addEventListener("keydown",r=>{r.key==="Enter"&&q(),r.key==="Escape"&&w()}),P.addEventListener("keydown",r=>{r.key==="Enter"&&q(),r.key==="Escape"&&w()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&w()});let K=!1,O=0,F=0;s.addEventListener("mousedown",r=>{if(r.button!==0||r.target?.closest("button"))return;K=!0;let k=a.getBoundingClientRect();O=r.clientX-k.left,F=r.clientY-k.top,document.body.style.userSelect="none"}),document.addEventListener("mouseup",()=>{K=!1,document.body.style.userSelect=""}),document.addEventListener("mousemove",r=>{K&&(a.style.left=`${Math.max(0,Math.min(window.innerWidth-a.offsetWidth,r.clientX-O))}px`,a.style.top=`${Math.max(0,Math.min(window.innerHeight-a.offsetHeight,r.clientY-F))}px`,a.style.right="auto",a.style.bottom="auto")});let J={open:()=>{o=!0,c=!1,v()},close:()=>{o=!1,v()},toggle:()=>{o=!o,c=!1,v()}};return window.__tixlyErrorReporterAPI=J,v(),J}export{le as initErrorReporter};
//# sourceMappingURL=error-reporter.js.map
