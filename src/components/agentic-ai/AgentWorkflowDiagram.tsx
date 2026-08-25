"use client";

// A literal agent workflow, not an abstract loop: a request enters the agent,
// the agent fans out to tool calls (retrieval, API calls, notifications),
// and those results converge into a response. Small particles flow along
// each path continuously, with staggered starts so the diagram never feels
// static — meant to evoke an agent actively orchestrating work.

interface Node {
  id: string;
  x: number;
  y: number;
  r: number;
  label: string;
  variant: "endpoint" | "hub" | "tool";
}

const nodes: Node[] = [
  { id: "input", x: 30, y: 150, r: 22, label: "Request", variant: "endpoint" },
  { id: "agent", x: 175, y: 150, r: 36, label: "Agent", variant: "hub" },
  { id: "tool1", x: 340, y: 58, r: 24, label: "Retrieve", variant: "tool" },
  { id: "tool2", x: 340, y: 150, r: 24, label: "Tool call", variant: "tool" },
  { id: "tool3", x: 340, y: 242, r: 24, label: "Notify", variant: "tool" },
  { id: "output", x: 480, y: 150, r: 26, label: "Response", variant: "endpoint" },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

interface Path {
  id: string;
  d: string;
  delay: number;
  dur: number;
}

// Quadratic bezier curves for the branches so the fan-out/fan-in reads cleanly.
const paths: Path[] = [
  { id: "in-agent", d: `M${byId.input.x},${byId.input.y} L${byId.agent.x - byId.agent.r},${byId.agent.y}`, delay: 0, dur: 1.6 },
  { id: "agent-tool1", d: `M${byId.agent.x + 20},${byId.agent.y - 22} Q${260},${58} ${byId.tool1.x - byId.tool1.r},${byId.tool1.y}`, delay: 0.5, dur: 1.4 },
  { id: "agent-tool2", d: `M${byId.agent.x + byId.agent.r},${byId.agent.y} L${byId.tool2.x - byId.tool2.r},${byId.tool2.y}`, delay: 0.35, dur: 1.1 },
  { id: "agent-tool3", d: `M${byId.agent.x + 20},${byId.agent.y + 22} Q${260},${242} ${byId.tool3.x - byId.tool3.r},${byId.tool3.y}`, delay: 0.65, dur: 1.4 },
  { id: "tool1-out", d: `M${byId.tool1.x + byId.tool1.r},${byId.tool1.y} Q${420},${58} ${byId.output.x - 6},${byId.output.y - 22}`, delay: 1.5, dur: 1.4 },
  { id: "tool2-out", d: `M${byId.tool2.x + byId.tool2.r},${byId.tool2.y} L${byId.output.x - byId.output.r},${byId.output.y}`, delay: 1.2, dur: 1.1 },
  { id: "tool3-out", d: `M${byId.tool3.x + byId.tool3.r},${byId.tool3.y} Q${420},${242} ${byId.output.x - 6},${byId.output.y + 22}`, delay: 1.65, dur: 1.4 },
];

function nodeFill(variant: Node["variant"]) {
  if (variant === "hub") return "url(#hubFill)";
  if (variant === "tool") return "#0D111B";
  return "#0D111B";
}

export default function AgentWorkflowDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="hubFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C6CF6" />
            <stop offset="100%" stopColor="#4CD9E8" />
          </linearGradient>
          <linearGradient id="strokeFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C6CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4CD9E8" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* static connective lines */}
        {paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            stroke="url(#strokeFade)"
            strokeWidth="1.5"
          />
        ))}

        {/* flowing particles */}
        {paths.map((p) => (
          <circle key={`${p.id}-dot`} r="3.5" fill="#4CD9E8">
            <animateMotion
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
              path={p.d}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={nodeFill(node.variant)}
              stroke={node.variant === "hub" ? "transparent" : "rgba(255,255,255,0.14)"}
              className={node.variant === "hub" ? "animate-pulse-slow" : ""}
            />
            {node.variant !== "hub" && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
              />
            )}
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={`font-mono ${node.variant === "hub" ? "fill-void font-medium" : "fill-ink"}`}
              fontSize={node.variant === "hub" ? "11" : "8.5"}
            >
              {node.variant === "hub" ? "Agent" : node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
