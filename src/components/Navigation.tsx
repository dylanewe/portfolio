import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

interface NavigationProps {
  activeView: "home" | "projects" | "minigame";
  onNavigate: (view: "home" | "projects" | "minigame") => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navigation({ activeView, onNavigate, isDark, toggleTheme }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="relative font-mono cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate("home")}
        >
          <span className="relative z-10 text-2xl tracking-wider">
            <span style={{ color: "var(--neon-cyan)" }}>D</span>
            <span style={{ color: "var(--neon-purple)" }}>E</span>
          </span>
          {/* Glitch effect on hover */}
          <motion.span
            className="absolute inset-0 text-2xl tracking-wider opacity-0 group-hover:opacity-100"
            style={{ color: "var(--glitch-pink)" }}
            animate={{
              x: [0, -2, 2, 0],
              y: [0, 1, -1, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            DE
          </motion.span>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate("home")}
            className="relative font-mono tracking-wider transition-colors"
            style={{
              color: activeView === "home" ? "var(--neon-cyan)" : "var(--muted-foreground)",
            }}
          >
            HOME
            {activeView === "home" && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 right-0 h-0.5"
                style={{ backgroundColor: "var(--neon-cyan)" }}
              />
            )}
          </button>
          <button
            onClick={() => onNavigate("projects")}
            className="relative font-mono tracking-wider transition-colors"
            style={{
              color: activeView === "projects" ? "var(--neon-cyan)" : "var(--muted-foreground)",
            }}
          >
            PROJECTS
            {activeView === "projects" && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 right-0 h-0.5"
                style={{ backgroundColor: "var(--neon-cyan)" }}
              />
            )}
          </button>
          <button
            onClick={() => onNavigate("minigame")}
            className="relative font-mono tracking-wider transition-colors"
            style={{
              color: activeView === "minigame" ? "var(--neon-cyan)" : "var(--muted-foreground)",
            }}
          >
            MINI GAME
            {activeView === "minigame" && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 right-0 h-0.5"
                style={{ backgroundColor: "var(--neon-cyan)" }}
              />
            )}
          </button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border hover:bg-accent/10 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5" style={{ color: "var(--neon-cyan)" }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: "var(--neon-purple)" }} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
