'use client'
import React, { useState } from 'react';

// TypeScript interfaces
interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface CommissionType {
  type: string;
  earnings: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface PartnerProfile {
  name: string;
  description: string;
}

// Main component
const VaiketPartnerProgram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'referral' | 'reseller'>('referral');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Data for benefits section
  const benefits: Benefit[] = [
    {
      icon: "💸",
      title: "Recurring Earnings",
      description: "Monthly commission on every renewal"
    },
    {
      icon: "📈",
      title: "Fast-Growing Market",
      description: "AI business automation demand is booming"
    },
    {
      icon: "🎓",
      title: "Free Training",
      description: "Learn sales + automation without cost"
    },
    {
      icon: "🤝",
      title: "Direct Support",
      description: "We guide you in closing deals"
    },
    {
      icon: "🌍",
      title: "Pan-India Opportunity",
      description: "Sell from any city, any language"
    },
    {
      icon: "⚡",
      title: "Quick Onboarding",
      description: "Start earning within 24 hours"
    }
  ];

  // Data for commission structure
  const commissionTypes: CommissionType[] = [
    {
      type: "Referral Partner",
      earnings: "30% every month (lifetime)"
    },
    {
      type: "Reseller Partner",
      earnings: "40% First year + 20% renewal"
    }
  ];

  // Data for how it works steps
  const steps: Step[] = [
    {
      number: 1,
      title: "Apply Online",
      description: "Simple application process"
    },
    {
      number: 2,
      title: "Approval within 24 hours",
      description: "Quick review and onboarding"
    },
    {
      number: 3,
      title: "Get a unique Partner Code",
      description: "Your identifier for tracking referrals"
    },
    {
      number: 4,
      title: "Bring customers",
      description: "Using WhatsApp / Social Media / Local Network"
    },
    {
      number: 5,
      title: "Earn commission every month",
      description: "Recurring income on renewals"
    }
  ];

  // Data for partner profiles
  const partnerProfiles: PartnerProfile[] = [
    {
      name: "Developers",
      description: "Leverage your technical expertise"
    },
    {
      name: "Digital Marketers",
      description: "Use your audience to generate leads"
    },
    {
      name: "IT Service Providers",
      description: "Add value to your existing clients"
    },
    {
      name: "Business Consultants",
      description: "Recommend solutions to your network"
    },
    {
      name: "Affiliate Marketers",
      description: "Monetize your traffic effectively"
    },
    {
      name: "College Tech Leaders",
      description: "Start your entrepreneurial journey"
    }
  ];

  // Handle application form submission
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    alert('Application submitted! We will contact you within 24 hours.');
    setIsApplicationModalOpen(false);
  };

  return (
    <div className="vaiket-partner-program">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge founding-badge">
              <span className="badge-icon">🏅</span>
              <span className="badge-text">Founding Partner Program</span>
            </div>
            <h1 className="hero-title">Become a Vaiket Partner</h1>
            <p className="hero-subtitle">
              Help businesses automate customer support — and earn <span className="highlight">30% lifetime commission</span> 🌟
            </p>
            <p className="hero-description">
              Apply now and become a Founding Partner of India's AI automation revolution.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setIsApplicationModalOpen(true)}
              >
                Apply as Partner
              </button>
              <button className="btn btn-secondary">
                Contact Partnership Team
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Partners Joined</div>
              </div>
              <div className="stat">
                <div className="stat-number">₹2.5Cr+</div>
                <div className="stat-label">Commissions Paid</div>
              </div>
              <div className="stat">
                <div className="stat-number">94%</div>
                <div className="stat-label">Renewal Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Become a Vaiket Partner?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="profiles">
        <div className="container">
          <h2 className="section-title">Who Can Join?</h2>
          <p className="section-subtitle">
            Developers, Digital Marketers, IT Service Providers, Business Consultants, 
            Affiliates, College Tech Leaders — anyone who can bring customers.
          </p>
          <div className="profiles-grid">
            {partnerProfiles.map((profile, index) => (
              <div key={index} className="profile-card">
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-description">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
          <div className="dashboard-announcement">
            <div className="announcement-icon">📌</div>
            <div className="announcement-content">
              <h4>Partner Dashboard Coming Soon</h4>
              <p>Track your referrals, commissions, and performance in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure Section */}
      <section className="commission">
        <div className="container">
          <h2 className="section-title">Commission Structure</h2>
          <div className="commission-tabs">
            <button 
              className={`tab ${activeTab === 'referral' ? 'active' : ''}`}
              onClick={() => setActiveTab('referral')}
            >
              Referral Partner
            </button>
            <button 
              className={`tab ${activeTab === 'reseller' ? 'active' : ''}`}
              onClick={() => setActiveTab('reseller')}
            >
              Reseller Partner
            </button>
          </div>
          
          <div className="commission-content">
            {activeTab === 'referral' && (
              <div className="commission-plan">
                <div className="plan-header">
                  <h3>Referral Partner</h3>
                  <div className="commission-rate">30% Lifetime</div>
                </div>
                <ul className="plan-features">
                  <li>✅ 30% commission on every monthly renewal</li>
                  <li>✅ No technical expertise required</li>
                  <li>✅ Perfect for affiliates & marketers</li>
                  <li>✅ Minimal time commitment</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reseller' && (
              <div className="commission-plan">
                <div className="plan-header">
                  <h3>Reseller Partner</h3>
                  <div className="commission-rate">40% First Year</div>
                </div>
                <ul className="plan-features">
                  <li>✅ 40% commission in first year</li>
                  <li>✅ 20% commission on renewals</li>
                  <li>✅ White-label solutions available</li>
                  <li>✅ Direct client management</li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="commission-note">
            <p>💡 <strong>Note:</strong> Minimum 1 customer per quarter required to stay active.</p>
          </div>
        </div>
      </section>

      {/* Founding Partner Section */}
      <section className="founding">
        <div className="container">
          <div className="founding-content">
            <div className="founding-badge-large">🏅</div>
            <h2 className="section-title">Founding Partner Status</h2>
            <p className="founding-deadline">
              Join before <span className="deadline">31st December 2025</span>
            </p>
            <div className="founding-benefits">
              <div className="founding-benefit">
                <span className="benefit-icon">⭐</span>
                <span>Exclusive Founding Partner Badge</span>
              </div>
              <div className="founding-benefit">
                <span className="benefit-icon">🚀</span>
                <span>Higher commission rates</span>
              </div>
              <div className="founding-benefit">
                <span className="benefit-icon">🤝</span>
                <span>Priority support & onboarding</span>
              </div>
              <div className="founding-benefit">
                <span className="benefit-icon">💼</span>
                <span>Early access to new features</span>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setIsApplicationModalOpen(true)}
            >
              Apply for Founding Partner Status
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly will I get approved?</h3>
              <p>Most applications are approved within 24 hours. We'll contact you for a quick onboarding call to get you started.</p>
            </div>
            <div className="faq-item">
              <h3>When will I receive my commissions?</h3>
              <p>Commissions are paid monthly, around the 15th of each month for the previous month's renewals.</p>
            </div>
            <div className="faq-item">
              <h3>Is there any cost to join?</h3>
              <p>No, joining the Vaiket Partner Program is completely free. We provide all training and resources at no cost.</p>
            </div>
            <div className="faq-item">
              <h3>What support do you provide?</h3>
              <p>We provide sales materials, product training, and direct support to help you close deals successfully.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Earning?</h2>
            <p className="cta-description">
              Join India's fastest-growing AI automation partner program today and start building your recurring income stream.
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setIsApplicationModalOpen(true)}
            >
              Start Your Application Now
            </button>
            <p className="cta-note">Approval within 24 hours • No upfront cost • Lifetime commissions</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Vaiket Partner Program</h3>
              <p>Helping businesses automate customer support through AI-powered solutions.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Program</h4>
                <a href="#">Commission Structure</a>
                <a href="#">Partner Benefits</a>
                <a href="#">How It Works</a>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <a href="#">Partner Portal</a>
                <a href="#">Documentation</a>
                <a href="#">Contact Us</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="#">About Vaiket</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Vaiket Partner Program. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Apply to Vaiket Partner Program</h2>
              <button 
                className="modal-close"
                onClick={() => setIsApplicationModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleApplicationSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="profile">Primary Profile</label>
                  <select id="profile" required>
                    <option value="">Select your profile</option>
                    <option value="developer">Developer</option>
                    <option value="marketer">Digital Marketer</option>
                    <option value="it-provider">IT Service Provider</option>
                    <option value="consultant">Business Consultant</option>
                    <option value="affiliate">Affiliate Marketer</option>
                    <option value="student">College Tech Leader</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Relevant Experience</label>
                  <textarea 
                    id="experience" 
                    rows={3}
                    placeholder="Briefly describe your background and how you plan to bring customers..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .vaiket-partner-program {
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
        .hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 100px 0 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.1;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 8px 16px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .badge-icon {
          margin-right: 8px;
        }

        .badge-text {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .highlight {
          color: #fbbf24;
          font-weight: 700;
        }

        .hero-description {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 60px;
        }

        .btn {
          padding: 14px 32px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary {
          background-color: #f59e0b;
          color: white;
        }

        .btn-primary:hover {
          background-color: #d97706;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
        }

        .btn-secondary {
          background-color: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background-color: white;
          color: #3b82f6;
        }

        .btn-large {
          padding: 16px 40px;
          font-size: 1.1rem;
        }

        .btn-full {
          width: 100%;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Section Common Styles */
        section {
          padding: 80px 0;
        }

        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
          color: #1e3a8a;
          font-weight: 700;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          color: #64748b;
        }

        /* Benefits Section */
        .benefits {
          background-color: #f8fafc;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: white;
          border-radius: 12px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .benefit-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1e3a8a;
          font-weight: 600;
        }

        .benefit-description {
          color: #64748b;
        }

        /* Profiles Section */
        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .profile-card {
          background: white;
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          transition: transform 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-3px);
        }

        .profile-name {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #1e3a8a;
          font-weight: 600;
        }

        .profile-description {
          color: #64748b;
        }

        /* Process Section */
        .process {
          background-color: #f8fafc;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto 50px;
        }

        .process-step {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 30px;
          position: relative;
        }

        .step-number {
          background: #3b82f6;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          flex-shrink: 0;
          z-index: 2;
        }

        .step-content {
          background: white;
          border-radius: 12px;
          padding: 25px;
          margin-left: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          flex-grow: 1;
        }

        .step-title {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #1e3a8a;
          font-weight: 600;
        }

        .step-description {
          color: #64748b;
        }

        .step-connector {
          position: absolute;
          left: 30px;
          top: 60px;
          bottom: -30px;
          width: 2px;
          background: #e2e8f0;
          z-index: 1;
        }

        .process-step:last-child .step-connector {
          display: none;
        }

        .dashboard-announcement {
          background: #e0f2fe;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          align-items: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .announcement-icon {
          font-size: 2.5rem;
          margin-right: 20px;
        }

        .announcement-content h4 {
          margin-bottom: 5px;
          color: #0369a1;
        }

        /* Commission Section */
        .commission-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          border-bottom: 1px solid #e2e8f0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .tab {
          padding: 12px 30px;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          color: #64748b;
        }

        .tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .commission-content {
          max-width: 600px;
          margin: 0 auto 30px;
        }

        .commission-plan {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .plan-header h3 {
          font-size: 1.5rem;
          color: #1e3a8a;
          margin: 0;
        }

        .commission-rate {
          background: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .plan-features li {
          padding: 10px 0;
          font-size: 1.1rem;
        }

        .commission-note {
          text-align: center;
          background: #fef3c7;
          padding: 15px 20px;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Founding Section */
        .founding {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          text-align: center;
        }

        .founding-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .founding-badge-large {
          font-size: 5rem;
          margin-bottom: 1rem;
        }

        .founding-deadline {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .deadline {
          font-weight: 700;
          background: rgba(255, 255, 255, 0.2);
          padding: 5px 15px;
          border-radius: 50px;
        }

        .founding-benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .founding-benefit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 500;
        }

        /* FAQ Section */
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .faq-item h3 {
          margin-bottom: 15px;
          color: #1e3a8a;
          font-size: 1.2rem;
        }

        /* CTA Section */
        .cta {
          background: #1e3a8a;
          color: white;
          text-align: center;
        }

        .cta-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }

        .cta-note {
          margin-top: 20px;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        /* Footer */
        .footer {
          background: #0f172a;
          color: white;
          padding: 60px 0 30px;
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
          border-top: 1px solid #334155;
          padding-top: 20px;
          text-align: center;
          color: #94a3b8;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 30px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h2 {
          margin: 0;
          color: #1e3a8a;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
        }

        .modal-body {
          padding: 30px;
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
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .process-step {
            flex-direction: column;
            text-align: center;
          }
          
          .step-content {
            margin-left: 0;
            margin-top: 20px;
          }
          
          .step-connector {
            display: none;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .footer-links {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .commission-tabs {
            flex-direction: column;
          }
          
          .founding-benefits {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default VaiketPartnerProgram;



