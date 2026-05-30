import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-[#0C0C0C] text-white">
      <Nav />
      <Hero />
      <Marquee text="Software Engineer" />
      <About />
      <Services />
      <Marquee text="Selected Projects" reverse />
      <Projects />
      <Footer />
    </main>
  );
};

export default Index;
