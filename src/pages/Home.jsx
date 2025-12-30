import React from "react";
import {
  Users,
  Calendar,
  Mic,
  Trophy,
  Heart,
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";


const ImpactCard = ({ number, label, color, glow }) => (
  <div className={`w-full md:w-[340px] p-12 ${color} rounded-[3rem] text-center shadow-2xl ${glow} transform hover:-translate-y-4 transition-all duration-500`}>
    <h3 className="text-6xl font-black text-white mb-4 tracking-tighter">{number}</h3>
    <p className="text-white/70 font-medium tracking-widest uppercase text-xs">{label}</p>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. REFINED HERO */}
      <section className="relative min-h-screen flex items-center bg-unda-bg/50 pt-20 overflow-hidden">
        {/* Abstract Background Blur */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-unda-teal/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-unda-orange/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-unda-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-unda-teal"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Unda Mind Vibes Initiative</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-unda-navy leading-[0.9] tracking-tight">
              Converse.<br />
              Prevent.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-unda-teal to-unda-orange">Thrive.</span>
            </h1>
            
            <p className="mt-8 text-xl text-slate-600 max-w-lg leading-relaxed font-light">
              Equipping Kenya's youth with the tools to build resilience and mental strength long before a crisis begins.
            </p>
            
            <div className="mt-12 flex flex-wrap gap-6">
              <Button className="h-16 px-10 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal transition-all shadow-xl shadow-unda-navy/10">
                Join the Network
              </Button>
              <Button variant="ghost" className="h-16 px-6 text-unda-navy font-bold group">
                Our Story <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
          {/* Right Content - Floating Impact Card Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white max-w-sm mx-auto">
              <img src="https://i.pinimg.com/736x/b6/06/a8/b606a84bb3dd6679105d163c7dcadf70.jpg" alt="Confident young Kenyan person" className="w-full h-auto" />
            </div>
            {/* Decorative Card overlay */}
            <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] animate-bounce-slow">
              <p className="text-xs font-bold text-unda-teal uppercase mb-2">Impact</p>
              <p className="text-2xl font-black text-unda-navy">50K+</p>
              <p className="text-[10px] text-slate-400">Youth empowered across Nairobi & Coast.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY ROOTS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* PREVIOUS IMAGE: Group on the Grass */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-unda-teal/5 rounded-[4rem] -rotate-3" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src="https://i.pinimg.com/736x/ac/34/0f/ac340f495ae1469a2dec12f6232045a3.jpg" 
                  alt="Young Kenyans in conversation" 
                  className="w-full h-auto" 
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-extrabold text-unda-navy mb-6">Built by Youth, for Youth.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                UNDA Youth Network leads the national movement for Adolescent & Youth Mental Health Prevention through our UMV program. We reach young people aged 13–35 in schools, campuses, and neighborhoods.
              </p>
              {/* Quick Pillar List */}
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-unda-navy font-bold">
                  <div className="h-2 w-2 bg-unda-teal rounded-full" /> Weekly Peer Check-Ins
                </li>
                <li className="flex items-center gap-4 text-unda-navy font-bold">
                  <div className="h-2 w-2 bg-unda-orange rounded-full" /> Cultural Storytelling
                </li>
                <li className="flex items-center gap-4 text-unda-navy font-bold">
                  <div className="h-2 w-2 bg-unda-yellow rounded-full" /> Digital Resilience Tools
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CENTERED IMPACT SNAPSHOT */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-unda-navy mb-6">Our National Footprint</h2>
            <div className="h-1.5 w-20 bg-unda-orange mx-auto rounded-full" />
          </div>

          {/* Using flex for perfect centering */}
          <div className="flex flex-wrap justify-center gap-10">
            <ImpactCard 
              number="50,000" 
              label="Young People Reached" 
              color="bg-unda-navy" 
              glow="shadow-unda-navy/20"
            />
            <ImpactCard 
              number="5,000" 
              label="Preventive Services" 
              color="bg-unda-teal" 
              glow="shadow-unda-teal/20"
            />
            <ImpactCard 
              number="100" 
              label="Partnerships" 
              color="bg-unda-orange" 
              glow="shadow-unda-orange/20"
            />
          </div>
        </div>
      </section>

      {/* 3. THE UMV PREVENTION PACKAGE (The 7 Steps) */}
      <section className = "py-24 bg-unda-bg">
        <div className = "container mx-auto px-6">
          <div className = "text-center mb-16">
            <h2 className = "text-4xl font-extrabold text-unda-navy mb-4">The UMV Prevention Package</h2>
            <p className = "text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A structured, youth-centered model that brings together screening, peer support, digital learning, and community engagement to strengthen early prevention.
            </p>

          </div>
          <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard number = "1" title = "Initial Screening" desc = "PHQ-4, PHQ-9, and GAD-7 tools administered at onboarding."/>
            <StepCard number = "2" title = "Daily Affirmations" desc = "Strengths-based, thematic digital messages."/>
            <StepCard number = "3" title = "Weekly Peer Check-Ins" desc = "Guided small-group discussions and Psychological First Aid."/>
            <StepCard number = "4" title = "Monthly Mini-Screening" desc = "Brief PHQ-2 and GAD-2 check-ins to monitor trends."/>
            <StepCard number = "5" title = "Quarterly Pillar Events" desc = "Multi-sectoral youth–expert engagements."/>
            <StepCard number = "6" title = "Semi-Annual Therapy" desc = "Group or individual sessions with approved professionals."/>
            <StepCard number = "7" title = "Annual MHR-Training" desc = "Skills-building program on coping and stress management."/>

          </div>

        </div>

      </section>
    </div>
  );
};

const StepCard = ({ number, title, desc }) => {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition group">
      <div className = "text-unda-teal font-black text-3xl mb-4 group-hover:text-unda-orange transition">
        0{number}
      </div>
      <h4 className = "text-xl font-bold text-unda-navy mb-2">{title}</h4>
      <p className = "text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};
export default Home;
