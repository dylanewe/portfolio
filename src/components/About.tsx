import { motion } from "motion/react";
import { Brain, UtensilsCrossed, Gamepad2, Dumbbell } from "lucide-react";

export function About() {
  const interests = [
    { icon: Brain, label: "AI/ML" },
    { icon: UtensilsCrossed, label: "Cooking" },
    { icon: Gamepad2, label: "Gaming" },
    { icon: Dumbbell, label: "Working Out" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono tracking-wider mb-12 flex items-center gap-2">
            <span style={{ color: "var(--neon-cyan)" }}>// ABOUT ME</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ color: "var(--neon-cyan)" }}
            >
              _
            </motion.span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 shadow-lg"
            >
              <p className="text-muted-foreground mb-4">
                I'm a recent graduate from UW-Madison with a passion for backend and AI systems.
                I'm proficient in Golang and NodeJS, and have solid experience building cloud infrastructure
                and microservices architectures.
              </p>
              <p className="text-muted-foreground mb-4">
                My focus is on creating scalable, efficient systems and exploring the intersection of
                traditional backend development with modern AI technologies.
              </p>
              <p className="text-muted-foreground">
                Outside of coding, I enjoy cooking, playing games, and working out to stay balanced and energized.
              </p>
            </motion.div>

            {/* Right: Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border rounded-lg p-6 shadow-lg"
            >
              <h3 className="font-mono mb-6" style={{ color: "var(--neon-purple)" }}>
                INTERESTS & HOBBIES
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
                  >
                    <item.icon className="w-8 h-8" style={{ color: "var(--neon-cyan)" }} />
                    <span className="text-sm text-center">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
