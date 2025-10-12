import React, { useState, useEffect } from 'react';
import profileImg from '/profile.jpg';
import comcastLogo from '/comcast.svg';
import dentsuLogo from '/dentsu.jpeg';
import { sendEmail } from './emailService';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [scrollY, setScrollY] = useState(0);

  const fullText = "AI/ML Software Engineer";

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);
    return () => clearInterval(typeTimer);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Color palette - matching Michał Dziuba's website
  const colors = {
    primary: '#00C853', // Green
    secondary: '#4CAF50', // Darker green
    accent: '#66BB6A', // Light green
    dark: '#000000', // Black
    darker: '#212121', // Very dark gray
    light: '#ffffff', // White
    gray: '#424242', // Medium gray
    white: '#ffffff', // Pure white
    background: '#ffffff' // White background
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: <img src="/exp.png" alt="Experience" style={{ width: 16, height: 16, objectFit: 'contain' }} /> },
    { id: 'projects', label: 'Projects', icon: '📊' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  // Scroll to section
  interface ScrollToSectionFn {
    (sectionId: string): void;
  }

  const scrollToSection: ScrollToSectionFn = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Modern card component
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
  }

  const Card: React.FC<CardProps> = ({ children, className = '', hover = true, ...props }) => (
    <div
      {...props}
      style={{
        background: colors.white,
        borderRadius: '24px',
        boxShadow: hover 
          ? '0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)'
          : '0 10px 20px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        border: `1px solid ${colors.white}`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hover ? 'translateY(0)' : 'none',
        padding: '32px',
        ...props.style
      }}
              onMouseEnter={(e) => {
          if (hover) {
            (e.target as HTMLElement).style.transform = 'translateY(-8px)';
            (e.target as HTMLElement).style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)';
          }
        }}
        onMouseLeave={(e) => {
          if (hover) {
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
          }
        }}
    >
      {children}
    </div>
  );

  // Modern button component
  type ButtonVariant = 'primary' | 'outline' | 'ghost';
  type ButtonSize = 'lg' | 'md' | 'sm';

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
  }

  const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
    const baseStyles = {
      border: 'none',
      borderRadius: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      textDecoration: 'none',
      fontSize: size === 'lg' ? '18px' : size === 'sm' ? '14px' : '16px',
      padding: size === 'lg' ? '16px 32px' : size === 'sm' ? '8px 16px' : '12px 24px',
    };

    const variants: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        background: colors.white,
        color: colors.dark,
        boxShadow: `0 8px 20px rgba(0, 0, 0, 0.1)`,
        border: `2px solid ${colors.dark}`,
      },
      outline: {
        background: colors.white,
        color: colors.dark,
        border: `2px solid ${colors.dark}`,
        boxShadow: 'none',
      },
      ghost: {
        background: colors.white,
        color: colors.dark,
        boxShadow: 'none',
        border: `1px solid ${colors.dark}30`,
      }
    };

    return (
      <button
        {...props}
        style={{
          ...baseStyles,
          ...variants[variant],
          ...props.style
        }}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLElement).style.background = colors.dark;
            (e.target as HTMLElement).style.color = colors.white;
            (e.target as HTMLElement).style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
          } else if (variant === 'outline') {
            (e.target as HTMLElement).style.background = colors.dark;
           (e.target as HTMLElement).style.color = colors.white;
           (e.target as HTMLElement).style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'primary') {
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.background = colors.white;
            (e.target as HTMLElement).style.color = colors.dark;
            (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
          } else if (variant === 'outline') {
            (e.target as HTMLElement).style.background = colors.white;
            (e.target as HTMLElement).style.color = colors.dark;
            (e.target as HTMLElement).style.transform = 'translateY(0)';
          }
        }}
      >
        {children}
      </button>
    );
  };

  // Navigation Component (sticky, not fixed)
  const Navigation = () => (
    <nav style={{
      position: 'sticky',
      top: 0,
      right: '32px',
      zIndex: 1000,
      background: colors.white,
      borderRadius: '50px',
      padding: '8px',
      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.white}`,
      margin: '32px 0 0 auto',
      width: 'fit-content',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              background: 'transparent',
              color: colors.dark,
              border: 'none',
              borderRadius: '40px',
              padding: '12px 20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = colors.white;
              (e.target as HTMLElement).style.border = `2px solid ${colors.dark}`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.border = 'none';
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );

  // Logo component
  const Logo = () => (
    <div style={{
      position: 'fixed',
      top: '32px',
      left: '32px',
      zIndex: 1000,
      fontSize: '2rem',
      fontWeight: '800',
      color: colors.dark,
      fontFamily: 'monospace',
    }}>
      EK_
    </div>
  );

  // Background dots component
  const BackgroundDots = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
    }}>
      {Array.from({ length: 200 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: '#000000',
            borderRadius: '50%',
            opacity: 0.2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  // SVG icon components
  const GitHubIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#181717" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
  );
  // Real-world skill icons using PNG files
  const PythonIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16.002 2.002c-7.732 0-7.25 3.354-7.25 3.354l.008 3.48h7.342v1.045H6.25S2 9.13 2 16.002c0 6.872 3.938 6.646 3.938 6.646h2.354v-3.334s-.127-3.938 3.938-3.938h7.875s3.812.062 3.812-3.75V5.356s.625-3.354-7.25-3.354zm-4.25 2.25a1.125 1.125 0 1 1 0 2.25a1.125 1.125 0 0 1 0-2.25z" fill="#3776AB"/>
      <path d="M15.998 29.998c7.732 0 7.25-3.354 7.25-3.354l-.008-3.48h-7.342v-1.045h9.852s4.25-1.25 4.25-8.122c0-6.872-3.938-6.646-3.938-6.646h-2.354v3.334s.127 3.938-3.938 3.938h-7.875s-3.812-.062-3.812 3.75v7.646s-.625 3.354 7.25 3.354zm4.25-2.25a1.125 1.125 0 1 1 0-2.25a1.125 1.125 0 0 1 0 2.25z" fill="#FFD43B"/>
    </svg>
  );
  
  const TensorFlowIcon = () => (
    <img src="/tensorflow.png" alt="TensorFlow" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const PyTorchIcon = () => (
    <img src="/pytorch.png" alt="PyTorch" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const AWSIcon = () => (
    <img src="/aws.png" alt="AWS" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const MLOpsIcon = () => (
    <img src="/mlops.png" alt="MLOps" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const LangChainIcon = () => (
    <img src="/langchain.png" alt="LangChain" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const LangGraphIcon = () => (
    <img src="/langgraph.png" alt="LangGraph" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const HuggingFaceIcon = () => (
    <img src="/huggingface.png" alt="HuggingFace" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  
  const DockerIcon = () => (
    <img src="/docker.png" alt="Docker" style={{ width: 32, height: 32, objectFit: 'contain' }} />
  );
  const LinkedInIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0077B5" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.72z"/></svg>
  );
  const EmailIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 13.065 2.4 6.6A2 2 0 0 1 4 4h16a2 2 0 0 1 1.6 2.6l-9.6 6.465Zm0 2.87 9.6-6.465V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.47l9.6 6.465Z"/></svg>
  );
  
  const PhoneIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path fill="#000000" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19c-.54 0-.99.45-.99.99 0 9.4 7.6 17 17 17 .54 0 .99-.45.99-.99v-3.45c0-.54-.45-.99-.99-.99z"/>
    </svg>
  );

  // Hero Section
  const HeroSection = () => (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: `linear-gradient(45deg, ${colors.primary}20, ${colors.accent}20)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
        transform: `translateY(${scrollY * 0.5}px)`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: `linear-gradient(45deg, ${colors.secondary}20, ${colors.primary}20)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite reverse',
        transform: `translateY(${scrollY * 0.3}px)`,
      }} />

      <div style={{
        textAlign: 'center',
        color: colors.dark,
        zIndex: 2,
        maxWidth: '800px',
        padding: '0 32px',
      }}>


        <h1 style={{
          fontSize: '4rem',
          fontWeight: '800',
          marginBottom: '24px',
          color: colors.dark,
          lineHeight: '1.2',
        }}>
          Eswar Sai Korrapati
        </h1>

        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          marginBottom: '48px',
          color: colors.dark,
          maxWidth: '600px',
          margin: '0 auto 48px',
        }}>
          I'm Eswar, a Software Engineer passionate about building efficient and scalable solutions
        </p>

        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Button size="lg" onClick={() => scrollToSection('projects')}>
            View My Work
          </Button>
          <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
            💬 Let's Talk
          </Button>
        </div>

        {/* Social Links */}
        <div style={{
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
        }}>
          <a
            href="https://github.com/ek-sai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = colors.primary;
              (e.target as HTMLElement).style.transform = 'translateY(-4px)';
              (e.target as HTMLElement).style.boxShadow = `0 10px 30px ${colors.primary}30`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/eswarsaikorrapati/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = colors.primary;
              (e.target as HTMLElement).style.transform = 'translateY(-4px)';
              (e.target as HTMLElement).style.boxShadow = `0 10px 30px ${colors.primary}30`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <LinkedInIcon />
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              color: colors.primary,
              fontWeight: 700,
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              letterSpacing: '0.5px',
              lineHeight: 1,
              padding: 0,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = colors.primary;
              (e.target as HTMLElement).style.color = colors.white;
              (e.target as HTMLElement).style.transform = 'translateY(-4px)';
              (e.target as HTMLElement).style.boxShadow = `0 10px 30px ${colors.primary}30`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
              (e.target as HTMLElement).style.color = colors.primary;
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <section
      id="about"
      style={{
        padding: '80px 32px',
        background: colors.white,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: colors.dark,
            marginBottom: '24px',
          }}>
            About Me
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: colors.white,
            borderRadius: '2px',
            margin: '0 auto',
          }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Card style={{ maxWidth: '600px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              {/* Profile Image */}
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: colors.white,
                margin: '0 auto 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img
                  src={profileImg}
                  alt="Profile"
                  style={{
                    width: '192px',
                    height: '192px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `4px solid ${colors.white}`,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  }}
                />
              </div>
            </div>
            <p style={{
              color: colors.dark,
              lineHeight: '1.8',
              fontSize: '1.1rem',
              textAlign: 'center',
            }}>
              With 3+ years of experience in AI/ML, I specialize in developing production-grade systems 
              using modern technologies and best practices.
            </p>
            
            <div style={{ textAlign: 'left', marginTop: '32px' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '16px',
              }}>
                Education
              </h3>
              <p style={{
                color: colors.dark,
                lineHeight: '1.8',
                fontSize: '1.1rem',
                textAlign: 'left',
              }}>
                <strong>M.S. in Computer Science</strong><br />
                Montclair State University<br />
                <br />
                Specialized in Machine Learning, Deep Learning, and AI Systems Architecture
              </p>
            </div>
          </Card>
        </div>


      </div>
    </section>
  );

  // Skills Section
  const SkillsSection = () => {
    const skills = [
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'TensorFlow', icon: <TensorFlowIcon /> },
      { name: 'PyTorch', icon: <PyTorchIcon /> },
      { name: 'HuggingFace', icon: <HuggingFaceIcon /> },
      { name: 'LangChain', icon: <LangChainIcon /> },
      { name: 'LangGraph', icon: <LangGraphIcon /> },
      { name: 'AWS', icon: <AWSIcon /> },
      { name: 'Docker', icon: <DockerIcon /> },
      { name: 'MLOps', icon: <MLOpsIcon /> },
    ];

    return (
      <section
        id="skills"
        style={{
          padding: '80px 32px',
          background: colors.white,
          minHeight: '80vh',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '800',
              color: colors.dark,
              marginBottom: '24px',
            }}>
              Technical Skills
            </h2>
            <div style={{
              width: '80px',
              height: '4px',
              background: colors.white,
              borderRadius: '2px',
              margin: '0 auto',
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {skills.map((skill) => (
              <div
                key={skill.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px 16px',
                  borderRadius: '16px',
                  background: colors.white,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: `1px solid ${colors.white}`,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-8px)';
                  (e.target as HTMLElement).style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}>
                  {skill.icon}
                </div>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: colors.dark,
                  textAlign: 'center',
                }}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Experience Section
  const ExperienceSection = () => {
    const experiences = [
      {
        company: 'Comcast',
        title: 'Software Engineer – AI/ML',
        duration: 'Aug 2024 – September 2025',
        icon: <img src={comcastLogo} alt="Comcast" style={{ width: 48, height: 48, borderRadius: 12, background: '#fff', objectFit: 'contain', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />, 
        description: 'Developed and deployed production-grade ML models using TensorFlow and PyTorch, improving accuracy by 20%. Built ML workflows with Airflow, MLflow, and DVC, and deployed models on AWS SageMaker and Lambda, reducing costs and deployment time. Implemented SHAP/LIME dashboards for explainability and integrated LLM-powered chat capabilities using the OpenAI API.',
        highlights: ['🎯 20% accuracy improvement', '⚡ Reduced deployment time', '📊 SHAP/LIME dashboards', '🤖 LLM integration']
      },
      {
        company: 'Dentsu',
        title: 'Software Engineer',
        duration: 'May 2020 – Jul 2022',
        icon: <img src={dentsuLogo} alt="Dentsu" style={{ width: 48, height: 48, borderRadius: 12, background: '#fff', objectFit: 'contain', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />, 
        description: 'Engineered RESTful APIs with Django/Flask, developed automated ML workflows using Airflow, and deployed services via Docker and AWS EC2. Created a centralized Feature Store and leveraged AutoML for ad campaign forecasting, improving efficiency and accuracy in production pipelines.',
        highlights: ['🔗 RESTful APIs', '🔄 Automated workflows', '📦 Docker deployment', '📈 AutoML forecasting']
      }
    ];

    return (
      <section
        id="experience"
        style={{
          padding: '80px 32px',
          background: colors.white,
          minHeight: '80vh',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
                      <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: colors.dark,
            marginBottom: '24px',
          }}>
            Work Experience
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: colors.white,
            borderRadius: '2px',
            margin: '0 auto',
          }} />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}>
            {experiences.map((exp, index) => (
              <Card key={exp.company} hover={true}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '32px',
                  alignItems: 'start',
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = colors.dark;
                    (e.target as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = colors.white;
                    (e.target as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    {exp.icon}
                  </div>
                  
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: colors.dark,
                          marginBottom: '8px',
                        }}>
                          {exp.title}
                        </h3>
                        <div style={{
                          fontSize: '1.2rem',
                          color: colors.primary,
                          fontWeight: '600',
                        }}>
                          {exp.company}
                        </div>
                      </div>
                      
                      <div style={{
                        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                        color: colors.primary,
                        padding: '8px 16px',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: `1px solid ${colors.primary}30`,
                      }}>
                        {exp.duration}
                      </div>
                    </div>

                    <p style={{
                      color: colors.gray,
                      lineHeight: '1.8',
                      marginBottom: '24px',
                      fontSize: '1.1rem',
                    }}>
                      {exp.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}>
                      {exp.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(0, 200, 83, 0.1)',
                            color: colors.primary,
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Projects Section
  const ProjectsSection = () => {
    const projects = [
      {
        title: 'Job Automation System',
        description: 'Built an AI-powered automated job application system that scrapes LinkedIn jobs, uses OpenAI for intelligent matching, discovers recruiter emails via Hunter.io, and generates personalized applications. Features PostgreSQL tracking, Telegram notifications, and smart filtering for quality opportunities.',
        icon: '🎯',
        tags: ['OpenAI', 'PostgreSQL', 'Docker', 'N8N', 'Telegram Bot', 'Web Scraping'],
        links: [
          { label: 'GitHub', url: 'https://github.com/ek-sai/Job_Automation', type: 'code' }
        ]
      },
      {
        title: 'RAG-based PDF Summarizer',
        description: 'Built a PDF summarization tool using LangChain, OpenAI API, and FAISS for retrieval-augmented generation. Deployed using Streamlit with semantic search, chunking, and real-time user interaction capabilities.',
        icon: '📄',
        tags: ['LangChain', 'OpenAI', 'FAISS', 'Streamlit'],
        links: [
          { label: 'Live Demo', url: 'https://ragpdfsummarizer-ffas6wmxaty3zgblr39map.streamlit.app/', type: 'demo' },
          { label: 'GitHub', url: 'https://github.com/ek-sai/RAG_PDF_Summarizer', type: 'code' }
        ]
      },
      {
        title: 'Next Word Prediction with BERT',
        description: 'Fine-tuned a BERT transformer model using PyTorch, achieving 92% top-5 prediction accuracy. Implemented advanced NLP techniques for context-aware word prediction and language modeling.',
        icon: '⌨️',
        tags: ['BERT', 'PyTorch', 'NLP', 'Transformers'],
        links: [
          { label: 'GitHub', url: 'https://github.com/ek-sai/BERT', type: 'code' }
        ]
      },
      {
        title: 'Machine Transliteration System',
        description: 'Designed and implemented a custom encoder-decoder model using PyTorch for sequence-to-sequence tasks, supporting variable-length inputs and outputs for cross-language text conversion.',
        icon: '🌐',
        tags: ['PyTorch', 'Seq2Seq', 'NLP', 'Encoder-Decoder'],
        links: [
          { label: 'GitHub', url: 'https://github.com/ek-sai/Machine_Transliteration', type: 'code' }
        ]
      },
      {
        title: 'Meeting Agent',
        description: 'Developed a multi-agent AI meeting preparation assistant using Streamlit, Anthropic\'s Claude, and the Tavily API. Generates context analysis, industry insights, meeting strategies, and executive briefings.',
        icon: '🤝',
        tags: ['Claude', 'Streamlit', 'Multi-Agent', 'Tavily API'],
        links: [
          { label: 'Live Demo', url: 'https://meeting-agents-yapuvkj9basug2qlos2iqg.streamlit.app/', type: 'demo' },
          { label: 'GitHub', url: 'https://github.com/ek-sai/Meeting_Agent', type: 'code' }
        ]
      }
    ];

    return (
      <section
        id="projects"
              style={{
        padding: '80px 32px',
        background: colors.white,
        minHeight: '80vh',
      }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
                      <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: colors.dark,
            marginBottom: '24px',
          }}>
            Projects
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: colors.white,
            borderRadius: '2px',
            margin: '0 auto',
          }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}>
            {projects.map((project, index) => (
              <Card key={project.title} hover={true} style={{ height: 'fit-content' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    marginRight: '16px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  }}>
                    {project.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: colors.dark,
                    margin: 0,
                  }}>
                    {project.title}
                  </h3>
                </div>

                <p style={{
                  color: colors.gray,
                  lineHeight: '1.7',
                  marginBottom: '24px',
                  fontSize: '1rem',
                }}>
                  {project.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px',
                }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'rgba(0, 200, 83, 0.1)',
                        color: colors.primary,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}>
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: link.type === 'demo' 
                          ? colors.white
                          : 'transparent',
                        color: link.type === 'demo' ? colors.dark : colors.primary,
                        border: link.type === 'demo' ? `2px solid ${colors.dark}` : `2px solid ${colors.primary}`,
                        borderRadius: '12px',
                        padding: '8px 16px',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onMouseEnter={(e) => {
                        if (link.type === 'demo') {
                          (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                          (e.target as HTMLElement).style.background = colors.dark;
                          (e.target as HTMLElement).style.color = colors.white;
                          (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                        } else {
                          (e.target as HTMLElement).style.background = colors.dark;
                          (e.target as HTMLElement).style.color = colors.white;
                         (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (link.type === 'demo') {
                          (e.target as HTMLElement).style.transform = 'translateY(0)';
                          (e.target as HTMLElement).style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
                          (e.target as HTMLElement).style.color = colors.white;
                          (e.target as HTMLElement).style.boxShadow = 'none';
                        } else {
                         (e.target as HTMLElement).style.background = 'transparent';
                          (e.target as HTMLElement).style.color = colors.primary;
                          (e.target as HTMLElement).style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {link.type === 'demo' ? '↗️' : <GitHubIcon />} {link.label}
                    </a>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Contact Section
  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

    const handleInputChange = (e: InputChangeEvent) => {
      setFormData({
      ...formData,
      [e.target.name]: e.target.value
      });
    };

    interface ContactFormData {
      name: string;
      email: string;
      subject: string;
      message: string;
    }

    interface ContactFormEvent extends React.FormEvent<HTMLFormElement> {}

    const handleSubmit = async (e: ContactFormEvent) => {
      e.preventDefault();
      try {
        await sendEmail(formData);
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again later.');
      }
    };

    return (
      <section
        id="contact"
        style={{
          padding: '80px 32px',
          background: colors.white,
          minHeight: '80vh',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
                      <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: colors.dark,
            marginBottom: '24px',
          }}>
            Let's Connect
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: colors.white,
            borderRadius: '2px',
            margin: '0 auto 32px',
          }} />
            <p style={{
              fontSize: '1.2rem',
              color: colors.dark,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}>
              <p>Ready to discuss your next AI/ML project or any Job Opportunity!!</p> 
                <p>I'd love to hear from you!</p>
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}>
            {/* Contact Info */}
            <Card>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                📞 Get In Touch
              </h3>

              {[
                { icon: <EmailIcon />, label: 'Email', value: 'eksai0726@gmail.com', href: 'mailto:eksai0726@gmail.com' },
                { icon: <GitHubIcon />, label: 'GitHub', value: 'ek-sai', href: 'https://github.com/ek-sai' },
                { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'Connect with me', href: 'https://www.linkedin.com/in/eswarsaikorrapati/' },
                { icon: <PhoneIcon />, label: 'Phone', value: '551-344-5356', href: 'tel:+15513445356' },
                { icon: '📍', label: 'Location', value: 'San Jose, CA, USA', href: null },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    marginBottom: '16px',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    cursor: item.href ? 'pointer' : 'default',
                  }}
                  onClick={() => item.href && window.open(item.href, '_blank')}
                  onMouseEnter={(e) => {
                    if (item.href) {
                      (e.target as HTMLElement).style.background = 'rgba(0, 200, 83, 0.05)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.href) {
                      (e.target as HTMLElement).style.background = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    marginRight: '16px',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: colors.dark,
                      marginBottom: '4px',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: colors.gray,
                    }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Contact Form */}
            <Card>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                Send Message
              </h3>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.dark,
                    marginBottom: '8px',
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${colors.light}`,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: colors.light,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.background = colors.white;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.light;
                      e.target.style.background = colors.light;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.dark,
                    marginBottom: '8px',
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${colors.light}`,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: colors.light,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.background = colors.white;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.light;
                      e.target.style.background = colors.light;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.dark,
                    marginBottom: '8px',
                  }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${colors.light}`,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: colors.light,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.background = colors.white;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.light;
                      e.target.style.background = colors.light;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.dark,
                    marginBottom: '8px',
                  }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${colors.light}`,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: colors.light,
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.background = colors.white;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.light;
                      e.target.style.background = colors.light;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <Button type="submit" size="lg" style={{ width: '100%' }}>
                  📤 Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    );
  };

  // Footer
  const Footer = () => (
    <footer style={{
      background: colors.white,
      color: colors.dark,
      padding: '60px 32px 32px',
      textAlign: 'center',
      borderTop: `1px solid ${colors.gray}20`,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          <a
            href="https://github.com/ek-sai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${colors.dark}`,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-4px) scale(1.1)';
              (e.target as HTMLElement).style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            }}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/eswarsaikorrapati/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${colors.dark}`,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-4px) scale(1.1)';
              (e.target as HTMLElement).style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
            }}
          >
            <LinkedInIcon />
          </a>
        </div>

        <div style={{
          borderTop: `1px solid ${colors.gray}20`,
          paddingTop: '32px',
        }}>
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: colors.gray,
          }}>
            © 2025 Eswar Sai Korrapati. All rights reserved.
          </p>
          <p style={{
            margin: '8px 0 0',
            fontSize: '0.9rem',
            color: colors.gray,
          }}>
  
          </p>
        </div>
      </div>
    </footer>
  );

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        scroll-behavior: smooth;
        background: #ffffff;
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: colors.white,
    }}>
      <BackgroundDots />
      <Logo />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Portfolio;
