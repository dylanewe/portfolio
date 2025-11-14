import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  profileImage: string;
}

export function Hero({ profileImage }: HeroProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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
          transition={{ duration: 0.5 }}
          className={animationComplete ? "flex items-center gap-6" : "text-center"}
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={
              animationComplete
                ? { scale: 0.4, x: 0, y: 0 }
                : { scale: 1, x: 0, y: 0 }
            }
            transition={{ duration: 1, delay: 1.5 }}
            className={animationComplete ? "" : "mx-auto mb-8"}
          >
            <motion.div
              className="relative rounded-full overflow-hidden"
              style={{
                width: "300px",
                height: "300px",
                border: `3px solid var(--neon-cyan)`,
                boxShadow: `0 0 20px var(--neon-cyan)`,
              }}
            >
              <ImageWithFallback
                src={profileImage}
                alt="Dylan Ewe"
                className="w-full h-full object-cover grayscale"
              />
              {/* Glitch frame effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: `2px solid var(--glitch-pink)`,
                  opacity: 0,
                }}
                animate={{
                  opacity: animationComplete ? [0, 0.3, 0] : 0,
                  x: animationComplete ? [0, -2, 2, 0] : 0,
                  y: animationComplete ? [0, 2, -2, 0] : 0,
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={animationComplete ? "flex-1" : ""}
          >
            <motion.h1
              className="font-mono tracking-wider mb-2"
              style={{
                fontSize: animationComplete ? "36px" : "60px",
                color: "var(--foreground)",
              }}
              animate={{
                fontSize: animationComplete ? "36px" : "60px",
              }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              DYLAN EWE
            </motion.h1>
            <motion.p
              className="font-mono tracking-widest"
              style={{
                fontSize: animationComplete ? "16px" : "20px",
                color: "var(--neon-cyan)",
                letterSpacing: "0.3em",
              }}
              animate={{
                fontSize: animationComplete ? "16px" : "20px",
              }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              SOFTWARE ENGINEER
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
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
