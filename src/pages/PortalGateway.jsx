import React from 'react';
import Layout from '@/components/shared/Layout';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PortalGateway = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-6">
        {/* The Gateway Card */}
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-unda-navy/5 w-full max-w-lg border border-white text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-16 w-16 bg-unda-navy/5 rounded-2xl flex items-center justify-center text-unda-navy">
              <Shield size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-unda-navy mb-4">Secure Portal Access</h1>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Access the UNDA Youth Network management system. This area is restricted to registered Peer Champions, Supervisors, and Admins.
          </p>
          {/* THE BUTTON: Links to your Backend Login */}
          <Button asChild className="w-full h-16 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal font-black text-sm uppercase tracking-widest shadow-lg shadow-unda-navy/10 group">
            <a href="https://unda-youth-network-backend.onrender.com/auth/login" target="_blank" rel="noopener noreferrer">
              Proceed to Login <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </Button>
          <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <Lock size={12} /> SSL Encrypted
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <Shield size={12} /> Flask Security
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PortalGateway;
