import React from 'react';
import Layout from '@/components/shared/Layout'; // Keeps the Navbar so you can "Go Back"
import { Shield, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PortalLogin = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center py-20 px-6">
        {/* The Gateway Card */}
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-unda-navy/5 w-full max-w-md border border-white relative overflow-hidden">
          {/* Decorative Background Blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-unda-teal/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <div className="h-16 w-16 bg-unda-navy rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-unda-navy/20">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-black text-unda-navy mb-2">Portal Access</h1>
            <p className="text-slate-500 font-medium text-sm">
              Secure gateway for Champions & Staff.
            </p>
          </div>

          {/* THE ACTION: Links to your Live Backend */}
          <div className="space-y-4">
            <Button asChild className="w-full h-14 rounded-xl bg-unda-navy text-white hover:bg-unda-teal font-black text-sm uppercase tracking-widest shadow-xl shadow-unda-navy/10 group transition-all">
              <a href="https://unda-youth-network-backend.onrender.com/auth/login">
                Continue to Login <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </Button>
            
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
              Redirects to Encrypted Server
            </p>
          </div>

          {/* Security Badges */}
          <div className="mt-10 pt-8 border-t border-slate-50 flex justify-center gap-6 opacity-60">
             <div className="flex items-center gap-1.5 text-[9px] font-black text-unda-navy uppercase tracking-widest">
               <Lock size={10} className="text-unda-teal" /> SSL Secure
             </div>
             <div className="flex items-center gap-1.5 text-[9px] font-black text-unda-navy uppercase tracking-widest">
               <UserCheck size={10} className="text-unda-orange" /> Verified Only
             </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default PortalLogin;
