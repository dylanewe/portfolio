import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="relative py-12 px-6 border-t border-border" style={{ backgroundColor: "var(--secondary)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Social Icons */}
          <div className="flex items-center gap-10">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center group"
                style={{ borderColor: "var(--neon-cyan)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon
                  className="w-5 h-5 transition-colors"
                  style={{ color: "var(--neon-cyan)" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    boxShadow: `0 0 20px var(--neon-cyan)`,
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-mono">© 2025 Dylan Ewe</p>
        </motion.div>
      </div>
    </footer>
  );
}
