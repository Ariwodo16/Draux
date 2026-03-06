'use client';
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Services", "About", "Contact"];

const PROJECTS = [
  {
    title: "Mothering Melanin",
    live: "https://motheringmelanin.com",
    category: "Brand Website",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    description:
      "A culturally grounded digital presence for a doula brand supporting Black birthing people. Warm, trustworthy, and deeply intentional in every design decision.",
    outcome: "Brand-forward, mobile-first experience designed to build trust and drive inquiries.",
    color: "#C4A882",
  },
  {
    title: "RoleRunner",
    live: "https://rolerunner.run",
    category: "SaaS Platform",
    year: "2026",
    tags: ["Next.js", "React", "Resend"],
    description:
      "A conversion-focused platform for a job-search support service. Built to clearly communicate the offer, guide visitors, and generate qualified leads.",
    outcome: "Clear messaging, fast-loading pages, and strong call-to-action flow.",
    color: "#8BA5C4",
  },
  {
    title: "Home Care Solutions",
    live: "https://hcsga.org",
    category: "Home Care Website",
    year: "2026",
    tags: ["Next.js", "MDX", "Tailwind CSS"],
    description:
      "A refreshed online storefront with a cleaner visual system, updated product presentation, and a more premium, modern feel throughout.",
    outcome: "Elevated visual identity with scalable structure for content and commerce.",
    color: "#A8C4A0",
  },
  {
    title: "Local Business Landing Pages",
    category: "Lead Generation",
    year: "2025–26",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "High-converting, custom-coded landing pages for small businesses who want a stronger online presence without depending on expensive builders.",
    outcome: "Fast, responsive pages designed to turn local traffic into booked calls.",
    color: "#C4B8A8",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Brand Websites",
    desc: "Full custom websites designed to reflect the quality of your business and build immediate trust with your audience.",
  },
  {
    number: "02",
    title: "Landing Pages",
    desc: "Single-purpose pages engineered to convert. Clear messaging, strong hierarchy, and a direct path to action.",
  },
  {
    number: "03",
    title: "Redesigns",
    desc: "Your current site isn't working. I'll identify exactly why and rebuild it into something you're proud to share.",
  },
  {
    number: "04",
    title: "Ongoing Support",
    desc: "Retainer-based updates, additions, and maintenance so your site keeps pace with your business.",
  },
];

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most brand websites take 3–5 weeks from kickoff to launch. Landing pages are typically 1–2 weeks. Timeline depends on how quickly feedback comes in.",
  },
  {
    q: "Do you work with clients who already have a designer?",
    a: "Yes. If you have brand guidelines, a Figma file, or a designer you work with, I can build directly from those assets.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A clear sense of your goals, your audience, and what action you want visitors to take. Everything else — structure, copy direction, design — I can help shape.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. Most projects are split 50% upfront and 50% at launch. For larger scopes I'm open to milestone-based arrangements.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Every project includes a 2-week post-launch window for small revisions. For ongoing work, I offer monthly support retainers.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem",
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(240,238,232,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(60,90,100,0.1)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="/logo.jpg" alt="Draux" style={{ height: "36px", width: "auto", display: "block" }} />
      </a>

      <div style={{ display: "flex", gap: "2.5rem" }} className="desktop-nav">
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9AB4BC", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#2E3D42"}
            onMouseLeave={e => e.target.style.color = "#9AB4BC"}
          >{l}</a>
        ))}
      </div>

      <a href="#contact"
        style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#2E3D42", color: "#F0EEE8", padding: "0.55rem 1.25rem", borderRadius: "100px", textDecoration: "none", fontWeight: 600, transition: "background 0.2s" }}
        onMouseEnter={e => e.target.style.background = "#5E8E8C"}
        onMouseLeave={e => e.target.style.background = "#2E3D42"}
      >
        Hire Me
      </a>

      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "0 2rem 5rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(60,100,110,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "absolute", top: "64px", left: "2rem", right: "2rem", height: "1px", background: "rgba(60,90,100,0.1)" }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8rem, 20vw, 22rem)",
        fontWeight: 300, color: "rgba(46,61,66,0.04)", whiteSpace: "nowrap",
        letterSpacing: "-0.04em", userSelect: "none", pointerEvents: "none",
        lineHeight: 1,
      }}>
        Design
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative" }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7EAAA8", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7EAAA8", display: "inline-block" }} />
            Web Designer & Developer — Available for Projects
          </p>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: "-0.02em", color: "#2E3D42",
            margin: 0, marginBottom: "2.5rem",
            maxWidth: "900px",
          }}>
            Websites that make your business look like it means business.
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <a href="#work" style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#5E8E8C", textDecoration: "none",
              borderBottom: "1px solid rgba(94,142,140,0.4)", paddingBottom: "0.2rem",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#5E8E8C"; e.currentTarget.style.color = "#2E3D42"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(94,142,140,0.4)"; e.currentTarget.style.color = "#5E8E8C"; }}
            >
              View Work
              <span style={{ fontSize: "1rem" }}>→</span>
            </a>
            <span style={{ color: "rgba(60,90,100,0.2)", fontSize: "0.8rem" }}>·</span>
            <span style={{ fontSize: "0.8rem", color: "#9AB4BC", letterSpacing: "0.05em" }}>
              Custom-coded. No templates. No shortcuts.
            </span>
          </div>
        </div>

        <div style={{
          display: "flex", gap: "3rem", marginTop: "5rem", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.8s",
          borderTop: "1px solid rgba(60,90,100,0.1)", paddingTop: "2rem",
        }}>
          {[["5+", "Projects Delivered"], ["2–4 wk", "Avg. Timeline"], ["100%", "Custom Code"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#2E3D42", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AB4BC", marginTop: "0.4rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [active, setActive] = useState(null);

  return (
    <section id="work" style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9AB4BC", marginBottom: "0.75rem" }}>Selected Work</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#2E3D42", margin: 0, letterSpacing: "-0.01em" }}>
              Projects
            </h2>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#6A8A94", maxWidth: "340px", lineHeight: 1.7 }}>
            A selection of custom websites and landing pages built for real businesses.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div
              style={{
                borderTop: "1px solid rgba(60,90,100,0.1)",
                padding: "2.5rem 0",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem",
                alignItems: "start",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => setActive(active === i ? null : i)}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = "1rem"}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400, color: "#2E3D42", letterSpacing: "-0.01em" }}>
                    {p.title}
                  </span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6A8A94", background: "rgba(60,90,100,0.06)", padding: "0.3rem 0.75rem", borderRadius: "100px" }}>
                    {p.category}
                  </span>
                </div>

                <div style={{
                  overflow: "hidden", maxHeight: active === i ? "300px" : "0",
                  transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  <p style={{ fontSize: "0.9rem", color: "#6A8A94", lineHeight: 1.8, marginBottom: "1.25rem", maxWidth: "600px" }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7EAAA8", border: "1px solid rgba(60,90,100,0.15)", padding: "0.25rem 0.65rem", borderRadius: "100px" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5E8E8C", textDecoration: "none", borderBottom: "1px solid rgba(94,142,140,0.4)", paddingBottom: "0.15rem" }}>Live Site →</a>}
                    <a href="#" style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AB4BC", textDecoration: "none", borderBottom: "1px solid rgba(60,90,100,0.15)", paddingBottom: "0.15rem" }}>Case Study →</a>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#9AB4BC", letterSpacing: "0.05em" }}>{p.year}</span>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(60,90,100,0.06)", border: "1px solid rgba(60,90,100,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", color: "#6A8A94",
                  transition: "transform 0.3s ease",
                  transform: active === i ? "rotate(45deg)" : "none",
                }}>+</div>
              </div>
            </div>
          </FadeIn>
        ))}
        <div style={{ borderTop: "1px solid rgba(60,90,100,0.1)" }} />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "8rem 2rem", background: "rgba(60,90,100,0.03)", borderTop: "1px solid rgba(60,90,100,0.08)", borderBottom: "1px solid rgba(60,90,100,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9AB4BC", marginBottom: "0.75rem" }}>What I Do</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#2E3D42", margin: "0 0 5rem", letterSpacing: "-0.01em", maxWidth: "600px" }}>
            Services built around what actually moves your business forward.
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div style={{
                padding: "2.5rem 2rem",
                borderLeft: i === 0 ? "1px solid rgba(60,90,100,0.1)" : "none",
                borderRight: "1px solid rgba(60,90,100,0.1)",
                borderTop: "1px solid rgba(60,90,100,0.1)",
                borderBottom: "1px solid rgba(60,90,100,0.1)",
                height: "100%",
                transition: "background 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(60,90,100,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#7EAAA8", marginBottom: "1.5rem" }}>{s.number}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#2E3D42", margin: "0 0 1rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6A8A94", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div style={{ marginTop: "6rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", paddingTop: "4rem", borderTop: "1px solid rgba(60,90,100,0.1)" }}>
            {[
              { n: "01", t: "Strategy", d: "Understanding your goals, audience, and the one action you want visitors to take." },
              { n: "02", t: "Design & Build", d: "Clean, responsive, intentional — designed from the ground up, not copied from a template." },
              { n: "03", t: "Launch & Refine", d: "Optimized for performance, polished in every detail, and ready to represent your brand." },
            ].map(p => (
              <div key={p.n}>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#9AB4BC", marginBottom: "1rem" }}>{p.n}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#2E3D42", marginBottom: "0.75rem" }}>{p.t}</div>
                <div style={{ fontSize: "0.83rem", color: "#6A8A94", lineHeight: 1.75 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
        <FadeIn>
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9AB4BC", marginBottom: "0.75rem" }}>About</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 400, color: "#2E3D42", margin: "0 0 2.5rem", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              I care about what your website does, not just what it looks like.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                "I'm a web designer and developer focused on helping small businesses and personal brands build a digital presence that actually reflects the quality of their work.",
                "I come from a background in front-end development, but design is where I spend most of my thinking. I care about hierarchy, clarity, and what happens the moment someone lands on a page — whether they stay, read, and reach out.",
                "Every site I build is custom-coded. That means no Webflow, no Squarespace, no templates dressed up as something original. Just clean, intentional work built to grow with your brand.",
              ].map((t, i) => (
                <p key={i} style={{ fontSize: "0.92rem", color: "#6A8A94", lineHeight: 1.85, margin: 0 }}>{t}</p>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div>
            <div style={{
              width: "100%", aspectRatio: "3/4", borderRadius: "4px",
              background: "rgba(60,90,100,0.04)",
              border: "1px solid rgba(60,90,100,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "2.5rem", position: "relative", overflow: "hidden",
            }}>
              <img src="/logo.jpg" alt="About" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                ["Based in", "United States"],
                ["Available for", "Remote Projects Worldwide"],
                ["Focus", "Small Businesses & Personal Brands"],
                ["Response time", "Within 24 hours"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.9rem 0", borderBottom: "1px solid rgba(60,90,100,0.08)" }}>
                  <span style={{ fontSize: "0.78rem", color: "#9AB4BC", letterSpacing: "0.05em" }}>{k}</span>
                  <span style={{ fontSize: "0.78rem", color: "#2E3D42" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: "8rem 2rem", background: "rgba(60,90,100,0.03)", borderTop: "1px solid rgba(60,90,100,0.08)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9AB4BC", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#2E3D42", margin: "0 0 4rem", letterSpacing: "-0.01em" }}>
            Common questions
          </h2>
        </FadeIn>

        <div>
          {FAQS.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ borderTop: "1px solid rgba(60,90,100,0.1)" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%", background: "none", border: "none", padding: "1.75rem 0",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", textAlign: "left", gap: "1.5rem",
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#2E3D42", fontWeight: 400 }}>{f.q}</span>
                  <span style={{
                    flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%",
                    border: "1px solid rgba(60,90,100,0.2)", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#6A8A94", fontSize: "0.9rem",
                    transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none",
                  }}>+</span>
                </button>
                <div style={{
                  overflow: "hidden", maxHeight: open === i ? "200px" : "0",
                  transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  <p style={{ fontSize: "0.88rem", color: "#6A8A94", lineHeight: 1.85, paddingBottom: "1.75rem", margin: 0 }}>{f.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
          <div style={{ borderTop: "1px solid rgba(60,90,100,0.1)" }} />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "8rem 2rem 10rem", maxWidth: "1200px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9AB4BC", marginBottom: "0.75rem" }}>Contact</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 400, color: "#2E3D42", margin: "0 0 2rem", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Let's build something worth showing off.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6A8A94", lineHeight: 1.8, marginBottom: "3rem" }}>
              If you're ready to invest in a website that actually represents the quality of your work, reach out. I'll get back to you within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href="mailto:ariwodomichael5@gmail.com" style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#F0EEE8", textDecoration: "none",
                background: "#2E3D42", border: "1px solid #2E3D42",
                padding: "1rem 1.5rem", borderRadius: "4px",
                transition: "background 0.2s",
                fontWeight: 600,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#5E8E8C"}
                onMouseLeave={e => e.currentTarget.style.background = "#2E3D42"}
              >
                ✉ Email Me
              </a>
              <a href="https://www.linkedin.com/in/michaelariwodo/" style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#6A8A94", textDecoration: "none",
                border: "1px solid rgba(60,90,100,0.15)",
                padding: "1rem 1.5rem", borderRadius: "4px",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(60,90,100,0.04)"; e.currentTarget.style.color = "#2E3D42"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6A8A94"; }}
              >
                ↗ LinkedIn
              </a>
            </div>
          </div>

          <div style={{ paddingTop: "4rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                ["Landing Pages ", "$300"],
                ["Full Websites Starting at", "$1,000"],
                ["Typical timeline", "2–4 weeks"],
                ["Current availability", "Open to new clients"],
                ["Best for", "Brands ready to level up"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", borderBottom: "1px solid rgba(60,90,100,0.08)" }}>
                  <span style={{ fontSize: "0.78rem", color: "#9AB4BC", letterSpacing: "0.05em" }}>{k}</span>
                  <span style={{ fontSize: "0.88rem", color: v === "Open to new clients" ? "#5E8E8C" : "#2E3D42", fontWeight: v === "Open to new clients" ? 500 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(60,90,100,0.1)",
      padding: "2rem",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#9AB4BC" }}>Draux</span>
      <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: "#9AB4BC", textTransform: "uppercase" }}>
        © {new Date().getFullYear()} Draux — All Rights Reserved
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {["Work", "About", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9AB4BC", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --bg: #F0EEE8;
          --surface: #EDEADE;
          --border: rgba(60,90,100,0.1);
          --text: #2E3D42;
          --text-secondary: #6A8A94;
          --text-muted: #9AB4BC;
          --accent: #5E8E8C;
          --accent-light: #7EAAA8;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F0EEE8; color: #2E3D42; font-family: 'DM Sans', sans-serif; }
        ::selection { background: rgba(94,142,140,0.15); color: #2E3D42; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F0EEE8; }
        ::-webkit-scrollbar-thumb { background: #9AB4BC; }
      `}</style>
      <div style={{ background: "#F0EEE8", minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <Work />
        <Services />
        <About />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
