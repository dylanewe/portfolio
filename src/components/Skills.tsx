import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      category: "Backend & Languages",
      skills: [
        { name: "Go", percentage: 90 },
        { name: "Python", percentage: 85 },
        { name: "NodeJS", percentage: 88 },
      ],
    },
    {
      category: "Infrastructure & DevOps",
      skills: [
        { name: "Docker", percentage: 90 },
        { name: "Kubernetes", percentage: 85 },
        { name: "Azure", percentage: 80 },
      ],
    },
    {
      category: "Data Storage",
      skills: [
        { name: "Redis", percentage: 85 },
        { name: "MongoDB", percentage: 82 },
        { name: "PostgreSQL", percentage: 80 },
      ],
    },
    {
      category: "APIs & Architecture",
      skills: [
        { name: "REST API", percentage: 90 },
        { name: "GraphQL", percentage: 85 },
        { name: "gRPC", percentage: 88 },
      ],
    },
    {
      category: "AI & Development Tools",
      skills: [
        { name: "Claude Code", percentage: 85 },
        { name: "Git", percentage: 90 },
        { name: "MCPs", percentage: 80 },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="font-mono tracking-wider mb-4" style={{ color: "var(--neon-cyan)" }}>
              // SKILLS
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 relative"
              style={{ backgroundColor: "var(--neon-purple)" }}
            >
              {/* Glitch effect on divider */}
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: "var(--glitch-pink)" }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleX: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 shadow-lg"
              >
                <h3 className="font-mono mb-6 text-sm" style={{ color: "var(--neon-purple)" }}>
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      isVisible={isVisible}
                      delay={categoryIndex * 0.1 + skillIndex * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface SkillBarProps {
  skill: Skill;
  isVisible: boolean;
  delay: number;
}

function SkillBar({ skill, isVisible, delay }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm">{skill.name}</span>
        <span className="font-mono text-sm" style={{ color: "var(--neon-cyan)" }}>
          {skill.percentage}%
        </span>
      </div>
      <div className="h-10 bg-muted rounded-lg overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.percentage}%` : 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full relative overflow-hidden rounded-lg"
          style={{
            background: `linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))`,
          }}
        >
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
            }}
          />
        </motion.div>

        {/* Glitch effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, var(--glitch-pink), var(--glitch-green))`,
            opacity: 0,
          }}
          whileHover={{
            opacity: [0, 0.3, 0],
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
