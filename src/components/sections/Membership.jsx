import React from 'react';
import { Check, SpaceIcon, Star } from 'lucide-react';
import {Button} from "@/components/ui/button";

const Membership = () => {
  const benefits = [
    "Official Unda Membership Certificate",
    "Weekly Peer Check-In access",
    "Semi-Annual Session with professionals",
    "Annual Resilience Training (MHR-T)",
    "Digital Wellness Dashboard access",
    "Exclusive Workstream opportunities"
  ];

  return(
    <section className = "py-32 relative overflow-hidden">
      <div className = "container mx-auto px-6">
        <div className = "max-w-4xl mx-auto text-center mb-16">
          <h2 className = "text-4xl font-black text-[#0B1E3B] mb-6">Join the Movement</h2>
          <p className = "text-slate-600 text-lg">
            Invest in your resilience and help us reach 50,000 young Kenyans with 
            preventive mental health tools.

          </p>

        </div>

        <div className = "flex justify-center">
          {/* Main Youth Tier Card */}

          <div className = "relative group max-w-lg w-full">
            {/* Background Glow Effect */}
            <div className = "absolute -inset-1 bg-gradient-to-r from-[#00C2CB] to-[#0090C0] rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000">
              <div className = "relative bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-2xl">
              <div className = "flex justify-between items-start mb-8">
                <div>
                  <h3 className = "text-2xl font-black text-[#0B1E3B]">Youth Subscriber</h3>
                  <p className = "text-[#00C2CB] font-bold text-sm uppercase tracking-widest">Adolescents and youth</p>

                </div >

                <div className = "bg-[#0090C0]/20 p-3 rounded-2xl">
                <Star className = "text-[#0090C0] fill-[#0090C0]" size = {24}/>         

                </div>

              </div>

              <div className = "mb-8">
                <span className = "text-5xl font-black text-[#0B1E3B] tracking-tighter">KES 3,000</span>
                <span className = "text-slate-400 font-medium ml-2">annually</span>
              </div>

              <ul className = "space-y-4 mb-10">
                {benefits.map((benefit, idx) => (
                  <li key = {idx} className="flex items-start gap-3 text-slate-600 text-sm">
                    <Check className = "text-[#00C2CB] mt-0.5 shrink-0" size={18}/>
                    <span>{benefit}</span>

                  </li>
                ))}
              </ul>

              <Button className = "w-full h-16 rounded-2xl bg-[#0B1E3B] text-white hover:bg-[#00C2CB] text-lg font-bold transition-all shadow-xl shadow-[0_10px_30px_rgba(11,30,59,0.1)]">
                Become a Member

              </Button>

              <p className = "text-center text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
                  Secure Payment via M-PESA or Card

              </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Membership;