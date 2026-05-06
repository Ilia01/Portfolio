"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type Option<T extends string> = Readonly<{ value: T; label: string }>;

function numberColor(isSelected: boolean, isHovered: boolean) {
  if (isSelected) return "text-amber";
  if (isHovered) return "text-cream";
  return "text-stone";
}

type Props<T extends string> = Readonly<{
  id: string;
  value: T;
  onChange: (v: T) => void;
  options: ReadonlyArray<Option<T>>;
  error?: string;
}>;

export function SelectField<T extends string>({
  id,
  value,
  onChange,
  options,
  error,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedLabel = options[selectedIndex]?.label ?? "";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const close = () => {
    setOpen(false);
    setHovered(-1);
  };

  const commit = (i: number) => {
    if (i < 0 || i >= options.length) return;
    onChange(options[i].value);
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "Tab") {
      if (open) close();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHovered(selectedIndex < 0 ? 0 : selectedIndex);
        return;
      }
      commit(hovered);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHovered(selectedIndex < 0 ? 0 : selectedIndex);
        return;
      }
      setHovered((h) => Math.min(h + 1, options.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHovered(selectedIndex < 0 ? 0 : selectedIndex);
        return;
      }
      setHovered((h) => Math.max(h - 1, 0));
    }
  };

  const borderClass = error
    ? "border-red-400/60"
    : open
      ? "border-amber"
      : "border-rule hover:border-stone";

  return (
    <div ref={wrapRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={`w-full bg-transparent border-0 border-b ${borderClass} py-2 pr-8 text-left text-cream font-sans focus:outline-none focus:border-amber transition-colors flex items-center justify-between gap-2`}
      >
        <span className={selectedLabel ? "" : "text-ash"}>
          {selectedLabel || "Select…"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-ash shrink-0"
          aria-hidden
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-listbox`}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-2 z-50 border border-rule/80 bg-paper/95 backdrop-blur-md rounded-md shadow-2xl shadow-black/50 overflow-hidden origin-top"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isHovered = i === hovered;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => commit(i)}
                  className={`relative flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer transition-colors text-sm ${
                    isHovered
                      ? "bg-amber/10 text-cream"
                      : "text-stone hover:text-cream"
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId={`${id}-hover-bar`}
                      className="absolute left-0 top-0 bottom-0 w-px bg-amber"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[11px] tabular-nums tracking-[0.1em] ${numberColor(isSelected, isHovered)}`}
                    >
                      0{i + 1}
                    </span>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-amber shrink-0" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
