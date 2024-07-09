import React from 'react';
import './GoogleSignInModal.css';

const GoogleSignInModal = ({ onClose }) => {
  const handleGoogleSignIn = () => {
    // handle Google sign-in logic
    alert('Google sign-in clicked');
    onClose();
    window.location.href = "https://www.google.com/search?q=softcraft+solutions&sca_esv=45ee99042305f18a&sca_upv=1&rlz=1C1CHBF_enIN1056IN1056&sxsrf=ADLYWIKVxXpGOchDDuQaYf_cQolAQq9Wlw%3A1720421139739&ei=E4uLZu_vLJKd4-EP18CTmAE&gs_ssp=eJzj4tVP1zc0rDQxzCrKMMkyYLRSNagwTko1T7RMNk8CAjMjgxQrgwpTQxNLAwtLizTjFKNEo8Q0L-Hi_LSS5KLEtBKF4vyc0pLM_LxiADiqF3A&oq=softcraft&gs_lp=Egxnd3Mtd2l6LXNlcnAiCXNvZnRjcmFmdCoCCAEyBBAjGCcyExAuGIAEGMcBGCcYigUYjgUYrwEyChAjGIAEGCcYigUyBRAAGIAEMgUQABiABDIOEC4YgAQYxwEYjgUYrwEyBRAAGIAEMgsQLhiABBjHARivATIFEAAYgAQyBRAAGIAEMiAQLhiABBjHARiKBRiOBRivARiXBRjcBBjeBBjgBNgBAkiqLlCTCViwGHABeAGQAQCYAYUCoAH7DaoBBTAuNS40uAEByAEA-AEBmAILoAL0IagCFMICBxAjGCcY6gLCAhYQABgDGLQCGOUCGOoCGIwDGI8B2AEBwgIYEAAYAxi0AhjlAhjqAhgKGIwDGI8B2AEBwgIWEC4YAxi0AhjlAhjqAhiMAxiPAdgBAcICCxAAGIAEGJECGIoFwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxjRAxiDARjHAcICERAuGIAEGJECGNEDGMcBGIoFwgIREC4YgAQYkQIYxwEYigUYrwHCAgoQABiABBhDGIoFwgIIEC4YgAQYsQPCAg0QABiABBixAxhDGIoFwgIIEAAYgAQYsQPCAhMQLhiABBhDGMcBGIoFGI4FGK8BwgIQEC4YgAQYQxjHARiKBRivAcICCxAuGIAEGNEDGMcBwgIKEC4YgAQY5QQYCpgDFroGBggBEAEYC7oGBggCEAEYFJIHCTEuNC41LjgtMaAH7bkB&sclient=gws-wiz-serp#lrd=0x3be7a9c7bbbb620d:0x51490898f3d2a2af,3,,,";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Sign in with Google</h2>
        <button className="google-signin-button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleSignInModal;
