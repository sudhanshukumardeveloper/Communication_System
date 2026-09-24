"use client";

import { useMemo, useState, type ReactNode } from "react";

type Risk = "LOW" | "MEDIUM" | "HIGH";

const nav = [
  ["Command Center", "⌘"],
  ["Tasks", "▣"],
  ["Integrations", "◉"],
  ["Audit Trail", "≡"],
  ["Security", "◇"],
];

const actions = [
  { step: 1, type: "locate", target: "calendar.events", desc: "Locate upcoming meetings", risk: "LOW" as Risk },
  { step: 2, type: "api_call", target: "docs.search", desc: "Search internal meeting notes", risk: "LOW" as Risk },
  { step: 3, type: "type", target: "email.draft", desc: "Stage quarterly update draft", risk: "MEDIUM" as Risk },
  { step: 4, type: "api_call", target: "email.send", desc: "Send outbound email", risk: "HIGH" as Risk },
];

const audit = [
  ["19:04:12", "REQ-9842104", "Calendar query", "LOW", "CONTINUE"],
  ["18:58:41", "REQ-9842098", "Draft email", "MEDIUM", "MONITORED"],
  ["18:52:03", "REQ-9842081", "External email", "HIGH", "PENDING_CONFIRMATION"],
  ["18:41:17", "REQ-9842059", "Document search", "LOW", "FINISH"],
];

function Icon({ children }: { children: ReactNode }) {
  return <span className="icon">{children}</span>;
}

export default function Home() {
  const [active, setActive] = useState("Command Center");
  const [query, setQuery] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState("");

  const visibleAudit = useMemo(() => audit, []);

  const runCommand = () => {
    if (!query.trim()) return;
    setToast("Request screened • risk tier LOW • action plan ready");
    setQuery("");
    setTimeout(() => setToast(""), 3200);
  };

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>AEGIS</strong>
            <span>COMMAND CENTER</span>
          </div>
        </div>

        <div className="secure-pill"><span className="pulse" /> PRIVATE ZTNA PERIMETER</div>

        <nav>
          {nav.map(([label, glyph]) => (
            <button key={label} onClick={() => setActive(label)} className={active === label ? "nav-item active" : "nav-item"}>
              <Icon>{glyph}</Icon><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="node-card">
          <div className="eyebrow">TRUSTED EXECUTION</div>
          <div className="node-row"><span className="dot good" /> Sandbox online</div>
          <div className="node-row"><span className="dot good" /> Vault connected</div>
          <div className="node-row"><span className="dot good" /> WebSocket guarded</div>
        </div>
        <button className="admin-btn" onClick={() => setPaused(!paused)}>
          <span>{paused ? "Resume pipeline" : "Emergency controls"}</span><span>⌘K</span>
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <div className="crumb">RESTRICTED ACCESS / {active.toUpperCase()}</div>
            <h1>{active}</h1>
          </div>
          <div className="top-actions">
            <div className="status-chip"><span className="dot good" /> All systems nominal</div>
            <button className="avatar">SK</button>
          </div>
        </header>

        {active === "Command Center" && (
          <div className="content">
            <section className="hero-grid">
              <div className="hero-card">
                <div className="hero-orbit"><div className="core">A</div></div>
                <div className="hero-copy">
                  <div className="eyebrow">AI REASONING ENGINE</div>
                  <h2>What should I coordinate?</h2>
                  <p>Natural language in. Schema-validated plans out. Execution stays behind the governance boundary.</p>
                  <div className="command-box">
                    <textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask Aegis to coordinate a task…" rows={2} onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") runCommand(); }} />
                    <button onClick={runCommand} className="run-btn">Run plan <span>⌘↵</span></button>
                  </div>
                </div>
              </div>

              <div className="metrics-card">
                <div className="card-head"><span>GOVERNANCE HEALTH</span><span className="tiny-green">LIVE</span></div>
                <div className="score">98.7<span>%</span></div>
                <div className="meter"><span style={{width:"98.7%"}} /></div>
                <div className="metric-line"><span>Origin validation</span><b>ENFORCED</b></div>
                <div className="metric-line"><span>Secret policy</span><b>VAULT ONLY</b></div>
                <div className="metric-line"><span>Rate limiter</span><b>ACTIVE</b></div>
                <div className="metric-line"><span>Audit stream</span><b>APPEND-ONLY</b></div>
              </div>
            </section>

            <section className="section-head">
              <div><div className="eyebrow">DUAL-AGENT PIPELINE</div><h3>Live execution plan</h3></div>
              <div className="pipeline-badge"><span className="dot good" /> HOST AGENT → APP AGENT → GOVERNANCE</div>
            </section>

            <section className="pipeline">
              {actions.map((a, i) => (
                <div className={"action-row" + (a.risk === "HIGH" ? " clickable" : "")} key={a.step} onClick={() => a.risk === "HIGH" && setConfirm(true)}>
                  <div className="step-num">{String(a.step).padStart(2, "0")}</div>
                  <div className="action-main">
                    <div className="action-title">{a.desc}</div>
                    <div className="mono">{a.type} · {a.target}</div>
                  </div>
                  <span className={"risk " + a.risk.toLowerCase()}>{a.risk}</span>
                  <span className="action-state">{a.risk === "HIGH" ? "AWAITING USER" : a.risk === "MEDIUM" ? "MONITORED" : "VALIDATED"}</span>
                  {i < actions.length - 1 && <div className="connector" />}
                </div>
              ))}
            </section>

            <section className="bottom-grid">
              <div className="panel">
                <div className="card-head"><span>RUNTIME NODES</span><span>4 / 4 ONLINE</span></div>
                <div className="node-grid">
                  {["Reasoning Brain", "Governance Manager", "Sandbox Runner", "Android Companion"].map((n, i) => (
                    <div className="runtime-node" key={n}>
                      <div className="node-icon">{["◈","◉","□","⌁"][i]}</div>
                      <div><b>{n}</b><span><i className="dot good" /> {i === 3 ? "Standby" : "Healthy"}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="card-head"><span>SECURITY EVENTS</span><span>LAST 24H</span></div>
                <div className="event-list">
                  <div><span className="event-icon green">✓</span><p><b>Origin handshake verified</b><small>WebSocket gateway · 2 min ago</small></p></div>
                  <div><span className="event-icon amber">!</span><p><b>High-risk action paused</b><small>Outbound email · 6 min ago</small></p></div>
                  <div><span className="event-icon green">✓</span><p><b>Vault token rotated</b><small>Secret manager · 18 min ago</small></p></div>
                </div>
              </div>
            </section>

            <section className="audit-panel">
              <div className="section-head compact"><div><div className="eyebrow">IMMUTABLE LOG</div><h3>Recent audit trail</h3></div><button className="ghost-btn" onClick={() => setToast("Audit export prepared locally")}>Export log</button></div>
              <div className="audit-table">
                <div className="audit-header"><span>TIME</span><span>REQUEST</span><span>OPERATION</span><span>RISK</span><span>STATUS</span></div>
                {visibleAudit.map(r => <div className="audit-row" key={r[1]}><span className="mono">{r[0]}</span><span className="mono">{r[1]}</span><span>{r[2]}</span><span className={"risk " + r[3].toLowerCase()}>{r[3]}</span><span>{r[4]}</span></div>)}
              </div>
            </section>
          </div>
        )}

        {active !== "Command Center" && (
          <div className="placeholder">
            <div className="placeholder-icon">{nav.find(n => n[0] === active)?.[1]}</div>
            <div className="eyebrow">MODULE READY</div>
            <h2>{active}</h2>
            <p>This workspace is wired to the same governance model: authenticated requests, structured actions, risk tiering, audit logging, and human approval gates.</p>
            <button className="run-btn" onClick={() => setActive("Command Center")}>Return to command center</button>
          </div>
        )}
      </section>

      {paused && <div className="kill-banner"><span>⚠ EMERGENCY KILL SWITCH</span><button onClick={() => setPaused(false)}>Release lock</button></div>}

      {confirm && <div className="modal-backdrop"><div className="confirm-modal">
        <div className="modal-icon">!</div><div className="eyebrow">HIGH-RISK SAFEGUARD</div><h2>Approve outbound communication?</h2>
        <p>Send the staged quarterly update through the approved email API. This action leaves the private execution boundary and requires explicit confirmation.</p>
        <div className="confirm-meta"><span>RISK <b>HIGH</b></span><span>STATUS <b>PENDING_CONFIRMATION</b></span></div>
        <div className="modal-actions"><button className="ghost-btn" onClick={() => setConfirm(false)}>Cancel</button><button className="danger-btn" onClick={() => {setConfirm(false);setToast("Approved • action dispatched to trusted runner")}}>Approve & dispatch</button></div>
      </div></div>}

      {toast && <div className="toast"><span className="dot good" />{toast}</div>}
    </main>
  }
