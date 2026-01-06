import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortalGateway = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-unda-navy/5 text-unda-navy font-bold text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Membership Portal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-unda-navy mb-6 tracking-tight">
          Join the Movement
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Whether you're starting a new journey with us or returning to your hub, we're glad you're here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* New Member Card */}
        <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-unda-navy/5 border-2 border-transparent hover:border-unda-teal/20 transition-all duration-300 hover:shadow-2xl hover:shadow-unda-teal/10">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserPlus size={120} className="text-unda-teal" />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-unda-teal/10 flex items-center justify-center text-unda-teal mb-8 group-hover:scale-110 transition-transform duration-300">
              <UserPlus size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-unda-navy mb-4">New Member?</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Register to start your own Mtaani Hub, access resources, and join our network of changemakers.
            </p>
            
            <Button asChild className="w-full py-6 text-lg font-bold bg-unda-teal text-white hover:bg-unda-teal/90 rounded-xl shadow-lg shadow-unda-teal/20">
              <Link to="/join">
                Create Account <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Existing Member Card */}
        <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-unda-navy/5 border-2 border-transparent hover:border-unda-orange/20 transition-all duration-300 hover:shadow-2xl hover:shadow-unda-orange/10">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <LogIn size={120} className="text-unda-orange" />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-unda-orange/10 flex items-center justify-center text-unda-orange mb-8 group-hover:scale-110 transition-transform duration-300">
              <LogIn size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-unda-navy mb-4">Returning Member?</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Log in to manage your hub, submit reports, and update your champion profile.
            </p>
            
            <Button asChild className="w-full py-6 text-lg font-bold bg-white text-unda-navy border-2 border-unda-navy/10 hover:bg-unda-navy hover:text-white rounded-xl transition-all duration-300">
              <Link to="/portal">
                Log In <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-slate-400 text-sm font-medium">
          Having trouble? <Link to="/contact" className="text-unda-navy underline decoration-2 underline-offset-4 hover:text-unda-teal">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default PortalGateway;
