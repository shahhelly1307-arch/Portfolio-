import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import avatar from "@/assets/helly-avatar.png";
import AnimatedText from "./AnimatedText";
import Magnet from "./Magnet";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-12">
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-[hsl(var(--grad-from))] blur-[180px] opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[hsl(var(--grad-via))] blur-[180px] opacity-30" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <h1 className="h-hero">
          <AnimatedText text="Hi, i'm" />
          <br />
          <AnimatedText text="Helly" gradient delay={0.2} />
        </h1>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative w-[16rem] md:w-[22rem] aspect-square shrink-0"
        >
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[hsl(var(--grad-from))] via-[hsl(var(--grad-via))] to-[hsl(var(--grad-to))] blur-3xl opacity-60" />
            <img
              src={avatar}
              alt="3D avatar of Helly Shah, Software Engineer"
              width={512}
              height={512}
              className="relative w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(168,85,247,0.4)]"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-12">
        <p className="body-lg max-w-md text-white/70">
          Software Engineer crafting fast, scalable, and beautiful digital products from idea to deployment.
        </p>
        <Magnet>
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            See my work <ArrowDown size={18} />
          </a>
        </Magnet>
      </div>
    </section>
  );
};

export default Hero;
