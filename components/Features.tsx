"use client"
import React, { CSSProperties } from 'react';

const VaiketBenefits: React.FC = () => {
  const containerStyle: CSSProperties = {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    padding: '100px 24px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const contentStyle: CSSProperties = {
    maxWidth: '680px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  };

  const headingStyle: CSSProperties = {
    fontSize: '3rem',
    fontWeight: 800,
    marginBottom: '80px',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    background: 'linear-gradient(90deg, #ffffff 0%, #e6e6e6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const listStyle: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '64px',
  };

  const itemStyle: CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    position: 'relative',
    paddingLeft: '40px',
  };

  const bulletStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '2px',
    fontSize: '2rem',
    color: '#4f46e5',
    fontWeight: 700,
  };

  const gradientLineStyle: CSSProperties = {
    position: 'absolute',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '4px',
    background: 'linear-gradient(90deg, #4f46e5, #8b5cf6)',
    borderRadius: '2px',
  };

  const mobileStyles = `
    @media (max-width: 768px) {
      .vaiket-section {
        padding: 80px 20px !important;
        text-align: left !important;
      }
      
      .vaiket-heading {
        font-size: 2.25rem !important;
        margin-bottom: 60px !important;
        text-align: left !important;
        letter-spacing: -0.01em !important;
      }
      
      .vaiket-list {
        gap: 48px !important;
      }
      
      .vaiket-item {
        font-size: 1.375rem !important;
        padding-left: 36px !important;
      }
      
      .vaiket-bullet {
        font-size: 1.75rem !important;
        top: 1px !important;
      }
    }
    
    @media (max-width: 480px) {
      .vaiket-heading {
        font-size: 1.875rem !important;
      }
      
      .vaiket-item {
        font-size: 1.25rem !important;
        padding-left: 32px !important;
      }
      
      .vaiket-bullet {
        left: -4px !important;
      }
    }
  `;

  const benefits = [
    { 
      text: 'Turn your online presence into real customers',
      color: '#4f46e5'
    },
    { 
      text: 'Run digital marketing that actually brings leads',
      color: '#7c3aed'
    },
    { 
      text: 'Automate emails and follow-ups so growth never stops',
      color: '#8b5cf6'
    },
  ];

  return (
    <section 
      className="vaiket-section"
      style={containerStyle}
      aria-label="What Vaiket Helps You Do"
    >
      {/* Decorative gradient dots */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '10%',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'linear-gradient(90deg, #4f46e5, transparent)',
        opacity: 0.5,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '15%',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'linear-gradient(90deg, #8b5cf6, transparent)',
        opacity: 0.5,
      }} />

      <div className="vaiket-container" style={contentStyle}>
        <h2 className="vaiket-heading" style={headingStyle}>
          What Vaiket Helps You Do
        </h2>
        
        <ul className="vaiket-list" style={listStyle}>
          {benefits.map((benefit, index) => (
            <li 
              key={index}
              className="vaiket-item"
              style={itemStyle}
            >
              <span 
                className="vaiket-bullet"
                style={bulletStyle}
              >
                •
              </span>
              {benefit.text}
            </li>
          ))}
        </ul>

        {/* Conversion-focused subtle call-to-action element */}
        <div 
          className="vaiket-gradient-line"
          style={gradientLineStyle}
          aria-hidden="true"
        />
        
        <p style={{
          marginTop: '80px',
          fontSize: '1.125rem',
          color: '#a1a1aa',
          fontWeight: 500,
          lineHeight: 1.6,
          maxWidth: '540px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <span style={{ 
            color: '#ffffff',
            fontWeight: 600 
          }}>
            93% of users
          </span>{' '}
          see measurable growth within 30 days
        </p>
      </div>

      <style jsx>{mobileStyles}</style>
    </section>
  );
};

export default VaiketBenefits;