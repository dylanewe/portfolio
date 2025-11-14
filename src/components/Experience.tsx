import { motion } from "motion/react";
import { useState } from "react";

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  isCurrent: boolean;
}

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const experiences: ExperienceItem[] = [
    {
      year: "2024",
      company: "Tech Innovations Inc.",
      role: "Senior Software Engineer",
      duration: "2024 - Present",
      description:
        "Leading backend infrastructure development, architecting microservices with Go and Kubernetes. Optimized system performance by 40% through distributed caching strategies.",
      isCurrent: true,
    },
    {
      year: "2022",
      company: "CloudScale Solutions",
      role: "Software Engineer",
      duration: "2022 - 2024",
      description:
        "Developed RESTful and GraphQL APIs serving millions of requests daily. Implemented CI/CD pipelines reducing deployment time by 60%.",
      isCurrent: false,
    },
    {
      year: "2020",
      company: "DataFlow Systems",
      role: "Backend Developer",
      duration: "2020 - 2022",
      description:
        "Built real-time data processing pipelines using Kafka and Python. Designed database schemas and optimized query performance for large-scale applications.",
      isCurrent: false,
    },
    {
      year: "2019",
      company: "StartupLab",
      role: "Junior Developer",
      duration: "2019 - 2020",
      description:
        "Contributed to full-stack development of web applications. Gained experience in modern development practices and agile methodologies.",
      isCurrent: false,
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="font-mono tracking-wider mb-4" style={{ color: "var(--neon-cyan)" }}>
              WORK_HISTORY
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5"
              style={{
                background: `linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))`,
                boxShadow: `0 0 10px var(--neon-cyan)`,
              }}
            />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{
                background: `linear-gradient(180deg, var(--neon-cyan), var(--neon-purple))`,
                boxShadow: `0 0 10px var(--neon-cyan)`,
              }}
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-8"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Node */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    animate={
                      exp.isCurrent
                        ? {
                            scale: [1, 1.2, 1],
                          }
                        : {}
                    }
                    transition={
                      exp.isCurrent
                        ? {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        : {}
                    }
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-background font-mono"
                      style={{
                        borderColor: exp.isCurrent ? "var(--neon-cyan)" : "var(--neon-purple)",
                        boxShadow: exp.isCurrent
                          ? `0 0 20px var(--neon-cyan)`
                          : hoveredIndex === index
                          ? `0 0 15px var(--neon-purple)`
                          : "none",
                        fontSize: index === 0 ? "14px" : "12px",
                      }}
                    >
                      {exp.year}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="flex-1 bg-card border border-border rounded-lg p-6 shadow-lg"
                    animate={{
                      scale: hoveredIndex === index ? 1.02 : 1,
                      borderColor:
                        hoveredIndex === index
                          ? exp.isCurrent
                            ? "var(--neon-cyan)"
                            : "var(--neon-purple)"
                          : "var(--border)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-mono mb-1">{exp.role}</h3>
                        <p style={{ color: "var(--neon-cyan)" }}>{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">{exp.duration}</span>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredIndex === index ? "auto" : 0,
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground mt-3 pt-3 border-t border-border">
                        {exp.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
