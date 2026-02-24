function H(){return window.location.pathname.split("/")[1]||"dashboard"}function I(){return window.location.href}function j(){return window.location.hostname.split(".")[0]}function B(){return localStorage.getItem("tixly_user_name")||"Anonymous"}function r(o,u,f){let t=document.createElement(o);return u&&Object.entries(u).forEach(([p,e])=>t.setAttribute(p,e)),f&&f.forEach(p=>t.appendChild(p)),t}function h(o){return document.createTextNode(o)}async function A(o,u,f,t=2,p=500){let e;for(let i=0;i<=t;i++)try{let d=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",apikey:f},body:JSON.stringify(u)});if(!d.ok)throw new Error(`HTTP ${d.status}`);return d}catch(d){e=d,await new Promise(m=>setTimeout(m,p*Math.pow(2,i)))}throw e instanceof Error?e:new Error(String(e))}function N(){let o=document.createElement("style");return o.textContent=`
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
  `,o}function Y(o){if(!o||!o.endpoints?.Bug||!o.endpoints?.["New Ticket"]||!o.apiKey)throw new Error("ErrorReporter: Missing required configuration.");if(window.__tixlyErrorReporterInitialized)return window.__tixlyErrorReporterAPI;window.__tixlyErrorReporterInitialized=!0;let u=o.endpoints,f=o.apiKey,t=r("div",{class:"er-root"}),p=N();document.head.appendChild(p),document.body.appendChild(t);let e=!1,i=!1,d=!1,m=n=>({bug:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',send:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'})[n]||"",v=r("button",{class:"er-badge"});v.innerHTML=`${m("bug")} <span>Report Error</span>`,t.appendChild(v);let g=r("div",{class:"er-widget er-hidden"}),b=r("div",{class:"er-header"},[r("span",{},[h("Error Reporter")]),r("div",{class:"er-header-actions"},[r("button",{class:"er-icon-btn","aria-label":"Minimize"},[]),r("button",{class:"er-icon-btn","aria-label":"Close"},[])])]);b.querySelector('[aria-label="Minimize"]').innerHTML=m("minimize"),b.querySelector('[aria-label="Close"]').innerHTML=m("close"),g.appendChild(b);let x=r("div",{class:"er-body"});x.appendChild(r("label",{class:"er-label"},[h("Report Type")]));let R=r("select",{class:"er-input"},[r("option",{value:"Bug"},[h("Bug")]),r("option",{value:"New Ticket"},[h("New Ticket")])]);x.appendChild(R),x.appendChild(r("label",{class:"er-label"},[h("Description")]));let w=r("textarea",{class:"er-textarea",placeholder:"What happened? How can we fix it?"});x.appendChild(w),g.appendChild(x);let M=r("div",{class:"er-footer"}),L=r("button",{class:"er-btn"},[h("Cancel")]),y=r("button",{class:"er-btn primary"});y.innerHTML="<span>Submit</span>",M.appendChild(L),M.appendChild(y),g.appendChild(M);let c=r("div",{class:"er-status er-hidden"});g.appendChild(c),t.appendChild(g);function l(){g.classList.toggle("er-hidden",!e||i),v.classList.toggle("er-hidden",e&&!i),e&&!i&&w.focus()}function k(n,s=null){if(!n){c.classList.add("er-hidden");return}c.textContent=n,c.className=`er-status er-${s}`,c.classList.remove("er-hidden","er-fading"),(s==="success"||s==="error")&&setTimeout(()=>{c.classList.add("er-fading"),setTimeout(()=>c.classList.add("er-hidden"),400)},4e3)}async function S(){let n={project_key:j(),module:H(),tab:I(),description:w.value.trim(),reported_by:B()};if(!n.description){k("Please describe the issue","error");return}d=!0,y.disabled=!0,k("Sending report...","loading");try{let a=await(await A(u[R.value],n,f)).json();if(a.success)k("Message sent","success"),w.value="",setTimeout(()=>{e=!1,l()},2e3);else{let C=a.error||"Failed to send report";if(a.details&&a.details[0]){let E=a.details[0];typeof E=="string"&&E.includes("error:")?C=E.split("error:")[1].trim().replace(/["{}]/g,""):C=E}throw new Error(C)}}catch(s){let a=s.message||"Could not send report";a.includes("HTTP")&&(a="Server error. Please try again later."),a.length>60&&(a=a.substring(0,57)+"..."),k(a,"error")}finally{d=!1,y.disabled=!1}}v.addEventListener("click",()=>{e=!e,i=!1,l()}),b.querySelector('button[aria-label="Minimize"]').addEventListener("click",()=>{i=!0,l()}),b.querySelector('button[aria-label="Close"]').addEventListener("click",()=>{e=!1,l()}),L.addEventListener("click",()=>{e=!1,l()}),y.addEventListener("click",()=>{d||S()});let T=!1,P=0,z=0;b.addEventListener("mousedown",n=>{T=!0;let s=t.getBoundingClientRect();P=n.clientX-s.left,z=n.clientY-s.top,document.body.style.userSelect="none"}),document.addEventListener("mouseup",()=>{T=!1,document.body.style.userSelect=""}),document.addEventListener("mousemove",n=>{T&&(t.style.left=`${Math.max(0,Math.min(window.innerWidth-t.offsetWidth,n.clientX-P))}px`,t.style.top=`${Math.max(0,Math.min(window.innerHeight-t.offsetHeight,n.clientY-z))}px`,t.style.right="auto",t.style.bottom="auto")});let _={open:()=>{e=!0,i=!1,l()},close:()=>{e=!1,l()},toggle:()=>{e=!e,i=!1,l()}};return window.__tixlyErrorReporterAPI=_,l(),_}export{Y as initErrorReporter};
//# sourceMappingURL=error-reporter.js.map
