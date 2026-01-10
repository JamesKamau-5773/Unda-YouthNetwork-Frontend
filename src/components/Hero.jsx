import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F9FAFB]/50 pt-20 overflow-hidden">
      {/* Ambient orbs (Cyan top-right, Navy bottom-left) */}
      <div className="absolute -z-30 inset-0 pointer-events-none" style={{backgroundImage: 'radial-gradient(#0B1E3B 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.03}} />
      <div className="absolute -z-20 top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#00C2CB]/10 blur-3xl pointer-events-none" />
      <div className="absolute -z-20 bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#0B1E3B]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7">
          {/* Hybrid Navbar/Pill - Frosted Glass */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/50 text-[#0B1E3B] shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2CB] opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2CB]"></span>
            </span>
            <span className="text-[10px] font-bold normal-case tracking-widest">
              Unda Mind Vibes Initiative
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9]">
            <span className="block text-[#0B1E3B]">Converse.</span>
            <span className="block text-[#0B1E3B]">Prevent.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-[#00E5FF] via-[#00C2CB] to-[#008ba3]">Thrive.</span>
          </h1>

          <p className="mt-8 text-xl text-[#0B1E3B]/70 max-w-lg leading-relaxed font-light">
            Equipping Kenya's youth with the tools to build resilience and
            mental strength long before a crisis begins.
          </p>

            <div className="mt-12 flex flex-wrap gap-6">
            <Button asChild className="h-16 px-10 rounded-2xl bg-[#0B1E3B] text-white hover:bg-[#00C2CB] transition-all shadow-xl shadow-[0_10px_30px_rgba(0,194,203,0.12)]">
              <Link to="/membership">
                Join the Network
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-16 px-6 text-[#0B1E3B] font-bold group"
            >
              <Link to="/about">
                Our Story{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Content - Fixed Image Sizing */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* We use h-auto and max-w-sm to ensure the full portrait fits without zooming */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 border-[12px] border-white max-w-sm">
            <img
              src="https://i.pinimg.com/736x/b6/06/a8/b606a84bb3dd6679105d163c7dcadf70.jpg"
              alt="Confident young Kenyan person representing the Thrive pillar"
              className="w-full h-auto"
            />
          </div>

          {/* Refined Tag placement */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-[#0B1E3B]/95 backdrop-blur-md text-white p-6 rounded-3xl shadow-2xl max-w-[180px] animate-bounce-slow border border-white/20">
            <p className="text-[10px] font-bold text-[#00C2CB] uppercase mb-1 tracking-widest text-center">
              Live
            </p>
            <p className="text-xl font-extrabold italic text-center">
              Kenya & U.S.A
            </p>
          </div>

          {/* Decorative Teal circle behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#001F3F]/10 rounded-full -z-10 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
