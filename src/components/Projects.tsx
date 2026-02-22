import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data/content";
import { useLocale } from "../i18n/LocaleContext";
import RevealOnScroll from "./ui/RevealOnScroll";
import GlassCard from "./glass/GlassCard";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const EASE_CUSTOM = [0.16, 1, 0.3, 1] as const;

function useFinePointer(): boolean {
  const ref = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
  );
  return ref.current;
}

function ProjectImage({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    );
  }
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}15, ${project.gradient[1]}08)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(${project.gradient[0]}30 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-30 blur-[60px]"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      />
      <div className="absolute bottom-4 right-4 font-mono text-xs opacity-20 text-text-muted">
        {project.name}
      </div>
    </div>
  );
}

function HoverPreview({
  project,
  previewRef,
}: {
  project: Project | null;
  previewRef: React.RefObject<HTMLDivElement>;
}) {
  return createPortal(
    <div ref={previewRef} className="fixed z-[9999] pointer-events-none">
      <AnimatePresence>
        {project && (
          <motion.div
            key="preview"
            className="w-48 h-32 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: EASE_CUSTOM }}
          >
            <div className="glass-card w-full h-full rounded-xl overflow-hidden">
              <ProjectImage project={project} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

function CollapsedBar({
  project,
  isOpen,
  isFeatured,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isOpen: boolean;
  isFeatured: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { t } = useLocale();
  const tr = t.projects.items[project.name];
  const rowHeight = isFeatured ? "min-h-[88px]" : "min-h-[72px]";

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
      if (e.key === "Escape" && isOpen) {
        onToggle();
      }
    },
    [isOpen, onToggle],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      data-cursor="open"
      className={`flex items-center gap-4 px-5 cursor-pointer select-none glass-interactive transition-colors duration-200 ${rowHeight} ${
        isOpen ? "bg-white/20" : "hover:bg-white/10"
      }`}
      style={
        isFeatured
          ? { borderLeft: `3px solid ${project.gradient[0]}` }
          : { borderLeft: "3px solid transparent" }
      }
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex-1 min-w-0 flex items-center gap-4">
        <span className="font-display font-semibold text-text-primary text-base truncate">
          {tr?.title ?? project.name}
        </span>
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-full text-xs font-mono text-text-muted bg-black/[0.03] border border-black/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {project.stars != null && (
          <span className="font-mono text-xs text-lime hidden sm:block">
            ★ {project.stars}
          </span>
        )}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={SPRING}
          className="w-5 h-5 text-text-muted flex items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function ExpandedPanel({ project }: { project: Project }) {
  const { t } = useLocale();
  const tr = t.projects.items[project.name];

  return (
    <motion.div
      key="panel"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={SPRING}
      style={{ overflow: "hidden" }}
    >
      <div className="px-5 pb-6 pt-1">
        <GlassCard variant="featured" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <motion.div
              className="aspect-[16/10] lg:aspect-auto lg:min-h-[220px] overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1.0 }}
              transition={SPRING}
            >
              <ProjectImage project={project} />
            </motion.div>

            <div className="p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: project.gradient[0] }}
                  />
                  {project.stars != null && (
                    <span className="font-mono text-xs text-lime">
                      ★ {project.stars}
                    </span>
                  )}
                </div>

                <div className="glass-text-area mb-4">
                  <p className="text-[15px] font-medium text-text-secondary leading-[1.65]">
                    {tr?.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono text-text-muted bg-black/[0.03] border border-black/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-xl text-sm font-medium text-text-primary glass-btn glass-interactive"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}

function AccordionRow({
  project,
  isOpen,
  isFeatured,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isOpen: boolean;
  isFeatured: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div layout transition={SPRING} className="overflow-hidden">
      <CollapsedBar
        project={project}
        isOpen={isOpen}
        isFeatured={isFeatured}
        onToggle={onToggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <AnimatePresence initial={false}>
        {isOpen && <ExpandedPanel key={project.name} project={project} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLocale();
  const finePointer = useFinePointer();
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverProject, setHoverProject] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!finePointer) return;
    const onMove = (e: MouseEvent) => {
      if (previewRef.current) {
        previewRef.current.style.left = `${e.clientX + 16}px`;
        previewRef.current.style.top = `${e.clientY - 64}px`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [finePointer]);

  const handleToggle = useCallback((name: string) => {
    setOpenId((prev) => (prev === name ? null : name));
  }, []);

  const showPreview =
    finePointer && hoverProject !== null && openId !== hoverProject?.name;

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            {t.projects.counter(projects.length)}
          </p>
          <h2
            className="mt-3 font-display font-bold text-text-primary"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            {t.projects.heading[0]}{" "}
            <span className="text-gradient-coral">{t.projects.heading[1]}</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-16 glass-card rounded-2xl overflow-hidden divide-y divide-black/[0.05]">
            {projects.map((project) => (
              <AccordionRow
                key={project.name}
                project={project}
                isOpen={openId === project.name}
                isFeatured={!!project.featured}
                onToggle={() => handleToggle(project.name)}
                onMouseEnter={() =>
                  finePointer && openId !== project.name
                    ? setHoverProject(project)
                    : undefined
                }
                onMouseLeave={() => setHoverProject(null)}
              />
            ))}
          </div>
        </RevealOnScroll>

        <HoverPreview
          previewRef={previewRef}
          project={showPreview ? hoverProject : null}
        />

        <div className="mt-12 text-center">
          <a
            href="https://github.com/Zengwenliang0416"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors glass-interactive"
          >
            {t.projects.moreHeading} →
          </a>
        </div>
      </div>
    </section>
  );
}
