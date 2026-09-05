"use client";

import { useState } from "react";

export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const el = document.createElement("textarea");
      el.value = command;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`copy-btn${copied ? " copied" : ""}`}
      onClick={copy}
      aria-label="Copy install command"
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}
