import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  slideX?: boolean;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  slideX = true,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={
        reduced
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: 30, x: slideX ? -20 : 0 }
      }
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealHeadingProps {
  children: string;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function RevealHeading({
  children,
  delay = 0,
  className = "",
  as: Tag = "h2",
}: RevealHeadingProps) {
  const reduced = useReducedMotion();
  const words = children.split(" ");

  return (
    <Tag className={className} aria-label={children}>
      <span className="inline" aria-hidden="true">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: reduced ? 0 : delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
