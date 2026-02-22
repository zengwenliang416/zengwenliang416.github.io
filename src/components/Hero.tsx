import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleContext";
import GlassPill from "./glass/GlassPill";
import CountUp from "./ui/CountUp";

const ROLE_ACCENTS = ["#FF3C5F", "#5856D6", "#34C759"];
const EASE = [0.16, 1, 0.3, 1] as const;

const WENLIANG = "WENLIANG".split("");
const ZENG = "ZENG".split("");

export default function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();

  const charVariants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const charTransition = (i: number) => ({
    duration: 0.6,
    delay: reduced ? 0 : i * 0.03,
    ease: EASE,
  });

  const ZENG_OFFSET = WENLIANG.length;
  const nameEnd = (WENLIANG.length + ZENG.length) * 0.03;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.p
          className="text-text-secondary text-lg md:text-xl mb-4"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.2, ease: EASE }}
        >
          {t.hero.greeting}
        </motion.p>

        <h1
          className="font-display font-black leading-[0.95] tracking-tight mb-2"
          style={{ fontSize: "clamp(60px, 12vw, 160px)", color: "#1C1C1E" }}
          aria-label="WENLIANG ZENG"
        >
          <span className="block" aria-hidden="true">
            {WENLIANG.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={charVariants}
                initial="hidden"
                animate="visible"
                transition={charTransition(i)}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block" aria-hidden="true">
            {ZENG.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={charVariants}
                initial="hidden"
                animate="visible"
                transition={charTransition(ZENG_OFFSET + i)}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="mb-6">
          {t.hero.chineseName && (
            <motion.p
              className="font-display text-2xl md:text-3xl text-text-secondary"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : nameEnd + 0.1,
                ease: EASE,
              }}
            >
              {t.hero.chineseName}
            </motion.p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {t.hero.roles.map((role, i) => {
            const base = nameEnd + 0.3;
            return (
              <motion.div
                key={role}
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : base + i * 0.1,
                  ease: EASE,
                }}
              >
                <GlassPill accent={ROLE_ACCENTS[i % 3]}>
                  <span className="text-sm font-medium text-text-primary">
                    {role}
                  </span>
                </GlassPill>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-text-secondary text-lg max-w-[560px] mb-16 font-medium"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: reduced ? 0 : nameEnd + 0.6,
            ease: EASE,
          }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="glass-card inline-flex divide-x divide-black/[0.08] rounded-3xl"
          initial={
            reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 1.0, ease: EASE }}
        >
          {t.hero.stats.map((s) => (
            <div key={s.label} className="px-8 py-6 text-center">
              <div className="text-3xl font-black text-text-primary font-display">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-mono text-text-muted tracking-[0.02em] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* P0 fix: gate scroll indicator animation on useReducedMotion */}
        {!reduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-col items-start gap-2"
          >
            <span className="text-xs font-mono text-text-muted tracking-[0.15em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-text-muted"
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
