import type { LocaleContent } from "./types";

export const en: LocaleContent = {
  nav: {
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Stack", href: "#stack" },
      { label: "Papers", href: "#papers" },
      { label: "Contact", href: "#contact" },
    ],
    contact: "Contact",
  },
  hero: {
    greeting: "Hello, I'm",
    roles: [
      "Full-Stack Developer",
      "AI Tooling Builder",
      "Open Source Creator",
    ],
    description:
      "Building AI-powered tools and production-grade applications that bridge research with real-world engineering.",
    stats: [
      { value: 43, suffix: "+", label: "Repositories" },
      { value: 80, suffix: "+", label: "GitHub Stars" },
      { value: 6, suffix: "", label: "Languages" },
      { value: 2, suffix: "", label: "Publications" },
    ],
  },
  projects: {
    heading: ["Selected", "Projects"],
    counter: (n) => `${n} projects`,
    moreHeading: "More Projects",
    featuredLabel: "Featured",
    items: {
      "mcp-server-sequential-thinking": {
        title: "Sequential Thinking MCP",
        desc: "MCP server enabling structured sequential thinking for AI agents. Step-by-step reasoning protocol for complex decision-making workflows.",
      },
      "claude-notifier": {
        title: "Claude Notifier",
        desc: "macOS native notification tool for Claude Code. System alerts when long-running AI tasks complete.",
      },
      "banana-image-mcp": {
        title: "Banana Image MCP",
        desc: "MCP server for AI-powered image generation and processing pipelines. Seamless integration with Claude.",
      },
      ParaCPI: {
        title: "ParaCPI",
        desc: "Parallel graph convolutional network for compound-protein interaction prediction in drug discovery.",
      },
      "my-plugins": {
        title: "My Plugins",
        desc: "Curated collection of developer plugins and extensions for enhanced productivity.",
      },
      Mermaid_General_Pic: {
        title: "Mermaid to Image",
        desc: "Web app converting Mermaid diagrams to images with live preview, DPI control and multi-format export.",
      },
      MarkPub: {
        title: "MarkPub",
        desc: "Desktop app for one-click publishing Markdown articles to multiple blog platforms like CSDN and Juejin.",
      },
      CiteScholarEasy: {
        title: "CiteScholar Easy",
        desc: "Download EndNote citation formats from Google Scholar by paper titles. Streamline academic reference management.",
      },
    },
  },
  techStack: {
    heading: ["Tech", "Stack"],
  },
  publications: {
    heading: ["Research", "Papers"],
    eyebrow: "Research",
    items: {
      GDilatedDTA: {
        desc: "GDilatedDTA: Graph dilation convolution strategy for drug target binding affinity prediction.",
      },
      ParaCPI: {
        desc: "ParaCPI: A Parallel Graph Convolutional Network for Compound-Protein Interaction Prediction.",
      },
    },
  },
  contact: {
    eyebrow: "Get in touch",
    heading: ["Let's work", "together."],
    description:
      "Open to opportunities, collaborations, and interesting conversations about AI tooling and full-stack development.",
    emailBtn: "Send Email",
    githubBtn: "GitHub Profile",
  },
  footer: {
    builtBy: "Built by",
    builtBySuffix: "",
  },
  meta: {
    title: "Wenliang Zeng - Full-Stack Developer & AI Tooling Builder",
    description:
      "Full-Stack Developer | AI Tooling Builder | Open Source Contributor",
  },
};
