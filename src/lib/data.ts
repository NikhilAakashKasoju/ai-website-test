// Content for the Building Agentic AI Applications course page.
// Dates/times are intentionally excluded from the schedule — the site tracks
// week themes and topics, not calendar-specific session times.

export interface WeekTopic {
  day: string; // e.g. "Session 1", "Session 2", "Doubt clearing"
  points: string[];
}

export interface Week {
  number: number;
  title: string;
  blurb: string;
  topics: WeekTopic[];
}

export const weeks: Week[] = [
  {
    number: 1,
    title: "Introduction to ML/AI",
    blurb:
      "Where AI, ML, and generative AI actually differ, and the line between predictive and agentic systems — the distinction the rest of the course builds on.",
    topics: [
      {
        day: "Session 1",
        points: ["What is AI vs ML vs Generative AI", "Predictive AI vs Agentic AI"],
      },
      {
        day: "Session 2",
        points: ["Classification use cases", "Regression use cases"],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 1 concepts"] },
    ],
  },
  {
    number: 2,
    title: "Deep Learning in a Nutshell",
    blurb:
      "Neural networks stripped down to what actually matters for agent systems — how they learn, and the CNN concepts that come up constantly in interviews.",
    topics: [
      {
        day: "Session 1",
        points: ["Neural networks simplified", "What are CNNs"],
      },
      {
        day: "Session 2",
        points: [
          "Neural network — deep dive",
          "Forward pass and backpropagation",
          "Gen AI & LLM basics",
        ],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 2 concepts"] },
    ],
  },
  {
    number: 3,
    title: "NLP Basics & Transformers",
    blurb:
      "The language layer underneath every agent: how text becomes vectors, and the encoder/decoder architecture that makes modern LLMs possible.",
    topics: [
      {
        day: "Session 1",
        points: ["What is NLP and why it powers agents", "Embeddings explained visually"],
      },
      {
        day: "Session 2",
        points: ["Encoder vs decoder models", "Transformers simplified"],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 3 concepts"] },
    ],
  },
  {
    number: 4,
    title: "Gen AI Basics & Prompt Engineering for Agent Systems",
    blurb:
      "Choosing the right model for the job, then learning to talk to it well — the prompting discipline every agent is built on top of.",
    topics: [
      {
        day: "Session 1",
        points: ["LLMs vs SLMs", "APIs vs open source", "RAG vs fine-tuning in LLMs"],
      },
      {
        day: "Session 2",
        points: [
          "Prompt engineering basics",
          "One-shot and few-shot prompting techniques",
          "Prompt testing workflows",
        ],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 4 concepts"] },
    ],
  },
  {
    number: 5,
    title: "Agentic AI Fundamentals",
    blurb:
      "Where the course turns the corner: what actually makes something an agent, and the reasoning loops that let it plan instead of just respond.",
    topics: [
      {
        day: "Session 1",
        points: [
          "AI agent vs workflow automation",
          "Tools, memory & reasoning loops",
          "ReAct concept (no-code perspective)",
        ],
      },
      {
        day: "Session 2",
        points: ["Single-agent vs multi-agent systems", "Planning vs execution logic"],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 5 concepts"] },
    ],
  },
  {
    number: 6,
    title: "No-Code Automation with n8n",
    blurb:
      "Building automation without writing a backend — nodes, triggers, and the API integrations that connect an agent to the outside world.",
    topics: [
      {
        day: "Session 1",
        points: ["Introduction to n8n interface — nodes, triggers & workflows", "API integrations (no coding)"],
      },
      {
        day: "Session 2",
        points: ["Webhooks & data pipelines", "Connecting LLMs inside n8n"],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 6 concepts"] },
    ],
  },
  {
    number: 7,
    title: "Understanding Real Agentic Workflows",
    blurb:
      "Assembling everything into working assistants — tool-calling flows, RAG pipelines, and the integrations that make an agent actually useful.",
    topics: [
      {
        day: "Session 1",
        points: [
          "Creating AI assistants in n8n",
          "Tool calling & automation flows",
          "What is RAG in automation systems",
        ],
      },
      {
        day: "Session 2",
        points: [
          "Integrating Google Sheets / Slack / Email",
          "Chunking & document ingestion workflows (RAG pipeline)",
          "Error handling & workflow logic",
        ],
      },
      { day: "Doubt clearing", points: ["Open Q&A on week 7 concepts"] },
    ],
  },
  {
    number: 8,
    title: "Production-Ready Agent Systems, Interview Preparation",
    blurb:
      "Taking an agent from working demo to production system, then turning the whole bootcamp into a story you can tell in an interview.",
    topics: [
      {
        day: "Session 1",
        points: [
          "Multi-step agent workflows",
          "RAG in production (knowledge base updates & indexing)",
          "Security & API key management",
        ],
      },
      {
        day: "Session 2",
        points: ["Self-hosted vs cloud n8n overview", "Logging & monitoring workflows"],
      },
      { day: "Wrap-up", points: ["Resume preparation", "Interview preparation"] },
    ],
  },
];

export interface Project {
  number: number;
  title: string;
  description: string;
  skills: string[];
}

export const projects: Project[] = [
  {
    number: 1,
    title: "Agentic Knowledge Base Assistant (RAG System)",
    description:
      "Build a RAG-powered chatbot that answers questions from custom documents by combining intelligent retrieval with generative AI.",
    skills: ["Retrieval-augmented generation", "Context-aware responses", "Applied NLP"],
  },
  {
    number: 2,
    title: "Smart Personal AI Agent (Multi-Tool Assistant)",
    description:
      "Create a multi-tool AI assistant that connects with external APIs — weather, travel, productivity tools — to perform tasks and deliver personalized responses.",
    skills: ["Agent loops", "Tool calling", "AI-driven decision making"],
  },
  {
    number: 3,
    title: "Multi-Agent Research & Task Automation System",
    description:
      "Develop a multi-agent workflow where specialized agents collaborate: a Planner Agent interprets requests, a Research Agent gathers information, and an Executor Agent generates reports and triggers automations.",
    skills: ["Multi-agent orchestration", "Task planning", "Automated reporting"],
  },
];

// Additional portfolio projects referenced in the program overview but not
// detailed in the cohort curriculum — shown as a supporting list, not full cards.
export const additionalProjects: string[] = [
  "Document Q&A Chatbot",
  "Smart Weather Assistant",
  "Personalized Travel Planner",
  "Resume Screening System",
  "Text-to-SQL Chatbot",
];

export const skills: string[] = [
  "Python Programming",
  "Generative AI Fundamentals",
  "Prompt Engineering",
  "Retrieval-Augmented Generation (RAG)",
  "LangChain & ReAct Agents",
  "Agentic AI Frameworks (LangGraph & CrewAI)",
  "Fine-Tuning & Model Optimization",
  "Vector Databases & Embeddings",
  "No-Code Agent Workflows with n8n",
  "End-to-End Agentic System Design & Deployment",
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "Are there any prerequisites?",
    answer:
      "None. This bootcamp is beginner-friendly and works for all skill levels — from learners completely new to coding to those already comfortable with machine learning who want to specialize in agentic systems. If you're starting from zero, we recommend spending the first couple of weeks alongside the course brushing up on Python fundamentals.",
  },
];

export const programStats = [
  { value: 8, suffix: "", label: "Weeks" },
  { value: 22, suffix: "+", label: "Live sessions" },
  { value: 3, suffix: "", label: "Core projects" },
  { value: 10, suffix: "", label: "Skills covered" },
];
