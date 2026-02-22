import { motion, useReducedMotion } from "framer-motion";

export default function SectionDivider() {
  const reduced = useReducedMotion();

  return (
    <div className="flex justify-center px-6 md:px-12">
      <motion.div
        initial={{ width: reduced ? "100%" : "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #FF3C5F, #5856D6, #34C759, transparent)",
        }}
      />
    </div>
  );
}
