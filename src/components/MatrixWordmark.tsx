"use client";

import { useCallback, useEffect, useRef } from "react";

const ART = `
                 ▄▄▄
 ▄█████▄    ▄███████████▄    ▄███████   ▄███████   ▄███████   ▄█   █▄    ▄█   █▄
███   ███  ███   ███   ███  ███   ███  ███   ███  ███   ███  ███   ███  ███   ███
███   ███  ███   ███   ███  ███   ███  ███   ███  ███   █▀   ███   ███  ███   ███
███   ███  ███   ███   ███ ▄███▄▄▄███ ▄███▄▄▄██▀  ███       ▄███▄▄▄███▄ ███▄▄▄███
███   ███  ███   ███   ███ ▀███▀▀▀███ ▀███▀▀▀▀    ███      ▀▀███▀▀▀███  ▀▀▀▀▀▀███
███   ███  ███   ███   ███  ███   ███ ██████████  ███   █▄   ███   ███  ▄██   ███
███   ███  ███   ███   ███  ███   ███  ███   ███  ███   ███  ███   ███  ███   ███
 ▀█████▀    ▀█   ███   █▀   ███   █▀   ███   ███  ███████▀   ███   █▀    ▀█████▀
                                       ███   █▀
`;

const GLYPHS =
  "01αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΘΛΞΠΣΦΨΩ¦│─═";

const HEAD_COLOR = "rgba(180, 249, 248, 0.95)";
const HEAD_GLOW = "0 0 9px rgba(180, 249, 248, 0.9)";
const WALL_COLOR = "rgba(158, 206, 106, 0.32)"; // dim scrambled wall
const FLASH_COLOR = "rgba(180, 249, 248, 1)";
const FLASH_GLOW = "0 0 12px rgba(180, 249, 248, 0.9)";
const TICK = 66; // ms per frame — deliberately stepped, like a real CRT
const RAIN_END = 1500; // new drops stop spawning after this
const RESOLVE_START = 1100; // columns start locking into the wordmark
const DURATION = 2600; // animation fully settled

const rand = (min: number, max?: number) =>
  max === undefined
    ? Math.floor(Math.random() * min)
    : min + Math.floor(Math.random() * (max - min));
const glyph = () => GLYPHS[rand(GLYPHS.length)];

type Drop = { col: number; head: number; speed: number; tail: number };

export default function MatrixWordmark() {
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lines = ART.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const cols = Math.max(...lines.map((l) => l.length));
  const rows = lines.length;

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const play = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();

    const cells = cellRefs.current;
    const originals = cells.map((el) => el?.textContent ?? "");
    const drops: Drop[] = [];
    const flashing: number[] = [];
    let elapsed = 0;
    let resolved = 0;

    const setStyle = (i: number, ch: string | null, color: string, glow: string) => {
      const el = cells[i];
      if (!el) return;
      if (ch !== null) el.textContent = ch;
      el.style.color = color;
      el.style.textShadow = glow;
    };

    const resetCell = (i: number) => setStyle(i, originals[i], "", "");

    // phase 0: the whole block dissolves into a dim matrix wall
    for (let i = 0; i < originals.length; i++) {
      if (!cells[i]) continue;
      setStyle(i, glyph(), WALL_COLOR, "none");
    }

    const scrambleCell = (i: number) => setStyle(i, glyph(), WALL_COLOR, "none");

    // pre-seed: many columns start cascading immediately
    const maxDrops = Math.floor(cols * 1.2);
    for (let b = 0; b < cols >> 1; b++) {
      drops.push({
        col: rand(cols),
        head: -rand(0, rows),
        speed: 1 + rand(0, 2),
        tail: 4 + rand(0, 6),
      });
    }

    const paint = (r: number, c: number, ch: string, color: string, glow = "none") => {
      if (c < resolved) return;
      setStyle(r * cols + c, ch, color, glow);
    };

    timerRef.current = setInterval(() => {
      elapsed += TICK;

      // cool down flashes from the previous tick
      while (flashing.length) resetCell(flashing.pop() as number);

      // spawn falling drops while it rains — usually two per tick for density
      if (elapsed < RAIN_END) {
        const burst = Math.random() < 0.5 ? 2 : 1;
        for (let b = 0; b < burst && drops.length < maxDrops; b++) {
          drops.push({
            col: rand(cols),
            head: -rand(0, 9),
            speed: 1 + rand(0, 2),
            tail: 4 + rand(0, 6),
          });
        }
      }

      for (let d = drops.length - 1; d >= 0; d--) {
        const drop = drops[d];
        if (drop.col < resolved) {
          drops.splice(d, 1);
          continue;
        }
        for (let k = 0; k < drop.speed; k++) {
          drop.head++;
          const r = drop.head;
          if (r >= 0 && r < rows) {
            paint(r, drop.col, glyph(), HEAD_COLOR, HEAD_GLOW);
            for (let t = 1; t <= drop.tail; t++) {
              const rt = r - t;
              if (rt < 0 || rt >= rows) continue;
              paint(
                rt,
                drop.col,
                glyph(),
                `rgba(158, 206, 106, ${(0.85 - t * (0.8 / drop.tail)).toFixed(2)})`
              );
            }
          }
          // behind the tail the wall returns to its scrambled state
          const behind = r - drop.tail - 1;
          if (behind >= 0 && behind < rows) scrambleCell(behind * cols + drop.col);
        }
        if (drop.head - drop.tail > rows) drops.splice(d, 1);
      }

      // sweep columns left to right: the wall locks into the OMARCHY wordmark
      if (elapsed >= RESOLVE_START) {
        const target = Math.min(
          cols,
          Math.floor(
            ((elapsed - RESOLVE_START) / (DURATION - 400 - RESOLVE_START)) * cols * 1.05
          )
        );
        while (resolved < target) {
          const c = resolved++;
          for (let r = 0; r < rows; r++) {
            const i = r * cols + c;
            if (!cells[i]) continue;
            setStyle(i, originals[i], FLASH_COLOR, FLASH_GLOW);
            flashing.push(i);
          }
        }
      }

      if (elapsed >= DURATION) {
        for (let i = 0; i < originals.length; i++) resetCell(i);
        stop();
      }
    }, TICK);
  }, [cols, rows, stop]);

  useEffect(() => {
    const t = setTimeout(play, 600);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [play, stop]);

  return (
    <pre className="ascii" aria-hidden="true" title="replay" onClick={play}>
      {lines.map((line, r) => (
        <span key={r} style={{ display: "block" }}>
          {[...line].map((ch, c) => (
            <span
              key={c}
              ref={(el) => {
                cellRefs.current[r * cols + c] = el;
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </pre>
  );
}
