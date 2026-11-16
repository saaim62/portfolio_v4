import Gallery from '../components/Gallery';
import TopBar from '../components/TopBar';
import BackdropFX from '../components/BackdropFX';
import {
  profile,
  stats,
  droproute,
  cmh,
  experience,
  projects,
  skillGroups,
  devops,
  education,
  seoNote,
} from '../data/content';

const PHONE_PROJECTS = new Set(['Seated', 'Connectavo', 'Harvest Yard']);

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-40">
      <p className="eyebrow">Lahore, Pakistan · Open to remote roles worldwide</p>
      <h1 className="mt-4 font-display text-5xl font-bold leading-[1.04] text-white sm:text-7xl">
        Saim <span className="gold-text">Asif</span>
      </h1>
      <p className="mt-4 font-display text-lg font-medium text-cream sm:text-2xl">{profile.title}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-[15px]">{profile.tagline}</p>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/90 sm:text-lg">{profile.summary}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#work" className="btn-gold px-6 py-3">See the live work</a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3 text-cream">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3 text-cream">LinkedIn</a>
        <a href={`mailto:${profile.email}`} className="btn-ghost px-5 py-3 text-cream">{profile.email}</a>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="glass-soft p-4">
            <div className="font-display text-2xl font-bold text-gold-bright">{s.value}</div>
            <div className="mt-1 text-[11px] leading-snug text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-muted">{sub}</p>}
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
    </div>
  );
}

function MetricRow({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <div className={`grid gap-3 ${metrics.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
      {metrics.map((m) => (
        <div key={m.label} className="glass-soft p-4 text-center">
          <div className="font-display text-xl font-bold text-gold-bright">{m.value}</div>
          <div className="mt-1 text-[11px] leading-snug text-muted">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24 sm:px-6">
      <SectionHead eyebrow="Featured work" title="Products I built and run" />
      <div className="glass p-6 sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-3xl font-bold text-white">{droproute.name}</h3>
              <span className="chip chip-gold">{droproute.badge}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {droproute.role} · {droproute.dates}
            </p>
          </div>
          <div className="flex gap-2">
            <a href={droproute.live} target="_blank" rel="noreferrer" className="btn-gold px-4 py-2 text-sm">{droproute.liveLabel}</a>
            <a href={droproute.repo} target="_blank" rel="noreferrer" className="btn-ghost px-4 py-2 text-sm text-cream">Code</a>
          </div>
        </div>
        <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-cream/90">{droproute.intro}</p>
        <div className="mt-6">
          <Gallery images={droproute.images} />
        </div>
        <ul className="mt-6 space-y-2.5">
          {droproute.bullets.map((b) => (
            <li key={b.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <MetricRow metrics={droproute.metrics} />
        </div>
        <p className="mt-5 text-xs text-faint">
          Screenshots show the live product in public demo mode — sample data, every screen functional. Live at{' '}
          <a href={droproute.live} target="_blank" rel="noreferrer" className="text-gold underline">droproute.duckdns.org</a>
        </p>
      </div>

      <div className="glass mt-6 p-6 sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-bold text-white">{cmh.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {cmh.role} · {cmh.dates}
            </p>
            <p className="mt-2 text-xs font-semibold tracking-wide text-gold">{cmh.badge}</p>
          </div>
          <a href={cmh.live} target="_blank" rel="noreferrer" className="btn-gold px-4 py-2 text-sm">{cmh.liveLabel}</a>
        </div>
        <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-cream/90">{cmh.intro}</p>
        <ul className="mt-5 space-y-2.5">
          {cmh.bullets.map((b) => (
            <li key={b.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <Gallery images={cmh.images} />
        </div>
        <div className="mt-7">
          <MetricRow metrics={cmh.metrics} />
        </div>
        <p className="mt-5 text-xs text-faint">
          Screenshots from the live platform (my own test organization — no client data). The platform itself is login-gated for patient-data protection — it runs live at{' '}
          <a href={cmh.live} target="_blank" rel="noreferrer" className="text-gold underline">app.casemanagementhub.org</a>
        </p>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24 sm:px-6">
      <SectionHead eyebrow="Experience" title="Where I have worked" />
      <div className="space-y-4">
        {experience.map((job) => (
          <article key={job.company} className="glass p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold text-white">
                {job.company} <span className="text-sm font-medium text-gold">· {job.role}</span>
              </h3>
              <p className="text-xs font-semibold tracking-wide text-muted">
                {job.dates} · {job.place}
              </p>
            </div>
            <ul className="mt-3 space-y-2">
              {job.points.map((p) => (
                <li key={p.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {job.link && (
              <a href={job.link.href} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-gold hover:underline">
                {job.link.label} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24 sm:px-6">
      <SectionHead
        eyebrow="More products"
        title="Apps in production"
        sub="Client and freelance products — most are live on Google Play and the App Store today."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p) => (
          <article key={p.name} className="glass flex flex-col p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
              {p.link && (
                <a href={p.link.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-gold hover:underline">
                  {p.link.label} ↗
                </a>
              )}
            </div>
            <p className="mt-0.5 text-xs font-semibold tracking-wide text-cyanx">{p.kind}</p>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.blurb}</p>
            {p.images && PHONE_PROJECTS.has(p.name) && (
              <div className="mt-5 grid grid-cols-3 gap-2">
                {p.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="shot aspect-[9/16] w-full object-cover object-top" />
                ))}
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24 sm:px-6">
      <SectionHead eyebrow="Technical skills" title="The stack I ship with" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.title} className="glass-soft p-5">
            <h3 className="font-display text-[15px] font-semibold text-gold-bright">{g.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{g.items}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-6 p-6 sm:p-8">
        <p className="eyebrow">DevOps & Infrastructure</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">Servers, CI/CD, security — owned end to end</h3>
        <ul className="mt-4 space-y-2.5">
          {devops.map((d) => (
            <li key={d.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="glass-soft p-5">
          <h3 className="font-display text-[15px] font-semibold text-gold-bright">Education</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {education.degree}
            <br />
            {education.school}
            <br />
            {education.detail}
          </p>
        </div>
        <div className="glass-soft p-5">
          <h3 className="font-display text-[15px] font-semibold text-gold-bright">Where it started</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="text-cream">{seoNote.role}</span> — {seoNote.text}
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-24 pt-24 sm:px-6">
      <div className="glass p-8 text-center sm:p-12">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Have a product to build? <span className="gold-text">Let&apos;s talk.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          I take on senior full-stack and team-lead roles, remote-first. The fastest way to judge my work is the
          work itself — DropRoute and Case Management Hub are both live above.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn-gold px-6 py-3">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3 text-cream">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3 text-cream">LinkedIn</a>
          <a href={profile.resume} className="btn-ghost px-5 py-3 text-cream">Download résumé (PDF)</a>
        </div>
        <p className="mt-6 text-xs text-faint">{profile.location} · Working with teams worldwide since 2019</p>
      </div>
      <p className="mt-8 text-center text-xs text-faint">
        © 2026 Saim Asif — Built with Next.js. Design language shared with DropRoute: black marble, glass, gold.
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <BackdropFX />
      <TopBar />
      <Hero />
      <FeaturedWork />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
