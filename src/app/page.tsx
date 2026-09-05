import Image from "next/image";
import Link from "next/link";
import MatrixWordmark from "@/components/MatrixWordmark";
import HeroTerminal from "@/components/HeroTerminal";
import CopyCommand from "@/components/CopyCommand";

const INSTALL_CMD = "curl -fsSL https://omarchy.org/install | bash";
const ISO_URL = "https://iso.omarchy.org/omarchy-4.0.2.iso";

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Manual", href: "https://omarchy.org/manual/" },
  { label: "ISO", href: ISO_URL, external: true },
  { label: "Plugins", href: "https://omarchyplugins.com/", external: true },
  { label: "GitHub", href: "https://github.com/omacom/omarchy", external: true },
  { label: "Security", href: "https://omarchy.org/security/" },
  { label: "News", href: "https://omarchy.org/news/" },
  { label: "Teams", href: "https://omarchy.org/teams/" },
  { label: "Patrons", href: "https://omarchy.org/patrons/" },
  { label: "Sponsorships", href: "https://omarchy.org/sponsorships/" },
  { label: "AIR", href: "https://omarchy.org/air/" },
  { label: "Discord", href: "https://discord.gg/tXFUdasqhY", external: true },
  { label: "Meetups", href: "https://omarchy.org/meetups/" },
  { label: "Donate", href: "https://donate.omarchy.org", external: true },
  { label: "Workstations", href: "https://omarchy.org/workstations/" },
  { label: "Merch", href: "https://supply.37signals.com/collections/omarchy", external: true },
];

const VIDEOS = [
  {
    id: "F7fe9pa8OeE",
    thumb: "/assets/video/omarchy-quattro.webp",
    title: "Omarchy Quattro",
    by: "David Heinemeier Hansson",
  },
  {
    id: "9SDkU5VDQEQ",
    thumb: "/assets/video/networkchuck.webp",
    title: "You need to switch to Linux RIGHT NOW!!",
    by: "NetworkChuck",
  },
  {
    id: "5JPYJfN7HY0",
    thumb: "/assets/video/typecraft.webp",
    title: "They finally fixed linux",
    by: "typecraft",
  },
  {
    id: "qBKMe8AatY0",
    thumb: "/assets/video/linuxbtw.webp",
    title: "I Didn't Expect Omarchy 4 to Be This Good",
    by: "LinuxBTW",
  },
  {
    id: "KO2T0oET9go",
    thumb: "/assets/video/alex-finn.webp",
    title: "If you use AI, switch to Omarchy immediately",
    by: "Alex Finn",
  },
];

export default function Home() {
  return (
    <>
      {/* ================= announcement banner ================= */}
      <a
        className="banner"
        href="https://omarchy.org/news/2026/08/omacom-foundation-launches-with-8-million"
      >
        <span className="banner-tag">news</span>
        Omacom Foundation launches with $14.95 million
        <span className="banner-arrow">→</span>
      </a>

      {/* ================= header ================= */}
      <header className="header">
        <div className="wrap header-inner">
          <Link href="/" className="brand">
            <Image
              className="brand-logo"
              src="/brand/omarchy-logo.svg"
              alt="Omarchy logo"
              width={30}
              height={30}
              priority
            />
            <Image
              className="brand-wordmark"
              src="/brand/omarchy-wordmark.svg"
              alt="Omarchy wordmark"
              width={130}
              height={30}
              priority
            />
          </Link>

          <nav className="nav">
            <a href="https://omarchy.org/manual/">manual</a>
            <a href="#videos">videos</a>
            <a href="https://omarchy.org/workstations/">workstations</a>
            <a href="https://discord.gg/tXFUdasqhY" target="_blank" rel="noreferrer">
              discord
            </a>
          </nav>

          <div className="header-actions">
            <a
              className="btn btn-ghost"
              href="https://github.com/omacom/omarchy"
              target="_blank"
              rel="noreferrer"
            >
              github ↗
            </a>
            <a className="btn btn-green" href={ISO_URL}>
              download iso
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ================= hero ================= */}
        <section className="hero hero-center">
          <div className="wrap">
            <MatrixWordmark />

            <h1>
              Beautiful, Fun &amp; Agentic Linux by{" "}
              <a
                className="hero-dhh"
                href="https://dhh.dk"
                target="_blank"
                rel="noreferrer"
              >
                DHH
              </a>
            </h1>
            <p className="hero-sub">
              The malleable OS for the age of agents. Where you can vibe your
              way through every alteration, tweak, and desire.{" "}
              <a
                className="hero-omarch"
                href="https://omarchs.fyi"
                target="_blank"
                rel="noreferrer"
              >
                Be the Omarch
              </a>{" "}
              and command your agent!
            </p>

            <div className="hero-cta hero-cta-center">
              <a className="btn btn-green" href={ISO_URL}>
                download omarchy 4.0.2
              </a>
              <a
                className="btn btn-ghost"
                href="https://github.com/omacom/omarchy"
                target="_blank"
                rel="noreferrer"
              >
                star on github ↗
              </a>
              <a className="btn btn-ghost" href="https://omarchy.org/manual/">
                read the manual →
              </a>
            </div>

            <div className="hero-keys">
              <span className="key">h</span>
              <span className="key">j</span>
              <span className="key">k</span>
              <span className="key">l</span>
              <span className="sep">to move around</span>
              <span className="sep">·</span>
              <span className="key">:wq</span>
              <span className="sep">to ship it</span>
            </div>
          </div>
        </section>

        {/* ================= quick links ================= */}
        <section className="section section-tight">
          <div className="wrap">
            <div className="links-grid">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  className="link-tile"
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label}
                  {link.external && <span className="tile-ext">↗</span>}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= install ================= */}
        <section className="section" id="install">
          <div className="wrap install">
            <HeroTerminal />

            <div className="split-copy">
              <div className="section-head" style={{ marginBottom: 0 }}>
                <div className="eyebrow">// from iso to omarchy</div>
                <h2>
                  One command. <span className="accent">Zero yak-shaving</span>.
                </h2>
              </div>
              <p>
                Omarchy turns a fresh Arch install into a fully-configured
                Hyprland desktop — terminal, editor, agents — with a single
                script. Grab the ISO, boot it, run the line, and log into a
                machine that already works like you think.
              </p>

              <div className="commandbox" style={{ marginTop: "1.4rem" }}>
                <div className="commandbox-bar">
                  <span>install</span>
                  <CopyCommand command={INSTALL_CMD} />
                </div>
                <div className="commandbox-body">
                  <span className="prompt">$ </span>
                  {INSTALL_CMD}
                </div>
              </div>

              <div className="install-links">
                <a className="btn btn-green" href={ISO_URL}>
                  download the iso
                </a>
                <a className="btn btn-ghost" href="https://omarchy.org/manual/">
                  full manual →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= videos ================= */}
        <section className="section" id="videos">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">// on youtube</div>
              <h2>
                Omarchy <span className="accent">in the wild</span>.
              </h2>
            </div>

            <div className="video-grid">
              {VIDEOS.map((video) => (
                <a
                  key={video.id}
                  className="video-card"
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="video-thumb">
                    <Image
                      src={video.thumb}
                      alt={`${video.title} by ${video.by}`}
                      width={640}
                      height={360}
                      priority
                    />
                    <span className="video-play">▶</span>
                  </div>
                  <h3>{video.title}</h3>
                  <span className="video-by">{video.by}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= partners ================= */}
        <section className="section section-tight">
          <div className="wrap">
            <div className="partner-strip">
              <p>
                Looking to become a partner or patron of Omarchy? Write{" "}
                <a className="partner-mail" href="mailto:david@omarchy.org">
                  david@omarchy.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ================= footer ================= */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand">
                <Image
                  className="brand-logo"
                  src="/brand/omarchy-logo.svg"
                  alt="Omarchy logo"
                  width={30}
                  height={30}
                />
                <Image
                  className="brand-wordmark"
                  src="/brand/omarchy-wordmark.svg"
                  alt="Omarchy wordmark"
                  width={130}
                  height={30}
                />
              </div>
              <p>
                Beautiful, fun &amp; agentic Linux. An opinionated Arch +
                Hyprland setup, in the spirit of omakase: trust the chef, keep
                the vibes.
              </p>
            </div>

            <div>
              <h5>project</h5>
              <ul>
                <li>
                  <a href="https://omarchy.org/manual/">manual</a>
                </li>
                <li>
                  <a href={ISO_URL}>iso 4.0.2</a>
                </li>
                <li>
                  <a href="https://omarchyplugins.com/" target="_blank" rel="noreferrer">
                    plugins
                  </a>
                </li>
                <li>
                  <a href="https://omarchy.org/security/">security</a>
                </li>
                <li>
                  <a href="https://omarchy.org/news/">news</a>
                </li>
              </ul>
            </div>

            <div>
              <h5>community</h5>
              <ul>
                <li>
                  <a href="https://discord.gg/tXFUdasqhY" target="_blank" rel="noreferrer">
                    discord
                  </a>
                </li>
                <li>
                  <a href="https://omarchy.org/meetups/">meetups</a>
                </li>
                <li>
                  <a href="https://omarchy.org/teams/">teams</a>
                </li>
                <li>
                  <a href="https://donate.omarchy.org" target="_blank" rel="noreferrer">
                    donate
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5>elsewhere</h5>
              <ul>
                <li>
                  <a href="https://github.com/omacom/omarchy" target="_blank" rel="noreferrer">
                    github
                  </a>
                </li>
                <li>
                  <a href="https://omarchy.org/" target="_blank" rel="noreferrer">
                    omarchy.org ↗
                  </a>
                </li>
                <li>
                  <a href="https://dhh.dk" target="_blank" rel="noreferrer">
                    dhh.dk
                  </a>
                </li>
                <li>
                  <a href="https://omarchy.org/brand/" target="_blank" rel="noreferrer">
                    brand assets
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-note">
            <span>
              incubated at{" "}
              <a href="https://37signals.com" target="_blank" rel="noreferrer">
                37signals
              </a>{" "}
              (makers of{" "}
              <a href="https://basecamp.com" target="_blank" rel="noreferrer">
                Basecamp
              </a>{" "}
              and{" "}
              <a href="https://hey.com" target="_blank" rel="noreferrer">
                HEY
              </a>
              )
            </span>
            <span>
              sponsored hosting by{" "}
              <a href="https://cloudflare.com" target="_blank" rel="noreferrer">
                Cloudflare
              </a>
            </span>
            <span>
              <a href="https://omarchy.org/brand/" target="_blank" rel="noreferrer">
                Omarchy is a pending trademark
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
