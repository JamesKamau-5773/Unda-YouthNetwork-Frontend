
import React from 'react';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';

const Membership = () => {
	const benefits = [
		{ text: "Official UNDA Membership Certificate", cite: "44-46" },
		{ text: "Weekly Peer Check-In access", cite: "50-51" },
		{ text: "Semi-Annual Sessions with professionals", cite: "56-57" },
		{ text: "Annual Resilience Training (MHR-T)", cite: "58-60" },
		{ text: "Digital Wellness Dashboard access", cite: "N/A" }
	];

	return (
		<Layout>
			<section className="py-24 lg:py-40 bg-white/90 relative overflow-hidden hero-overlay">
				{/* Background Decorative Element */}
				<div className="absolute top-0 right-0 w-1/3 h-full bg-unda-teal/[0.02] -skew-x-12 translate-x-1/2" />

				<div className="container mx-auto px-6 relative z-20">
					<div className="grid lg:grid-cols-12 gap-16 items-center">
						{/* LEFT: Information & Context (Left-Aligned) */}
						<div className="lg:col-span-6 space-y-8">
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-unda-navy text-white">
								<ShieldCheck size={14} className="text-unda-yellow" />
								<span className="text-[10px] font-bold uppercase tracking-widest">Join the Network</span>
							</div>

							<h2 className="text-5xl lg:text-7xl font-black text-unda-navy leading-[0.9] tracking-tighter">
								Ready to <br />
								<span className="text-unda-teal">Elevate</span> your <br />
								Wellbeing?
							</h2>

							<p className="text-slate-500 text-xl leading-relaxed font-light max-w-lg">
								Our annual subscription provides the framework for long-term mental strength. 
								Designed specifically for adolescents and youth in Kenya.
							</p>

							<div className="pt-8 flex items-center gap-6 text-unda-navy/40">
								<span className="text-[10px] font-black uppercase tracking-widest">Trusted by 50,000+ Youth</span>
								<div className="h-px w-12 bg-slate-200" />
							</div>
						</div>

						{/* RIGHT: The Conversion Card (Asymmetrical Placement) */}
						<div className="lg:col-span-6 relative">
							{/* Creative 'Shadow' element behind the card */}
							<div className="absolute top-8 left-8 w-full h-full border-2 border-[#0B1E3B]/[0.05] rounded-[3rem] z-0" />
              
							  <div className="bg-white border border-slate-100 p-8 lg:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden z-30">
								{/* Card Header */}
								<div className="flex justify-between items-start mb-10">
									<div>
										<h3 className="text-2xl font-black text-unda-navy tracking-tight">Youth Membership</h3>
										<p className="text-unda-teal font-bold text-xs uppercase tracking-widest mt-1">Adolescents and youth</p>
									</div>
									<div className="text-right">
										<span className="block text-4xl font-black text-unda-navy tracking-tighter">KES 3,000</span>
										<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">per year</span>
									</div>
								</div>

								{/* Benefits List */}
								<div className="space-y-4 mb-10">
									{benefits.map((benefit, idx) => (
										<div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-unda-bg transition-colors group">
											<div className="mt-1 h-5 w-5 rounded-full bg-unda-teal/10 flex items-center justify-center text-unda-teal group-hover:bg-unda-teal group-hover:text-white transition-all">
												<Check size={12} strokeWidth={4} />
											</div>
											<span className="text-slate-600 text-sm font-semibold">{benefit.text}</span>
										</div>
									))}
								</div>

								{/* Action Button */}
								{/* Peer Champion Tier */}
								<Button asChild className="w-full h-16 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal text-lg font-bold transition-all flex items-center justify-between px-8 shadow-xl shadow-unda-navy/10 group">
									<Link to="/join">Apply as Champion<ArrowRight className="group-hover:translate-x-2 transition-transform" /></Link>
								</Button>
								{/* General Member Tier */}
								<Button asChild variant="secondary" className="w-full h-16 rounded-2xl mt-4 text-lg font-bold flex items-center justify-between px-8">
									<Link to="/join">Register as Member<ArrowRight className="group-hover:translate-x-2 transition-transform" /></Link>
								</Button>

								<div className="mt-6 flex justify-center gap-4 opacity-30 grayscale pointer-events-none">
									{/* Visual representation of payment icons would go here */}
									<p className="text-[9px] font-bold uppercase tracking-widest text-unda-navy">M-Pesa • Visa • Mastercard</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Membership;
