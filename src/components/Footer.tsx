import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";
import Magnet from "./Magnet";

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com/shahhelly1307-arch" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/helly-shah-a216b5385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
];

const Footer = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 pt-32 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-8">— Get in touch</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="h-section max-w-5xl">
            Let's build something <span className="text-gradient">extraordinary</span> together.
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-16 flex flex-wrap items-center gap-4">
            {socials.map(({ Icon, label, href }) => (
              <Magnet key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  <Icon size={22} />
                  <span className="text-lg">{label}</span>
                  <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100" />
                </a>
              </Magnet>
            ))}
          </div>
        </FadeIn>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Helly Shah — Software Engineer</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
