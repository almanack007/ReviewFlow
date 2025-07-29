import React, { useState, useEffect } from 'react';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (email && password) {
      onLogin();
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Catchit</h1>
        <p className="login-subtitle">Log in to manage your reviews</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="test@example.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password123" required />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    </div>
  );
};

const ReviewItem = ({ review, onApprove }) => {
  const [draft, setDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  const generateDraft = () => {
    setIsDrafting(true);
    let aiResponse = '';
    if (review.rating >= 4) {
      aiResponse = `Thank you so much for the wonderful ${review.rating}-star review, ${review.name}! We're thrilled you had a great experience and appreciate you taking the time to share. We hope to see you again soon!`;
    } else if (review.rating === 3) {
      aiResponse = `Thank you for your feedback, ${review.name}. We appreciate you letting us know how we can improve and hope to provide you with a 5-star experience next time.`;
    } else {
      aiResponse = `We're very sorry to hear that your experience didn't meet your expectations, ${review.name}. We take this feedback seriously and would appreciate the opportunity to make things right. Please contact us at manager@example.com.`;
    }
    setTimeout(() => {
        setDraft(aiResponse);
        setShowDraft(true);
        setIsDrafting(false);
    }, 700);
  };

  const postResponse = () => {
    onApprove(review.id);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>);
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="review-item-card">
      <div className="review-header">
        <span className="customer-name">{review.name}</span>
        {renderStars(review.rating)}
      </div>
      <p className="review-text">"{review.text}"</p>
      {!showDraft && (
        <button onClick={generateDraft} disabled={isDrafting} className="btn btn-draft">
          {isDrafting ? 'Generating...' : 'Generate AI Response'}
        </button>
      )}
      {showDraft && (
        <div className="draft-section">
          <textarea className="draft-textarea" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button onClick={postResponse} className="btn btn-approve">
            Approve & Post
          </button>
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ onLogout }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sampleData = [
    { id: 1, name: 'John D.', rating: 5, text: 'Amazing service! The staff was so friendly.' },
    { id: 2, name: 'Jane S.', rating: 2, text: 'The wait was way too long and my food was cold.' },
    { id: 3, name: 'Mike R.', rating: 4, text: 'Pretty good.' },
    { id: 4, name: 'Sarah L.', rating: 5, text: 'Absolutely love this place! A hidden gem.'}
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setReviews(sampleData);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleApprove = (reviewId) => {
    setReviews(currentReviews => currentReviews.filter(r => r.id !== reviewId));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>New Reviews</h1>
        <div className="header-actions">
          <p>You have {reviews.length} new reviews to respond to.</p>
          <button onClick={onLogout} className="btn btn-secondary">Logout</button>
        </div>
      </header>
      <div className="review-list">
        {isLoading && <p>Loading reviews...</p>}
        {!isLoading && reviews.length > 0 && (
          reviews.map(review => (
            <ReviewItem key={review.id} review={review} onApprove={handleApprove} />
          ))
        )}
        {!isLoading && reviews.length === 0 && (
          <div className="all-caught-up">
            <h2>You're all caught up!</h2>
            <p>No new reviews at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const AppStyles = `
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #f4f7f9; color: #343a40; }
    .App { text-align: center; }
    .login-container { display: flex; align-items: center; justify-content: center; height: 100vh; padding: 1rem; }
    .login-box { width: 100%; max-width: 400px; padding: 2.5rem; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
    .login-title { margin-top: 0; margin-bottom: 0.5rem; font-size: 1.8rem; }
    .login-subtitle { color: #6c757d; margin-bottom: 2.5rem; }
    .input-group { text-align: left; margin-bottom: 1.5rem; }
    .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
    .input-group input { width: 100%; padding: 0.8rem 1rem; border: 1px solid #dee2e6; border-radius: 8px; box-sizing: border-box; font-size: 1rem; }
    .error-message { color: #dc3545; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 0.75rem 1.25rem; margin-bottom: 1rem; }
    .dashboard-container { max-width: 800px; margin: 0 auto; padding: 1rem 2rem; }
    .dashboard-header { text-align: left; margin-bottom: 2rem; border-bottom: 1px solid #dee2e6; padding-bottom: 1.5rem; }
    .dashboard-header h1 { margin: 0; }
    .header-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
    .header-actions p { margin: 0; color: #6c757d; font-size: 1.1rem; }
    .review-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .all-caught-up { padding: 4rem; text-align: center; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
    .review-item-card { background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); padding: 1.5rem 2rem; text-align: left; transition: box-shadow 0.3s ease; }
    .review-item-card:hover { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); }
    .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .customer-name { font-weight: 600; font-size: 1.1rem; }
    .stars { font-size: 1.2rem; }
    .star { color: #e0e0e0; }
    .star.filled { color: #ffc107; }
    .review-text { font-style: italic; color: #6c757d; margin-bottom: 1.5rem; line-height: 1.6; }
    .draft-section { margin-top: 1rem; border-top: 1px solid #dee2e6; padding-top: 1.5rem; }
    .draft-textarea { width: 100%; min-height: 120px; border: 1px solid #dee2e6; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; box-sizing: border-box; font-family: inherit; font-size: 1rem; line-height: 1.5; resize: vertical; }
    .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background-color 0.2s ease, transform 0.1s ease; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn:active { transform: translateY(1px); }
    .btn-primary { background-color: #007bff; color: white; width: 100%; }
    .btn-primary:hover { background-color: #0056b3; }
    .btn-secondary { background-color: transparent; color: #6c757d; border: 1px solid #6c757d; padding: 0.6rem 1.2rem; }
    .btn-secondary:hover { background-color: #6c757d; color: white; }
    .btn-draft { background-color: #6c757d; color: white; }
    .btn-draft:hover { background-color: #5a6268; }
    .btn-approve { background-color: #28a745; color: white; }
    .btn-approve:hover { background-color: #218838; }
  `;

  return (
    <React.Fragment>
      <style>{AppStyles}</style>
      <div className="App">
        {isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
      </div>
    </React.Fragment>
  );
}

export default App;
