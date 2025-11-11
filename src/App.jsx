import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  Sparkles,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  TrendingUp,
  Users,
  Workflow,
  BarChart3,
  Database,
  CheckCircle2,
  ArrowDown
} from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const fullText = "Get my Stripe revenue and correlate it with Meta Ads and Google Ads campaigns"

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Hero scroll-linked transforms
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.8])
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0])
  const heroY = useTransform(heroScroll, [0, 1], [0, -100])

  // Typewriter effect for vibe prompt
  const promptRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTyping && typedText === '') {
            setIsTyping(true)
            let currentIndex = 0
            const typingInterval = setInterval(() => {
              if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex))
                currentIndex++
              } else {
                clearInterval(typingInterval)
                setIsTyping(false)
              }
            }, 30)

            return () => clearInterval(typingInterval)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (promptRef.current) {
      observer.observe(promptRef.current)
    }

    return () => {
      if (promptRef.current) {
        observer.unobserve(promptRef.current)
      }
    }
  }, [isTyping, typedText, fullText])

  return (
    <div className="app">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Navigation */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="nav-container">
          <div className="logo">
            Assista<span>OS</span>
          </div>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#platform" onClick={() => setMobileMenuOpen(false)}>Platform</a>
            <a href="#integrations" onClick={() => setMobileMenuOpen(false)}>Integrations</a>
            <a href="#security" onClick={() => setMobileMenuOpen(false)}>Security</a>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section - Redesigned */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div className="grid-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-text"
          >
            <motion.div
              className="badge ai-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Sparkles size={16} />
              <span>AI-Powered Productivity Platform</span>
              <div className="ai-pulse"></div>
            </motion.div>

            <h1>
              The Operating System
              <br/>
              For <span className="gradient-text">Modern Work</span>
            </h1>

            <p className="subtitle">
              Natural language interface for enterprise automation.
              <br/>
              Connect your tools. Describe what you need. Watch it work.
            </p>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <ArrowDown size={20} />
              <span>See the product</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual-3d"
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Main Dashboard - Center */}
            <motion.div
              className="mockup-3d mockup-main"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="mockup-chrome">
                <div className="chrome-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="chrome-title">dashboard.assistaos.ai</div>
                <div className="chrome-actions"></div>
              </div>
              <div className="mockup-screen">
                <div className="dashboard-header">
                  <div className="header-left">
                    <h3>Dashboard</h3>
                    <span className="live-indicator">
                      <span className="live-dot"></span>
                      Live
                    </span>
                  </div>
                  <div className="header-right">
                    <div className="sync-status">
                      <CheckCircle2 size={16} />
                      <span>Real-time sync</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-grid">
                  {[
                    {
                      icon: TrendingUp,
                      label: 'Revenue',
                      value: '$847K',
                      change: '+12.5%',
                      chart: [60, 75, 68, 85, 92, 88, 95]
                    },
                    {
                      icon: Users,
                      label: 'Active Users',
                      value: '12,450',
                      change: '+8.2%',
                      chart: [45, 52, 58, 63, 71, 68, 75]
                    },
                    {
                      icon: Workflow,
                      label: 'Automations',
                      value: '2,341',
                      change: '+23.1%',
                      chart: [30, 35, 40, 48, 55, 62, 70]
                    },
                    {
                      icon: BarChart3,
                      label: 'Conversion',
                      value: '4.2%',
                      change: '+1.8%',
                      chart: [25, 32, 38, 45, 52, 58, 65]
                    }
                  ].map((metric, i) => (
                    <motion.div
                      key={i}
                      className="metric-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <div className="metric-header">
                        <metric.icon size={18} />
                        <span className="metric-label">{metric.label}</span>
                      </div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-change positive">{metric.change}</div>
                      <div className="metric-chart">
                        {metric.chart.map((height, j) => (
                          <motion.div
                            key={j}
                            className="chart-bar"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1 + i * 0.1 + j * 0.05 }}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vibe Coding Demo Section */}
      <section className="solution-demo">
        <div className="container-wide">
          <motion.div
            className="section-header centered"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              ref={promptRef}
              className="vibe-prompt-large"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>"{typedText}<span className="typing-cursor">{isTyping ? '|' : ''}</span>"</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="revenue-analytics-mockup"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Browser Chrome */}
            <div className="mockup-chrome">
              <div className="chrome-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="chrome-title">revenue-analytics.assistaos.ai</div>
              <div className="chrome-actions"></div>
            </div>

            {/* App Content */}
            <div className="revenue-app-screen">
              {/* Header */}
              <div className="revenue-header">
                <div className="header-left">
                  <h3>Revenue Analytics</h3>
                  <div className="data-sources">
                    <div className="source-badge stripe">
                      <TrendingUp size={14} />
                      <span>Stripe</span>
                    </div>
                    <div className="source-badge meta">
                      <BarChart3 size={14} />
                      <span>Meta Ads</span>
                    </div>
                    <div className="source-badge google">
                      <Database size={14} />
                      <span>Google Ads</span>
                    </div>
                  </div>
                </div>
                <div className="header-right">
                  <div className="sync-status">
                    <CheckCircle2 size={16} />
                    <span>Synced 2 min ago</span>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="revenue-grid">
                {/* Revenue Overview Card */}
                <motion.div
                  className="revenue-card large"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="card-header">
                    <div className="card-title">
                      <TrendingUp size={18} />
                      <span>Total Revenue</span>
                    </div>
                    <span className="timeframe">Last 30 days</span>
                  </div>
                  <div className="revenue-amount">$127,845</div>
                  <div className="revenue-change positive">
                    <TrendingUp size={16} />
                    <span>+23.5% vs last month</span>
                  </div>
                  <div className="revenue-chart">
                    {[45, 52, 48, 65, 58, 72, 68, 78, 82, 75, 88, 85, 92, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        className="chart-bar revenue-bar"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.03 }}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Ad Spend Card */}
                <motion.div
                  className="revenue-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="card-header">
                    <div className="card-title">
                      <BarChart3 size={18} />
                      <span>Ad Spend</span>
                    </div>
                  </div>
                  <div className="spend-breakdown">
                    <div className="spend-item meta">
                      <div className="spend-label">
                        <div className="spend-dot"></div>
                        <span>Meta Ads</span>
                      </div>
                      <div className="spend-amount">$18,250</div>
                    </div>
                    <div className="spend-progress">
                      <motion.div
                        className="spend-bar meta"
                        initial={{ width: 0 }}
                        whileInView={{ width: '60%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                      />
                    </div>
                    <div className="spend-item google">
                      <div className="spend-label">
                        <div className="spend-dot"></div>
                        <span>Google Ads</span>
                      </div>
                      <div className="spend-amount">$12,180</div>
                    </div>
                    <div className="spend-progress">
                      <motion.div
                        className="spend-bar google"
                        initial={{ width: 0 }}
                        whileInView={{ width: '40%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <div className="total-spend">
                    <span>Total Spend</span>
                    <span className="amount">$30,430</span>
                  </div>
                </motion.div>

                {/* ROAS Card */}
                <motion.div
                  className="revenue-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="card-header">
                    <div className="card-title">
                      <Workflow size={18} />
                      <span>Return on Ad Spend</span>
                    </div>
                  </div>
                  <div className="roas-display">
                    <div className="roas-value">4.2x</div>
                    <div className="roas-label">Overall ROAS</div>
                  </div>
                  <div className="roas-breakdown">
                    <div className="roas-item">
                      <span className="platform">Meta</span>
                      <span className="roas-number">4.5x</span>
                    </div>
                    <div className="roas-item">
                      <span className="platform">Google</span>
                      <span className="roas-number">3.8x</span>
                    </div>
                  </div>
                </motion.div>

                {/* Campaign Performance Table */}
                <motion.div
                  className="revenue-card wide"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="card-header">
                    <div className="card-title">
                      <Database size={18} />
                      <span>Top Campaigns</span>
                    </div>
                  </div>
                  <div className="campaign-table">
                    <div className="table-header">
                      <div className="col-campaign">Campaign</div>
                      <div className="col-platform">Platform</div>
                      <div className="col-spend">Spend</div>
                      <div className="col-revenue">Revenue</div>
                      <div className="col-roas">ROAS</div>
                    </div>
                    {[
                      { name: 'Summer Sale 2026', platform: 'meta', spend: '$5,240', revenue: '$24,850', roas: '4.7x', color: '#0668E1' },
                      { name: 'Brand Awareness Q2', platform: 'google', spend: '$4,180', revenue: '$15,920', roas: '3.8x', color: '#34A853' },
                      { name: 'Product Launch', platform: 'meta', spend: '$6,120', revenue: '$28,450', roas: '4.6x', color: '#0668E1' },
                      { name: 'Retargeting Campaign', platform: 'google', spend: '$3,890', revenue: '$18,240', roas: '4.7x', color: '#34A853' }
                    ].map((campaign, i) => (
                      <motion.div
                        key={i}
                        className="table-row"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        <div className="col-campaign">{campaign.name}</div>
                        <div className="col-platform">
                          <div className={`platform-badge ${campaign.platform}`}>
                            {campaign.platform === 'meta' ? <BarChart3 size={12} /> : <Database size={12} />}
                            <span>{campaign.platform === 'meta' ? 'Meta' : 'Google'}</span>
                          </div>
                        </div>
                        <div className="col-spend">{campaign.spend}</div>
                        <div className="col-revenue">{campaign.revenue}</div>
                        <div className="col-roas">
                          <span className="roas-badge">{campaign.roas}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="vibe-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
          >
            <Sparkles size={20} />
            <p>Built in seconds. No code. Just natural language.</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Dashboard Building Section */}
      <section className="quick-dashboards">
        <div className="container">
          <motion.div
            className="section-header centered"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Empower Your Team to Build Without Code</h2>
            <p>AssistaOS enables non-technical teams to create powerful, custom dashboards in minutes—not months. Our plug-and-play integrations make it incredibly fast to connect your data sources and start building iteratively.</p>
          </motion.div>

          <div className="dashboard-features">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="feature-icon">
                <Sparkles size={32} />
              </div>
              <h3>Natural Language First</h3>
              <p>Simply describe what you need in plain English. No SQL, no coding, no technical knowledge required. Your team focuses on insights, not implementation.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="feature-icon">
                <Workflow size={32} />
              </div>
              <h3>Instant Integrations</h3>
              <p>Connect Stripe, Google Ads, Meta Ads, Salesforce, HubSpot, and 100+ apps instantly. Our plug-and-play connectors work out of the box—no API keys, no configuration headaches.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Iterate in Real-Time</h3>
              <p>Build, test, and refine your dashboards on the fly. See changes instantly as you iterate. What used to take weeks of developer time now happens in seconds.</p>
            </motion.div>
          </div>

          <motion.div
            className="integration-showcase-mini"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="integration-title">
              <Database size={20} />
              <span>100+ Pre-Built Integrations Ready to Use</span>
            </div>
            <div className="integration-logos">
              {['Stripe', 'Salesforce', 'HubSpot', 'Slack', 'Google Ads', 'Meta Ads', 'Notion', 'Airtable'].map((app, i) => (
                <motion.div
                  key={app}
                  className="integration-chip"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  <CheckCircle2 size={14} />
                  <span>{app}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to Build Your SaaS?</h2>
            <p>Start building custom apps with natural language</p>
            <div className="cta-buttons">
              <motion.a
                href="#"
                className="cta-button primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building
              </motion.a>
              <motion.a
                href="#"
                className="cta-button secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                See Demo
              </motion.a>
            </div>
            <p className="cta-note">No code required • Connect 100+ apps</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <motion.div
            className="footer-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-brand">
              <div className="logo">
                <img src="/logo.svg" alt="AssistaOS" />
              </div>
              <p className="footer-tagline">
                Build custom SaaS with natural language.<br/>
                A product of Assista AI.
              </p>
            </div>

            <div className="footer-nav">
              <div className="footer-section">
                <h4>Product</h4>
                <a href="#demo">Demo</a>
                <a href="#examples">Examples</a>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-section">
                <h4>Resources</h4>
                <a href="#docs">Documentation</a>
                <a href="#support">Support</a>
              </div>
              <div className="footer-section">
                <h4>Legal</h4>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </motion.div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>© 2026 Assista AI. All rights reserved.</p>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
