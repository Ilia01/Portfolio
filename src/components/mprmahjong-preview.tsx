"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type Tile = {
  glyph: string;
  family: "bamboo" | "circle" | "character" | "wind";
  x: number;
  y: number;
  rot: number;
  delay: number;
};

const TILES: Tile[] = [
  { glyph: "東", family: "wind", x: 0, y: 18, rot: -6, delay: 0 },
  { glyph: "5", family: "bamboo", x: 70, y: 0, rot: 0, delay: 0.05 },
  { glyph: "中", family: "wind", x: 140, y: 36, rot: 4, delay: 0.1 },
  { glyph: "3", family: "circle", x: 35, y: 110, rot: 2, delay: 0.15 },
  { glyph: "9", family: "character", x: 110, y: 132, rot: -3, delay: 0.2 },
];

const FAMILY_ACCENT: Record<Tile["family"], string> = {
  wind: "#9a6f2c",
  bamboo: "#1f1b16",
  circle: "#1f1b16",
  character: "#9a6f2c",
};

const TILE_W = 68;
const TILE_H = 92;
const BOARD_BASE = 220;
const REPEL_RANGE = 230;
const REPEL_STRENGTH = 0.14;

type Props = {
  className?: string;
  compact?: boolean;
};

export function MprmahjongPreview({ className = "", compact = false }: Props) {
  const reduce = useReducedMotion();
  const scale = compact ? 1 : 1.25;
  const boardSize = BOARD_BASE * scale;

  const boardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    setInteractive(supportsHover && !reduce);
  }, [reduce]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current || !interactive) return;
    const rect = boardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      className={`relative ${className}`}
      aria-label="A small arrangement of Riichi mahjong tiles, representing the mprmahjong rebuild."
    >
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,_rgba(212,160,84,0.10)_0%,_transparent_70%)] pointer-events-none" />

      <div
        className="relative aspect-[4/5] sm:aspect-[5/6] w-full overflow-hidden rounded-2xl border border-rule/70 bg-paper/60"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={boardRef}
            className="relative"
            style={{ width: boardSize, height: boardSize }}
          >
            {TILES.map((tile, i) => (
              <MagneticTile
                key={i}
                tile={tile}
                scale={scale}
                accent={FAMILY_ACCENT[tile.family]}
                mouseX={mouseX}
                mouseY={mouseY}
                reduce={!!reduce}
              />
            ))}
          </div>
        </div>

        <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
          <span>mprmahjong.com</span>
          <span className="inline-flex items-center gap-2 text-amber/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber/60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            In progress
          </span>
        </div>
      </div>
    </div>
  );
}

type MagneticTileProps = {
  tile: Tile;
  scale: number;
  accent: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduce: boolean;
};

function MagneticTile({
  tile,
  scale,
  accent,
  mouseX,
  mouseY,
  reduce,
}: MagneticTileProps) {
  const tileW = TILE_W * scale;
  const tileH = TILE_H * scale;
  const cx = tile.x * scale + tileW / 2;
  const cy = tile.y * scale + tileH / 2;

  const targetX = useTransform([mouseX, mouseY], (latest) => {
    const [mx, my] = latest as [number, number];
    if (mx < -1000) return 0;
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const strength = Math.max(0, 1 - dist / REPEL_RANGE);
    return -(dx / dist) * strength * REPEL_RANGE * REPEL_STRENGTH;
  });
  const targetY = useTransform([mouseX, mouseY], (latest) => {
    const [mx, my] = latest as [number, number];
    if (mx < -1000) return 0;
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const strength = Math.max(0, 1 - dist / REPEL_RANGE);
    return -(dy / dist) * strength * REPEL_RANGE * REPEL_STRENGTH;
  });

  const springX = useSpring(targetX, {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
  });
  const springY = useSpring(targetY, {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
  });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        delay: tile.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: "absolute",
        left: tile.x * scale,
        top: tile.y * scale,
        width: tileW,
        height: tileH,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          x: springX,
          y: springY,
          rotate: tile.rot,
        }}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-[10px] bg-gradient-to-b from-[#f6f1e6] to-[#e6dfd0] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-2px_0_rgba(0,0,0,0.08)]" />
          <div className="absolute inset-[3px] rounded-[8px] border border-black/5 bg-[#fbf6ea]" />
          <div
            className="absolute inset-0 grid place-items-center font-serif text-2xl"
            style={{ color: accent }}
          >
            {tile.glyph}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
