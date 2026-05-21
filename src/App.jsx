import { useState, useEffect, useRef } from "react";
import "./App.css";
import emailjs from '@emailjs/browser';

// ─── CONFIGURATION — MODIFIE CES VALEURS ───────────────────────────────────
const CONFIG = {
  name: "Maël NGUIMKIA",
  initials: "M.N",
  role: "Développeur Fullstack WEB/MOBILE & IA",
  location: "Awaie-Yaoundé, Cameroun",
  school: "IAI-Cameroun",
  email: "nguimkiamael5@gmail.com",
  whatsapp: "237657147558",        // Ton numéro avec indicatif (ex: 237699XXXXXX)
  github: "https://github.com/MaelNguimkia",
  linkedin: "https://linkedin.com/in/ton-profil",
  cv_url: "https://drive.google.com/file/d/1rodalxmDyquQAEWBuPS1De6eaB4Z2ogi/view?usp=drive_link",                       // URL Google Drive / Notion de ton CV
};

// ─── DATA ──────────────────────────────────────────────────────────────────
const SKILLS = {
  "Frontend":     ["React.js", "React Native", "Flutter", "HTML/CSS", "JavaScript"],
  "Backend":      ["Django", "Python", "Node.js", "REST API"],
  "Base de données": ["PostgreSQL", "Firebase", "SQLite"],
  "IA & Data":    ["Machine Learning", "TensorFlow", "Scikit-learn", "Data Analysis"],
  "Outils":       ["Git", "GitHub", "VS Code", "Figma"],
};

const PROJECTS = [
  {
    id: 1, cat: "IA",
    title: "Système Auto-École Intelligent",
    desc: "Application Django avec module IA pour gérer élèves, plannings et évaluations d'une auto-école.",
    tags: ["Django", "Python", "IA", "PostgreSQL"],
    color: "#F5A623", icon: "🤖", year: "2026", link: "",
  },
  {
    id: 2, cat: "Web",
    title: "Plateforme Micro-Finance",
    desc: "Gestion de micro-crédit avec prediction de prets avec tableau de bord analytique, suivi des remboursements et reporting.",
    tags: ["React.js", "Django", "PostgreSQL", "REST API"],
    color: "#4F8EF7", icon: "💳", year: "2025", link: "",
  },
  {
    id: 3, cat: "Mobile & IA",
    title: "App Mobile intelligente d'aide a la revision",
    desc: "Application React Native cross-platform avec Firebase Auth et synchronisation temps réel.",
    tags: ["React Native", "Firebase", "JavaScript", "adonis"],
    color: "#06D6A0", icon: "📱", year: "2025", link: "",
  },
  {
    id: 4, cat: "IA",
    title: "Analyse de Données & PCA & BIG DATA",
    desc: "Outil d'analyse et de prediction du flux de transport dans la ville de yaounde et statistique avancée avec PCA, AFC et visualisations interactives.",
    tags: ["Python", "Scikit-learn", "Matplotlib", "Data"],
    color: "#8B5CF6", icon: "📊", year: "2026", link: "",
  },
  {
    id: 5, cat: "Mobile",
    title: "App Flutter / Firebase",
    desc: "Application Flutter de gestion des progression avec Clean Architecture, gestion d'état avancée et Firestore.",
    tags: ["Flutter", "Dart", "Firebase", "Clean Arch"],
    color: "#F5A623", icon: "⚡", year: "2025", link: "",
  },
  {
    id: 6, cat: "Web",
    title: "Validation de Projets Étudiants",
    desc: "Génération automatique de fiches de validation pour 74 projets étudiants avec export Word.",
    tags: ["Python", "Django", "Docx", "Automatisation"],
    color: "#4F8EF7", icon: "📋", year: "2025", link: "",
  },
];

const EXPERIENCES = [
  {
    company: "Institution de Micro-Finance — Yaoundé",
    role: "Stagiaire Développeur Web/Mobile",
    period: "2025",
    desc: "Développement d'une application web de suivie et de prediction des prets et de gestion de micro-crédit. Conception de l'architecture.",
    tags: ["React.js", "Django", "PostgreSQL"],
    accent: "gold",
  },
  {
    company: "Smart Tech Douala",
    role: "Stagiaire Développeur",
    period: "2024",
    desc: "Solutions logicielles pour clients locaux. Travail en équipe Agile, intégration continue.",
    tags: ["Web", "Mobile", "Agile"],
    accent: "blue",
  },
  {
    company: "OIC Cameroun",
    role: "Stagiaire Développeur",
    period: "2023-2025",
    desc: "Développement et maintenance d'applications internes. Fonctionnalités backend et amélioration UX.",
    tags: ["Backend", "Python", "SQL", "IA", "React JS"],
    accent: "purple",
  },
  {
    company: "IAI-Cameroun — Centre Paul Biya",
    role: "Étudiant Génie Logiciel & IA",
    period: "2022 – Présent",
    desc: "Formation en Génie Logiciel et Intelligence Artificielle. Projets académiques en web, mobile et data science.",
    tags: ["Génie Logiciel", "IA", "Projets"],
    accent: "gold",
  },
  {
    company: "IAI-cameroun _ centre de bafoussam",
    role: "Etudiant",
    period: "2024-2025",
    desc: "President des etudiants.",
    tags: ["leadership", "motivation"],
    accent: "blue",
  },
];

const CATEGORIES = ["Tous", "Web", "Mobile", "IA"];

// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Accueil", href: "hero" },
  { label: "À propos", href: "about" },
  { label: "Competences", href: "skills" },
  { label: "Projets", href: "projects" },
  { label: "Expériences", href: "exp" },
  { label: "Contact", href: "contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => scrollTo("hero")}>
        {CONFIG.initials}
      </div>
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href}>
            <button
              className={active === href ? "active" : ""}
              onClick={() => scrollTo(href)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────
function Hero({ onOpenCV }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const openWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour Maël, j'ai consulté votre portfolio et je souhaite vous contacter.");
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb1" />
        <div className="hero-orb hero-orb2" />
        <div className="hero-orb hero-orb3" />
        <div className="hero-grid" />
      </div>
      <div className={`hero-inner${visible ? " visible" : ""}`}>
        <div className="hero-badge">
          <span className="badge-dot" />
          💼 Disponible pour un stage ou emploi
        </div>
        <h1 className="hero-title">
          {CONFIG.name.split(" ")[0]}<br />
          <span className="hero-title-grad">{CONFIG.name.split(" ")[1]}</span>
        </h1>
        <p className="hero-sub">
          Développeur <strong>Fullstack & IA</strong> — je conçois des applications
          web, mobiles et des solutions intelligentes adaptées à l'Afrique.
        </p>
        <div className="hero-btns">
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            🚀 Voir mes projets
          </button>
          <button className="btn btn-whatsapp" onClick={openWhatsApp}>
            💬 WhatsApp
          </button>
          <button className="btn btn-cv" onClick={onOpenCV}>
            📄 Mon CV
          </button>
          <a
            className="btn btn-ghost"
            href={CONFIG.github}
            target="_blank"
            rel="noreferrer"
          >
            ⌥ GitHub
          </a>
        </div>
        <div className="hero-tags">
          <span>🌍 {CONFIG.location}</span>
          <span>🎓 {CONFIG.school}</span>
          <span>⚡ React · Django · Flutter</span>
          <span>🤖 IA & Data</span>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="section about">
      <div className={`section-inner${inView ? " visible" : ""}`} ref={ref}>
        <div className="s-label">À propos</div>
        <div className="about-grid">
          <div className="photo-col">
            <div className="photo-frame">
              <div className="photo-placeholder">

                
                <span>{CONFIG.initials[0]}</span>
              </div>
              <div className="photo-deco" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="s-title">
              Passionné par la{" "}
              <em>tech africaine</em>
            </h2>
            <p>
              Étudiant en 3ème année de{" "}
              <strong>Génie Logiciel & Intelligence Artificielle</strong> à
              l'IAI-Cameroun, Centre d'Excellence Technologique Paul Biya.
            </p>
            <p>
              Mon expertise couvre le <strong>développement web</strong> (Django,
              React), le <strong>mobile</strong> (React Native, Flutter) et
              l'<strong>intelligence artificielle</strong>. J'ai déjà effectué
              plusieurs stages et je cherche activement de nouvelles opportunités.
            </p>
            <p>
              Je crois que la technologie doit résoudre de vrais problèmes —
              ceux des entreprises et des personnes de mon continent.
            </p>
            <div className="stats-row">
              {[["3+", "Stages"], ["6+", "Projets"], ["3", "Domaines"], ["3", "Ans xp"]].map(
                ([n, l]) => (
                  <div className="stat" key={l}>
                    <strong>{n}</strong>
                    <span>{l}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" className="section skills">
      <div className={`section-inner${inView ? " visible" : ""}`} ref={ref}>
        <div className="s-label">Compétences</div>
        <h2 className="s-title">
          Mon <em>Stack</em> Technique
        </h2>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <div className="skill-card" key={cat} style={{ "--i": i }}>
              <h4>{cat}</h4>
              <div className="skill-tags">
                {items.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState("Tous");
  const [ref, inView] = useInView(0.05);
  const filtered = filter === "Tous"
    ? PROJECTS
    : PROJECTS.filter((p) => p.cat === filter);

  return (
    <section id="projects" className="section projects">
      <div className={`section-inner${inView ? " visible" : ""}`} ref={ref}>
        <div className="s-label">Portfolio</div>
        <h2 className="s-title">
          Projets <span className="grad-blue">Réalisés</span>
        </h2>
        <div className="filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn${filter === c ? " active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c === "Web" ? "🌐 " : c === "Mobile" ? "📱 " : c === "IA" ? "🤖 " : ""}
              {c}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-top">
        <div className="project-top-line" style={{ background: p.color }} />
        <span className="project-icon">{p.icon}</span>
        <div className="project-meta">
          <span
            className="project-badge"
            style={{ "--c": p.color }}
          >
            {p.cat}
          </span>
          <span className="project-year">{p.year}</span>
        </div>
      </div>
      <div className="project-body">
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="project-tags">
          {p.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
      {hovered && (
        <div className="project-overlay">
          {p.link ? (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="overlay-btn"
            >
              🔗 Voir le projet
            </a>
          ) : (
            <span className="overlay-private">🔒 Projet privé</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── EXPERIENCES ───────────────────────────────────────────────────────────
function Experiences() {
  const [ref, inView] = useInView();
  return (
    <section id="exp" className="section experiences">
      <div className={`section-inner${inView ? " visible" : ""}`} ref={ref}>
        <div className="s-label">Parcours</div>
        <h2 className="s-title">
          Expériences &amp; <em>Formation</em>
        </h2>
        <div className="timeline">
          {EXPERIENCES.map((e, i) => (
            <div className="tl-item" key={i}>
              <div className={`tl-dot tl-dot-${e.accent}`} />
              <div className="tl-box">
                <div className="tl-header">
                  <div>
                    <h3>{e.role}</h3>
                    <p className={`tl-company tl-company-${e.accent}`}>{e.company}</p>
                  </div>
                  <span className="tl-period">{e.period}</span>
                </div>
                <p className="tl-desc">{e.desc}</p>
                <div className="tl-tags">
                  {e.tags.map((t) => (
                    <span key={t} className={`tl-tag tl-tag-${e.accent}`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const openWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour Maël, j'ai consulté votre portfolio et je souhaite vous contacter.");
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    emailjs.send('service_jljxqcr', 'template_e9v0d2k', form, 'PUBLIC_KEY');
  };

  return (
    <section id="contact" className="section contact">
      <div className={`section-inner${inView ? " visible" : ""}`} ref={ref}>
        <div className="s-label">Contact</div>
        <h2 className="s-title">
          Travaillons <em>Ensemble</em>
        </h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-desc">
              Disponible pour des <strong>stages</strong>, missions{" "}
              <strong>freelance</strong> ou opportunités <strong>full-time</strong>.
              Je réponds sous 24h.
            </p>
            <div className="contact-links">
              <button className="contact-link" onClick={openWhatsApp}>
                <span className="c-icon c-icon-wa">💬</span>
                <span>WhatsApp — Contact direct</span>
              </button>
              <a className="contact-link" href={`mailto:${CONFIG.email}`}>
                <span className="c-icon c-icon-mail">✉</span>
                <span>{CONFIG.email}</span>
              </a>
              <a className="contact-link" href={CONFIG.github} target="_blank" rel="noreferrer">
                <span className="c-icon c-icon-gh">⌥</span>
                <span>GitHub — Voir mes repos</span>
              </a>
              <a className="contact-link" href={CONFIG.linkedin} target="_blank" rel="noreferrer">
                <span className="c-icon c-icon-li">in</span>
                <span>LinkedIn</span>
              </a>
              <div className="contact-link">
                <span className="c-icon c-icon-loc">📍</span>
                <span>{CONFIG.location}</span>
              </div>
            </div>
          </div>
          <div className="contact-form-box">
            {sent ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <p>Message envoyé !<br />Je reviens vers vous sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Votre message..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Envoyer le message ✉
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CV MODAL ──────────────────────────────────────────────────────────────
function CVModal({ onClose }) {
  const openWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour Maël, pouvez-vous m'envoyer votre CV ?");
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3>📄 Mon CV</h3>
        <p>
          Consultez ou téléchargez mon CV ci-dessous. Vous pouvez aussi me le
          demander directement via WhatsApp.
        </p>
        <div className="modal-btns">
          <a
            className="btn btn-cv"
            href={CONFIG.cv_url || "#"}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => !CONFIG.cv_url && e.preventDefault()}
          >
            📥 Télécharger le CV
          </a>
          <button className="btn btn-whatsapp" onClick={openWhatsApp}>
            💬 Demander via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 {CONFIG.name} · {CONFIG.location}</p>
      <p className="footer-sub">Développeur Fullstack web/mobile & IA</p>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenCV={() => setCvOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experiences />
        <Contact />
      </main>
      <Footer />
      {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}
    </>
  );
}