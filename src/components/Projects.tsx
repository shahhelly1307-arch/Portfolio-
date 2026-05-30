import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";

const projects = [
  { num: "01", title: "CHAYYA LANDING", category: "Client", url: "https://github.com/shahhelly1307-arch/CHAYYA-LANDING.git", gradient: "from-[#7C3AED] to-[#06B6D4]" },
  { num: "02", title: "HELLEDIN", category: "Personal", url: "https://github.com/shahhelly1307-arch/HELLEDIN.git", gradient: "from-[#F59E0B] to-[#EF4444]" },
  { num: "03", title: "RESUMA", category: "Client", url: "https://github.com/shahhelly1307-arch/RESUMA.git", gradient: "from-[#10B981] to-[#3B82F6]" },
  { num: "04", title: "Code Alpha AI T2", category: "Personal", url: "https://github.com/shahhelly1307-arch/Code-alpha-AI-T2.git", gradient: "from-[#EC4899] to-[#8B5CF6]" },
];

interface CardProps {
  project: typeof projects[number];
  index: number;
  total: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}

const Card = ({ project, index, progress, range, targetScale }: CardProps) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="sticky top-24 flex justify-center" style={{ top: `calc(6rem + ${index * 1.5}rem)` }}>
      <motion.div
        style={{ scale }}
        className={`w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} p-8 md:p-12 flex flex-col justify-between shadow-2xl`}
      >
        <div className="flex items-start justify-between text-white/90">
          <span className="text-sm uppercase tracking-[0.3em]">{project.category}</span>
          <span className="text-sm tabular-nums">{project.num}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h3 className="text-white text-5xl md:text-8xl font-extrabold tracking-tight leading-none">
            {project.title}
          </h3>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-black transition-colors shrink-0"
          >
            Live Project <ArrowUpRight size={18} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="px-6 md:px-12 py-32">
      <div className="max-w-7xl mx-auto mb-16">
        <FadeIn>
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-6">— Selected Work</p>
          <h2 className="h-section">Projects</h2>
        </FadeIn>
      </div>
      <div ref={containerRef} className="relative max-w-7xl mx-auto">
        {projects.map((p, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <div key={p.num} className="h-screen flex items-center justify-center">
              <Card
                project={p}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
                range={[i / projects.length, 1]}
                targetScale={targetScale}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
