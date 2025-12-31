import React from 'react';
import { Check, SpaceIcon, Star } from 'lucide-react';
import {Button} from "@/components/ui/button";

const Membership = () => {
  const benefits = [
    "Official UNDA Membership Certificate",
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
          <h2 className = "text-4xl font-black text-unda-navy mb-6">Join the Movement</h2>
          <p className = "text-slate-600 text-lg">
            Invest in your resilience and help us reach 50,000 young Kenyans with 
            preventive mental health tools.

          </p>

        </div>

        <div className = "flex justify-center">
          {/* Main Youth Tier Card */}

          <div className = "relative group max-w-lg w-full">
            {/* Background Glow Effect */}
            <div className = "absolute -inset-1 bg-gradient-to-r from-unda-teal to-unda-orange rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000">
              <div className = "relative bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white shadow-2xl">
              <div className = "flex justify-between items-start mb-8">
                <div>
                  <h3 className = "text-2xl font-black text-unda-navy">Youth Subscriber</h3>
                  <p className = "text-unda-teal font-bold text-sm uppercase tracking-widest">Ages 13–35</p>

                </div >

                <div className = "bg-unda-yellow/20 p-3 rounded-2xl">
                <Star className = "text-unda-yellow fill-unda-yellow" size = {24}/>         

                </div>

              </div>

              <div className = "mb-8">
                <span className = "text-5xl font-black text-unda-navy tracking-tighter">KES 3,000</span>
                <span className = "text-slate-400 font-medium ml-2">annually</span>
              </div>

              <ul className = "space-y-4 mb-10">
                {benefits.map((benefit, idx) => (
                  <li key = {idx} className="flex items-start gap-3 text-slate-600 text-sm">
                    <Check className = "text-unda-teal mt-0.5 shrink-0" size={18}/>
                    <span>{benefit}</span>

                  </li>
                ))}
              </ul>

              <Button className = "w-full h-16 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal text-lg font-bold transition-all shadow-xl shadow-unda-navy/10">
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