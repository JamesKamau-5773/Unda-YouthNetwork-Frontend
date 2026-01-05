import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-unda-bg/50 pt-20 overflow-hidden">
      {/* 1. Background Blurs for Depth */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-unda-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-unda-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-unda-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-unda-teal"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Unda Mind Vibes Initiative
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-black text-unda-navy leading-[0.9] tracking-tight">
            Converse.
            <br />
            Prevent.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-unda-teal to-unda-orange">
              Thrive.
            </span>
          </h1>

          <p className="mt-8 text-xl text-slate-600 max-w-lg leading-relaxed font-light">
            Equipping Kenya's youth with the tools to build resilience and
            mental strength long before a crisis begins.
          </p>

          <div className="mt-12 flex flex-wrap gap-6">
            <Button asChild className="h-16 px-10 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal transition-all shadow-xl shadow-unda-navy/10">
              <Link to="/membership">
                Join the Network
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-16 px-6 text-unda-navy font-bold group"
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
          <div className="absolute -bottom-6 -left-6 z-20 bg-unda-navy text-white p-6 rounded-3xl shadow-2xl max-w-[180px] animate-bounce-slow">
            <p className="text-[10px] font-bold text-unda-yellow uppercase mb-1 tracking-widest text-center">
              Live
            </p>
            <p className="text-xl font-black italic text-center">
              Nairobi & Coast
            </p>
          </div>

          {/* Decorative Teal circle behind the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-unda-teal/10 rounded-full -z-10 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
