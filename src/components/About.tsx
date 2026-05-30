import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";

const About = () => {
  return (
    <section id="about" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
      <FadeIn>
        <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-8">— About</p>
      </FadeIn>
      <h2 className="h-section max-w-5xl">
        <AnimatedText
          text="I'm a software engineer building"
        />{" "}
        <AnimatedText text="full-stack web applications" gradient delay={0.3} />{" "}
        <AnimatedText text="with a sharp eye for UI/UX, clean architecture, and solving real problems at scale." delay={0.5} />
      </h2>
    </section>
  );
};

export default About;
