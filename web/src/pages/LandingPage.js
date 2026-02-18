import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/sunlight_neighborhood.jpg';

// Inline styles as a style tag — drop this into your index.html or a CSS file
const styles = `
  /* Use existing fonts from index.css */
  /* Remove Google Fonts import since index.css handles fonts */
  
  :root {
    /* New Palette: #A82323 (Red), #FEFFD3 (Cream), #BCD9A2 (Light Green), #6D9E51 (Green) */
    
    --cream: #FEFFD3;              /* Background */
    --warm-white: #ffffff;         /* White base */
    --bark: #A82323;               /* Red - Primary Dark Text/Contrast */
    --terracotta: #6D9E51;         /* Green - Accent */
    --sage: #BCD9A2;               /* Light Green - Secondary Accent */
    --sand: #FEFFD3;               /* Reusing Cream */
    --blush: #BCD9A2;              /* Reusing Light Green */
    --charcoal: #A82323;           /* Red - Dark Text */
    --gold: #6D9E51;               /* Green */
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--warm-white); color: var(--charcoal); }

  .lp { font-family: 'Inter', sans-serif; overflow-x: hidden; }

  /* ─── NAV ─── */
  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: rgba(254, 255, 211, 0.88); /* Cream tint #FEFFD3 */
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(168, 35, 35, 0.08); /* Red tint */
    transition: padding 0.3s ease;
  }
  .lp-nav-logo {
    font-family: 'Montserrat', sans-serif; font-size: 22px; color: var(--bark);
    text-decoration: none; letter-spacing: -0.5px;
    font-weight: 700;
  }
  .lp-nav-logo span { color: var(--terracotta); font-style: italic; font-family: 'Alex Brush', cursive; }
  .lp-nav-links {
    display: flex; align-items: center; gap: 36px; list-style: none;
  }
  .lp-nav-links a {
    font-size: 13.5px; font-weight: 500; color: var(--bark); text-decoration: none;
    letter-spacing: 0.04em; opacity: 0.8; transition: opacity 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .lp-nav-links a:hover { opacity: 1; }
  .btn-nav {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    padding: 9px 22px; border-radius: 40px; cursor: pointer; letter-spacing: 0.03em;
    background: var(--terracotta); color: #fff; border: none; /* White text on Green button */
    transition: background 0.2s, transform 0.15s;
  }
  .btn-nav:hover { background: #5a8542; transform: translateY(-1px); } /* Darker Green manually */
  .btn-nav-outline {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    padding: 9px 22px; border-radius: 40px; cursor: pointer; letter-spacing: 0.03em;
    background: transparent; color: var(--bark); border: 1.5px solid var(--bark);
    transition: background 0.2s, color 0.2s, transform 0.15s;
  }
  .btn-nav-outline:hover { background: var(--bark); color: #fff; transform: translateY(-1px); }

  /* ─── HERO ─── */
  .lp-hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: flex-end;
    padding: 0 60px 80px;
    overflow: hidden;
  }
  .lp-hero-bg {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .lp-hero-bg::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.35) 60%,
      rgba(0, 0, 0, 0.15) 100%
    );
  }
  .lp-hero-img {
    display: none;
  }
  .lp-hero-content {
    position: relative; z-index: 2; max-width: 700px;
  }
  .lp-hero-eyebrow {
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.85);
    margin-bottom: 20px; display: flex; align-items: center; gap: 12px;
  }
  .lp-hero-eyebrow::before {
    content: ''; display: block; width: 32px; height: 1px; background: rgba(255,255,255,0.7);
  }
  .lp-hero-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(56px, 8vw, 110px);
    font-weight: 700; line-height: 0.92; color: #ffffff;
    letter-spacing: -2px; margin-bottom: 28px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }
  .lp-hero-title em { font-style: italic; color: #FFA000; font-family: 'Alex Brush', cursive; font-weight: 400; padding-right: 0.1em; }
  .lp-hero-sub {
    font-size: 17px; font-weight: 500; color: rgba(255, 255, 255, 0.88);
    max-width: 380px; line-height: 1.65; margin-bottom: 40px;
    font-family: 'Raleway', sans-serif;
  }
  .lp-hero-ctas { display: flex; gap: 16px; align-items: center; }
  .btn-hero-primary {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    padding: 14px 32px; border-radius: 40px; cursor: pointer; letter-spacing: 0.04em;
    background: #D32F2F; color: #fff; border: none;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  .btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4); }
  .btn-hero-ghost {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.9); background: none; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 8px; letter-spacing: 0.03em;
    transition: color 0.2s;
  }
  .btn-hero-ghost:hover { color: #FFA000; }
  .btn-hero-ghost::after { content: '↓'; font-size: 16px; }

  /* Scroll indicator */
  .hero-scroll-line {
    position: absolute; bottom: 80px; right: 60px; z-index: 2;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .hero-scroll-line span {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6); writing-mode: vertical-rl;
    font-family: 'Inter', sans-serif;
  }
  .hero-scroll-line::after {
    content: ''; display: block; width: 1px; height: 60px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { transform: scaleY(1); opacity: 0.5; }
    50% { transform: scaleY(0.6); opacity: 1; }
  }

  /* ─── REVEAL ─── */
  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.12s; }
  .reveal-delay-2 { transition-delay: 0.24s; }
  .reveal-delay-3 { transition-delay: 0.36s; }
  .reveal-delay-4 { transition-delay: 0.48s; }

  /* ─── JOY SECTION ─── */
  .lp-joy {
    background: var(--cream); padding: 120px 60px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    position: relative;
  }
  .lp-joy::before {
    content: '"'; position: absolute; top: 40px; left: 40px;
    font-family: 'Montserrat', sans-serif; font-size: 200px; line-height: 1;
    color: var(--sage); opacity: 0.4; pointer-events: none;
    font-weight: 700;
  }
  .lp-joy-left { position: relative; }
  .lp-joy-tag {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--terracotta); font-weight: 600; margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
  }
  .lp-joy-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(38px, 5vw, 62px);
    font-weight: 700; line-height: 1.1; color: var(--bark); letter-spacing: -1px;
  }
  .lp-joy-title em { font-style: italic; color: var(--terracotta); font-family: 'Alex Brush', cursive; font-weight: 400; padding-right: 0.1em; }
  .lp-joy-body {
    margin-top: 24px; font-size: 16px; font-weight: 400; color: rgba(168, 35, 35, 0.7);
    line-height: 1.75; max-width: 420px;
    font-family: 'Raleway', sans-serif;
  }
  .btn-primary {
    margin-top: 36px; display: inline-block;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    padding: 14px 32px; border-radius: 40px; cursor: pointer; letter-spacing: 0.04em;
    background: var(--terracotta); color: #fff; border: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(109, 158, 81, 0.3);
  }
  .btn-primary:hover { background: #5a8542; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(109, 158, 81, 0.4); }

  /* Photo cards */
  .lp-joy-right {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
    position: relative; transform: rotate(1.5deg);
  }
  .photo-card {
    border-radius: 16px; overflow: hidden; aspect-ratio: 3/4;
    background: linear-gradient(145deg, var(--cream), var(--sage));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 18px;
    font-style: italic; color: var(--bark); opacity: 0.8;
    box-shadow: 0 12px 40px rgba(168, 35, 35, 0.15);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }
  .photo-card:hover { transform: scale(1.02) rotate(-1deg); box-shadow: 0 20px 50px rgba(168, 35, 35, 0.22); }
  .photo-card:nth-child(2) {
    margin-top: 40px;
    background: linear-gradient(145deg, #FEFFD3, #A82323); /* Cream and Red */
    color: var(--bark);
  }
  .photo-card:nth-child(3) {
    margin-top: -20px;
    background: linear-gradient(145deg, var(--sage), #6D9E51); color: #fff;
    grid-column: span 2; aspect-ratio: 2/1;
  }

  /* ─── OPEN SECTION ─── */
  .lp-open {
    background: var(--bark); color: var(--cream);
    padding: 120px 60px;
    display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; align-items: center;
  }
  .lp-open-image-area { position: relative; }
  .lp-open-image-box {
    border-radius: 24px; overflow: hidden;
    background: linear-gradient(135deg, #8a1c1c, #5e1010); /* Darker Red variations */
    aspect-ratio: 4/5; display: flex; align-items: center; justify-content: center;
    font-size: 80px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.4);
    position: relative;
  }
  .lp-open-badge {
    position: absolute; bottom: -20px; right: -20px;
    background: var(--terracotta); color: #fff; border-radius: 50%;
    width: 100px; height: 100px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    font-size: 12px; font-weight: 600; letter-spacing: 0.05em;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: badgeSpin 8s linear infinite;
  }
  @keyframes badgeSpin {
    from { transform: rotate(0deg); } to { transform: rotate(360deg); }
  }
  .lp-open-badge-inner { animation: badgeCounter 8s linear infinite; }
  @keyframes badgeCounter {
    from { transform: rotate(0deg); } to { transform: rotate(-360deg); }
  }
  .lp-open-badge strong { font-size: 18px; font-weight: 700; display: block; }
  .lp-open-eyebrow {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--sage); font-weight: 600; margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
  }
  .lp-open-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(36px, 4vw, 58px);
    font-weight: 700; line-height: 1.1; letter-spacing: -1px; margin-bottom: 24px;
    color: var(--cream);
  }
  .lp-open-title em { font-style: italic; color: var(--terracotta); font-family: 'Alex Brush', cursive; font-weight: 400; }
  .lp-open-desc {
    font-size: 15.5px; font-weight: 400; line-height: 1.75;
    color: rgba(254, 255, 211, 0.7); margin-bottom: 16px;
    font-family: 'Raleway', sans-serif;
  }

  /* ─── FEATURES ─── */
  .lp-features {
    background: var(--warm-white); padding: 120px 60px;
    text-align: center;
  }
  .lp-features-eyebrow {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--terracotta); font-weight: 600; margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
  }
  .lp-features-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(32px, 4vw, 52px);
    font-weight: 700; line-height: 1.15; color: var(--bark); letter-spacing: -1px;
    margin-bottom: 64px;
  }
  .lp-features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
    max-width: 1000px; margin: 0 auto;
  }
  .feature-card {
    background: var(--cream); border-radius: 20px; padding: 48px 36px;
    text-align: left; position: relative; overflow: hidden;
    border: 1px solid rgba(188, 217, 162, 0.5); /* Sage tint */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .feature-card::before {
    content: ''; position: absolute; inset: 0; opacity: 0;
    background: linear-gradient(135deg, rgba(168, 35, 35, 0.05), rgba(168, 35, 35, 0.02));
    transition: opacity 0.3s;
  }
  .feature-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(168, 35, 35, 0.12); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon-wrap {
    width: 56px; height: 56px; border-radius: 16px; margin-bottom: 24px;
    background: linear-gradient(135deg, var(--terracotta), #5a8542);
    display: flex; align-items: center; justify-content: center; font-size: 26px;
    box-shadow: 0 8px 20px rgba(109, 158, 81, 0.3);
    color: #fff;
  }
  .feature-card h3 {
    font-family: 'Raleway', sans-serif; font-size: 20px; color: var(--bark);
    margin-bottom: 12px; font-weight: 700;
  }
  .feature-card p {
    font-size: 14.5px; font-weight: 400; color: rgba(168, 35, 35, 0.7); line-height: 1.7;
    font-family: 'Inter', sans-serif;
  }

  /* ─── CLASSES ─── */
  .lp-classes {
    background: var(--cream); padding: 120px 60px;
  }
  .lp-classes-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 56px;
  }
  .lp-classes-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(32px, 4vw, 52px);
    font-weight: 700; line-height: 1.1; color: var(--bark); letter-spacing: -1px;
  }
  .btn-outline {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    padding: 10px 24px; border-radius: 40px; cursor: pointer; letter-spacing: 0.04em;
    background: transparent; color: var(--bark); border: 1.5px solid rgba(168, 35, 35, 0.3);
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--bark); background: var(--bark); color: #fff; }
  .lp-classes-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
  }
  .class-card {
    border-radius: 20px; overflow: hidden; background: var(--warm-white);
    border: 1px solid rgba(188, 217, 162, 0.3);
    box-shadow: 0 4px 20px rgba(168, 35, 35, 0.06);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .class-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(168, 35, 35, 0.13); }
  .class-card-img {
    height: 200px; display: flex; align-items: center; justify-content: center;
    font-size: 56px; position: relative; overflow: hidden;
  }
  .ci-1 { background: linear-gradient(135deg, #FEFFD3, #A82323); }
  .ci-2 { background: linear-gradient(135deg, #BCD9A2, #6D9E51); }
  .ci-3 { background: linear-gradient(135deg, #A82323, #6D9E51); }
  .class-card-body { padding: 28px; }
  .class-tag {
    display: inline-block; font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 4px 12px; border-radius: 20px;
    background: var(--cream); color: var(--bark); margin-bottom: 12px;
    font-family: 'Inter', sans-serif;
  }
  .class-card-body h3 {
    font-family: 'Raleway', sans-serif; font-size: 20px; color: var(--bark);
    margin-bottom: 10px; font-weight: 700;
  }
  .class-card-body p {
    font-size: 14px; color: rgba(168, 35, 35, 0.7); line-height: 1.65; margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
  }
  .class-meta {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 16px; border-top: 1px solid var(--sage);
    font-size: 13px; color: rgba(168, 35, 35, 0.6);
    font-family: 'Inter', sans-serif;
  }
  .class-price { font-weight: 600; color: var(--terracotta); font-size: 16px; }

  /* ─── TESTIMONIAL ─── */
  .lp-testimonial {
    background: var(--terracotta); padding: 100px 60px; text-align: center;
    position: relative; overflow: hidden;
  }
  .lp-testimonial::before {
    content: '❝'; position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
    font-size: 200px; color: rgba(255,255,255,0.08); /* White subtle */
    font-family: 'Montserrat', serif; pointer-events: none;
  }
  .testimonial-inner { max-width: 720px; margin: 0 auto; position: relative; }
  .stars { color: #FFF; font-size: 22px; letter-spacing: 4px; margin-bottom: 28px; }
  .testimonial-quote {
    font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3vw, 32px);
    font-weight: 400; font-style: italic; line-height: 1.5;
    color: rgba(255,255,255,0.95); margin-bottom: 36px;
    quotes: none;
  }
  .testimonial-author { display: flex; align-items: center; justify-content: center; gap: 16px; }
  .author-avatar {
    width: 52px; height: 52px; border-radius: 50%;
    background: rgba(255,255,255,0.25); border: 2px solid rgba(255,255,255,0.4);
  }
  .author-name { font-weight: 600; color: var(--warm-white); font-size: 15px; font-family: 'Inter', sans-serif; }
  .author-role { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 2px; font-family: 'Inter', sans-serif; }

  /* ─── CTA ─── */
  .lp-cta {
    background: var(--charcoal); padding: 120px 60px; text-align: center;
    position: relative; overflow: hidden;
  }
  .lp-cta::before {
    content: ''; position: absolute;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 35, 35, 0.3) 0%, transparent 70%); /* Red radial */
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .cta-eyebrow {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--sage); font-weight: 600; margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
  }
  .cta-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(36px, 5vw, 68px);
    font-weight: 700; line-height: 1.1; color: var(--cream); letter-spacing: -1.5px;
    margin-bottom: 20px; position: relative;
  }
  .cta-sub {
    font-size: 16px; font-weight: 400; color: rgba(254, 255, 211, 0.65);
    max-width: 480px; margin: 0 auto 44px; line-height: 1.7;
    font-family: 'Raleway', sans-serif;
  }
  .cta-buttons { display: flex; gap: 16px; justify-content: center; }
  .btn-white {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    padding: 14px 36px; border-radius: 40px; cursor: pointer; letter-spacing: 0.04em;
    background: var(--cream); color: var(--bark); border: none;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.4); }
  .btn-white-outline {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
    padding: 14px 36px; border-radius: 40px; cursor: pointer; letter-spacing: 0.04em;
    background: transparent; color: rgba(254, 255, 211, 0.8);
    border: 1.5px solid rgba(254, 255, 211, 0.3);
    transition: all 0.2s;
  }
  .btn-white-outline:hover { border-color: var(--cream); color: var(--cream); }

  /* ─── FOOTER ─── */
  .lp-footer { background: #1E1510; padding: 80px 60px 40px; }
  .footer-inner {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px; padding-bottom: 60px;
    border-bottom: 1px solid rgba(254, 255, 211, 0.1);
    margin-bottom: 32px;
  }
  .footer-brand {
    font-family: 'Montserrat', sans-serif; font-size: 22px; color: var(--cream);
    text-decoration: none; display: block; margin-bottom: 14px;
    font-weight: 700;
  }
  .footer-brand span { color: var(--terracotta); font-style: italic; font-family: 'Alex Brush', cursive; font-weight: 400; }
  .footer-tagline { font-size: 14px; color: rgba(254, 255, 211, 0.4); line-height: 1.65; margin-bottom: 24px; font-family: 'Inter', sans-serif; }
  .footer-social { display: flex; gap: 12px; }
  .social-dot {
    width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(254, 255, 211, 0.15);
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    text-decoration: none; transition: border-color 0.2s, background 0.2s;
    color: var(--cream);
  }
  .social-dot:hover { border-color: var(--terracotta); background: rgba(109, 158, 81, 0.15); color: var(--terracotta); }
  .footer-col h4 {
    font-family: 'Raleway', sans-serif; font-size: 15px; color: var(--cream);
    margin-bottom: 20px; font-weight: 600;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 10px; }
  .footer-col a {
    font-size: 13.5px; color: rgba(254, 255, 211, 0.45); text-decoration: none;
    transition: color 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .footer-col a:hover { color: var(--cream); }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12.5px; color: rgba(254, 255, 211, 0.3); letter-spacing: 0.03em;
    font-family: 'Inter', sans-serif;
  }

  /* ─── DIVIDER ORNAMENT ─── */
  .section-ornament {
    text-align: center; padding: 8px 0; font-size: 18px;
    color: var(--sage); letter-spacing: 8px; opacity: 0.6;
    background: var(--cream); /* ensure background matches */
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .lp-nav { padding: 15px 20px; }
    .lp-nav-links { display: none; } /* Simplified for mobile - or add mobile menu */
    .lp-hero { padding: 0 20px 60px; }
    .lp-hero-title { font-size: 48px; }
    .lp-joy { grid-template-columns: 1fr; padding: 60px 20px; gap: 40px; }
    .lp-joy::before { font-size: 120px; top: 10px; left: 10px; }
    .lp-open { grid-template-columns: 1fr; padding: 60px 20px; gap: 40px; }
    .lp-features { padding: 60px 20px; }
    .lp-features-grid { grid-template-columns: 1fr; }
    .lp-classes { padding: 60px 20px; }
    .lp-classes-grid { grid-template-columns: 1fr; }
    .lp-testimonial { padding: 60px 20px; }
    .lp-cta { padding: 60px 20px; }
    .cta-title { font-size: 32px; }
    .footer-inner { grid-template-columns: 1fr; gap: 40px; }
    .footer-bottom { flex-direction: column; gap: 10px; }
  }
`;

const LandingPage = ({ navigate: propNavigate }) => {
    const routerNavigate = useNavigate();
    const navigate = propNavigate || routerNavigate;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(el => {
                if (el.isIntersecting) {
                    el.target.classList.add('visible');
                    observer.unobserve(el.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{styles}</style>
            <div className="lp">

                {/* NAV */}
                <nav className="lp-nav">
                    <a href="#" className="lp-nav-logo">Lorem<span>Ipsum</span></a>
                    <ul className="lp-nav-links">
                        <li><a href="#">Lorem</a></li>
                        <li><a href="#">Ipsum</a></li>
                        <li><a href="#">Dolor</a></li>
                        <li><a href="#">Sit</a></li>
                        <li><a href="#">Amet</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><button onClick={() => navigate('/login')} className="btn-nav">Login</button></li>
                        <li><button onClick={() => navigate('/register')} className="btn-nav-outline">Sign Up</button></li>
                    </ul>
                </nav>

                {/* HERO */}
                <section className="lp-hero">
                    <div className="lp-hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
                    <div className="lp-hero-content">
                        <p className="lp-hero-eyebrow">Lorem ipsum dolor</p>
                        <h1 className="lp-hero-title">
                            Lorem<br /><em>Ipsum</em>
                        </h1>
                        <p className="lp-hero-sub">
                            Dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
                        </p>
                        <div className="lp-hero-ctas">
                            <button onClick={() => navigate('/register')} className="btn-hero-primary">
                                Sign Up Today
                            </button>
                            <button className="btn-hero-ghost">Explore More</button>
                        </div>
                    </div>
                    <div className="hero-scroll-line">
                        <span>Scroll</span>
                    </div>
                </section>

                {/* JOY */}
                <section className="lp-joy">
                    <div className="lp-joy-left">
                        <p className="lp-joy-tag reveal">Lorem ipsum dolor</p>
                        <h2 className="lp-joy-title reveal reveal-delay-1">
                            Lorem Ipsum<br /><em>Dolor Sit Amet</em>
                        </h2>
                        <p className="lp-joy-body reveal reveal-delay-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.
                        </p>
                        <button onClick={() => navigate('/register')} className="btn-primary reveal reveal-delay-3">
                            Get Started
                        </button>
                    </div>
                    <div className="lp-joy-right reveal reveal-delay-1">
                        <div className="photo-card">Lorem<br />Ipsum</div>
                        <div className="photo-card">Dolor<br />Sit</div>
                        <div className="photo-card">Consectetur Adipiscing</div>
                    </div>
                </section>

                <div className="section-ornament">· · · ✦ · · ·</div>

                {/* OPEN */}
                <section className="lp-open">
                    <div className="lp-open-image-area reveal">
                        <div className="lp-open-image-box">
                            <span>🌿</span>
                            <div className="lp-open-badge">
                                <div className="lp-open-badge-inner">
                                    <strong>Lorem</strong>
                                    Ipsum!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="lp-open-eyebrow">Lorem Ipsum!</p>
                        <h2 className="lp-open-title reveal">
                            Lorem Ipsum Dolor<br /><em>Sit Amet!</em>
                        </h2>
                        <p className="lp-open-desc reveal reveal-delay-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                        </p>
                        <p className="lp-open-desc reveal reveal-delay-2">
                            Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <button onClick={() => navigate('/register')} className="btn-primary reveal reveal-delay-3">
                            Sign Up
                        </button>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="lp-features">
                    <p className="lp-features-eyebrow reveal">Lorem ipsum dolor</p>
                    <h2 className="lp-features-title reveal reveal-delay-1">
                        Consectetur Adipiscing<br />Elit Sed Do
                    </h2>
                    <div className="lp-features-grid">
                        {[
                            { icon: '🎠', title: 'Lorem Ipsum', desc: 'Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.' },
                            { icon: '🌸', title: 'Dolor Sit Amet', desc: 'Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.' },
                            { icon: '🎂', title: 'Consectetur', desc: 'Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal reveal-delay-${i}`}>
                                <div className="feature-icon-wrap">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CLASSES */}
                <section className="lp-classes">
                    <div className="lp-classes-header">
                        <h2 className="lp-classes-title reveal">
                            Lorem Ipsum<br />Dolor Sit
                        </h2>
                        <a href="#" className="btn-outline reveal">View All</a>
                    </div>
                    <div className="lp-classes-grid">
                        {[
                            { ci: 'ci-1', icon: '🤸', tag: 'Lorem Ipsum', title: 'Dolor Sit Amet', desc: 'Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', meta: 'Lorem 0–18', price: '$28', delay: '' },
                            { ci: 'ci-2', icon: '🎵', tag: 'Ipsum Dolor', title: 'Consectetur Elit', desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.', meta: 'Dolor 1–3', price: '$24', delay: 'reveal-delay-1' },
                            { ci: 'ci-3', icon: '🌿', tag: 'Sit Amet', title: 'Adipiscing Elit', desc: 'Ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.', meta: 'All lorem', price: '$22', delay: 'reveal-delay-2' },
                        ].map((c, i) => (
                            <div key={i} className={`class-card reveal ${c.delay}`}>
                                <div className={`class-card-img ${c.ci}`}><span>{c.icon}</span></div>
                                <div className="class-card-body">
                                    <span className="class-tag">{c.tag}</span>
                                    <h3>{c.title}</h3>
                                    <p>{c.desc}</p>
                                    <div className="class-meta">
                                        <span>{c.meta}</span>
                                        <span className="class-price">{c.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIAL */}
                <section className="lp-testimonial">
                    <div className="testimonial-inner">
                        <div className="stars reveal">★★★★★</div>
                        <blockquote className="testimonial-quote reveal reveal-delay-1">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                        </blockquote>
                        <div className="testimonial-author reveal reveal-delay-2">
                            <div className="author-avatar" />
                            <div>
                                <div className="author-name">Lorem I.</div>
                                <div className="author-role">Dolor sit amet</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="lp-cta">
                    <p className="cta-eyebrow reveal">Lorem ipsum dolor?</p>
                    <h2 className="cta-title reveal reveal-delay-1">
                        Consectetur Adipiscing<br />Elit Sed Do
                    </h2>
                    <p className="cta-sub reveal reveal-delay-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="cta-buttons reveal reveal-delay-3">
                        <button onClick={() => navigate('/register')} className="btn-white">Sign Up</button>
                        <button onClick={() => navigate('/login')} className="btn-white-outline">Login</button>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="lp-footer">
                    <div className="footer-inner">
                        <div>
                            <a href="#" className="footer-brand">Lorem<span>Ipsum</span></a>
                            <p className="footer-tagline">
                                Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                                ut labore et dolore.
                            </p>
                            <div className="footer-social">
                                <a href="#" className="social-dot">📷</a>
                                <a href="#" className="social-dot">🎵</a>
                                <a href="#" className="social-dot">👍</a>
                            </div>
                        </div>
                        {[
                            { heading: 'Lorem', links: ['Ipsum', 'Dolor', 'Sit', 'Amet'] },
                            { heading: 'Consectetur', links: ['Adipiscing', 'Elit', 'Sed', 'Do'] },
                            { heading: 'Eiusmod', links: ['Tempor', 'Incididunt', 'lorem@ipsum.com', '(123) 456-7890'] },
                        ].map((col, i) => (
                            <div key={i} className="footer-col">
                                <h4>{col.heading}</h4>
                                <ul>{col.links.map((l, j) => <li key={j}><a href="#">{l}</a></li>)}</ul>
                            </div>
                        ))}
                    </div>
                    <div className="footer-bottom">
                        <span>© 2026 Lorem Ipsum. All rights reserved.</span>
                        <span>Privacy Policy · Terms of Service</span>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default LandingPage;