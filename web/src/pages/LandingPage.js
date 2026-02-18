import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/sunlight_neighborhood.jpg';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(el => {
                if (el.isIntersecting) {
                    el.target.classList.add('visible');
                    observer.unobserve(el.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page-wrapper">


            {/* NAV */}
            <nav className="landing-nav">
                <a href="#" className="nav-logo">Lorem<span>Ipsum</span></a>
                <ul className="nav-links">
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
            <section className="hero-landing">
                <img src={heroImage} alt="Sunlight Neighborhood" className="hero-bg-image" />
                <div className="hero-content">
                    <h1 className="hero-title-landing">
                        Lorem Ipsum
                    </h1>
                    <p className="hero-subtitle-landing">Dolor Sit Amet</p>
                </div>
            </section>

            {/* WHERE JOY MEETS */}
            <section className="joy-section">
                <h2 className="joy-title reveal">Lorem Ipsum<br />Dolor Sit Amet</h2>
                <p className="joy-body reveal reveal-delay-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <button onClick={() => navigate('/register')} className="btn-primary reveal reveal-delay-2">Sign Up</button>

                <div className="photo-scatter">
                    <div className="photo-card photo-card-left reveal">
                        <div className="photo-card-inner">Lorem<br />Ipsum</div>
                    </div>
                    <div className="photo-center-text">
                        <p style={{ fontFamily: 'Raleway, sans-serif', fontStyle: 'italic', fontSize: '18px', color: 'var(--color-3)', opacity: 0.6 }}>· · ·</p>
                    </div>
                    <div className="photo-card photo-card-right reveal reveal-delay-1">
                        <div className="photo-card-inner">Dolor<br />Sit</div>
                    </div>
                </div>
            </section>

            {/* NOW OPEN */}
            <section className="open-section">
                <div className="open-inner">
                    <div className="open-image-box reveal">
                        <div className="open-image-placeholder">
                            <span style={{ fontSize: '60px' }}>🌿</span>
                        </div>
                        <div className="open-image-badge">
                            <strong>Lorem</strong>
                            Ipsum!
                        </div>
                    </div>
                    <div className="open-text">
                        <p className="now-open-eyebrow">Lorem Ipsum!</p>
                        <h2 className="open-title reveal">Lorem Ipsum Dolor<br />Sit Amet!</h2>
                        <p className="open-desc reveal reveal-delay-1"><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</em></p>
                        <p className="open-desc reveal reveal-delay-2">Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <button onClick={() => navigate('/register')} className="btn-primary reveal reveal-delay-3">Sign Up</button>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-section">
                <p className="features-eyebrow reveal">Lorem ipsum dolor</p>
                <h2 className="features-title reveal reveal-delay-1">Consectetur Adipiscing<br />Elit Sed Do</h2>
                <div className="features-grid">
                    <div className="feature-card reveal">
                        <span className="feature-icon">🎠</span>
                        <h3>Lorem Ipsum</h3>
                        <p>Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.</p>
                    </div>
                    <div className="feature-card reveal reveal-delay-1">
                        <span className="feature-icon">🌸</span>
                        <h3>Dolor Sit Amet</h3>
                        <p>Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    </div>
                    <div className="feature-card reveal reveal-delay-2">
                        <span className="feature-icon">🎂</span>
                        <h3>Consectetur</h3>
                        <p>Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </section>

            {/* CLASSES */}
            <section className="classes-section">
                <div className="section-header-row">
                    <h2 className="reveal">Lorem Ipsum<br />Dolor Sit</h2>
                    <a href="#" className="btn-outline reveal">View All</a>
                </div>
                <div className="classes-grid">
                    <div className="class-card reveal">
                        <div className="class-card-img ci-1"><span>🤸</span></div>
                        <div className="class-card-body">
                            <span className="class-tag">Lorem Ipsum</span>
                            <h3>Dolor Sit Amet</h3>
                            <p>Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div className="class-meta">
                                <span>Lorem 0–18</span>
                                <span className="class-price">$28</span>
                            </div>
                        </div>
                    </div>
                    <div className="class-card reveal reveal-delay-1">
                        <div className="class-card-img ci-2"><span>🎵</span></div>
                        <div className="class-card-body">
                            <span className="class-tag">Ipsum Dolor</span>
                            <h3>Consectetur Elit</h3>
                            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.</p>
                            <div className="class-meta">
                                <span>Dolor 1–3</span>
                                <span className="class-price">$24</span>
                            </div>
                        </div>
                    </div>
                    <div className="class-card reveal reveal-delay-2">
                        <div className="class-card-img ci-3"><span>🌿</span></div>
                        <div className="class-card-body">
                            <span className="class-tag">Sit Amet</span>
                            <h3>Adipiscing Elit</h3>
                            <p>Ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.</p>
                            <div className="class-meta">
                                <span>All lorem</span>
                                <span className="class-price">$22</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="testimonial-section">
                <div className="testimonial-inner">
                    <div className="stars reveal">★★★★★</div>
                    <blockquote className="testimonial-quote reveal reveal-delay-1">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                    </blockquote>
                    <div className="testimonial-author reveal reveal-delay-2">
                        <div className="author-avatar"></div>
                        <div>
                            <div className="author-name">Lorem I.</div>
                            <div className="author-role">Dolor sit amet</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <p className="cta-eyebrow reveal">Lorem ipsum dolor?</p>
                <h2 className="cta-title reveal reveal-delay-1">Consectetur Adipiscing<br />Elit Sed Do</h2>
                <p className="cta-sub reveal reveal-delay-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="cta-buttons reveal reveal-delay-3">
                    <button onClick={() => navigate('/register')} className="btn-white">Sign Up</button>
                    <button onClick={() => navigate('/login')} className="btn-white-outline">Login</button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="landing-footer">
                <div className="footer-inner">
                    <div>
                        <a href="#" className="footer-brand-name">Lorem Ipsum</a>
                        <p className="footer-tagline">Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        <div className="footer-social">
                            <a href="#" className="social-dot">📷</a>
                            <a href="#" className="social-dot">🎵</a>
                            <a href="#" className="social-dot">👍</a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>Lorem</h4>
                        <ul>
                            <li><a href="#">Ipsum</a></li>
                            <li><a href="#">Dolor</a></li>
                            <li><a href="#">Sit</a></li>
                            <li><a href="#">Amet</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Consectetur</h4>
                        <ul>
                            <li><a href="#">Adipiscing</a></li>
                            <li><a href="#">Elit</a></li>
                            <li><a href="#">Sed</a></li>
                            <li><a href="#">Do</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Eiusmod</h4>
                        <ul>
                            <li><a href="#">Tempor</a></li>
                            <li><a href="#">Incididunt</a></li>
                            <li><a href="#">lorem@ipsum.com</a></li>
                            <li><a href="#">(123) 456-7890</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 Lorem Ipsum. All rights reserved.</span>
                    <span>Privacy Policy · Terms of Service</span>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
