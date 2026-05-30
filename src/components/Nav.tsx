import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Nav = () => {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between backdrop-blur-md bg-[#0C0C0C]/60 border-b border-white/5"
    >
      <a href="#" className="font-bold text-lg tracking-tight">
        Helly<span className="text-gradient">.</span>
      </a>
      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="text-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
      >
        Let's talk
      </a>
    </motion.header>
  );
};

export default Nav;
