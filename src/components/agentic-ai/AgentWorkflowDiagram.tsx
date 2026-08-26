"use client";

import { useReducedMotion } from "framer-motion";

// A 3D agent workflow. The graph lives in real (x, y, z) space and is tilted
// toward the camera, so the three tool calls fan out in DEPTH rather than
// vertically: one sits behind the plane, one on it, one in front. Everything
// — node size, path curvature, particle size, shadow spread — derives from
// that projection, which is what makes it read as dimensional rather than as
// a flat diagram with shadows painted on.
//
// Pure SVG. No 3D library, no WebGL, no extra bytes on the bundle.
//
// NOTE on stroke gradients: they must be gradientUnits="userSpaceOnUse".
// With the default objectBoundingBox, a path with a zero-height bounding box
// (any perfectly horizontal line) makes the gradient degenerate and the
// browser renders no stroke at all.

const CX = 310;
const CY = 185;
const TILT = (33 * Math.PI) / 180; // camera pitch
const FOCAL = 900; // smaller = stronger perspective

interface P3 {
  x: number;
  y: number;
  z: number;
}
interface P2 {
  x: number;
  y: number;
  s: number; // projected scale — 1 at the origin plane
  depth: number; // higher = nearer the camera
}

function project({ x, y, z }: P3): P2 {
  const yr = y * Math.cos(TILT) + z * Math.sin(TILT);
  const depth = -y * Math.sin(TILT) + z * Math.cos(TILT);
  const s = FOCAL / (FOCAL - depth);
  return { x: CX + x * s, y: CY + yr * s, s, depth };
}

interface Node {
  id: string;
  p: P3;
  r: number;
  label: string;
  variant: "endpoint" | "hub" | "tool";
  ping: number; // when it lights up, as a fraction of the cycle
}

// Tools fan along z — back, middle, front — instead of up and down.
const nodes: Node[] = [
  { id: "input", p: { x: -190, y: 0, z: 0 }, r: 27, label: "Request", variant: "endpoint", ping: 0.02 },
  { id: "agent", p: { x: -56, y: 0, z: 0 }, r: 46, label: "Agent", variant: "hub", ping: 0.21 },
  { id: "tool1", p: { x: 88, y: 0, z: -120 }, r: 27, label: "Retrieve", variant: "tool", ping: 0.49 },
  { id: "tool2", p: { x: 102, y: 0, z: 0 }, r: 27, label: "Tool call", variant: "tool", ping: 0.45 },
  { id: "tool3", p: { x: 88, y: 0, z: 120 }, r: 27, label: "Notify", variant: "tool", ping: 0.51 },
  { id: "output", p: { x: 228, y: 0, z: 0 }, r: 31, label: "Response", variant: "endpoint", ping: 0.82 },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>;
const proj = Object.fromEntries(nodes.map((n) => [n.id, project(n.p)])) as Record<string, P2>;

const lerp3 = (a: P3, b: P3, t: number): P3 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
});

// Quadratic bezier evaluated in 3D, then each sample projected — so the curve
// bends through space, not across the screen.
function qbez(a: P3, c: P3, b: P3, t: number): P3 {
  return lerp3(lerp3(a, c, t), lerp3(c, b, t), t);
}

const SAMPLES = 26;

function buildFlow(fromId: string, toId: string, bow: number) {
  const A = byId[fromId];
  const B = byId[toId];
  // Trim to the sphere surfaces so nothing tucks under a node.
  const dir = { x: B.p.x - A.p.x, y: 0, z: B.p.z - A.p.z };
  const len = Math.hypot(dir.x, dir.z) || 1;
  const a: P3 = { x: A.p.x + (dir.x / len) * A.r, y: 0, z: A.p.z + (dir.z / len) * A.r };
  const b: P3 = { x: B.p.x - (dir.x / len) * B.r, y: 0, z: B.p.z - (dir.z / len) * B.r };
  // Bow the curve out through z, and lift it slightly off the floor plane.
  const c: P3 = {
    x: (a.x + b.x) / 2,
    y: -Math.abs(bow) * 0.16,
    z: (a.z + b.z) / 2 + bow,
  };

  const pts: P2[] = [];
  for (let i = 0; i <= SAMPLES; i++) pts.push(project(qbez(a, c, b, i / SAMPLES)));
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  // Scale at five points along the run, so a travelling particle can grow and
  // shrink with its distance from the camera.
  const scales = [0, 0.25, 0.5, 0.75, 1].map(
    (t) => project(qbez(a, c, b, t)).s
  );
  return { d, scales };
}

interface Flow {
  id: string;
  d: string;
  scales: number[];
  start: number;
  end: number;
}

const flows: Flow[] = [
  { id: "in-agent", ...buildFlow("input", "agent", 0), start: 0.02, end: 0.2 },
  { id: "agent-tool1", ...buildFlow("agent", "tool1", -58), start: 0.28, end: 0.48 },
  { id: "agent-tool2", ...buildFlow("agent", "tool2", 0), start: 0.26, end: 0.44 },
  { id: "agent-tool3", ...buildFlow("agent", "tool3", 58), start: 0.3, end: 0.5 },
  { id: "tool1-out", ...buildFlow("tool1", "output", -52), start: 0.58, end: 0.78 },
  { id: "tool2-out", ...buildFlow("tool2", "output", 0), start: 0.56, end: 0.74 },
  { id: "tool3-out", ...buildFlow("tool3", "output", 52), start: 0.6, end: 0.8 },
];

// Orbit ring around the hub, drawn in the xz-plane so perspective turns it
// into a tilted ellipse.
function ring(cx: number, cz: number, radius: number) {
  const pts: P2[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    pts.push(project({ x: cx + radius * Math.cos(t), y: 0, z: cz + radius * Math.sin(t) }));
  }
  return pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
}
const HUB_RING = ring(byId.agent.p.x, byId.agent.p.z, 72);

// Floor grid — the strongest depth cue in the whole picture.
const floorLines: string[] = [];
for (let z = -164; z <= 164; z += 66) {
  const a = project({ x: -250, y: 0, z });
  const b = project({ x: 285, y: 0, z });
  floorLines.push(`M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`);
}
for (let x = -250; x <= 285; x += 66.9) {
  const a = project({ x, y: 0, z: -164 });
  const b = project({ x, y: 0, z: 164 });
  floorLines.push(`M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`);
}

const CYCLE = "4.4s";
const clamp = (n: number) => Math.min(1, Math.max(0, Number(n.toFixed(3))));

const motionKeys = (f: Flow) => ({
  keyPoints: "0;0;1;1",
  keyTimes: `0;${clamp(f.start)};${clamp(f.end)};1`,
});

const fadeKeys = (f: Flow) => ({
  values: "0;0;1;1;0;0",
  keyTimes: `0;${clamp(Math.max(f.start - 0.01, 0.001))};${clamp(f.start + 0.02)};${clamp(
    f.end - 0.02
  )};${clamp(f.end + 0.02)};1`,
});

// Particle radius tracks its depth across the travel window.
const sizeKeys = (f: Flow) => {
  const base = 4;
  const inner = f.scales.map((s) => (base * s).toFixed(2));
  return {
    values: `${inner[0]};${inner.join(";")};${inner[4]}`,
    keyTimes: `0;${clamp(f.start)};${clamp(f.start + (f.end - f.start) * 0.25)};${clamp(
      f.start + (f.end - f.start) * 0.5
    )};${clamp(f.start + (f.end - f.start) * 0.75)};${clamp(f.end)};1`,
  };
};

export default function AgentWorkflowDiagram() {
  const reduced = useReducedMotion();
  // Paint far-to-near so nearer spheres genuinely occlude what is behind them.
  const ordered = [...nodes].sort((a, b) => proj[a.id].depth - proj[b.id].depth);

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <svg
        // cropped to the projected content — the old 0 0 620 380 box left 81px
        // of dead space above the scene and 61px below, which made the whole
        // diagram render small inside its column
        viewBox="67 76 528 247"
        className="h-auto w-full"
        role="img"
        aria-label="A three-dimensional agent workflow: a request reaches the agent, which fans out to retrieval, tool and notification services arranged in depth, and their results converge into a response."
      >
        <defs>
          {/* sphere shading: offset highlight, dark terminator */}
          <radialGradient id="awdHub" cx="34%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#C9C2FF" />
            <stop offset="42%" stopColor="#7C6CF6" />
            <stop offset="100%" stopColor="#3B2FA8" />
          </radialGradient>
          <radialGradient id="awdTool" cx="34%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#2A3348" />
            <stop offset="55%" stopColor="#141A28" />
            <stop offset="100%" stopColor="#080B12" />
          </radialGradient>
          <radialGradient id="awdFlash" cx="34%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#9FF0FA" />
            <stop offset="60%" stopColor="#4CD9E8" />
            <stop offset="100%" stopColor="#1D7F8C" />
          </radialGradient>
          <radialGradient id="awdShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="awdLine" gradientUnits="userSpaceOnUse" x1="120" y1="0" x2="538" y2="0">
            <stop offset="0%" stopColor="#7C6CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4CD9E8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="awdDash" gradientUnits="userSpaceOnUse" x1="120" y1="0" x2="538" y2="0">
            <stop offset="0%" stopColor="#9A8DFF" />
            <stop offset="100%" stopColor="#6FE4F0" />
          </linearGradient>

          <filter id="awdGlow" x="-140%" y="-140%" width="380%" height="380%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="awdSoft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" />
          </filter>

          {/* the floor fades out toward the horizon */}
          <linearGradient id="awdFloorFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
          </linearGradient>
          <mask id="awdFloorMask">
            <rect x="0" y="0" width="620" height="380" fill="url(#awdFloorFade)" />
          </mask>
        </defs>

        {/* ground plane */}
        <g mask="url(#awdFloorMask)" opacity="0.5">
          {floorLines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          ))}
        </g>

        {/* contact shadows on the floor */}
        {nodes.map((n) => {
          const p = proj[n.id];
          return (
            <ellipse
              key={`${n.id}-sh`}
              cx={p.x}
              cy={p.y + n.r * p.s * 0.92}
              rx={n.r * p.s * 1.15}
              ry={n.r * p.s * 0.34}
              fill="url(#awdShadow)"
            />
          );
        })}

        {/* connective paths */}
        {flows.map((f) => (
          <path key={f.id} d={f.d} fill="none" stroke="url(#awdLine)" strokeWidth="1.7" strokeLinecap="round" />
        ))}

        {!reduced &&
          flows.map((f) => (
            <path
              key={`${f.id}-dash`}
              d={f.d}
              fill="none"
              stroke="url(#awdDash)"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeDasharray="2 11"
              opacity="0.4"
            >
              <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1.7s" repeatCount="indefinite" />
            </path>
          ))}

        {/* hub orbit ring, behind the hub sphere */}
        <path d={HUB_RING} fill="none" stroke="#7C6CF6" strokeWidth="1.1" opacity="0.28" />
        {!reduced && (
          <circle r="3.4" fill="#8F82FF" filter="url(#awdGlow)">
            <animateMotion dur="7s" repeatCount="indefinite" path={HUB_RING} />
          </circle>
        )}

        {/* travelling requests */}
        {!reduced &&
          flows.map((f) => {
            const m = motionKeys(f);
            const o = fadeKeys(f);
            const z = sizeKeys(f);
            return (
              <circle key={`${f.id}-dot`} fill="#5EE7F5" filter="url(#awdGlow)">
                <animateMotion
                  dur={CYCLE}
                  repeatCount="indefinite"
                  calcMode="linear"
                  path={f.d}
                  keyPoints={m.keyPoints}
                  keyTimes={m.keyTimes}
                />
                <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values={o.values} keyTimes={o.keyTimes} />
                <animate attributeName="r" dur={CYCLE} repeatCount="indefinite" values={z.values} keyTimes={z.keyTimes} />
              </circle>
            );
          })}

        {/* spheres, far to near */}
        {ordered.map((node) => {
          const p = proj[node.id];
          const R = node.r * p.s;
          const isHub = node.variant === "hub";
          const ping = clamp(node.ping);
          return (
            <g key={node.id}>
              {!reduced && (
                <ellipse cx={p.x} cy={p.y} fill="none" stroke={isHub ? "#8F82FF" : "#4CD9E8"} strokeWidth="1.4">
                  <animate
                    attributeName="rx"
                    dur={CYCLE}
                    repeatCount="indefinite"
                    values={`${R};${R};${R + 20};${R + 20}`}
                    keyTimes={`0;${ping};${clamp(ping + 0.1)};1`}
                  />
                  <animate
                    attributeName="ry"
                    dur={CYCLE}
                    repeatCount="indefinite"
                    values={`${R * 0.42};${R * 0.42};${(R + 20) * 0.42};${(R + 20) * 0.42}`}
                    keyTimes={`0;${ping};${clamp(ping + 0.1)};1`}
                  />
                  <animate
                    attributeName="opacity"
                    dur={CYCLE}
                    repeatCount="indefinite"
                    values="0;0;0.75;0;0"
                    keyTimes={`0;${ping};${clamp(ping + 0.012)};${clamp(ping + 0.1)};1`}
                  />
                </ellipse>
              )}

              <circle cx={p.x} cy={p.y} r={R} fill={isHub ? "url(#awdHub)" : "url(#awdTool)"} />
              {/* rim light along the lower edge sells the volume */}
              <circle
                cx={p.x}
                cy={p.y}
                r={R}
                fill="none"
                stroke={isHub ? "rgba(201,194,255,0.55)" : "rgba(255,255,255,0.17)"}
                strokeWidth="1.1"
              />
              {/* specular highlight */}
              <ellipse
                cx={p.x - R * 0.3}
                cy={p.y - R * 0.42}
                rx={R * 0.34}
                ry={R * 0.22}
                fill="#fff"
                opacity={isHub ? 0.3 : 0.09}
                filter="url(#awdSoft)"
              />

              {!reduced && !isHub && (
                <circle cx={p.x} cy={p.y} r={R} fill="url(#awdFlash)" opacity="0">
                  <animate
                    attributeName="opacity"
                    dur={CYCLE}
                    repeatCount="indefinite"
                    values="0;0;0.6;0;0"
                    keyTimes={`0;${ping};${clamp(ping + 0.015)};${clamp(ping + 0.13)};1`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* labels last, so nothing paints over them */}
        {nodes.map((node) => {
          const p = proj[node.id];
          const R = node.r * p.s;
          if (node.variant === "hub") {
            return (
              <text
                key={`${node.id}-t`}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="font-display"
                fontSize={13 * p.s}
                fontWeight="600"
                fill="#0B0E17"
              >
                Agent
              </text>
            );
          }
          return (
            <text
              key={`${node.id}-t`}
              x={p.x}
              y={p.y + R + 20 * p.s}
              textAnchor="middle"
              className="font-mono"
              fontSize={10.5 * p.s}
              fill="#A3ACC2"
            >
              {node.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
