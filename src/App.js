import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ListTree, MessageSquare, Sparkles, Copy, Check, ExternalLink } from "lucide-react";

function TryItScript() {
  const steps = [
    {
      title: "Start in Sales",
      you: "I need a refund for my last charge.",
      bot: "Sounds like Billing can help you faster. (shows Bot Card → “Talk to Billing”)",
      action: "Click the Bot Card → instant switch to Billing (avatar/title update)."
    },
    {
      title: "Query Preview (in Sales)",
      you: "I was charged twice and can't log in.",
      bot: "Sales replies with a Query Preview Bot List.",
      previews: [
        { bot: "Billing", text: "I can help with a duplicate charge—…" },
        { bot: "Support", text: "If you can't log in, try a password reset—…" }
      ],
      action: "Open the Bot List, review the preview answers, then pick the most relevant bot."
    },
    {
      title: "In Billing",
      you: "Also I can't log into the portal.",
      bot: "That's a quick fix for Support. (shows Bot Card → “Talk to Support”)",
      action: "Click the card → switch to Support."
    },
    {
      title: "In Support",
      you: "Great, and if I want to upgrade plans later?",
      bot: "Sales can help with pricing/upgrade. (show Bot List)",
      action: "Open the Bot List → show all three departments, click Sales to prove round-trip."
    },
    {
      title: "From any bot",
      you: "I want to switch departments.",
      bot: "Shows a Bot List so you can choose another department.",
      action: "Open the list and select a destination (e.g., Sales) to switch."
    }
  ];

  return (
    <div className="card card--glow" style={{ padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Guided Script</h3>
      <p className="muted" style={{ marginTop: 6 }}>
        Use the chat bubble in the bottom-right and follow the dialogue below. Type or paste each line to move through the flow.
      </p>

      <div style={{ display: "grid", gap: 14, marginTop: 8 }}>
        {steps.map((s, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,.85)",
                  color: "#0b0c10",
                  fontWeight: 800
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>{s.title}</div>
            </div>

            {/* Script rows */}
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 12, opacity: 0.85 }}>You say</div>
                <div className="card" style={{ padding: 12 }}>
                  <div>“{s.you}”</div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 12, opacity: 0.85 }}>Bot replies</div>
                <div className="card" style={{ padding: 12 }}>
                  <div>“{s.bot}”</div>
                </div>
              </div>

              {/* Forwarding previews (optional) */}
              {Array.isArray(s.previews) && s.previews.length > 0 && (
                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>Forwarding previews</div>
                  <div
                    style={{
                      display: "grid",
                      gap: 10,
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
                    }}
                  >
                    {s.previews.map((p, idx) => (
                      <div key={idx} className="card" style={{ padding: 12 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{p.bot}</div>
                        <div className="muted">{p.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 12, opacity: 0.85 }}>What to click</div>
                <div className="card" style={{ padding: 12 }}>
                  <div>{s.action}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 16, marginTop: 12 }}>
        <h4 style={{ marginTop: 0 }}>Call-out</h4>
        <p className="muted" style={{ margin: 0 }}>
          Notice the name/avatar/theme change on each switch, and how you can route using <b>Bot Card</b> for a single
          best destination or <b>Bot List</b> to offer multiple choices. <b>Pro tip:</b> From <i>any</i> bot, type
          “I want to switch departments” to open a Bot List.
        </p>
      </div>
    </div>
  );
}




/* -------- Preview component so "Bot Card Preview" compiles -------- */
function MockBotCardPreview({ name = "Support Bot", buttonText = "Talk with Support" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        boxShadow: "0 8px 24px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          height: 40,
          width: 40,
          borderRadius: 12,
          background: "#ffffff",
          color: "#1a1d29",
          display: "grid",
          placeItems: "center",
          fontWeight: 700,
        }}
      >
        {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>Agent handoff card</div>
      </div>
      <button
        style={{
          padding: "8px 12px",
          borderRadius: 12,
          background: "linear-gradient(135deg, var(--brand), var(--brand2))",
          color: "#0b0c10",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

/**
 * AgentOne Demo – Fully styled (no Tailwind required)
 * - Pure CSS (injected below) so it looks great even without Tailwind/shadcn.
 * - Fancy gradient header, glass cards, animated tabs, polished code blocks.
 * - Replace botId/botListId in examples with real values as needed.
 */

const EXAMPLE_BOT_CARD = {
  botcopy: [
    {
      botCard: {
        buttonText: "Talk with Support",
        botId: "64f8c2a1e9b9ab0012345678",
      },
    },
  ],
};

const EXAMPLE_BOT_LIST = {
  botcopy: [
    {
      botList: {
        title: "Select a Department",
        botListId: "689e531025dd6e35a13da776",
      },
    },
  ],
};

// Bot List with forwarding enabled
const EXAMPLE_BOT_LIST_FORWARD = {
  botcopy: [
    {
      botList: {
        title: "Select a Department",
        botListId: "689e531025dd6e35a13da776",
        enableForwarding: true,
      },
    },
  ],
};

const EXAMPLE_BOT_LIST_BOTS_FORWARD = {
  botcopy: [
    {
      botList: {
        title: "Select a Department",
        bots: [
          { id: "689e531025dd6e35a13da776" },
          { id: "689e531025dd6e35a13da777" },
          { id: "689e531025dd6e35a13da778" }
        ],
        enableForwarding: true
      }
    }
  ]
};


// Alternative: provide bot IDs directly
const EXAMPLE_BOT_LIST_BOTS = {
  botcopy: [
    {
      botList: {
        title: "Select a Department",
        bots: [
          { id: "689e531025dd6e35a13da776" },
          { id: "689e531025dd6e35a13da777" },
          { id: "689e531025dd6e35a13da778" },
        ],
      },
    },
  ],
};

function StyleInjector() {
  return (
    <style>{`
      :root{
        --bg: #0b0c10;
        --card: rgba(255,255,255,0.08);
        --card-strong: rgba(255,255,255,0.12);
        --text: #e9ecf1;
        --muted: #cdd7ff;
        --brand: #36417f;
        --brand2: #98a5e1;
        --ring: #b6a7ff66;
        --success: #47d799;
        --code-bg: #0f1222;
      }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; background: radial-gradient(1200px 800px at 85% -10%, #1b1a2a 0%, #0c0f18 45%, #0b0c10 100%); color:var(--text);}
      a{color:inherit}

      .container{max-width:1200px;margin:0 auto;padding:24px}

      /* Header */
      .navbar{position:sticky;top:0;z-index:50;backdrop-filter:saturate(1.2) blur(10px); background:linear-gradient(180deg, rgba(12,14,22,0.9), rgba(12,14,22,0.6)); border-bottom:1px solid rgba(255,255,255,0.06)}
      .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:22px 32px}
      .brand{display:flex;gap:16px;align-items:center} 
      .brand-icon{height:36px;width:36px;border-radius:12px;display:none} /* replaced by .brand-logo */
      .brand-logo img{height:clamp(32px,5vw,64px);width:auto;display:block;image-rendering:auto}   
      .brand-logo{display:flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);backdrop-filter:blur(6px)}   
      .brand h1{margin:0;font-size:24px;letter-spacing:0.2px;line-height:1.15} 
      .nav-btn{display:inline-flex;gap:8px;align-items:center;font-size:13px;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.02);cursor:pointer;color:var(--text);transition:all .2s}
      .nav-btn:hover{background:rgba(255,255,255,0.08);transform:translateY(-1px)}

      /* Hero */
      .hero{position:relative; padding:40px 24px 8px}
      .hero-gradient{position:absolute;inset:-120px -40px auto -40px;height:360px;background:radial-gradient(600px 260px at 20% 10%, color-mix(in srgb, var(--brand) 55%, transparent) 0%, transparent 60%), radial-gradient(620px 280px at 80% 0%, color-mix(in srgb, var(--brand2) 65%, transparent) 0%, transparent 60%); filter:blur(30px); opacity:0.95; pointer-events:none; animation:glowShift 14s ease-in-out infinite alternate;}
      .hero-card{position:relative;border:1px solid rgba(255,255,255,0.12);background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); border-radius:20px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,0.35)}
      .hero-title{font-size:28px;margin:0 0 6px}
      .hero-sub{margin:0;color:var(--muted);font-size:14px}

      /* Layout */
      .grid{display:grid;grid-template-columns:1fr;gap:18px;margin-top:18px}
      @media(min-width:1024px){.grid{grid-template-columns:1fr}}

      /* Tabs */
      .tabs{display:flex;gap:8px;margin-top:14px}
      .tab{display:inline-flex;gap:8px;align-items:center;padding:10px 14px;border-radius:14px;border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04);font-size:13px;cursor:pointer;transition:all .2s}
      .tab:hover{transform:translateY(-1px);background:rgba(255,255,255,0.08)}
      .tab.active{background:linear-gradient(180deg, rgba(124,92,255,0.25), rgba(124,92,255,0.12)); border-color:var(--ring); box-shadow:0 6px 18px rgba(124,92,255,0.22)}

      /* Cards */
      .card{border:1px solid rgba(255,255,255,0.12); background:linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); border-radius:18px; padding:20px; box-shadow:0 10px 30px rgba(0,0,0,0.35)}
      .card h2{margin:0 0 8px}
      .muted{color:var(--muted); font-size:14px}

      /* Steps */
      .steps{display:grid;gap:14px}
      .step{display:flex;gap:12px}
      .step-badge{height:38px;width:38px;border-radius:12px;background:rgba(255,255,255,0.9);color:#1a1d29; display:grid;place-items:center; box-shadow:0 8px 20px rgba(0,0,0,0.25)}
      .step h4{margin:2px 0 4px}
      .step p{margin:0;color:var(--muted);font-size:14px}

      /* Code block */
      .code{position:relative;background:var(--code-bg);color:#d6e1ff;border-radius:16px;padding:14px;border:1px solid #343a5a}
      .code pre{margin:0;overflow:auto;font-size:12px;line-height:1.5}
      .code-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
      .pill{font-size:11px;color:#bdc7ff;background:#1a1f3d;border:1px solid #2a3162;padding:6px 10px;border-radius:999px}
      .copy{display:inline-flex;gap:8px;align-items:center;font-size:12px;padding:6px 10px;border-radius:999px;border:1px solid #3b437a;background:#1a1f3d;cursor:pointer;color:#dfe5ff}
      .copy:hover{background:#202555}
      .copied{background:#153c2e;border-color:#1e6f53}

      /* Footer */
      .footer{border-top:1px solid rgba(255,255,255,0.08); margin-top:22px}
      .footer-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:18px 0;color:var(--muted);font-size:12px}

      /* Ensure Botcopy widget text uses its own variables (not site defaults) */
      #botcopy-react-root p,
      #botcopy-react-root li,
      #botcopy-react-root span,
      #botcopy-react-root a,
      #botcopy-react-root h1,#botcopy-react-root h2,#botcopy-react-root h3,#botcopy-react-root h4,#botcopy-react-root h5,#botcopy-react-root h6,
      #botcopy-react-root small,#botcopy-react-root code{
        color: var(--bcBotResponseFontColor, #111827) !important;
      }
      /* Ensure any component that references generic --text inside the widget uses dark text */
      #botcopy-react-root { --text: #111827 !important; }
      /* Prefer widget vars, but fall back to --text (now dark) */
      #botcopy-react-root *:where(p,li,span,a,small,code,h1,h2,h3,h4,h5,h6){
        color: var(--bcBotResponseFontColor, var(--text, #111827)) !important;
      }
      #botcopy-react-root .bc-card-title{ color: var(--bcCardTitleColor, var(--bcBotResponseFontColor, #111827)) !important; }
      #botcopy-react-root .bc-card-subtitle{ color: var(--bcCardSubtitleColor, #374151) !important; }

      /* Force Botcopy Bot List text to dark on white backgrounds */
      #botcopy-react-root, #botcopy-react-root * {
        --bcBotResponseFontColor: #111827 !important;  /* primary text */
        --bcMenuFontColor:        #111827 !important;  /* list/menu text */
        --bcCardTitleColor:       #111827 !important;  /* card/list titles */
        --bcCardSubtitleColor:    #374151 !important;  /* secondary text */
      }
      /* Extra safety: target common bot list containers without touching buttons/icons */
      #botcopy-react-root [class*="botlist"],
      #botcopy-react-root [class*="bot-list"],
      #botcopy-react-root .bc-list,
      #botcopy-react-root .bc-list *:not(button):not([role="button"]):not(svg):not(path) {
        color: #111827 !important;
      }

      /* Readability & animations */
      h1,h2,h3,h4,h5,h6,p,li,small,code{color:var(--text)}
      .tab{color:var(--text)}
      .tab.active{color:#fff}
      .hero-card{animation:riseIn .6s ease-out both;backdrop-filter:blur(6px)}
      @keyframes riseIn{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes glowShift{0%{filter:blur(30px) saturate(1);transform:translateY(0)}100%{filter:blur(36px) saturate(1.2);transform:translateY(-6px)}}
      .hero-orb{position:absolute;border-radius:999px;filter:blur(24px);opacity:.6;pointer-events:none}
      .hero-orb--1{width:200px;height:200px;right:6%;top:-30px;background:radial-gradient(closest-side,var(--brand2),transparent 70%);animation:floatY 12s ease-in-out infinite}
      .hero-orb--2{width:260px;height:260px;left:4%;top:20px;background:radial-gradient(closest-side,var(--brand),transparent 70%);animation:floatY 10s ease-in-out -2s infinite}
      @keyframes floatY{0%{transform:translateY(0)}50%{transform:translateY(8px)}100%{transform:translateY(0)}}
      .code pre{color:#eaf0ff}
      ::selection{background:color-mix(in srgb,var(--brand) 25%, #ffffff20);}
      .hero-title{letter-spacing:.2px;text-shadow:0 2px 12px #0006}
      .nav-btn:hover{background:rgba(255,255,255,0.08);transform:translateY(-1px)}
    `}</style>
  );
}

function CodeBlock({ label, codeObj }) {
  const [copied, setCopied] = useState(false);
  const json = useMemo(() => JSON.stringify(codeObj, null, 2), [codeObj]);
  const timeoutRef = useRef(null);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1100);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="code">
      <div className="code-top">
        <span className="pill">{label}</span>
        <button className={`copy ${copied ? "copied" : ""}`} onClick={onCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy JSON"}
        </button>
      </div>
      <pre><code>{json}</code></pre>
    </div>
  );
}

function Step({ icon: Icon, title, children }) {
  return (
    <div className="step">
      <div className="step-badge"><Icon size={16} /></div>
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

function FancyStyle(){
  return (
    <style>{`
      :root{--mx:0px;--my:0px}
      /* Shine animation for hero title */
      .shine-title{background:linear-gradient(90deg,#ffffff 0%, var(--brand2) 30%, #ffffff 60%); -webkit-background-clip:text; background-clip:text; color:transparent; background-size:200% 100%; animation:shineSlide 6s linear infinite}
      @keyframes shineSlide{0%{background-position:200% 0}100%{background-position:-200% 0}}

      /* Buttons */
      .btn{display:inline-flex;align-items:center;gap:8px;font-weight:600; padding:10px 14px;border-radius:12px; border:1px solid rgba(255,255,255,.16); cursor:pointer; transition:transform .16s ease, background .2s ease}
      .btn:active{transform:translateY(1px)}
      .btn-primary{background:linear-gradient(135deg,var(--brand),var(--brand2)); color:#0b0c10; border-color:transparent; box-shadow:0 10px 24px rgba(0,0,0,.35)}
      .btn-primary:hover{filter:saturate(1.05)}
      .btn-ghost{background:rgba(255,255,255,.05); color:var(--text)}
      .btn-ghost:hover{background:rgba(255,255,255,.1)}

      /* Reveal on scroll */
      .will-reveal{opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s cubic-bezier(.2,.65,.2,1)}
      .will-reveal.reveal{opacity:1; transform:translateY(0)}

      /* Animated gradient border glow */
      .card--glow{position:relative}
      .card--glow::before{content:""; position:absolute; inset:0; padding:1px; border-radius:18px; background:linear-gradient(135deg, rgba(54,65,127,.65), rgba(152,165,225,.25)); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; animation:borderFlow 6s ease-in-out infinite}
      @keyframes borderFlow{0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}}

      /* Parallax for hero gradient */
      .hero-gradient{transform:translate3d(calc(var(--mx) * .06), calc(var(--my) * .05), 0); transition:transform .08s linear}
    `}</style>
  );
}

function Props({ rows }) {
  return (
    <div style={{display:'grid', gap:8, marginTop:4}}>
      {rows.map((r) => (
        <div key={r.name} style={{display:'grid', gridTemplateColumns:'120px 110px 1fr', gap:10, alignItems:'start', fontSize:13}}>
          <div style={{fontWeight:700}}>{r.name}</div>
          <div style={{opacity:.9, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace'}}>{r.type}</div>
          <div style={{color:'var(--muted)'}}>{r.description}</div>
        </div>
      ))}
    </div>
  );
}

export default function AgentOneDemo() {
  const [activeTab, setActiveTab] = useState("overview");

  // IMPORTANT: Put the Botcopy embed snippet in public/index.html (outside React).
  useEffect(() => {}, []);

  useEffect(() => {
    // Scroll reveal for .will-reveal elements
    const els = document.querySelectorAll('.will-reveal');

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

      els.forEach((el) => io.observe(el));

      // Kick off anything already in view
      requestAnimationFrame(() => {
        els.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.9) el.classList.add('reveal');
        });
      });

      // Mouse parallax for hero gradient
      const onMove = (ev) => {
        const x = (ev.clientX / window.innerWidth - 0.5) * 16; // px
        const y = (ev.clientY / window.innerHeight - 0.5) * 14; // px
        document.documentElement.style.setProperty('--mx', x + 'px');
        document.documentElement.style.setProperty('--my', y + 'px');
      };
      window.addEventListener('mousemove', onMove);

      return () => {
        window.removeEventListener('mousemove', onMove);
        io.disconnect();
      };
    } else {
      // Fallback: reveal everything
      els.forEach((el) => el.classList.add('reveal'));
    }
  }, [activeTab]);

  // --- Force dark text inside Botcopy widget (resilient to widget re-theming) ---
  useEffect(() => {
    const injectStyleOnce = () => {
      if (document.getElementById('botcopy-color-override')) return;
      const st = document.createElement('style');
      st.id = 'botcopy-color-override';
      st.textContent = `
#botcopy-react-root :where(p,li,span,a,small,code,h1,h2,h3,h4,h5,h6){ color:#111827 !important; }
#botcopy-react-root [class*="botlist"],
#botcopy-react-root [class*="bot-list"],
#botcopy-react-root .bc-list,
#botcopy-react-root .bc-card,
#botcopy-react-root .bc-card *,
#botcopy-react-root .bc-item,
#botcopy-react-root .bc-item * { color:#111827 !important; }
      `;
      document.head.appendChild(st);
    };

    const applyVars = () => {
      const root = document.querySelector('#botcopy-react-root');
      if (!root) return false;
      root.style.setProperty('--bcBotResponseFontColor', '#111827', 'important');
      root.style.setProperty('--bcMenuFontColor', '#111827', 'important');
      root.style.setProperty('--bcCardTitleColor', '#111827', 'important');
      root.style.setProperty('--bcCardSubtitleColor', '#374151', 'important');
      root.style.setProperty('--text', '#111827', 'important'); // in case generic var is used
      return true;
    };

    injectStyleOnce();

    let tries = 0;
    const tick = setInterval(() => {
      if (applyVars() || ++tries > 20) clearInterval(tick);
    }, 300);

    // Re-apply when the widget mutates (opening lists/cards, re-theming)
    const mo = new MutationObserver(() => { applyVars(); });
    const startObs = () => {
      const root = document.querySelector('#botcopy-react-root');
      if (root) mo.observe(root, { childList: true, attributes: true, subtree: true });
    };
    startObs();
    const waitForRoot = setInterval(() => {
      if (document.querySelector('#botcopy-react-root')) { startObs(); clearInterval(waitForRoot); }
    }, 300);

    return () => { clearInterval(tick); clearInterval(waitForRoot); mo.disconnect(); };
  }, []);

  return (
    <div>
      <StyleInjector />
      <FancyStyle />

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-inner container">
          <div className="brand">
            <div className="brand-logo"><img src={`${process.env.PUBLIC_URL}/botcopy-logo.png`} alt="Botcopy logo" /></div>
            <div>
              <h1>AgentOne Demo</h1>
              <div style={{fontSize:12, color:"var(--muted)"}}>Bot Cards • Bot Lists • Live Try-It</div>
            </div>
          </div>
          <a href="https://docs.botcopy.com/" target="_blank" rel="noreferrer" className="nav-btn">
            Official Docs <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-gradient"/>
        <div className="hero-orb hero-orb--1"/>
        <div className="hero-orb hero-orb--2"/>
        <div className="container">
          <div className="hero-card">
            <h2 className="hero-title shine-title">Orchestrate multi-bot experiences with AgentOne</h2>
            <p className="hero-sub">Use Bot Cards for single-click switches and Bot Lists for curated department menus — then try them live in the chat.</p>
            <div className="tabs">
              {[
                { key: "overview", label: "Overview", icon: Sparkles },
                { key: "botcard", label: "Bot Card", icon: BookOpen },
                { key: "botlist", label: "Bot List", icon: ListTree },
                { key: "tryit", label: "Live Try-It", icon: MessageSquare },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  className={`tab ${activeTab === key ? "active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="container grid">
        {/* MAIN */}
        <main>
          {activeTab === "overview" && (
  <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card card--glow will-reveal">
    <h2>AgentOne at a glance</h2>
    <p className="muted">
      AgentOne lets you orchestrate <b>multi-bot experiences</b> directly in chat. Use <b>Bot Card</b> for a single, high-intent
      handoff and <b>Bot Lists</b> when users should choose among multiple destinations. Optionally enable <b>Forwarding</b> to
      preview responses from several bots before switching.
    </p>

    {/* Highlights */}
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 12 }}>
      <div className="card card--glow will-reveal" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <BookOpen size={18} /> Bot Card
        </h3>
        <p className="muted" style={{ margin: 0 }}>
          One clear CTA that <b>instantly switches</b> to a target bot found by <code>botId</code>.
        </p>
      </div>
      <div className="card card--glow will-reveal" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <ListTree size={18} /> Bot Lists
        </h3>
        <p className="muted" style={{ margin: 0 }}>
          Curated menu of bots by <code>botListId</code> or explicit <code>bots</code> array.
        </p>
      </div>
      <div className="card card--glow will-reveal" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles size={18} /> Forwarding
        </h3>
        <p className="muted" style={{ margin: 0 }}>
          <code>enableForwarding</code> forwards the trigger message and shows <b>preview replies</b> to compare before switching.
        </p>
      </div>
    </div>

    {/* How it works */}
    <div className="card card--glow will-reveal" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>How it works</h3>
      <div className="steps">
        <Step icon={MessageSquare} title="Return a payload">
          Your Dialogflow fulfillment returns a <code>botCard</code> or <code>botList</code> payload.
        </Step>
        <Step icon={Sparkles} title="Widget renders & resolves">
          The Botcopy widget renders the UI and resolves names/logos from the provided IDs.
        </Step>
        <Step icon={BookOpen} title="User acts">
          Clicking the card’s button or selecting a list item immediately switches the session to that bot.
        </Step>
        <Step icon={ListTree} title="(Optional) Forwarding">
          With <code>enableForwarding</code>, the user sees preview responses from each listed bot before choosing.
        </Step>
      </div>
    </div>

    {/* Design tips */}
    <div className="card card--glow will-reveal" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>Design tips</h3>
      <ul className="muted" style={{ paddingLeft: 18, marginTop: 8 }}>
        <li>Use action-oriented <code>buttonText</code> (e.g., “Talk with Support”).</li>
        <li>Keep lists focused: 3–6 destinations is ideal.</li>
        <li>Prefer <code>botListId</code> for governance; use <code>bots</code> array for quick demos.</li>
        <li>Enable Forwarding when users benefit from comparing answers first.</li>
        <li>Provide clear exit paths back to your primary bot.</li>
      </ul>
    </div>

  </motion.section>
)}


          {activeTab === "botcard" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
              <h2>AgentOne: Bot Card</h2>
              <p className="muted">Send this as a custom payload in your Dialogflow fulfillment. It renders a card showing the target bot’s name and logo (looked up automatically from <code>botId</code>) and a customizable action button. On click, the widget <b>instantly switches</b> the session to that bot.</p>

              <h3 style={{ marginTop: 14 }}>Bot Card Preview</h3>
<div style={{ marginTop: 8 }}>
  <div style={{ maxWidth: 520, margin: "0 auto" }}>
    <img
      src="/botcard.png"
      alt="Bot Card preview"
      loading="lazy"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 8px 24px rgba(0,0,0,.35)"
      }}
    />
  </div>

              </div>

              <h3 style={{marginTop:14}}>Payload Format</h3>
              <CodeBlock label="Dialogflow Payload (Bot Card)" codeObj={EXAMPLE_BOT_CARD} />

              <h3 style={{marginTop:14}}>Properties</h3>
              <Props rows={[
                { name: 'buttonText', type: 'string', description: 'Text displayed on the button (e.g., “Change to Sales Bot”).' },
                { name: 'botId', type: 'string', description: 'ID of the target bot. Name & logo are resolved automatically.' },
              ]} />

              <h3 style={{marginTop:14}}>Behavior</h3>
              <ul className="muted" style={{paddingLeft:18}}>
                <li>Renders as a card in the conversation flow.</li>
                <li>Displays the target bot’s name (from <code>botId</code>) and your <code>buttonText</code>.</li>
                <li>On click, instantly switches the session to the specified bot.</li>
              </ul>

              <h3 style={{marginTop:14}}>When to Use</h3>
              <ul className="muted" style={{paddingLeft:18}}>
                <li>Routing users to a more specialized bot (e.g., Support → Billing).</li>
                <li>Offering clear handoff options when a bot reaches the limits of its scope.</li>
                <li>Guiding navigation across multiple bots (e.g., General FAQ → Sales).</li>
              </ul>

              <h3 style={{marginTop:14}}>Why Use This</h3>
              <ul className="muted" style={{paddingLeft:18}}>
                <li><b>Automatic Branding:</b> Bot names & logos are resolved automatically from the ID, ensuring accuracy.</li>
                <li><b>Customizable CTA:</b> Button text adapts to the conversation context.</li>
                <li><b>Error Prevention:</b> Only valid bot IDs render, reducing broken handoffs.</li>
              </ul>
            </motion.section>
          )}

          {activeTab === "botlist" && (
  <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
    <h2>AgentOne: Bot Lists</h2>
    <p className="muted">
      A chat widget component you send as a custom payload in Dialogflow to route users across multiple bots. When rendered,
      it shows a title (e.g., “Select a Department”), a list of bots with names & logos (resolved from IDs), and may include an
      optional action button for switching sessions.
    </p>

    <h3 style={{ marginTop: 14 }}>Bot List Preview</h3>
    <div style={{ marginTop: 8 }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <img
          src="/botlist.png"
          alt="Bot List preview"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 8px 24px rgba(0,0,0,.35)"
          }}
        />
      </div>
    </div>

    <h3 style={{ marginTop: 14 }}>Ways to Configure</h3>
    <ul className="muted" style={{ paddingLeft: 18 }}>
      <li><b>Option 1:</b> Reference a saved list via <code>botListId</code> (manage in the AgentOne Portal).</li>
      <li><b>Option 2:</b> Provide <code>bots</code> directly as an array of objects with <code>id</code>.</li>
    </ul>
    <p className="muted" style={{ marginTop: 8 }}>
      In both cases, Botcopy resolves names and logos from the bot IDs. The <code>enableForwarding</code> flag works with
      <i> either</i> option.
    </p>

    <h3 style={{ marginTop: 14 }}>Option 1: Using a <code>botListId</code></h3>
    <CodeBlock label="Bot List via botListId" codeObj={EXAMPLE_BOT_LIST} />

    <h3 style={{ marginTop: 14 }}>Option 1 + Forwarding</h3>
    <CodeBlock label="Bot List via botListId (enableForwarding)" codeObj={EXAMPLE_BOT_LIST_FORWARD} />

    <h3 style={{ marginTop: 14 }}>Option 2: Using a list of <code>botIds</code></h3>
    <CodeBlock label="Bot List via bots array" codeObj={EXAMPLE_BOT_LIST_BOTS} />

    <h3 style={{ marginTop: 14 }}>Option 2 + Forwarding</h3>
    <CodeBlock label="Bot List via bots array (enableForwarding)" codeObj={EXAMPLE_BOT_LIST_BOTS_FORWARD} />

    <h3 style={{ marginTop: 14 }}>Properties</h3>
    <Props
      rows={[
        { name: "title", type: "string", description: "List title (e.g., “Select a Department”)." },
        { name: "botListId", type: "string (optional)", description: "ID of a saved bot list (AgentOne Portal)." },
        { name: "bots", type: "array (optional)", description: "Array of bot objects with an id field. Names/logos are resolved automatically." },
        { name: "enableForwarding", type: "boolean (optional)", description: "If true, forwards the triggering user message to all listed bots and shows preview responses (works with either botListId or bots array)." }
      ]}
    />

    <h3 style={{ marginTop: 14 }}>Behavior</h3>
    <ul className="muted" style={{ paddingLeft: 18 }}>
      <li>Renders a selectable list of bots in the conversation flow.</li>
      <li>Displays the configured <b>title</b>, plus bot <b>names and logos</b>.</li>
      <li>When a bot is selected, the session switches instantly to that bot.</li>
    </ul>

    <h3 style={{ marginTop: 14 }}>When to Use Bot Lists</h3>
    <ul className="muted" style={{ paddingLeft: 18 }}>
      <li>Route users to a specialized bot (e.g., General Support → Billing Support).</li>
      <li>Provide clear escalation paths when a bot reaches scope limits.</li>
      <li>Create a navigation hub for multiple bots (e.g., FAQ bot → Sales bot).</li>
    </ul>

    <h3 style={{ marginTop: 14 }}>Why Use Bot Lists</h3>
    <ul className="muted" style={{ paddingLeft: 18 }}>
      <li><b>Automatic branding:</b> Names and logos are pulled directly from bot IDs.</li>
      <li><b>Error prevention:</b> Invalid IDs won’t render, avoiding broken handoffs.</li>
      <li><b>Streamlined UX:</b> Users can easily choose the right bot without guessing.</li>
    </ul>

    <h3 style={{ marginTop: 14 }}>Bot List Forwarding</h3>
    <p className="muted">When <code>enableForwarding</code> is <b>true</b> (with either configuration):</p>
    <ul className="muted" style={{ paddingLeft: 18, marginTop: 8 }}>
      <li>The original user query is forwarded to all bots in the list.</li>
      <li>Each bot’s preview response is shown to the user.</li>
      <li>The user compares previews and chooses the most relevant bot.</li>
    </ul>
    <p className="muted">This creates a search-like experience before committing to one bot.</p>
  </motion.section>
)}


          {activeTab === "tryit" && (
  <motion.section
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="card"
  >
    <h2>Live Try-It</h2>
    <p className="muted">
      Follow the dialogue below and test the flow using the chat bubble in the
      bottom-right. No clicks here — everything you need is on this page.
    </p>
    <TryItScript />
  </motion.section>
)}


        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} AgentOne Demo</span>
          <span>Built to showcase <b>Bot Cards</b> and <b>Bot Lists</b>.</span>
        </div>
      </div>
    </div>
  );
}
