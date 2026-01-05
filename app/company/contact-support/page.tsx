'use client'
import React, { useState } from 'react';

// TypeScript interfaces
interface SupportOption {
  icon: string;
  title: string;
  description: string;
  details: string;
  cta?: string;
  link?: string;
}

interface SupportReason {
  icon: string;
  text: string;
}

interface SupportTier {
  name: string;
  responseTime: string;
  features: string[];
  badge?: string;
}

// Main component
const VaiketSupportPage: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    severity: 'normal'
  });

  // Support options data
  const supportOptions: SupportOption[] = [
    {
      icon: "📩",
      title: "Email Support",
      description: "Detailed technical assistance",
      details: "support@vaiket.com (Avg reply: under 4 hours)",
      cta: "Send Email",
      link: "mailto:support@vaiket.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Instant messaging support",
      details: "Available inside dashboard (9 AM – 9 PM IST)",
      cta: "Open Dashboard",
      link: "#dashboard"
    },
    {
      icon: "🧠",
      title: "Help Center",
      description: "Self-service knowledge base",
      details: "Instant answers to common questions",
      cta: "Browse Articles",
      link: "#help-center"
    },
    {
      icon: "🔐",
      title: "Account Support",
      description: "Security & access issues",
      details: "For login / password recovery",
      cta: "Get Help",
      link: "#account-help"
    }
  ];

  // Common support reasons
  const supportReasons: SupportReason[] = [
    { icon: "🔑", text: "Login / password issues" },
    { icon: "📧", text: "Email delivery issues (SMTP / IMAP)" },
    { icon: "💳", text: "Billing & subscription changes" },
    { icon: "🤖", text: "AI reply configuration" },
    { icon: "🌐", text: "Domain setup assistance" },
    { icon: "⚙️", text: "Integration troubleshooting" }
  ];

  // Priority support tiers
  const supportTiers: SupportTier[] = [
    {
      name: "Free Users",
      responseTime: "Within 4 hours",
      features: ["Email support", "Help center access", "Community forums"]
    },
    {
      name: "Premium Users",
      responseTime: "2-hour guaranteed",
      features: ["Priority email support", "Live chat", "Extended support hours"],
      badge: "⭐"
    },
    {
      name: "Enterprise Users",
      responseTime: "1-hour guaranteed",
      features: ["Dedicated success manager", "Phone support", "24/7 emergency line"],
      badge: "🚀"
    }
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsFormSubmitted(true);
    
    // Simulate sending email (in production, this would be an API call)
    setTimeout(() => {
      window.location.href = `mailto:support@vaiket.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`)}`;
    }, 1000);
  };

  return (
    <div className="vaiket-support-page">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Contact Vaiket Support</h1>
            <p className="hero-subtitle">
              We are here to help you 24/7 — for setup, technical issues, billing, or product guidance.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support Available</div>
              </div>
              <div className="stat">
                <div className="stat-number">4h</div>
                <div className="stat-label">Avg Response Time</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options Grid */}
      <section className="support-options">
        <div className="container">
          <h2 className="section-title">Get Support Your Way</h2>
          <div className="options-grid">
            {supportOptions.map((option, index) => (
              <div key={index} className="support-card">
                <div className="card-icon">{option.icon}</div>
                <h3 className="card-title">{option.title}</h3>
                <p className="card-description">{option.description}</p>
                <p className="card-details">{option.details}</p>
                {option.cta && (
                  <a href={option.link} className="card-cta">
                    {option.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Support Section */}
      <section className="priority-support">
        <div className="container">
          <div className="priority-header">
            <div className="priority-icon">💡</div>
            <h2 className="section-title">Priority Support for Paid Users</h2>
          </div>
          <div className="tiers-grid">
            {supportTiers.map((tier, index) => (
              <div key={index} className={`tier-card ${tier.badge ? 'featured' : ''}`}>
                {tier.badge && <div className="tier-badge">{tier.badge}</div>}
                <h3 className="tier-name">{tier.name}</h3>
                <div className="response-time">{tier.responseTime}</div>
                <ul className="tier-features">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Support Reasons */}
      <section className="support-reasons">
        <div className="container">
          <h2 className="section-title">Common Support Topics</h2>
          <div className="reasons-grid">
            {supportReasons.map((reason, index) => (
              <div key={index} className="reason-item">
                <span className="reason-icon">{reason.icon}</span>
                <span className="reason-text">{reason.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Prefer a direct reply?</h2>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📩</div>
                  <div className="method-details">
                    <h3>Email Support</h3>
                    <p>support@vaiket.com</p>
                    <a href="mailto:support@vaiket.com" className="btn btn-primary">
                      Send Email
                    </a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <h3>Phone Support</h3>
                    <p>(Phone support launching soon)</p>
                    <button className="btn btn-secondary" disabled>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              {isFormSubmitted ? (
                <div className="submission-success">
                  <div className="success-icon">✅</div>
                  <h2>Thanks for reaching out!</h2>
                  <p>Our team will respond within 4 hours.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsFormSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3>Send us a message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="severity">Severity</label>
                      <select
                        id="severity"
                        name="severity"
                        value={formData.severity}
                        onChange={handleInputChange}
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Please describe your issue in detail..."
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full">
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="resources-section">
        <div className="container">
          <h2 className="section-title">Additional Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>📚 Documentation</h3>
              <p>Comprehensive guides and API documentation</p>
              <a href="#docs" className="resource-link">View Documentation →</a>
            </div>
            <div className="resource-card">
              <h3>🎥 Video Tutorials</h3>
              <p>Step-by-step video guides for common tasks</p>
              <a href="#tutorials" className="resource-link">Watch Tutorials →</a>
            </div>
            <div className="resource-card">
              <h3>🔄 Status Page</h3>
              <p>Real-time system status and incident reports</p>
              <a href="#status" className="resource-link">Check Status →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="support-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Vaiket Customer Support</h3>
              <p>AI Business Email Support — 24/7 Help Desk</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact Us</a>
                <a href="#status">Status</a>
              </div>
              <div className="link-group">
                <h4>Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#security">Security</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About Vaiket</a>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Vaiket. All rights reserved. | AI Business Email Support — 24/7 Help Desk</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .vaiket-support-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1e293b;
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .support-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 80px 0 60px;
          text-align: center;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 40px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Section Common Styles */
        section {
          padding: 60px 0;
        }

        .section-title {
          font-size: 2.2rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #1e3a8a;
          font-weight: 700;
        }

        /* Support Options */
        .support-options {
          background-color: #f8fafc;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .support-card {
          background: white;
          border-radius: 12px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .support-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1e3a8a;
          font-weight: 600;
        }

        .card-description {
          color: #64748b;
          margin-bottom: 1rem;
        }

        .card-details {
          font-weight: 500;
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .card-cta {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .card-cta:hover {
          background: #2563eb;
        }

        /* Priority Support */
        .priority-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .priority-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .tiers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .tier-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          position: relative;
          transition: transform 0.3s ease;
        }

        .tier-card.featured {
          border: 2px solid #f59e0b;
          transform: scale(1.05);
        }

        .tier-badge {
          position: absolute;
          top: -15px;
          right: 20px;
          background: #f59e0b;
          color: white;
          padding: 5px 15px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .tier-name {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1e3a8a;
          font-weight: 600;
        }

        .response-time {
          font-size: 1.3rem;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 1.5rem;
        }

        .tier-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tier-features li {
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .tier-features li:last-child {
          border-bottom: none;
        }

        /* Support Reasons */
        .support-reasons {
          background-color: #f8fafc;
        }

        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
          max-width: 800px;
          margin: 0 auto;
        }

        .reason-item {
          display: flex;
          align-items: center;
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .reason-icon {
          font-size: 1.5rem;
          margin-right: 15px;
        }

        .reason-text {
          font-weight: 500;
        }

        /* Contact Section */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: start;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .contact-method {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .method-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .method-details h3 {
          margin-bottom: 5px;
          color: #1e3a8a;
        }

        .method-details p {
          margin-bottom: 15px;
          color: #64748b;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: #e5e7eb;
          color: #374151;
        }

        .btn-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-full {
          width: 100%;
        }

        .contact-form {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .contact-form h3 {
          margin-bottom: 25px;
          color: #1e3a8a;
          font-size: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .submission-success {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .submission-success h2 {
          margin-bottom: 10px;
          color: #10b981;
        }

        /* Resources Section */
        .resources-section {
          background-color: #f8fafc;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .resource-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .resource-card h3 {
          margin-bottom: 15px;
          color: #1e3a8a;
        }

        .resource-card p {
          color: #64748b;
          margin-bottom: 20px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        /* Footer */
        .support-footer {
          background: #1e293b;
          color: white;
          padding: 50px 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 50px;
          margin-bottom: 40px;
        }

        .footer-brand h3 {
          margin-bottom: 15px;
          font-size: 1.5rem;
        }

        .footer-brand p {
          color: #cbd5e1;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .link-group h4 {
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .link-group a {
          display: block;
          color: #cbd5e1;
          margin-bottom: 10px;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .link-group a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 20px;
          text-align: center;
          color: #94a3b8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .footer-links {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .tier-card.featured {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default VaiketSupportPage;