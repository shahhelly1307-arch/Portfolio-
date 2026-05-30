import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// ==========================================
// REUSABLE REACTION ARCHITECTURE COMPONENTS
// ==========================================

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  x = 0, 
  y = 30, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
}

const Magnet: React.FC<MagnetProps> = ({ children, padding = 150, strength = 3 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Settings for responsive transitions
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (Math.abs(distanceX) < padding && Math.abs(distanceY) < padding) {
      x.set(distanceX / strength);
      y.set(distanceY / strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      style={{ x: translateX, y: translateY, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

const ContactButton: React.FC = () => (
  <button
    className="rounded-full uppercase tracking-widest font-medium text-white transition-transform duration-200 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer whitespace-nowrap"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px'
    }}
  >
    Contact Me
  </button>
);

const LiveProjectButton: React.FC = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 flex items-center gap-2 cursor-pointer">
    Live Project <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
);

const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const characters = text.split("");

  return (
    <p 
      ref={containerRef} 
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] relative flex flex-wrap justify-center"
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {characters.map((char, index) => {
        const start = index / characters.length;
        const end = (index + 1) / characters.length;
        
        // Map individual text elements using a transform curve over scroll range
        const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

        return (
          <span key={index} className="relative inline-block whitespace-pre">
            <span className="opacity-20 absolute top-0 left-0">{char}</span>
            <motion.span style={{ opacity }}>{char}</motion.span>
          </span>
        );
      })}
    </p>
  );
};

// ==========================================
// 1. HERO SECTION Component
// ==========================================

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0C0C0C]">
      {/* Navbar Container */}
      <nav className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] z-30">
        <FadeIn delay={0} y={-20} className="w-full flex justify-between items-center">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#price" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </FadeIn>
      </nav>

      {/* Main Large Typography Wrapper */}
      <div className="flex-1 w-full flex flex-col justify-start px-4 z-20">
        <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m helly
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Absolute Layer Magnetic Portrait Image */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
              alt="Helly Portait Representation" 
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Horizontal Infobar */}
      <div className="flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20 gap-4">
        <FadeIn delay={0.35} y={20}>
          <p 
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

// ==========================================
// 2. MARQUEE SECTION Component
// ==========================================

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const calculateTranslation = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate dynamic scrolling metric relative to user position inside section block
      const computed = (window.scrollY - (rect.top + window.scrollY) + window.innerHeight) * 0.3;
      setScrollOffset(computed);
    };

    window.addEventListener('scroll', calculateTranslation, { passive: true });
    return () => window.removeEventListener('scroll', calculateTranslation);
  }, []);

  const rawGifs = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  // Triplicated loops to preserve infinite edge blending
  const rowOneItems = [...rawGifs.slice(0, 11), ...rawGifs.slice(0, 11), ...rawGifs.slice(0, 11)];
  const rowTwoItems = [...rawGifs.slice(11), ...rawGifs.slice(11), ...rawGifs.slice(11)];

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      {/* Row 1 -> Right Scroll Tracking */}
      <div 
        className="flex gap-3 whitespace-nowrap transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${scrollOffset - 200}px)`, willChange: 'transform' }}
      >
        {rowOneItems.map((url, index) => (
          <img 
            key={`r1-${index}`} 
            src={url} 
            alt="Showcase Animation Loop Tile" 
            loading="lazy" 
            className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Row 2 -> Left Scroll Tracking */}
      <div 
        className="flex gap-3 whitespace-nowrap transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${-(scrollOffset - 200)}px)`, willChange: 'transform' }}
      >
        {rowTwoItems.map((url, index) => (
          <img 
            key={`r2-${index}`} 
            src={url} 
            alt="Showcase Animation Loop Tile" 
            loading="lazy" 
            className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// 3. ABOUT SECTION Component
// ==========================================

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen w-full relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden">
      
      {/* Decorative Assets Placement */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute z-0 top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" className="w-[120px] sm:w-[160px] md:w-[210px]" alt="Moon 3D Render" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute z-0 bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" className="w-[100px] sm:w-[140px] md:w-[180px]" alt="Geometric 3D Object" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute z-0 top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" className="w-[120px] sm:w-[160px] md:w-[210px]" alt="Lego Shape 3D Render" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute z-0 bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" className="w-[130px] sm:w-[170px] md:w-[220px]" alt="Composition Group Abstract" />
      </FadeIn>

      {/* Interactive Text Blocks Block */}
      <div className="w-full flex flex-col items-center z-10">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-16" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About me
          </h2>
        </FadeIn>

        <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />

        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. SERVICES SECTION Component
// ==========================================

interface ServiceItem {
  num: string;
  title: string;
  description: string;
}

const ServicesSection: React.FC = () => {
  const dataset: ServiceItem[] = [
    { num: "01", title: "3D Modeling", description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
    { num: "02", title: "Rendering", description: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life." },
    { num: "03", title: "Motion Design", description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
    { num: "04", title: "Branding", description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
    { num: "05", title: "Web Design", description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." }
  ];

  return (
    <section className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
      <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Services
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col w-full">
        {dataset.map((item, index) => (
          <FadeIn key={item.num} delay={index * 0.1} y={30} className="w-full">
            <div className="w-full flex flex-col md:flex-row items-start md:items-center py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] first:border-t first:border-[rgba(12,12,12,0.15)] gap-4 md:gap-0">
              {/* Left Column Numeric representation */}
              <div 
                className="font-black font-black leading-none w-full md:w-[30%] text-left" 
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {item.num}
              </div>

              {/* Right Column Content Structure */}
              <div className="w-full md:w-[70%] flex flex-col items-start">
                <h3 
                  className="font-medium uppercase mb-2 tracking-wide" 
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="font-light leading-relaxed max-w-2xl opacity-60" 
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// 5. PROJECTS SECTION Component
// ==========================================

interface Project {
  id: string;
  title: string;
  category: string;
  img1: string;
  img2: string;
  img3: string;
}

const ProjectCard: React.FC<{ project: Project; index: number; progress: any; total: number }> = ({ 
  project, 
  index, 
  progress, 
  total 
}) => {
  // Stacking transform logic configuration calculations
  const startRange = index / total;
  const endRange = 1;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  
  const scale = useTransform(progress, [startRange, endRange], [1, targetScale]);

  return (
    <div 
      className="sticky h-[85vh] w-full flex items-center justify-center" 
      style={{ top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.div 
        style={{ scale, willChange: 'transform' }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl"
      >
        {/* Top Operational Info Area */}
        <div className="w-full flex flex-row justify-between items-center border-b border-[#D7E2EA]/10 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}>
              {project.id}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase font-light tracking-widest text-[#D7E2EA]/60 mb-0.5 sm:mb-1">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-xl md:text-3xl font-medium uppercase tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>
          
          <LiveProjectButton />
        </div>

        {/* Bottom Variable Grid Graphics System */}
        <div className="grid grid-cols-10 gap-3 sm:gap-4 flex-1 mt-4 sm:mt-6 items-stretch">
          {/* Stacked Row Column */}
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 justify-between h-full">
            <img 
              src={project.img1} 
              alt="Project Internal Feature Display Top" 
              className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[48px] object-cover" 
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img 
              src={project.img2} 
              alt="Project Internal Feature Display Bottom" 
              className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[48px] object-cover flex-1" 
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          
          {/* Main Hero Showcase Frame Column */}
          <div className="col-span-6 h-full">
            <img 
              src={project.img3} 
              alt="Project Hero Layout Rendering Frame" 
              className="w-full h-full rounded-[24px] sm:rounded-[36px] md:rounded-[48px] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const projectDeck: Project[] = [
    {
      id: "01",
      title: "Nextlevel Studio",
      category: "Client",
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    },
    {
      id: "02",
      title: "Aura Brand Identity",
      category: "Personal",
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    },
    {
      id: "03",
      title: "Solaris Digital",
      category: "Client",
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  ];

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 md:px-10 pb-32 relative"
    >
      <div className="w-full pt-20 pb-10">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-16" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Project
          </h2>
        </FadeIn>
      </div>

      {/* Cards Scroll Core Deck Stack Container */}
      <div className="relative max-w-6xl mx-auto flex flex-col gap-0">
        {projectDeck.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            progress={scrollYProgress} 
            total={projectDeck.length} 
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// MAIN REUSABLE EXPORT SYSTEM WRAPPER
// ==========================================

export default function App() {
  return (
    <div className="w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip antialiased select-none">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
