import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortalGateway = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1E3B]/5 text-[#0B1E3B] font-bold text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Membership Portal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#0B1E3B] mb-6 tracking-tight">
          Join the Movement
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Whether you're starting a new journey with us or returning to your hub, we're glad you're here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* New Member Card */}
        <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#0B1E3B]/5 border-2 border-transparent hover:border-[#00C2CB]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00C2CB]/10">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserPlus size={120} className="text-[#00C2CB]" />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB] mb-8 group-hover:scale-110 transition-transform duration-300">
              <UserPlus size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-[#0B1E3B] mb-4">New Member?</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Register to start your own Mtaani Hub, access resources, and join our network of changemakers.
            </p>
            
            <Button asChild className="w-full py-6 text-lg font-bold bg-[#00C2CB] text-white hover:bg-[#00C2CB]/90 rounded-xl shadow-lg shadow-[#00C2CB]/20">
              <Link to="/join">
                Create Account <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Existing Member Card */}
        <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#0B1E3B]/5 border-2 border-transparent hover:border-[#00C2CB]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00C2CB]/10">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <LogIn size={120} className="text-[#0090C0]" />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#0090C0]/10 flex items-center justify-center text-[#0090C0] mb-8 group-hover:scale-110 transition-transform duration-300">
              <LogIn size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-[#0B1E3B] mb-4">Returning Member?</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Log in to manage your hub, submit reports, and update your champion profile.
            </p>
            
            <Button asChild className="w-full py-6 text-lg font-bold bg-white text-[#0B1E3B] border-2 border-[#0B1E3B]/10 hover:bg-[#0B1E3B] hover:text-white rounded-xl transition-all duration-300">
              <Link to="/portal">
                Log In <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-slate-400 text-sm font-medium">
          Having trouble? <Link to="/contact" className="text-[#0B1E3B] underline decoration-2 underline-offset-4 hover:text-[#00C2CB]">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default PortalGateway;
