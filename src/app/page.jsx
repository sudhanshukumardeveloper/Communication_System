"use client";

import { useState } from "react";

const nav = ["Command Center", "Tasks", "Integrations", "Audit Trail", "Security"];
const rows = [
  ["01", "Locate upcoming meetings", "calendar.events", "LOW", "VALIDATED"],
  ["02", "Search internal notes", "docs.search", "LOW", "VALIDATED"],
  ["03", "Stage quarterly update", "email.draft", "MEDIUM", "MONITORED"],
  ["04", "Send outbound email", "email.send", "HIGH", "AWAITING USER"],
];

export default function Home() {
  const [active, setActive] = useState("Command Center");
  const [query, setQuery] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState("");

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function runPlan() {
    if (!query.trim()) return notify("Enter a command to create an action plan.");
    setQuery("");
    notify("Request screened • LOW risk • plan validated");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">A</div><div><b>AEGIS</b><small>COMMAND CENTER</small></div></div>
        <div className="secure"><span className="live-dot" /> PRIVATE ZTNA PERIMETER</div>
        <nav>
          {nav.map((item) => (
            <button key={item} className={active === item ? "nav active" : "nav"} onClick={() => setActive(item)}>
              <span>{["⌘","▣","◉","≡","◇"][nav.indexOf(item)]}</span>{item}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="node-card">
            <small>TRUSTED EXECUTION</small>
            <p><i /> Sandbox online</p>
            <p><i /> Vault connected</p>
            <p><i /> WebSocket guarded</p>
          </div>
          <button className="admin">Emergency controls <span>⌘K</span></button>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div><small>RESTRICTED ACCESS / {active.toUpperCase()}</small><h1>{active}</h1></div>
          <div className="top-right"><span className="status"><i /> All systems nominal</span><span className="avatar">SK</span></div>
        </header>

        {active === "Command Center" ? (
          <div className="content">
            <div className="hero-grid">
              <section className="hero card">
                <div className="orb"><strong>A</strong></div>
                <div className="hero-copy">
                  <small>AI REASONING ENGINE</small>
                  <h2>What should I coordinate?</h2>
                  <p>Translate natural language into a validated global plan. Execution remains behind the governance boundary.</p>
                  <div className="command">
                    <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask Aegis to coordinate a task…" rows={2} />
                    <button onClick={runPlan}>Run plan <em>⌘↵</em></button>
                  </div>
                </div>
              </section>
              <section className="card health">
                <div className="card-title"><span>GOVERNANCE HEALTH</span><b>LIVE</b></div>
                <strong className="score">98.7<small>%</small></strong>
                <div className="meter"><i /></div>
                {["Origin validation", "Secret policy", "Rate limiter", "Audit stream"].map((x) => <div className="metric" key={x}><span>{x}</span><b>{x === "Secret policy" ? "VAULT ONLY" : x === "Audit stream" ? "APPEND-ONLY" : "ENFORCED"}</b></div>)}
              </section>
            </div>

            <div className="section-title"><div><small>DUAL-AGENT PIPELINE</small><h3>Live execution plan</h3></div><span className="pipeline-status"><i /> HOST AGENT → APP AGENT → GOVERNANCE</span></div>
            <section className="card table">
              <div className="table-head"><span>STEP</span><span>ACTION</span><span>RISK</span><span>STATUS</span></div>
              {rows.map((r) => (
                <button key={r[0]} className={r[3] === "HIGH" ? "table-row high-row" : "table-row"} onClick={() => r[3] === "HIGH" && setConfirm(true)}>
                  <span className="mono">{r[0]}</span><span><b>{r[1]}</b><small>{r[2]}</small></span><span className={"risk " + r[3].toLowerCase()}>{r[3]}</span><span>{r[4]}</span>
                </button>
              ))}
            </section>

            <div className="lower-grid">
              <section className="card panel"><div className="card-title"><span>RUNTIME NODES</span><b>4 / 4 ONLINE</b></div><div className="nodes">
                {["Reasoning Brain","Governance Manager","Sandbox Runner","Android Companion"].map((x) => <div className="node" key={x}><strong>◈</strong><span><b>{x}</b><small><i /> Healthy</small></span></div>)}
              </div></section>
              <section className="card panel"><div className="card-title"><span>SECURITY EVENTS</span><b>LAST 24H</b></div><div className="events">
                <p><strong>✓</strong><span><b>Origin handshake verified</b><small>WebSocket gateway · 2 min ago</small></span></p>
                <p><strong>!</strong><span><b>High-risk action paused</b><small>Outbound email · 6 min ago</small></span></p>
                <p><strong>✓</strong><span><b>Vault token rotated</b><small>Secret manager · 18 min ago</small></span></p>
              </div></section>
            </div>

            <section className="card audit"><div className="section-title"><div><small>IMMUTABLE LOG</small><h3>Recent audit trail</h3></div><button onClick={() => notify("Audit export prepared locally")}>Export log</button></div>
              <div className="audit-head"><span>TIME</span><span>REQUEST</span><span>OPERATION</span><span>RISK</span><span>STATUS</span></div>
              {[
                ["19:04:12","REQ-9842104","Calendar query","LOW","CONTINUE"],
                ["18:58:41","REQ-9842098","Draft email","MEDIUM","MONITORED"],
                ["18:52:03","REQ-9842081","External email","HIGH","PENDING_CONFIRMATION"]
              ].map((r) => <div className="audit-row" key={r[1]}><span className="mono">{r[0]}</span><span className="mono">{r[1]}</span><span>{r[2]}</span><span className={"risk " + r[3].toLowerCase()}>{r[3]}</span><span>{r[4]}</span></div>)}
            </section>
          </div>
        ) : (
          <div className="empty"><div className="empty-icon">◇</div><small>MODULE READY</small><h2>{active}</h2><p>This module follows the same authenticated request, structured action, risk governance and audit model defined by the system architecture.</p><button onClick={() => setActive("Command Center")}>Return to command center</button></div>
        )}
      </section>

      {confirm && <div className="modal"><div className="dialog"><div className="warn">!</div><small>HIGH-RISK SAFEGUARD</small><h2>Approve outbound communication?</h2><p>Send the staged quarterly update through the approved email API. This action requires explicit manual confirmation.</p><div className="confirm-line"><span>RISK <b>HIGH</b></span><span>STATUS <b>PENDING_CONFIRMATION</b></span></div><div className="dialog-actions"><button onClick={() => setConfirm(false)}>Cancel</button><button className="danger" onClick={() => { setConfirm(false); notify("Approved • action dispatched to trusted runner"); }}>Approve & dispatch</button></div></div></div>}
      {toast && <div className="toast"><i />{toast}</div>}
    </main>
  );
}
