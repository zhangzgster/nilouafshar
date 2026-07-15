"use client";

/* eslint-disable @next/next/no-img-element -- original artwork is served from Nilou's existing public portfolio */

import { FormEvent, useEffect, useState } from "react";

type Work = {
  src: string;
  category: "Painting" | "Print" | "Drawing";
  alt: string;
};

const works: Work[] = [
  {
    src: "https://nilouafshar.com/images/fullsized/painting_5.jpg",
    category: "Painting",
    alt: "Expressive painting of a tree-lined path",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/print_1.jpg",
    category: "Print",
    alt: "Geometric black-and-white portrait print",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/painting_2.jpg",
    category: "Painting",
    alt: "Still life painting with vessels, fruit and leaves",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/drawing_1.jpg",
    category: "Drawing",
    alt: "Narrative drawing with figures and birds",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/painting_8.jpg",
    category: "Painting",
    alt: "Colourful painted portrait",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/print_3.jpg",
    category: "Print",
    alt: "Monochrome landscape print",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/drawing_4.jpg",
    category: "Drawing",
    alt: "Gestural figure study",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/painting_6.jpg",
    category: "Painting",
    alt: "Floral still life painting",
  },
  {
    src: "https://nilouafshar.com/images/fullsized/print_4.jpg",
    category: "Print",
    alt: "Dark blue landscape print",
  },
];

const filters = ["All", "Painting", "Print", "Drawing"] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon">
      <path d={diagonal ? "M7 17 17 7M8 7h9v9" : "M5 12h14m-5-5 5 5-5 5"} />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeWork ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeWork]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveWork(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const visibleWorks =
    filter === "All" ? works : works.filter((work) => work.category === filter);

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Art class enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:nilou@nilouafshar.com?subject=${subject}&body=${body}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu}>
          Nilou Afshar
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <a href="#works" onClick={closeMenu}>Works</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#classes" onClick={closeMenu}>Classes</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <div id="main-content">
        <section className="hero section-shell" id="top">
          <div className="hero-copy reveal reveal-1">
            <p className="eyebrow">Artist &amp; Educator · Toronto</p>
            <h1>Art is a language without borders.</h1>
            <p className="hero-intro">
              Drawing, painting and printmaking classes that build skill,
              confidence and a personal visual voice.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#works">
                Explore the work <Arrow />
              </a>
              <a className="text-link" href="#classes">
                View classes <Arrow diagonal />
              </a>
            </div>
          </div>

          <figure className="hero-art reveal reveal-2">
            <div className="hero-art-frame">
              <img
                src="https://nilouafshar.com/images/fullsized/painting_5.jpg"
                alt="Tree-lined path painted by Nilou Afshar"
              />
            </div>
            <figcaption>
              <span className="art-index">01</span>
              <span className="caption-rule" />
              <span>
                <em>Selected painting</em>
                <small>Nilou Afshar · Toronto</small>
              </span>
            </figcaption>
          </figure>
        </section>

        <section className="statement-band" aria-label="Artist statement">
          <div className="section-shell statement-inner">
            <span className="section-number">01 / 05</span>
            <blockquote>
              “Creativity begins as an instinct. Learning the language of
              images helps it become a confident, individual voice.”
            </blockquote>
          </div>
        </section>

        <section className="works-section section-shell" id="works">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Across materials,<br />one visual language.</h2>
            </div>
            <p>
              A selection of paintings, prints and drawings shaped by a life
              lived between Iran and Canada.
            </p>
          </div>

          <div className="work-filters" aria-label="Filter artwork">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="works-grid" aria-live="polite">
            {visibleWorks.map((work, index) => (
              <button
                type="button"
                className="work-card"
                key={work.src}
                onClick={() => setActiveWork(work)}
                aria-label={`Open ${work.category.toLowerCase()}: ${work.alt}`}
              >
                <span className="work-image-wrap">
                  <img src={work.src} alt={work.alt} loading="lazy" />
                  <span className="view-mark" aria-hidden="true">View ↗</span>
                </span>
                <span className="work-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{work.category}</span>
                  <span>Nilou Afshar</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-shell about-grid">
            <div className="about-visual">
              <img
                className="about-work"
                src="https://nilouafshar.com/images/fullsized/print_2.jpg"
                alt="Bird print by Nilou Afshar"
                loading="lazy"
              />
              <img
                className="about-portrait"
                src="https://nilouafshar.com/images/nilou-img.jpg"
                alt="Portrait artwork representing Nilou Afshar"
                loading="lazy"
              />
              <span className="visual-note">Iran → Canada</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">About Nilou</p>
              <h2>An artist who teaches people to trust their own voice.</h2>
              <p className="lead">
                Nilou Afshar is a Toronto-based artist and educator whose work
                spans painting, drawing and printmaking.
              </p>
              <p>
                Her teaching combines strong fundamentals with individual
                guidance. Students learn technique at their own pace while
                developing the confidence to express their thoughts, ideas and
                emotions through art.
              </p>
              <div className="about-stats" aria-label="Experience highlights">
                <div><strong>30+</strong><span>years teaching art</span></div>
                <div><strong>2</strong><span>countries shaping her practice</span></div>
                <div><strong>All</strong><span>skill levels welcomed</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="experience-section section-shell" aria-labelledby="experience-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Practice &amp; experience</p>
              <h2 id="experience-title">A life in art and education.</h2>
            </div>
          </div>
          <div className="timeline">
            <article>
              <time>2009—Now</time>
              <h3>Private art classes</h3>
              <p>Drawing and painting instruction for children and adults in Toronto.</p>
            </article>
            <article>
              <time>2011</time>
              <h3>Set design</h3>
              <p>Designed the visual environment for the short film <em>Breakfast</em>.</p>
            </article>
            <article>
              <time>2007—2009</time>
              <h3>Montessori education</h3>
              <p>Co-teacher and later head teacher at Forest Grove Montessori Pre-school.</p>
            </article>
            <article>
              <time>2004—2005</time>
              <h3>Guest artist</h3>
              <p>Printmaking demonstrations in lithography and etching at Sheridan College.</p>
            </article>
          </div>
        </section>

        <section className="classes-section" id="classes">
          <div className="section-shell">
            <div className="section-heading light">
              <div>
                <p className="eyebrow">Art classes</p>
                <h2>Learn the skills.<br />Find your expression.</h2>
              </div>
              <p>
                Work with pencil, charcoal, ink and oil paint. Choose subjects
                that interest you and receive individual guidance, group
                instruction and constructive critique.
              </p>
            </div>

            <div className="class-cards">
              <article className="class-card featured">
                <span className="class-label">Adults &amp; Teens</span>
                <h3>Studio Foundations</h3>
                <p>For ages 14+ · All skill levels</p>
                <div className="class-details">
                  <span><strong>6</strong> sessions</span>
                  <span><strong>2</strong> hours each</span>
                  <span><strong>$300</strong> course</span>
                </div>
                <a href="mailto:nilou@nilouafshar.com?subject=Adult%20art%20class%20enquiry">
                  Ask about a place <Arrow />
                </a>
              </article>
              <article className="class-card">
                <span className="class-label">Children</span>
                <h3>Creative Foundations</h3>
                <p>For ages 6–13 · Supportive small-group learning</p>
                <div className="class-details">
                  <span><strong>6</strong> sessions</span>
                  <span><strong>1.5</strong> hours each</span>
                  <span><strong>$250</strong> course</span>
                </div>
                <a href="mailto:nilou@nilouafshar.com?subject=Children%27s%20art%20class%20enquiry">
                  Ask about a place <Arrow />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="testimonials-section section-shell" aria-labelledby="testimonials-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">From families</p>
              <h2 id="testimonials-title">Patience that makes confidence visible.</h2>
            </div>
          </div>
          <div className="testimonials-grid">
            <figure>
              <blockquote>
                A patient, structured approach that gave Kyle and Ethan a strong foundation.
              </blockquote>
              <figcaption>Parent of Kyle &amp; Ethan</figcaption>
            </figure>
            <figure>
              <blockquote>
                Close observation and thoughtful communication helped us support Thomas early.
              </blockquote>
              <figcaption>Thomas’s parent</figcaption>
            </figure>
            <figure>
              <blockquote>
                Chloe was excited to learn, and her confidence in making art grew every week.
              </blockquote>
              <figcaption>Chloe’s parent</figcaption>
            </figure>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Start a conversation</p>
              <h2>Make space<br />to create.</h2>
              <p>
                Ask about upcoming classes, private instruction or artwork.
                Nilou will reply by email.
              </p>
              <a className="direct-email" href="mailto:nilou@nilouafshar.com">
                nilou@nilouafshar.com <Arrow diagonal />
              </a>
            </div>
            <form className="contact-form" onSubmit={handleContact}>
              <label>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                <span>How can Nilou help?</span>
                <textarea name="message" rows={4} required />
              </label>
              <button className="button button-primary" type="submit">
                Prepare email <Arrow />
              </button>
              <small>Submitting opens your email app. Nothing is stored on this website.</small>
            </form>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="wordmark" href="#top">Nilou Afshar</a>
          <p>Artist &amp; educator · Toronto, Canada</p>
          <div>
            <a href="#works">Works</a>
            <a href="#classes">Classes</a>
            <a href="mailto:nilou@nilouafshar.com">Email</a>
          </div>
          <small>© {new Date().getFullYear()} Nilou Afshar</small>
        </div>
      </footer>

      {activeWork && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Artwork preview" onClick={() => setActiveWork(null)}>
          <button type="button" className="lightbox-close" aria-label="Close artwork preview" onClick={() => setActiveWork(null)}>×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activeWork.src} alt={activeWork.alt} />
            <figcaption>{activeWork.category} · Nilou Afshar</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
