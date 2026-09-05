"use client";

import { useEffect, useRef, useState } from "react";

type Line = {
  kind: "cmd" | "out" | "ok" | "info";
  html: string;
};

const SCRIPT: Line[] = [
  { kind: "cmd", html: '<span class="prompt">$</span> curl <span class="flag">-fsSL</span> https://omarchy.org/install <span class="flag">|</span> bash' },
  { kind: "info", html: '<span class="info">:: Omarchy 4.0.2</span> <span class="out">— opinionated Arch + Hyprland</span>' },
  { kind: "out", html: '<span class="out">==&gt; installing</span> <span class="info">hyprland</span> <span class="out">·</span> <span class="info">waybar</span> <span class="out">·</span> <span class="info">foot</span> <span class="out">·</span> <span class="info">lazyvim</span>' },
  { kind: "out", html: '<span class="out">:: wiring vim motions across the desktop</span>' },
  { kind: "ok", html: '<span class="ok">✓ done. welcome, omarch.</span>' },
];

const TYPE_MS = 26;
const LINE_PAUSE = 420;

export default function HeroTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skip) return;

    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= SCRIPT.length) {
        setDone(true);
        return;
      }

      const { kind, html } = SCRIPT[line];

      if (kind === "cmd") {
        const plain = html.replace(/<[^>]+>/g, "");
        if (char <= plain.length) {
          setCurrent(plain.slice(0, char));
          char++;
          timer = setTimeout(tick, TYPE_MS);
        } else {
          setLines((prev) => [...prev, html]);
          setCurrent("");
          line++;
          char = 0;
          timer = setTimeout(tick, LINE_PAUSE);
        }
      } else {
        setLines((prev) => [...prev, html]);
        line++;
        timer = setTimeout(tick, LINE_PAUSE);
      }
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [skip]);

  useEffect(() => {
    if (!done) return;
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, current, done]);

  const renderCurrent = () => {
    if (done) return null;
    const { kind } = SCRIPT[lines.length] ?? SCRIPT[0];
    if (kind !== "cmd") return null;
    return (
      <div>
        {current}
        <span className="cursor" />
      </div>
    );
  };

  return (
    <div className="terminal" onClick={() => !done && setSkip(true)}>
      <div className="terminal-bar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-title">omarch@night — zsh</span>
      </div>
      <div className="terminal-body" ref={ref}>
        {lines.map((html, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
        {done && (
          <div>
            <span className="prompt">$</span> <span className="cursor" />
          </div>
        )}
        {renderCurrent()}
      </div>
    </div>
  );
}
