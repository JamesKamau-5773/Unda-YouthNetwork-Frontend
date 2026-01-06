import React from 'react';
import PortalLayout from '../layout/PortalLayout';
import { Download, Share2, Shield, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Certificate = () => {
  return (
    <PortalLayout title="My Certificate" subtitle="Proof of your commitment to mental resilience.">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
            
            {/* Certificate Preview */}
            <div className="flex-1 w-full bg-slate-200 p-8 rounded-2xl shadow-inner flex justify-center overflow-auto">
                <div className="w-full max-w-[800px] bg-white aspect-[1.414/1] shadow-2xl relative p-12 text-center flex flex-col justify-between border border-slate-300">
                    
                    {/* Decorative Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
                         style={{ backgroundImage: 'radial-gradient(#0c3b5e 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                    />
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-unda-navy via-unda-teal to-unda-navy" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-8 opacity-90">
                            <div className="h-12 w-12 grayscale opacity-50">
                                <img src={undaLogo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-black text-unda-navy uppercase tracking-widest mb-3">Certificate</h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px bg-unda-teal w-12" />
                            <p className="text-unda-teal font-bold uppercase tracking-[0.2em] text-xs">Of Membership</p>
                            <div className="h-px bg-unda-teal w-12" />
                        </div>
                    </div>

                    <div className="relative z-10 py-8">
                        <p className="text-slate-500 font-serif italic text-lg mb-6">This certifies that</p>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-unda-navy mb-2">James Mwangi</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Member ID: UMV-2026-8821</p>
                        
                        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-serif italic">
                            Is a recognized member of the Unda Youth Network, having demonstrated commitment to promoting mental health resilience and peer support within the community.
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-between items-end mt-8 pt-8 border-t border-slate-100">
                        <div className="text-left">
                            <div className="h-10 border-b border-black/20 mb-2 w-40 flex items-end">
                                <span className="font-signature text-xl text-unda-navy">Dr. Amani</span>
                            </div>
                            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Program Director</p>
                        </div>
                        
                        {/* Seal */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <div className="h-24 w-24 rounded-full border-4 border-unda-gold/30 bg-white shadow-sm flex items-center justify-center relative">
                                <div className="absolute inset-2 border border-unda-gold/20 rounded-full" />
                                <Award size={32} className="text-unda-gold" />
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Date</p>
                            <p className="font-bold text-unda-navy text-sm">Jan 06, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Sidebar */}
            <div className="w-full xl:w-80 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-unda-navy mb-4 text-sm uppercase tracking-wide">Actions</h3>
                    <div className="space-y-3">
                        <Button className="w-full bg-unda-navy hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-200 font-bold flex items-center gap-2">
                            <Download size={16} /> Download PDF
                        </Button>
                        <Button variant="outline" className="w-full rounded-xl font-bold flex items-center gap-2 text-slate-600 hover:text-unda-navy border-slate-200">
                            <Share2 size={16} /> Share Link
                        </Button>
                    </div>
                </div>

                <div className="bg-[#1E293B] p-6 rounded-2xl text-white relative overflow-hidden shadow-lg">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-unda-teal/20 rounded-full blur-2xl" />
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Shield size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Verified Member</h3>
                            <p className="text-[10px] text-slate-400">Since Jan 2024</p>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs text-slate-300">
                            <span>Status</span>
                            <span className="font-bold text-emerald-400">Active</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                            <span>Tier</span>
                            <span className="font-bold text-amber-400">Gold Champion</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                            <span>Next Renewal</span>
                            <span className="font-bold">Jan 2027</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </PortalLayout>
  );
};

export default Certificate;
