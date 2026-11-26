'use client'

import { useState } from 'react'
import {
  Activity, ArrowDownLeft, ArrowUpRight, Bell, Check, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Code2, Copy, Ellipsis, ExternalLink, GitBranch, Globe2,
  Layers3, LifeBuoy, MoreHorizontal, Plus, Search, Settings2, ShieldCheck,
  TerminalSquare, Webhook, Zap,
} from 'lucide-react'

const deliveries = [
  { event: 'payment.succeeded', endpoint: 'payments-worker', id: 'evt_8f2a91c3', time: 'Just now', status: '200', duration: '142ms', tint: 'mint' },
  { event: 'user.created', endpoint: 'identity-sync', id: 'evt_72d4be10', time: '12s ago', status: '200', duration: '89ms', tint: 'blue' },
  { event: 'invoice.paid', endpoint: 'payments-worker', id: 'evt_3ac09f82', time: '28s ago', status: '200', duration: '216ms', tint: 'violet' },
  { event: 'subscription.updated', endpoint: 'billing-events', id: 'evt_9e51a6d7', time: '1m ago', status: '200', duration: '103ms', tint: 'amber' },
]

const endpoints = [
  { name: 'payments-worker', url: 'https://api.acme.io/hooks/payments', events: 'payment.*', count: '1,284', status: 'Healthy', initials: 'PW', color: 'purple' },
  { name: 'identity-sync', url: 'https://workers.acme.io/identity', events: 'user.created, user.updated', count: '892', status: 'Healthy', initials: 'IS', color: 'blue' },
  { name: 'billing-events', url: 'https://api.acme.io/hooks/billing', events: 'invoice.*, subscription.*', count: '346', status: 'Healthy', initials: 'BE', color: 'green' },
]

export default function Page() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [selectedTab, setSelectedTab] = useState('All events')
  const [showSetup, setShowSetup] = useState(false)
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')

  const copyEndpoint = async () => {
    await navigator.clipboard?.writeText('https://hooks.flowstate.dev/in/v1/wh_9K2mP4xR')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Flowstate home">
          <span className="brand-mark"><Webhook size={19} strokeWidth={2.3} /></span>
          <span>flowstate<span className="brand-period">.</span></span>
          <span className="brand-badge">BETA</span>
        </a>
        <button className="workspace-switcher" aria-label="Switch workspace">
          <span className="workspace-avatar">A</span>
          <span className="workspace-copy"><strong>Acme Studio</strong><small>Pro workspace</small></span>
          <ChevronDown size={15} className="muted-icon" />
        </button>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Workspace navigation">
          {[
            { label: 'Overview', icon: Layers3 },
            { label: 'Event streams', icon: Activity, count: '3' },
            { label: 'Deliveries', icon: ArrowUpRight },
            { label: 'Replay queue', icon: Clock3, count: '2' },
          ].map(({ label, icon: Icon, count }) => (
            <button key={label} className={`nav-item ${activeNav === label ? 'nav-active' : ''}`} onClick={() => setActiveNav(label)}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{count && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-label endpoints-label">YOUR ENDPOINTS <button aria-label="Add endpoint" onClick={() => setShowSetup(true)}><Plus size={15} /></button></div>
        <div className="endpoint-nav">
          {endpoints.map((endpoint) => <button key={endpoint.name} className="endpoint-nav-item" onClick={() => setActiveNav(endpoint.name)}><span className={`endpoint-dot ${endpoint.color}`} /><span>{endpoint.name}</span><span className="live-dot" /></button>)}
          <button className="add-endpoint" onClick={() => setShowSetup(true)}><Plus size={15} /> Add endpoint</button>
        </div>
        <div className="sidebar-bottom">
          <div className="usage-card"><div className="usage-title"><span>Monthly events</span><span>68%</span></div><div className="usage-track"><span /></div><small>2.52M <i>/ 3.7M events</i></small></div>
          <button className="nav-item"><CircleHelp size={17} /><span>Help center</span><ExternalLink size={13} className="help-external" /></button>
          <button className="profile-button"><span className="profile-avatar">JD</span><span className="workspace-copy"><strong>Jamie D.</strong><small>jamie@acme.io</small></span><MoreHorizontal size={18} className="muted-icon" /></button>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{activeNav}</strong></div><div className="topbar-right"><span className="environment-pill"><span className="demo-env-dot" /> Demo environment</span><button className="icon-button" aria-label="Notifications"><Bell size={17} /><i /></button><button className="icon-button" aria-label="Settings"><Settings2 size={17} /></button><span className="topbar-divider" /><button className="docs-link"><Code2 size={15} /> API docs <ExternalLink size={12} /></button></div></header>

        <div className="content-wrap">
          <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-live" /> DASHBOARD PREVIEW <span className="eyebrow-sep">/</span> SAMPLE DATA</div><h1>Good morning, Jamie <span className="wave">✳</span></h1><p className="page-subtitle">Here&apos;s what&apos;s happening across your event streams.</p></div><button className="primary-button" onClick={() => setShowSetup(true)}><Plus size={17} /> New endpoint</button></div>

          <section className="stats-grid" aria-label="Delivery metrics">
            <article className="stat-card"><div className="stat-top"><span>Events delivered</span><span className="stat-icon stat-purple"><Zap size={16} /></span></div><div className="stat-value">24,891 <span className="stat-change positive"><ArrowUpRight size={14} /> 12.8%</span></div><div className="stat-foot">vs. previous 24 hours</div><div className="sparkline purple-line"><svg viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 31 C18 29 20 24 38 26 S59 21 74 26 S91 16 108 20 S128 18 142 11 S159 18 172 13 S197 15 208 7 S229 12 240 3" /></svg></div></article>
            <article className="stat-card"><div className="stat-top"><span>Success rate</span><span className="stat-icon stat-green"><ShieldCheck size={16} /></span></div><div className="stat-value">99.97<span className="unit">%</span><span className="stat-change positive"><ArrowUpRight size={14} /> 0.04%</span></div><div className="stat-foot">across all endpoints</div><div className="sparkline green-line"><svg viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22 C22 22 25 19 42 21 S65 16 80 19 S98 15 113 16 S136 12 151 16 S169 10 183 12 S205 9 218 11 S232 6 240 7" /></svg></div></article>
            <article className="stat-card"><div className="stat-top"><span>Avg. response time</span><span className="stat-icon stat-blue"><Activity size={16} /></span></div><div className="stat-value">184 <span className="unit">ms</span><span className="stat-change positive"><ArrowDownLeft size={14} /> 8.2%</span></div><div className="stat-foot">across all endpoints</div><div className="sparkline blue-line"><svg viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 C16 12 22 18 38 15 S59 24 73 18 S92 23 107 19 S129 28 144 22 S160 26 176 19 S194 24 209 15 S229 17 240 9" /></svg></div></article>
            <article className="stat-card"><div className="stat-top"><span>Active endpoints</span><span className="stat-icon stat-amber"><Globe2 size={16} /></span></div><div className="stat-value">03 <span className="stat-caption">of 10</span></div><div className="stat-foot">all systems operational</div><div className="endpoint-mini-status"><span /><span /><span /><i>3 workers online</i></div></article>
          </section>

          <section className="flow-card" aria-label="Webhook delivery flow"><div className="flow-header"><div><div className="section-kicker">YOUR PIPELINE</div><h2>Event delivery flow</h2></div><button className="ghost-small"><Ellipsis size={18} /></button></div><div className="flow-canvas"><div className="flow-node source-node"><div className="flow-node-icon violet-bg"><Webhook size={18} /></div><div><strong>Webhook source</strong><span>Incoming events</span></div><span className="node-healthy"><i /> Live</span></div><div className="flow-connector"><div className="connector-line"><i /><i /><i /></div><span>HTTPS · signed</span></div><div className="flow-node router-node"><div className="flow-node-icon slate-bg"><GitBranch size={18} /></div><div><strong>Event router</strong><span>Signature verified</span></div><span className="node-check"><Check size={13} /></span></div><div className="flow-connector"><div className="connector-line"><i /><i /><i /></div><span>3 routes</span></div><div className="worker-stack"><div className="flow-node worker-node"><span className="worker-avatar purple-avatar">P</span><div><strong>payments-worker</strong><span>payment.*</span></div><span className="worker-ready" /></div><div className="flow-node worker-node"><span className="worker-avatar blue-avatar">I</span><div><strong>identity-sync</strong><span>user.created, user.updated</span></div><span className="worker-ready" /></div><div className="flow-node worker-node"><span className="worker-avatar green-avatar">B</span><div><strong>billing-events</strong><span>invoice.*, subscription.*</span></div><span className="worker-ready" /></div></div></div><div className="flow-footer"><div className="flow-legend"><span><i className="legend-live" /> Active route</span><span><i className="legend-worker" /> Worker ready</span></div><button className="text-link" onClick={() => setActiveNav('Event streams')}>View all streams <ArrowUpRight size={14} /></button></div></section>

          <section className="lower-grid"><article className="deliveries-card"><div className="card-heading"><div><div className="section-kicker">REAL-TIME</div><h2>Recent deliveries <span className="count-chip">24,891</span></h2></div><button className="text-link" onClick={() => setActiveNav('Deliveries')}>View all <ArrowUpRight size={14} /></button></div><div className="table-toolbar"><div className="tab-list" role="tablist" aria-label="Filter deliveries">{['All events', 'Succeeded', 'Failed'].map(tab => <button key={tab} role="tab" aria-selected={selectedTab === tab} className={selectedTab === tab ? 'tab-selected' : ''} onClick={() => setSelectedTab(tab)}>{tab}{tab === 'Failed' && <span className="failed-count">2</span>}</button>)}</div><label className="search-field"><Search size={14} /><input aria-label="Search events" placeholder="Search events..." value={search} onChange={event => setSearch(event.target.value)} /></label></div><div className="delivery-table"><div className="table-head"><span>EVENT</span><span>ENDPOINT</span><span>STATUS</span><span>TIME</span></div>{deliveries.filter(item => `${item.event} ${item.endpoint} ${item.id}`.toLowerCase().includes(search.toLowerCase())).map(item => <div className="delivery-row" key={item.id}><div className="event-cell"><span className={`event-icon ${item.tint}`}><ArrowUpRight size={13} /></span><span><strong>{item.event}</strong><small>{item.id}</small></span></div><span className="endpoint-cell">{item.endpoint}</span><span className="status-cell"><i /> {item.status} <small>· {item.duration}</small></span><span className="time-cell">{item.time}</span></div>)}</div><div className="table-bottom"><span>Showing <strong>4</strong> of 24,891 events</span><button className="text-link">Open delivery log <ArrowUpRight size={13} /></button></div></article>

          <aside className="right-column"><article className="ingress-card"><div className="card-heading"><div><div className="section-kicker">SAMPLE ENDPOINT</div><h2>Webhook URL</h2></div><span className="secure-label"><ShieldCheck size={13} /> SECURE</span></div><p>Send events to your unique Flowstate endpoint.</p><div className="url-copy"><code>hooks.flowstate.dev/in/v1/wh_9K2mP4xR</code><button aria-label="Copy webhook URL" onClick={copyEndpoint}>{copied ? <Check size={15} /> : <Copy size={15} />}</button></div><div className="ingress-meta"><span><span className="ingress-dot" /> Preview configuration</span><button aria-label="Webhook details"><Ellipsis size={17} /></button></div><div className="keyline" /><div className="secret-row"><span><span className="key-icon"><Code2 size={14} /></span> Signing secret</span><button onClick={() => setShowSetup(true)}>Reveal <ChevronRight size={13} /></button></div><div className="secret-mask"><span>whsec_</span>••••••••••••••••••••••••••••</div></article>

          <article className="worker-health-card"><div className="card-heading"><div><div className="section-kicker">WORKER STATUS</div><h2>Workers <span className="healthy-total"><i /> 3 healthy</span></h2></div><button className="ghost-small"><Ellipsis size={17} /></button></div><div className="worker-health-list">{endpoints.map((endpoint, index) => <div className="health-row" key={endpoint.name}><span className={`health-avatar ${endpoint.color}`}>{endpoint.initials.slice(0,1)}</span><span className="health-name"><strong>{endpoint.name}</strong><small>{['142ms avg', '89ms avg', '216ms avg'][index]}</small></span><span className="health-spark"><i style={{height: `${14 + index * 3}px`}} /><i style={{height: `${20 - index * 2}px`}} /><i style={{height: `${11 + index * 4}px`}} /><i style={{height: `${24 - index * 3}px`}} /><i style={{height: `${17 + index}px`}} /><i style={{height: `${21 - index}px`}} /></span><span className="health-state">Healthy</span></div>)}</div><button className="worker-link" onClick={() => setActiveNav('Event streams')}>Manage workers <ArrowUpRight size={14} /></button></article></aside></section>

          <footer className="page-footer"><span><span className="footer-pulse" /> Sample dashboard data</span><span>Worker delivery is not connected yet <span className="footer-separator">·</span> <button>Status page <ExternalLink size={11} /></button></span><span>Powered by <strong>flowstate</strong></span></footer>
        </div>
      </section>

      {showSetup && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setShowSetup(false) }}><section className="setup-modal" role="dialog" aria-modal="true" aria-labelledby="setup-title"><div className="modal-top"><span className="modal-icon"><Webhook size={19} /></span><button className="modal-close" onClick={() => setShowSetup(false)} aria-label="Close setup">×</button></div><div className="section-kicker">NEW EVENT ROUTE</div><h2 id="setup-title">Connect a worker</h2><p className="modal-subtitle">Choose the events to forward and where your worker receives them.</p><label className="form-label">Endpoint name<input placeholder="e.g. orders-worker" /></label><label className="form-label">Worker URL<input placeholder="https://your-service.com/webhooks" /></label><label className="form-label">Events to forward<select defaultValue=""><option value="" disabled>Select events</option><option>All events</option><option>payment.*</option><option>user.created</option><option>invoice.*</option></select></label><div className="modal-note"><ShieldCheck size={15} /> Live delivery requires a connected worker runtime.</div><button className="primary-button modal-submit" onClick={() => setShowSetup(false)}>Save endpoint <ArrowUpRight size={15} /></button><p className="modal-footnote">Endpoint setup preview — connect your worker runtime to start receiving live requests.</p></section></div>}
    </main>
  )
}
