import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './App.css'

const APP_STORE_URL = 'https://apps.apple.com/app/id6775396071'
const MAC_DOWNLOAD_URL = 'https://github.com/psallo/mackeymapper/releases/latest/download/MacKeymapper.dmg'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <img src="/app-icon.png" alt="" className="nav-icon" />
          MacKeymapper
        </a>
        <a href="#download" className="btn btn-sm">Download</a>
      </div>
    </nav>
  )
}

/* ── Hero ── */
function Hero() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t) }, [])
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>
      <div className="hero-inner">
        <div className={`hero-copy fade-up${visible ? ' in' : ''}`} style={{ transitionDelay: '0ms' }}>
          <div className="eyebrow">Free · No account needed · Local Wi-Fi only</div>
          <h1>
            Switch Mac apps<br />
            <span className="gradient-text">in one tap.</span>
          </h1>
          <p className="hero-sub">
            Stop hunting through Cmd+Tab or the Dock.
            MacKeymapper puts your top Mac apps on your iPhone — always visible, always instant.
          </p>
          <div className="hero-btns">
            <a href={MAC_DOWNLOAD_URL} className="btn btn-primary">
              <AppleIcon /> Download for Mac
            </a>
            <a href="#download" className="btn btn-outline">Get iOS App</a>
          </div>
        </div>
        <div className={`hero-phone fade-up${visible ? ' in' : ''}`} style={{ transitionDelay: '120ms' }}>
          <img src="/hero-imac.png" alt="MacKeymapper" className="hero-imac" draggable={false} />
        </div>
      </div>
    </section>
  )
}

/* ── Features ── */
const FEATURES = [
  { icon: '⚡', title: 'Instant switch', desc: 'Tap an icon on your iPhone and the app is already in front of you on your Mac. No list, no scroll, no search.' },
  { icon: '📱', title: 'Always in reach', desc: 'Your iPhone is always on your desk. Your top Mac apps are always one glance away — no need to look at your Mac.' },
  { icon: '🔐', title: 'Secure pairing', desc: 'PIN-based pairing and a device allowlist keep your Mac private.' },
  { icon: '🚫', title: 'No cloud, no account', desc: 'Runs entirely on your local network. Nothing leaves your home.' },
]

function Features() {
  const { ref, inView } = useInView()
  return (
    <section className="features" ref={ref}>
      <div className={`section-header fade-up${inView ? ' in' : ''}`}>
        <div className="eyebrow">Why MacKeymapper</div>
        <h2>Your Mac shortcuts,<br />always in your pocket.</h2>
      </div>
      <div className="feature-grid">
        {FEATURES.map((f, i) => (
          <div key={f.title} className={`card fade-up${inView ? ' in' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
            <span className="card-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Multitasking ── */
const USE_CASES = [
  { icon: '🎬', role: 'Video Editors', desc: 'Jump between your timeline, reference footage, and music library without breaking rhythm.' },
  { icon: '💻', role: 'Developers', desc: 'Switch from your code editor to the browser, terminal, or docs — without touching the keyboard.' },
  { icon: '🎨', role: 'Designers', desc: 'Toggle between your design tool, client chat, and inspiration board in an instant.' },
  { icon: '📊', role: 'Content Creators', desc: 'Move between recording, editing, and publishing tools at the speed you think.' },
]

function Multitasking() {
  const { ref, inView } = useInView()
  return (
    <section className="multitasking" ref={ref}>
      <div className="multitasking-inner">
        <div className={`section-header fade-up${inView ? ' in' : ''}`} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <div className="eyebrow">Built for multitaskers</div>
          <h2>Cmd+Tab is already outdated.</h2>
          <p className="mt-desc">
            Every time you press Cmd+Tab, you pause to scan a list. Every Dock click is a micro-interruption.
            MacKeymapper removes the friction — your most-used apps live on your iPhone screen,
            instantly recognizable, always one tap away.
          </p>
        </div>
        <div className="use-case-grid">
          {USE_CASES.map((u, i) => (
            <div key={u.role} className={`use-case-card fade-up${inView ? ' in' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="use-case-icon">{u.icon}</span>
              <h3>{u.role}</h3>
              <p>{u.desc}</p>
            </div>
          ))}
        </div>
        <div className={`mt-compare fade-up${inView ? ' in' : ''}`} style={{ transitionDelay: '300ms' }}>
          <div className="mt-before">
            <div className="mt-label">Without MacKeymapper</div>
            <div className="mt-steps-list">
              <span>⌘ Press Cmd+Tab</span>
              <span>👀 Scan the app switcher</span>
              <span>🖱 Click or press again</span>
              <span>⏳ Break your flow</span>
            </div>
          </div>
          <div className="mt-arrow">→</div>
          <div className="mt-after">
            <div className="mt-label accent">With MacKeymapper</div>
            <div className="mt-steps-list accent">
              <span>👆 Tap on iPhone</span>
              <span>✅ App switches instantly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Hotspot Tip ── */
function HotspotTip() {
  const { ref, inView } = useInView()
  return (
    <section className="hotspot-section" ref={ref}>
      <div className={`hotspot-card fade-up${inView ? ' in' : ''}`}>
        <div className="hotspot-icon">📡</div>
        <div className="hotspot-body">
          <h3>No shared Wi-Fi? Use iPhone as a hotspot.</h3>
          <p>
            MacKeymapper requires both devices on the same network. On public Wi-Fi (cafés,
            airports, hotels), networks often block device-to-device traffic — so the connection
            won't work.
          </p>
          <div className="hotspot-steps">
            <div className="hotspot-step">
              <span className="hs-num">1</span>
              <span>Connect your iPhone to your Mac with a USB cable.</span>
            </div>
            <div className="hotspot-step">
              <span className="hs-num">2</span>
              <span>On iPhone, go to <strong>Settings → Personal Hotspot</strong> and turn it on.</span>
            </div>
            <div className="hotspot-step">
              <span className="hs-num">3</span>
              <span>MacKeymapper will discover your Mac and connect normally.</span>
            </div>
          </div>
          <div className="hotspot-warning">
            <span>⚠️</span>
            <span>
              While Personal Hotspot is active, your Mac's internet traffic routes through your
              iPhone's cellular data. Pause cloud sync or large downloads to avoid unexpected data usage.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Steps ── */
const STEPS = [
  { n: '01', title: 'Install both apps', desc: 'Download MacKeymapper on your Mac and iPhone. Both apps live on your local Wi-Fi network.' },
  { n: '02', title: 'Pair with a PIN', desc: 'A 4-digit PIN shows in the Mac menu bar. Enter it once on your iPhone.' },
  { n: '03', title: 'Choose your apps', desc: 'In the Mac app Settings → Apps, add the apps you want on your iPhone. Tap the refresh button on iPhone to load the list.' },
  { n: '04', title: 'Tap to launch', desc: 'Open MacKeymapper on your iPhone and tap any icon. Done.' },
]

function HowItWorks() {
  const { ref, inView } = useInView()
  return (
    <section className="steps-section" ref={ref}>
      <div className={`section-header fade-up${inView ? ' in' : ''}`}>
        <div className="eyebrow">How it works</div>
        <h2>Up and running<br />in under 2 minutes.</h2>
      </div>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div key={s.n} className={`step fade-up${inView ? ' in' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="step-num">{s.n}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Download ── */
function Download() {
  const { ref, inView } = useInView()
  return (
    <section className="download-section" id="download" ref={ref}>
      <div className={`section-header fade-up${inView ? ' in' : ''}`}>
        <div className="eyebrow">Get started</div>
        <h2>Available on Mac &amp; iPhone.</h2>
      </div>
      <div className={`download-cards fade-up${inView ? ' in' : ''}`} style={{ transitionDelay: '80ms' }}>
        <div className="dl-card">
          <div className="dl-platform">macOS 13+</div>
          <h3>Mac App</h3>
          <p>Runs quietly in your menu bar. Minimal CPU. Auto-updates via Sparkle. Direct download — no App Store required.</p>
          <a href={MAC_DOWNLOAD_URL} className="btn btn-primary" style={{ marginTop: 'auto' }}>
            <AppleIcon /> Download .dmg
          </a>
          <span className="dl-note">Free · ~4 MB · Direct distribution</span>
        </div>

        <div className="dl-divider" />

        <div className="dl-card">
          <div className="dl-platform">iOS 16+</div>
          <h3>iPhone App</h3>
          <p>Free with up to 4 app shortcuts. One-time purchase unlocks unlimited apps, removes ads, and adds custom wallpapers.</p>
          <div className="qr-block">
            <div className="qr-frame">
              <QRCodeSVG value={APP_STORE_URL} size={128} bgColor="transparent" fgColor="#fff" level="M" />
            </div>
            <span className="qr-hint">Scan with iPhone camera<br />to open App Store</span>
          </div>
          <a href={APP_STORE_URL} className="btn btn-outline" style={{ marginTop: 'auto' }}>
            Open App Store
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Privacy Policy Modal ── */
function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Privacy Policy</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-date">Last updated: June 1, 2026</p>

          <h3>Overview</h3>
          <p>MacKeymapper ("we", "our", or "the app") is committed to protecting your privacy. This policy explains what information is collected and how it is used.</p>

          <h3>Data We Do Not Collect</h3>
          <p>MacKeymapper does not collect, store, or transmit any personal data to our servers. There are no accounts, no sign-ups, and no cloud storage. All communication between the iPhone app and the Mac app occurs exclusively on your local network.</p>

          <h3>Local Network Communication</h3>
          <p>MacKeymapper requires access to your local Wi-Fi network to discover and connect to the Mac companion app. This connection is direct, device-to-device, and never routed through external servers. The app requests Local Network permission on iOS solely for this purpose.</p>

          <h3>Advertising (Free Version)</h3>
          <p>The free version of MacKeymapper displays banner ads powered by Google AdMob. AdMob may collect certain device information and use cookies or similar technologies to show relevant ads. You can learn more about Google's data practices at <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">policies.google.com/privacy</a>.</p>

          <h3>In-App Purchases</h3>
          <p>Premium upgrades are processed entirely through Apple's App Store. We do not receive or store your payment information. Purchase records are managed by Apple and subject to Apple's Privacy Policy.</p>

          <h3>Device Pairing</h3>
          <p>When you pair your iPhone with your Mac, a device identifier is stored locally on your Mac to recognize trusted devices. This identifier never leaves your local network.</p>

          <h3>Analytics</h3>
          <p>We do not use any analytics SDKs or tracking tools. We have no visibility into how you use the app.</p>

          <h3>Children's Privacy</h3>
          <p>MacKeymapper is not directed at children under the age of 13 and does not knowingly collect information from children.</p>

          <h3>Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated date.</p>

          <h3>Contact</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:treasure0613@gmail.com">treasure0613@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  )
}

/* ── Footer ── */
function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">MacKeymapper</span>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setShowPrivacy(true)}>Privacy Policy</button>
            <a href="mailto:treasure0613@gmail.com">Support</a>
          </div>
          <span className="footer-copy">© 2026 MacKeymapper. All rights reserved.</span>
        </div>
      </footer>
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  )
}

/* ── Icon ── */
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.5-57.8-155.4-127.2C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.5 268.5-317.5 99.8 0 182.6 65.8 239.3 65.8 54.5 0 148.8-70.3 264.2-70.3zm-74.5-194.7c43.3-51.9 74-123.8 74-195.7 0-10.3-.9-20.6-2.7-29.5-69.1 2.7-151 47.5-200.3 106.8-38 43.1-75.1 115-75.1 188.6 0 11.2 1.8 22.4 2.7 26.1 4.5.9 11.8 1.8 19 1.8 61.5 0 139.1-42.2 182.4-98.1z"/>
    </svg>
  )
}

/* ── App ── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Multitasking />
        <HotspotTip />
        <HowItWorks />
        <Download />
      </main>
      <Footer />
    </>
  )
}
