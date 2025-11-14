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
      title: "Distributed Cache System",
      shortDescription: "High-performance caching layer using Redis and Go for microservices architecture",
      fullDescription:
        "Built a distributed caching system that reduced database load by 70% and improved API response times by 45%. Implemented cache invalidation strategies, pub/sub patterns, and horizontal scaling capabilities. Handles over 100k requests per second with sub-millisecond latency.",
      techStack: ["Go", "Redis", "Docker", "Kubernetes"],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300",
      borderColor: "var(--neon-cyan)",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "2",
      title: "Real-time Analytics Pipeline",
      shortDescription: "Stream processing system for analyzing user behavior data in real-time",
      fullDescription:
        "Developed a scalable analytics pipeline using Kafka and Python that processes millions of events daily. Implemented real-time aggregations, anomaly detection, and custom metrics. Reduced data processing time from hours to seconds with stream processing architecture.",
      techStack: ["Python", "Kafka", "PostgreSQL", "Grafana"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300",
      borderColor: "var(--neon-purple)",
      githubUrl: "#",
    },
    {
      id: "3",
      title: "GraphQL API Gateway",
      shortDescription: "Unified API gateway aggregating multiple microservices with GraphQL",
      fullDescription:
        "Created a centralized GraphQL gateway that simplified client integrations by providing a single endpoint for multiple backend services. Implemented schema stitching, batching, and caching strategies. Reduced API calls by 60% and improved developer experience significantly.",
      techStack: ["NodeJS", "GraphQL", "Apollo", "Docker"],
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300",
      borderColor: "var(--glitch-pink)",
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "4",
      title: "Kubernetes Operator",
      shortDescription: "Custom K8s operator for automated database backup and recovery",
      fullDescription:
        "Designed a Kubernetes operator that automates database backup, restoration, and monitoring tasks. Implemented custom resource definitions (CRDs) and reconciliation loops. Reduced operational overhead by 80% and eliminated manual intervention in backup processes.",
      techStack: ["Go", "Kubernetes", "Helm", "PostgreSQL"],
      thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300",
      borderColor: "var(--glitch-green)",
      githubUrl: "#",
    },
    {
      id: "5",
      title: "CI/CD Automation Platform",
      shortDescription: "Self-service deployment platform with automated testing and rollbacks",
      fullDescription:
        "Built an internal platform that streamlined the deployment process across 50+ microservices. Integrated automated testing, canary deployments, and instant rollback capabilities. Reduced deployment time from 2 hours to 15 minutes while improving reliability.",
      techStack: ["Python", "GitHub Actions", "Terraform", "Azure"],
      thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=300",
      borderColor: "var(--neon-cyan)",
      demoUrl: "#",
    },
    {
      id: "6",
      title: "Serverless Event System",
      shortDescription: "Event-driven architecture using serverless functions and message queues",
      fullDescription:
        "Architected a serverless event processing system that handles asynchronous workflows at scale. Implemented dead-letter queues, retry mechanisms, and event sourcing patterns. Achieved 99.99% uptime while reducing infrastructure costs by 40%.",
      techStack: ["NodeJS", "Azure Functions", "Kafka", "Redis"],
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300",
      borderColor: "var(--neon-purple)",
      githubUrl: "#",
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
              PERSONAL_PROJECTS
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
