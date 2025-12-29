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

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-unda-bg overflow-hidden pt-16">
        <div className="container mx-auto px-6 grid md:grid-cols-10 gap-12 items-center">
          <div className="md:col-span-6 z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-unda-navy leading-tight">
              Converse. Prevent. <br />
              <span className="text-unda-orange">Thrive Mentally.</span>
            </h1>
            <p className="text-lg text-slate-600 mt-6 max-w-xl">
              UNDA Youth Network leads the national movement for Adolescent &
              Youth Mental Health Prevention through Unda Mind Vibes (UMV), a
              youth-led, culturally grounded, and digitally driven prevention
              program empowering young people across Kenya.
            </p>
            <div className="flex flex-col sm:row gap-4 mt-8">
              <Button className="bg-unda-navy hover:bg-unda-teal text-Black rounded-full px-8 py-6 transition-colors duration-300 ease-in-out flex items-center justify-center">
                Join Unda Youth Network
              </Button>
              <Button
                variant="outline"
                className="border-2 border-unda-navy text-unda-navy hover:bg-unda-navy hover:text-white rounded-full px-8 py-6 transition-all duration-300"
              >
                Donate to make mental health prevention possible
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-6 italic leading-relaxed">
              Young people aged 13–35 · Piloting Nairobi & Coast
            </p>
          </div>
          <div className="hidden md:block md:col-span-4 relative h-[600px]">
            {/* Use your uploaded image of Young Kenyan people in conversation here */}
            <div className="absolute inset-0 bg-gradient-to-r from-unda-bg via-transparent to-transparent z-10 w-32">
              <img
                src="/assets/hero-youth.jpg"
                alt="Young Kenyan people in conversation during a community mental-health event"
                className="rounded-3xl object-cover h-full w-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className = "py-20 bg-white">
        <div className = "container mx-auto px-6">
          <p className = "text-slate-600 text-lg leading-relaxed">
            UNDA Youth Network’s Adolescents and Youth Mental Health Prevention Program equips young people with knowledge, peer support, and practical skills to prevent mental-health challenges before they develop.
            The program is driven by three core pillars: awareness, access, and advocacy.

          </p>

        </div>
        
        <div className = "grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className = "p-10 bg-unda-navy text-white rounded-3xl">
            <h3 className = "text-5xl font-extrabold text-unda-yellow mb-2">50,000</h3>
            <p className = "text-slate-300">Preventive Services Provided</p>

          </div>

          <div className = "p-10 bg-unda-orange text-white rounded-3xl">
            <h3 className = "text-5xl font-extrabold mb-2">100</h3>
            <p className = "text-orange-100">Multi-sector Partnerships</p>

          </div>

        </div>
      </section>
    </div>
  );
};
export default Home;