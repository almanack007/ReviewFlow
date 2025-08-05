import React, { useState, useEffect } from 'react';

// --- SVG Icons (for a clean, dependency-free UI) ---
function OverviewIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function InboxIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>; }
function CatchitAiIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 9l-7 2 5 5-2 7 7-5 7 5-2-7 5-5-7-2z"/></svg>; }
function InsightsIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>; }
function GrowthIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function SettingsIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15z"/></svg>; }
function LogoutIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }
function PhoneMissedIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="23" y1="1" x2="17" y2="7"/><line x1="17" y1="1" x2="23" y2="7"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function UserPlusIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>; }
function GoogleIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9999 12.2248C21.9999 11.3928 21.9269 10.5798 21.7879 9.78979H12.2179V14.4378H17.8279C17.5879 15.8958 16.8919 17.1618 15.8119 17.9238V20.7228H19.6829C21.1669 19.2438 21.9999 16.9878 21.9999 14.2218V12.2248Z" fill="#4285F4"/><path d="M12.2179 22.0002C15.2159 22.0002 17.7289 21.0132 19.6829 19.4122L15.8119 16.6132C14.7959 17.3112 13.5659 17.7222 12.2179 17.7222C9.43191 17.7222 7.07391 15.8082 6.20091 13.2882H2.19791V16.1712C4.13291 20.0112 7.85891 22.0002 12.2179 22.0002Z" fill="#34A853"/><path d="M6.20073 13.2881C5.96073 12.5901 5.82173 11.8451 5.82173 11.0831C5.82173 10.3211 5.96073 9.57608 6.20073 8.87808V5.99508H2.19773C1.41173 7.55908 1.00073 9.28808 1.00073 11.0831C1.00073 12.8781 1.41173 14.6071 2.19773 16.1711L6.20073 13.2881Z" fill="#FBBC05"/><path d="M12.2179 5.44219C13.6859 5.44219 14.9999 5.96119 15.9959 6.90719L19.7569 3.14719C17.7209 1.19119 15.2089 0.166191 12.2179 0.166191C7.85891 0.166191 4.13291 2.15519 2.19791 5.99519L6.20091 8.87819C7.07391 6.35819 9.43191 4.44419 12.2179 4.44419V5.44219Z" fill="#EA4335"/></svg>; }

// --- Component Definitions ---
function LoginScreen({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess('fake-auth-token');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Catchit</h1>
        <p>{isLogin ? 'Welcome back' : 'Transform your customer experience'}</p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="businessName">Business Name</label>
              <input type="text" id="businessName" placeholder="e.g., The Corner Cafe" required />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary">{isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>
        <p className="auth-toggle">
          {isLogin ? "Need an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign up' : 'Sign in'}</button>
        </p>
      </div>
    </div>
  );
}

function Sidebar({ currentView, setView, onLogout }) {
  const navItems = [
    { id: 'overview', icon: <OverviewIcon />, label: 'Overview' },
    { id: 'inbox', icon: <InboxIcon />, label: 'Inbox' },
    { id: 'catchit-ai', icon: <CatchitAiIcon />, label: 'Catchit AI', notification: true },
    { id: 'insights', icon: <InsightsIcon />, label: 'Insights' },
    { id: 'growth', icon: <GrowthIcon />, label: 'Growth', notification: true },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header"><h2>Catchit</h2></div>
      <ul className="sidebar-nav-list">
        {navItems.map(item => (
          <li key={item.id}>
            <button className={`nav-item ${currentView === item.id ? 'active' : ''}`} onClick={() => setView(item.id)}>
              {item.icon}
              <span>{item.label}</span>
              {item.notification && <span className="notification-dot"></span>}
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer"><button className="nav-item" onClick={onLogout}><LogoutIcon /><span>Logout</span></button></div>
    </nav>
  );
}

function InboxItem({ item, isSelected, onClick }) {
  const renderStars = (rating) => Array(5).fill(0).map((_, i) => <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>);
  
  const getIcon = () => {
      if (item.type === 'missed-call') return <PhoneMissedIcon />;
      if (item.type === 'referral') return <UserPlusIcon />;
      return null;
  }

  return (
    <div className={`inbox-list-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <div className="item-icon">{getIcon()}</div>
        <div className="item-content">
            <div className="item-header">
                <span className="customer-name">{item.customer_name}</span>
                <span className="item-date">{item.date}</span>
            </div>
            <p className="item-text-preview">{item.text}</p>
        </div>
    </div>
  );
}

function InboxScreen() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const sampleInbox = [
        { id: 1, type: 'review', source: 'Google', customer_name: 'Alice B.', rating: 5, text: 'The best coffee in town, hands down! The staff is always so welcoming.', date: '4:08 PM', assigned_to: 'me' },
        { id: 2, type: 'message', source: 'Facebook', customer_name: 'David E.', text: 'Hi, are you open on Sundays?', date: '1:02 PM' },
        { id: 3, type: 'missed-call', source: 'Catchit AI', customer_name: 'Carol F. (+1...4567)', text: 'Missed call, AI summary: Caller asked about pricing for a large event.', date: '11:23 AM', assigned_to: 'me' },
        { id: 4, type: 'referral', source: 'Growth', customer_name: 'New Lead: Frank G.', text: 'Referred by Alice B. Wants to book a consultation.', date: '9:54 AM' },
        { id: 5, type: 'review', source: 'Yelp', customer_name: 'Bob K.', rating: 2, text: 'My appointment started 20 minutes late and the waiting room was a mess.', date: 'Yesterday' },
    ];
    
    useEffect(() => {
        setSelectedItem(sampleInbox[0]);
    }, []);

    const filteredInbox = sampleInbox.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'assigned') return item.assigned_to === 'me';
        if (activeFilter === 'leads') return item.type === 'referral' || item.type === 'missed-call';
        if (activeFilter === 'reviews') return item.type === 'review';
        return true;
    });

  return (
    <main className="inbox-layout">
        <div className="inbox-sidebar">
            <header className="main-header">
                <h1>Inbox</h1>
                <div className="header-controls"><span>Autopilot</span><label className="switch"><input type="checkbox" /><span className="slider round"></span></label></div>
            </header>
            <div className="inbox-filters">
                <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>All</button>
                <button className={activeFilter === 'assigned' ? 'active' : ''} onClick={() => setActiveFilter('assigned')}>Assigned to me</button>
                <button className={activeFilter === 'leads' ? 'active' : ''} onClick={() => setActiveFilter('leads')}>Leads</button>
                <button className={activeFilter === 'reviews' ? 'active' : ''} onClick={() => setActiveFilter('reviews')}>Reviews</button>
            </div>
            <div className="inbox-list">
                {filteredInbox.map(item => <InboxItem key={item.id} item={item} isSelected={selectedItem && selectedItem.id === item.id} onClick={() => setSelectedItem(item)} />)}
            </div>
        </div>
        <div className="conversation-view">
            {selectedItem ? (
                <>
                    <h3>Conversation with {selectedItem.customer_name}</h3>
                    <div className="message-bubble received">
                        <p>{selectedItem.text}</p>
                    </div>
                    <div className="message-bubble sent">
                        <p>Hi {selectedItem.customer_name.split(' ')[0]}, this is Alan from Invictus Auto. Want to bring your car in tomorrow and we'll take a look?</p>
                    </div>
                    <div className="reply-box">
                        <textarea placeholder="Type your message..."></textarea>
                        <button className="btn btn-primary">Send</button>
                    </div>
                </>
            ) : (
                <p>Select an item to view the conversation.</p>
            )}
        </div>
    </main>
  );
}

function OverviewScreen() {
    return (
        <main className="main-content">
            <header className="main-header"><h1>Overview</h1></header>
            <div className="overview-grid">
                <div className="card">
                    <h3>Reviews</h3>
                    <div className="overview-card-main">
                        <span className="overview-rating">4.8</span>
                        <span className="overview-trend">↑ 0.6 stars in past week</span>
                    </div>
                </div>
                <div className="card">
                    <h3>Google Ratings</h3>
                    <div className="overview-card-main">
                         <span className="overview-rating"><GoogleIcon /> 4.9</span>
                         <span className="overview-trend">↑ 0.4 stars in past week</span>
                    </div>
                </div>
                <div className="card">
                    <h3>New Leads</h3>
                    <div className="overview-card-main">
                        <span className="overview-rating">765</span>
                        <span className="overview-trend">↑ 25 this week</span>
                    </div>
                </div>
                 <div className="card">
                    <h3>Referrals</h3>
                     <div className="overview-card-main">
                        <span className="overview-rating">458</span>
                        <span className="overview-trend">↑ 12 this week</span>
                    </div>
                </div>
            </div>
        </main>
    );
}

function CatchitAiScreen({ setView, setSelectedLead }) {
    const latestLeads = [
        { id: 1, name: 'Sarah Johnson', phone: '+16623217070', summary: 'Called to inquire about prescription refill policy.', type: 'Inquiry', status: 'Open', vertical: 'pharmacist' },
        { id: 2, name: 'Michael Chen', phone: '+13013430671', summary: 'Wants to book a plumbing inspection for a leaky faucet.', type: 'Service', status: 'Open', vertical: 'home-services' },
        { id: 3, name: 'Emily Rodriguez', phone: '+12013385620', summary: 'Asked for a quote for catering a small office party.', type: 'Quotation', status: 'Booked', vertical: 'cafe' },
    ];
    
    const handleLeadClick = (lead) => {
        setSelectedLead(lead);
        setView('lead-detail');
    };

    return (
        <main className="main-content">
            <header className="main-header"><h1>Catchit AI Dashboard</h1></header>
            <div className="kpi-grid full-width">
                <div className="kpi-card"><span className="kpi-value">318</span><span className="kpi-label">All incoming calls</span></div>
                <div className="kpi-card"><span className="kpi-value">312</span><span className="kpi-label">Successfully completed</span></div>
                <div className="kpi-card"><span className="kpi-value">420</span><span className="kpi-label">Call Minutes</span></div>
                <div className="kpi-card"><span className="kpi-value">203</span><span className="kpi-label">Leads Captured</span></div>
            </div>
            <div className="card">
                <h3>Latest Leads</h3>
                {latestLeads.map(lead => (
                    <div key={lead.id} className="lead-item clickable" onClick={() => handleLeadClick(lead)}>
                        <div className="lead-info">
                            <strong>{lead.name} ({lead.phone})</strong>
                            <p>{lead.summary}</p>
                        </div>
                        <div className="lead-actions">
                            <span className={`status-pill status-${lead.type.toLowerCase()}`}>{lead.type}</span>
                            <span className={`status-pill status-${lead.status.toLowerCase()}`}>{lead.status}</span>
                            <button className="btn btn-secondary btn-small">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

function LeadDetailScreen({ lead, setView }) {
    if (!lead) return null;
    
    const getJobDetails = (vertical) => {
        switch(vertical) {
            case 'pharmacist': return { jobDescription: 'Prescription Refill Inquiry', jobType: 'Pharmacy Service' };
            case 'home-services': return { jobDescription: 'Plumbing Inspection', jobType: 'Home Repair' };
            case 'cafe': return { jobDescription: 'Catering Quotation', jobType: 'Food Service' };
            default: return { jobDescription: 'N/A', jobType: 'N/A' };
        }
    };

    const jobDetails = getJobDetails(lead.vertical);

    return (
        <main className="main-content">
            <header className="main-header">
                <button className="btn btn-secondary" onClick={() => setView('catchit-ai')}>&larr; Back to Dashboard</button>
                <div>
                    <span className={`status-pill status-${lead.type.toLowerCase()}`}>{lead.type}</span>
                    <span className={`status-pill status-${lead.status.toLowerCase()}`}>{lead.status}</span>
                </div>
            </header>
            <div className="details-grid">
                <div className="card">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> {lead.name}</p>
                    <p><strong>Phone:</strong> {lead.phone}</p>
                </div>
                <div className="card">
                    <h3>Call Information</h3>
                    <p><strong>Call Date:</strong> Aug 3rd, 2025</p>
                    <p><strong>Call Time:</strong> 11:23 PM</p>
                    <p><strong>Duration:</strong> 2:11 min</p>
                </div>
                <div className="card full-span">
                    <h3>Job Details</h3>
                    <p><strong>Job Description:</strong> {jobDetails.jobDescription}</p>
                    <p><strong>Job Type:</strong> {jobDetails.jobType}</p>
                </div>
                <div className="card full-span">
                    <h3>Call Summary</h3>
                    <p>{lead.summary}</p>
                </div>
                <div className="card full-span">
                    <h3>Call Transcript</h3>
                    <div className="transcript">
                        <p><strong>Agent:</strong> Hello! This is Olivia. How can I help you today?</p>
                        <p><strong>User:</strong> Hi Olivia, I'm trying to get a prescription refilled.</p>
                        <p><strong>Agent:</strong> I can certainly help with that. Could you please provide the prescription number?</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

function InsightsScreen() {
    return (
        <main className="main-content">
            <header className="main-header"><h1>Insights</h1></header>
            <div className="content-area">
                <div className="card">
                    <h3>AI Weekly "Whisper" Briefing</h3>
                    <p>Your automated Monday morning summary of trends, highlights, and issues will appear here.</p>
                </div>
            </div>
        </main>
    );
}

function GrowthScreen() {
    const [activeTab, setActiveTab] = useState('referrals');
    const sampleReferralLeads = [
        { id: 1, lead_name: 'Wesley Carr', referred_by: 'Curtis Greer', date: 'Today', status: 'Contacted', response: 'Needs follow-up call' },
        { id: 2, lead_name: 'John Adams', referred_by: 'Ralph Medina', date: 'Today', status: 'New', response: 'Initial outreach sent' },
        { id: 3, lead_name: 'Amber Smith', referred_by: 'Orlando Beck', date: 'Yesterday', status: 'Converted', response: 'Booked consultation' },
    ];
    return (
        <main className="main-content">
            <header className="main-header">
                <h1>Growth</h1>
                <button className="btn btn-primary">New Campaign</button>
            </header>
            <div className="sub-nav">
                <button className={activeTab === 'referrals' ? 'active' : ''} onClick={() => setActiveTab('referrals')}>Referrals</button>
                <button className={activeTab === 'campaigns' ? 'active' : ''} onClick={() => setActiveTab('campaigns')}>Campaigns</button>
            </div>
            <div className="content-area">
                {activeTab === 'referrals' && (
                    <>
                        <div className="kpi-grid">
                            <div className="kpi-card"><span className="kpi-value">9.7K</span><span className="kpi-label">Sent</span></div>
                            <div className="kpi-card"><span className="kpi-value">5.7K</span><span className="kpi-label">Shared</span></div>
                            <div className="kpi-card"><span className="kpi-value">308</span><span className="kpi-label">Leads Received</span></div>
                        </div>
                        <div className="card">
                            <h3>Referral Leads</h3>
                            <table className="data-table">
                                <thead><tr><th>Lead</th><th>Shared By</th><th>Created On</th><th>Response</th><th></th></tr></thead>
                                <tbody>
                                    {sampleReferralLeads.map(lead => (
                                        <tr key={lead.id}>
                                            <td>{lead.lead_name}</td>
                                            <td>{lead.referred_by}</td>
                                            <td>{lead.date}</td>
                                            <td>{lead.response}</td>
                                            <td><span className={`status-pill status-${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {activeTab === 'campaigns' && (<div className="card"><h3>Automated Campaigns</h3></div>)}
            </div>
        </main>
    );
}

function SettingsScreen() {
    return (
        <main className="main-content">
            <header className="main-header"><h1>Settings</h1></header>
            <div className="content-area">
                <div className="card">
                    <h3>Connect Platforms</h3>
                    <p>Connect your accounts to start syncing reviews and messages.</p>
                    <div className="platform-buttons"><button className="btn btn-primary">Connect Google</button><button className="btn btn-secondary">Connect Facebook</button><button className="btn btn-secondary">Connect Yelp</button></div>
                </div>
            </div>
        </main>
    );
}

// --- Main App Component ---
function App() {
  const [view, setView] = useState('login');
  const [authToken, setAuthToken] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleLoginSuccess = (token) => { setAuthToken(token); setView('overview'); };
  const handleLogout = () => { setAuthToken(null); setView('login'); };

  const renderView = () => {
    switch (view) {
      case 'overview': return <OverviewScreen />;
      case 'inbox': return <InboxScreen />;
      case 'catchit-ai': return <CatchitAiScreen setView={setView} setSelectedLead={setSelectedLead} />;
      case 'lead-detail': return <LeadDetailScreen lead={selectedLead} setView={setView} />;
      case 'insights': return <InsightsScreen />;
      case 'growth': return <GrowthScreen />;
      case 'settings': return <SettingsScreen />;
      default: return null;
    }
  };

  const AppStyles = `
    :root { --primary-color: #1E3A3A; --bg-color: #FFFFFF; --text-color: #000000; --sidebar-bg: #f8f9fa; --border-color: #e9ecef; --star-color: #ffc107; --success-color: #28a745; --warning-color: #ffc107; --info-color: #17a2b8; --danger-color: #dc3545; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: var(--bg-color); color: var(--text-color); }
    .app-layout { display: flex; height: 100vh; }
    .main-content { flex-grow: 1; padding: 2.5rem; overflow-y: auto; background-color: #f8f9fa; }
    .main-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1.5rem; margin-bottom: 2.5rem; }
    .main-header h1 { margin: 0; font-size: 2rem; }
    .content-area { display: flex; flex-direction: column; gap: 2rem; }
    .card { background-color: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .card h3 { margin-top: 0; }

    /* LoginScreen Styles */
    .login-container { display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #f8f9fa; }
    .login-box { width: 100%; max-width: 400px; padding: 3rem; background-color: var(--bg-color); border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); text-align: center; }
    .login-box h1 { font-size: 2.5rem; color: var(--primary-color); }
    .login-box p { color: #6c757d; margin-bottom: 2rem; }
    .input-group { text-align: left; margin-bottom: 1.5rem; }
    .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
    .input-group input, select { width: 100%; padding: 0.8rem 1rem; border: 1px solid var(--border-color); border-radius: 8px; box-sizing: border-box; font-size: 1rem; }
    .auth-toggle { margin-top: 1.5rem; }
    .auth-toggle button { background: none; border: none; color: var(--primary-color); font-weight: 600; cursor: pointer; padding: 0.5rem; font-size: 1rem; }

    /* Sidebar Styles */
    .sidebar { width: 250px; background-color: var(--bg-color); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; padding: 1rem; }
    .sidebar-header { padding: 1rem; text-align: center; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem; }
    .sidebar-header h2 { color: var(--primary-color); margin: 0; }
    .sidebar-nav-list { list-style: none; padding: 0; margin: 0; flex-grow: 1; }
    .nav-item { position: relative; display: flex; align-items: center; gap: 1rem; width: 100%; padding: 1rem; border: none; background: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; text-align: left; color: #343a40; }
    .nav-item:hover { background-color: #e9ecef; }
    .nav-item.active { background-color: var(--primary-color); color: white; }
    .nav-item.active svg { stroke: white; }
    .nav-item svg { width: 20px; height: 20px; }
    .sidebar-footer { margin-top: auto; }
    .notification-dot { position: absolute; top: 12px; right: 12px; width: 8px; height: 8px; background-color: var(--danger-color); border-radius: 50%; }

    /* Overview Screen */
    .overview-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
    .overview-card-main { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; }
    .overview-rating { font-size: 2.5rem; font-weight: bold; display: flex; align-items: center; gap: 0.5rem; }
    .overview-trend { font-size: 0.9rem; color: var(--success-color); }

    /* Inbox Screen Styles */
    .inbox-layout { display: grid; grid-template-columns: 350px 1fr; height: 100%; width: 100%; }
    .inbox-sidebar { background-color: var(--bg-color); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; }
    .inbox-sidebar .main-header { padding: 1.5rem; margin-bottom: 0; border-bottom: 1px solid var(--border-color); }
    .inbox-filters { display: flex; justify-content: space-around; padding: 0.5rem; border-bottom: 1px solid var(--border-color); }
    .inbox-filters button { background: none; border: none; padding: 0.75rem; font-weight: 600; cursor: pointer; color: #6c757d; border-radius: 8px; }
    .inbox-filters button.active { background-color: #e9ecef; color: var(--primary-color); }
    .inbox-list { overflow-y: auto; flex-grow: 1; }
    .inbox-list-item { display: flex; gap: 1rem; padding: 1rem 1.5rem; cursor: pointer; border-bottom: 1px solid var(--border-color); align-items: center; }
    .inbox-list-item:hover { background-color: #f8f9fa; }
    .inbox-list-item.selected { background-color: #e8f4ff; }
    .item-icon { flex-shrink: 0; }
    .item-icon svg { width: 16px; height: 16px; color: #6c757d; }
    .item-content { flex-grow: 1; overflow: hidden; }
    .item-header { display: flex; justify-content: space-between; align-items: center; }
    .item-date { font-size: 0.8rem; color: #6c757d; }
    .item-text-preview { font-size: 0.9rem; color: #495057; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0.25rem 0 0; }
    .conversation-view { padding: 2rem; display: flex; flex-direction: column; }
    .conversation-view h3 { margin-top: 0; }
    .message-bubble { max-width: 70%; padding: 0.75rem 1.25rem; border-radius: 18px; line-height: 1.5; margin-bottom: 1rem; }
    .message-bubble.received { background-color: #e9ecef; align-self: flex-start; }
    .message-bubble.sent { background-color: var(--primary-color); color: white; align-self: flex-end; }
    .reply-box { margin-top: auto; display: flex; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem; }
    .reply-box textarea { flex-grow: 1; border-radius: 8px; border: 1px solid var(--border-color); padding: 0.75rem; resize: none; }
    
    /* Catchit AI & Lead Detail Screens */
    .kpi-grid.full-width { grid-template-columns: repeat(4, 1fr); }
    .dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
    .lead-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color); }
    .lead-item.clickable { cursor: pointer; }
    .lead-item.clickable:hover { background-color: #f8f9fa; }
    .lead-item:last-child { border-bottom: none; }
    .lead-info p { margin: 0.25rem 0 0; color: #6c757d; }
    .lead-actions { display: flex; gap: 0.5rem; align-items: center; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .card.full-span { grid-column: 1 / -1; }
    .transcript p { margin: 0 0 0.5rem; }

    /* Growth Screen Styles */
    .sub-nav { display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 2.5rem; }
    .sub-nav button { background: none; border: none; padding: 1rem 1.5rem; font-size: 1rem; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent; }
    .sub-nav button.active { border-bottom-color: var(--primary-color); color: var(--primary-color); }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; }
    .kpi-card { background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center; }
    .kpi-value { font-size: 2.5rem; font-weight: bold; color: var(--primary-color); display: block; }
    .kpi-label { font-size: 1rem; color: #6c757d; margin-top: 0.5rem; }
    .data-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .data-table th, .data-table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border-color); }
    .data-table th { font-weight: 600; color: #6c757d; font-size: 0.9rem; text-transform: uppercase; }
    .status-pill { padding: 0.25rem 0.75rem; border-radius: 999px; font-weight: 600; font-size: 0.8rem; }
    .status-pill.status-contacted { background-color: #e8f4ff; color: #17a2b8; }
    .status-pill.status-new, .status-pill.status-open { background-color: #fff8e1; color: #ffc107; }
    .status-pill.status-converted, .status-pill.status-active, .status-pill.status-booked { background-color: #e6f6e9; color: #28a745; }
    .status-pill.status-paused { background-color: #f8f9fa; color: #6c757d; }
    .status-pill.status-service { background-color: #e8f4ff; color: #17a2b8; }
    .status-pill.status-quotation { background-color: #f3e8ff; color: #6f42c1; }

    /* General Button Styles */
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
    .btn-primary { background-color: var(--primary-color); color: white; }
    .btn-primary:hover { opacity: 0.9; }
    .btn-secondary { background-color: #e9ecef; color: #343a40; }
    .btn-small { padding: 0.5rem 1rem; font-size: 0.9rem; }
    
    /* Toggle Switch */
    .header-controls { display: flex; align-items: center; gap: 0.5rem; }
    .switch { position: relative; display: inline-block; width: 50px; height: 28px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
    .slider.round { border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: var(--primary-color); }
    input:checked + .slider:before { transform: translateX(22px); }

    /* Misc */
    .platform-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
  `;

  return (
    <React.Fragment>
      <style>{AppStyles}</style>
      {authToken ? (
        <div className="app-layout">
          <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />
          {renderView()}
        </div>
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </React.Fragment>
  );
}

export default App;
