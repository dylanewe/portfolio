import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  thumbnail: string;
  borderColor: string;
  demoUrl?: string;
  githubUrl?: string;
}

export function ProjectsGrid() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "SubTrack",
      shortDescription: "Subscription tracking and management application built with NodeJS",
      fullDescription:
        "A full-featured subscription tracker that helps users manage and monitor their recurring subscriptions. Built with NodeJS, this application provides insights into spending patterns and upcoming renewals.",
      techStack: ["NodeJS", "JavaScript"],
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300",
      borderColor: "var(--neon-cyan)",
      githubUrl: "https://github.com/dylanewe/subtrack",
    },
    {
      id: "2",
      title: "Blockchain Simulator",
      shortDescription: "Blockchain simulation API built with Python and Flask",
      fullDescription:
        "A blockchain simulator API that demonstrates core blockchain concepts including block creation, hashing, and chain validation. Built with Python and Flask to provide a RESTful interface for exploring blockchain mechanics.",
      techStack: ["Python", "Flask"],
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300",
      borderColor: "var(--neon-purple)",
      githubUrl: "https://github.com/dylanewe/blockchain",
    },
    {
      id: "3",
      title: "GoDis",
      shortDescription: "Redis clone implementation written in Go",
      fullDescription:
        "A lightweight Redis clone built from scratch in Go, implementing core Redis data structures and commands. This project explores the internals of in-memory data stores and demonstrates proficiency in Go and systems programming.",
      techStack: ["Go", "Redis"],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300",
      borderColor: "var(--glitch-pink)",
      githubUrl: "https://github.com/dylanewe/godis",
    },
  ];

  return (
    <section className="py-24 px-6 min-h-screen pt-[120px]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="font-mono tracking-wider mb-4" style={{ color: "var(--neon-cyan)" }}>
              // PROJECTS
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 relative"
              style={{ backgroundColor: "var(--neon-purple)" }}
            >
              {/* Glitch effect */}
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

          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isExpanded={expandedProject === project.id}
                onToggle={() =>
                  setExpandedProject(expandedProject === project.id ? null : project.id)
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ProjectCard({ project, index, isExpanded, onToggle }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card rounded-lg overflow-hidden cursor-pointer"
      style={{
        border: `2px solid ${isExpanded ? project.borderColor : "var(--border)"}`,
        boxShadow: isExpanded ? `0 0 20px ${project.borderColor}` : "none",
      }}
      whileHover={{
        borderColor: project.borderColor,
        boxShadow: `0 0 15px ${project.borderColor}`,
      }}
    >
      <div className="flex items-start gap-6 p-6" onClick={onToggle}>
        {/* Thumbnail */}
        <div
          className="flex-shrink-0 w-[120px] h-[120px] rounded overflow-hidden"
          style={{ border: `2px solid ${project.borderColor}` }}
        >
          <ImageWithFallback
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-mono mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.shortDescription}
              </p>
            </div>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center hover:bg-accent/10 transition-colors"
                style={{ borderColor: project.borderColor }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-border">
              <p className="text-muted-foreground mb-4 mt-4">{project.fullDescription}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full border font-mono text-sm"
                    style={{
                      borderColor: project.borderColor,
                      color: project.borderColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded border-2 font-mono text-sm transition-colors"
                    style={{ borderColor: project.borderColor }}
                    whileHover={{
                      backgroundColor: project.borderColor,
                      color: "var(--background)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded border-2 font-mono text-sm transition-colors"
                    style={{ borderColor: project.borderColor }}
                    whileHover={{
                      backgroundColor: project.borderColor,
                      color: "var(--background)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
