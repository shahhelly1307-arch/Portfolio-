import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

const Marquee = ({ text, reverse = false }: MarqueeProps) => {
  return (
    <div className="w-full overflow-hidden py-6 border-y border-white/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-marquee text-gradient px-6 inline-block">
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
