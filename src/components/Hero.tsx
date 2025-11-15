import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  profileImage: string;
}

export function Hero({ profileImage }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-[70px] overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--neon-cyan) 1px, transparent 1px),
                             linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 2.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="flex-shrink-0"
          >
            <div
              className="relative rounded-full overflow-hidden"
              style={{
                width: "192px",
                height: "192px",
                border: `3px solid var(--neon-cyan)`,
                boxShadow: `0 0 20px var(--neon-cyan)`,
              }}
            >
              <ImageWithFallback
                src={profileImage}
                alt="Dylan Ewe"
                className="w-full h-full object-cover"
              />
              {/* Glitch frame effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: `2px solid var(--glitch-pink)`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  x: [0, -2, 2, 0],
                  y: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 2,
                }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 text-center md:text-left"
          >
            <h1
              className="font-mono tracking-wider mb-2 text-2xl sm:text-3xl md:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              DYLAN EWE
            </h1>
            <p
              className="font-mono tracking-widest text-sm sm:text-base md:text-lg"
              style={{
                color: "var(--neon-cyan)",
                letterSpacing: "0.2em",
              }}
            >
              SOFTWARE ENGINEER
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" style={{ color: "var(--neon-cyan)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
