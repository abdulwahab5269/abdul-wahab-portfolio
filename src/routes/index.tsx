import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profilePhoto from "@/assets/abdul-wahab-profile.png";
import { certifications, personal, projects, skillGroups } from "@/data/portfolio";

const navItems = ["home", "about", "skills", "projects", "experience", "education", "certifications", "contact"];
const interests = ["Web Development", "Software Development", "Artificial Intelligence", "Modern UI/UX", "Problem Solving", "Technology & Innovation"];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email.").max(160),
  subject: z.string().trim().min(3, "Please add a subject.").max(120),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(1200),
});

type FormErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdul Wahab — Web & Software Developer" },
      { name: "description", content: "Portfolio of Abdul Wahab, a software engineering student, web developer, software developer, and AI enthusiast in Lahore." },
      { property: "og:title", content: "Abdul Wahab — Developer Portfolio" },
      { property: "og:description", content: "Explore Abdul Wahab's web development, software development, AI interests, projects, education, and certifications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Brand() {
  return (
    <a href="#home" className="brand" aria-label="Abdul Wahab, back to home">
      <span aria-hidden="true">{"{"}</span><span>abdul</span><strong>wahab</strong><em>.dev</em><span aria-hidden="true">{"}"}</span>
    </a>
  );
}

function SectionHeading({ code, title, copy }: { code: string; title: string; copy: string }) {
  return (
    <div className="section-heading reveal">
      <span className="section-code">// {code}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    navItems.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    const handleScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      const nextErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      setSent(false);
      return;
    }
    setErrors({});
    setSent(true);
    form.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} className={active === item ? "active" : ""}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>
            ))}
          </nav>
          <Button asChild variant="accent" size="sm" className="nav-cta"><a href="#contact">Let's Connect <ArrowRight /></a></Button>
          <Button variant="ghost" size="icon" className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => <a key={item} href={`#${item}`} onClick={closeMenu}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>)}
        </div>
      </header>

      <main>
        <section id="home" className="hero section-anchor">
          <div className="star-field" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="status-pill hero-enter"><span /> Open to learning & collaboration</div>
              <p className="eyebrow hero-enter delay-1">Hi, I'm</p>
              <h1 className="hero-enter delay-2">ABDUL <span>WAHAB</span></h1>
              <div className="role-line hero-enter delay-3"><span>Web Developer</span><i /> <span>Software Developer</span><i /> <span>AI Enthusiast</span></div>
              <p className="hero-intro hero-enter delay-4">I’m a Software Engineering student passionate about building modern web experiences, practical software solutions, and exploring what AI can make possible.</p>
              <div className="hero-actions hero-enter delay-5">
                <Button asChild variant="accent" size="lg"><a href="#projects">View My Work <ArrowDown /></a></Button>
                <Button asChild variant="outlineGlow" size="lg"><a href="#contact">Let's Connect <ArrowRight /></a></Button>
              </div>
              <div className="hero-socials hero-enter delay-5">
                <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github /></a>
                <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin /></a>
                <a href={`mailto:${personal.email}`} aria-label="Email Abdul Wahab"><Mail /></a>
              </div>
            </div>
            <div className="profile-stage hero-enter delay-3">
              <div className="profile-window">
                <div className="window-bar"><div><span /><span /><span /></div><code>profile.photo</code></div>
                <div className="profile-frame">
                  <img src={profilePhoto} width={830} height={787} alt="Portrait of Abdul Wahab" />
                </div>
                <div className="profile-code" aria-hidden="true"><span>const</span> developer = <b>"Abdul Wahab"</b>;</div>
              </div>
              <div className="floating-tag tag-one"><Terminal /> build • learn • improve</div>
              <div className="floating-tag tag-two"><Sparkles /> AI curious</div>
            </div>
          </div>
          <a className="scroll-cue" href="#about">Scroll to explore <ArrowDown /></a>
        </section>

        <section id="about" className="section section-anchor">
          <div className="container">
            <SectionHeading code="about_me" title="Curious by nature. Building with purpose." copy="A software engineering student shaping ideas into useful digital products." />
            <div className="about-grid reveal">
              <div className="about-copy">
                <p className="lead">I’m Abdul Wahab, a Software Engineering student at COMSATS University Islamabad, Lahore Campus.</p>
                <p>I enjoy turning ideas into clear, useful digital experiences through web and software development. Alongside my coursework, I’m exploring artificial intelligence and how thoughtful tools can make technology more capable and useful.</p>
                <p>I’m continuously learning, improving my craft, and building a stronger foundation across code, interface design, and problem solving.</p>
                <blockquote>“The best way to understand technology is to build with it, question it, and keep improving.”</blockquote>
              </div>
              <div className="stats-grid">
                <div className="stat"><strong>4th</strong><span>Current Semester</span></div>
                <div className="stat"><strong>BS</strong><span>Software Engineering</span></div>
                <div className="stat"><strong>3+</strong><span>Core Focus Areas</span></div>
                <div className="stat"><strong>2025</strong><span>Degree Started</span></div>
              </div>
            </div>
            <div className="interests reveal">
              <div className="subhead"><span>Areas of interest</span><span>What keeps me curious</span></div>
              <div className="interest-grid">{interests.map((item, index) => <div className="interest-item" key={item}><span>0{index + 1}</span><p>{item}</p><ChevronRight /></div>)}</div>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-tinted section-anchor">
          <div className="container">
            <SectionHeading code="technical_stack" title="Tools I use to turn ideas into reality." copy="A focused toolkit for the web, software development, AI exploration, and digital work." />
            <div className="skill-grid">
              {skillGroups.map((group, index) => (
                <article className={`skill-card reveal ${group.featured ? "featured" : ""}`} key={group.title}>
                  <div className="skill-card-top"><span>0{index + 1}</span>{group.featured ? <Code2 /> : <Terminal />}</div>
                  <h3>{group.title}</h3>
                  <div className="tag-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section section-anchor">
          <div className="container">
            <SectionHeading code="selected_work" title="Projects in progress. Skills in practice." copy="Initial project concepts ready to be replaced with completed work as the portfolio grows." />
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className="project-card reveal" key={project.title}>
                  <div className="project-image"><img src={project.image} width={1280} height={800} loading="lazy" alt={`${project.title} abstract project preview`} /><span>0{index + 1}</span></div>
                  <div className="project-content"><p className="project-type">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>{(project.github || project.demo) && <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink /> Live Demo</a>}</div>}</div>
                </article>
              ))}
            </div>
            <p className="edit-note reveal"><Terminal /> Project details and links are structured for easy updates as Abdul’s work evolves.</p>
          </div>
        </section>

        <section id="experience" className="section section-tinted section-anchor">
          <div className="container timeline-layout">
            <SectionHeading code="experience" title="Learning through real environments." copy="Professional exposure and community involvement alongside university study." />
            <div className="timeline">
              <article className="timeline-item reveal"><div className="timeline-icon"><BriefcaseBusiness /></div><div className="timeline-content"><div className="timeline-meta"><span>Professional Experience</span><time>Details to be added</time></div><h3>Fly Rank</h3><p>Professional experience at Fly Rank.</p><div className="placeholder-fields"><span>Position</span><span>Dates</span><span>Responsibilities</span><span>Achievements</span></div></div></article>
              <article className="timeline-item reveal"><div className="timeline-icon"><Users /></div><div className="timeline-content"><div className="timeline-meta"><span>Activities & Involvement</span><time>2025 — Present</time></div><h3>ACM Student Chapter</h3><p>COMSATS University Islamabad, Lahore Campus</p><div className="tag-list"><span>Technical activities</span><span>Workshops</span><span>Competitions</span><span>Student engagement</span><span>Collaboration</span><span>Events</span></div></div></article>
            </div>
          </div>
        </section>

        <section id="education" className="section section-anchor">
          <div className="container education-wrap">
            <SectionHeading code="education" title="Building a strong engineering foundation." copy="Formal study supported by practical exploration across software, the web, and AI." />
            <article className="education-card reveal"><div className="degree-mark"><GraduationCap /><span>2025<br />Present</span></div><div><span className="section-code">Current education</span><h3>Bachelor of Science in Software Engineering</h3><p>COMSATS University Islamabad</p><p className="campus">Lahore Campus · Currently in 4th Semester</p></div><div className="degree-status"><span>In progress</span><strong>4th</strong><small>Semester</small></div></article>
          </div>
        </section>

        <section id="certifications" className="section section-tinted section-anchor">
          <div className="container">
            <SectionHeading code="certifications" title="Learning beyond the classroom." copy="Courses and training across prompting, web development, freelancing, and digital marketing." />
            <div className="cert-grid">
              {certifications.map((cert, index) => <article className="cert-card reveal" key={`${cert.title}-${cert.issuer}`}><div className="cert-number">0{index + 1}<Award /></div><p>{cert.issuer}</p><h3>{cert.title}</h3><ul>{cert.details.map((detail) => <li key={detail}><span />{detail}</li>)}</ul></article>)}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section section-anchor">
          <div className="container">
            <SectionHeading code="get_in_touch" title="Have an idea? Let’s talk." copy="I’m always open to thoughtful conversations, opportunities to learn, and projects worth building." />
            <div className="contact-grid">
              <div className="contact-info reveal">
                <h3>Start a conversation</h3><p>Reach out directly or send a message using the form. I’ll get back to you when I can.</p>
                <a href={`mailto:${personal.email}`}><span><Mail /></span><div><small>Email</small><strong>{personal.email}</strong></div></a>
                <a href={`tel:${personal.phone.replace(/-/g, "")}`}><span><Phone /></span><div><small>Phone</small><strong>{personal.phone}</strong></div></a>
                <div className="contact-row"><span><MapPin /></span><div><small>Location</small><strong>{personal.location}</strong></div></div>
                <div className="contact-socials"><a href={personal.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a><a href={personal.github} target="_blank" rel="noreferrer"><Github /> GitHub</a></div>
              </div>
              <form className="contact-form reveal" onSubmit={submitContact} noValidate>
                <div className="field-row"><label>Name<Input name="name" placeholder="Your name" maxLength={80} aria-invalid={Boolean(errors.name)} />{errors.name && <span>{errors.name}</span>}</label><label>Email<Input name="email" type="email" placeholder="you@example.com" maxLength={160} aria-invalid={Boolean(errors.email)} />{errors.email && <span>{errors.email}</span>}</label></div>
                <label>Subject<Input name="subject" placeholder="What would you like to discuss?" maxLength={120} aria-invalid={Boolean(errors.subject)} />{errors.subject && <span>{errors.subject}</span>}</label>
                <label>Message<Textarea name="message" placeholder="Tell me a little about your idea..." rows={6} maxLength={1200} aria-invalid={Boolean(errors.message)} />{errors.message && <span>{errors.message}</span>}</label>
                <Button type="submit" variant="accent" size="lg">Send Message <Send /></Button>
                {sent && <div className="success-message" role="status"><CheckCircle2 /> Thanks — your message passed validation. This assignment form does not send data to a server.</div>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="container footer-grid"><div><Brand /><p>{personal.role}</p></div><div className="footer-links"><a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href={`mailto:${personal.email}`} aria-label="Email"><Mail /></a></div><p>© 2026 Abdul Wahab. All rights reserved.</p></div></footer>
      <Button variant="accent" size="icon" className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp /></Button>
    </div>
  );
}
