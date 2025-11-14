import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { ProjectsGrid } from "./components/ProjectsGrid";

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "projects">("home");
  const [isDark, setIsDark] = useState(true);

  // Profile image URL from Unsplash
  const profileImage =
    "https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxMjU5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080";

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleNavigate = (view: "home" | "projects") => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navigation
        activeView={activeView}
        onNavigate={handleNavigate}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {activeView === "home" ? (
        <>
          <Hero profileImage={profileImage} />
          <About />
          <Skills />
          <Experience />
          <Footer />
        </>
      ) : (
        <>
          <ProjectsGrid />
          <Footer />
        </>
      )}

      {/* Custom cursor effect (optional enhancement) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        .font-mono,
        h1, h2, h3, button {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for dark mode */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: var(--background);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--neon-cyan);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--neon-purple);
        }
      `}</style>
    </div>
  );
}
