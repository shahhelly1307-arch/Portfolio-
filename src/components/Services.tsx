import FadeIn from "./FadeIn";

const services = [
  { num: "01", title: "Full Stack Development", desc: "End-to-end web apps with modern stacks, REST/GraphQL APIs, and cloud deployment." },
  { num: "02", title: "Frontend Development", desc: "Pixel-perfect, performant React interfaces with Tailwind, animations, and accessibility." },
  { num: "03", title: "Backend Development", desc: "Scalable Node.js / Python APIs, databases, auth, and real-time systems." },
  { num: "04", title: "AI Integration", desc: "LLM-powered features, RAG pipelines, and intelligent automation baked into your product." },
  { num: "05", title: "Web Application Design", desc: "From wireframes to polished UI — design systems that feel as good as they look." },
];

const Services = () => {
  return (
    <section id="services" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <FadeIn>
        <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-12">— Services</p>
      </FadeIn>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.08}>
            <div className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 md:py-12 transition-colors hover:bg-white/[0.03] px-2 md:px-6 cursor-default">
              <span className="text-white/40 text-xl tabular-nums">{s.num}</span>
              <h3 className="text-3xl md:text-5xl font-semibold flex-1 group-hover:text-gradient transition-all">
                {s.title}
              </h3>
              <p className="text-white/60 max-w-md body-lg">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Services;
