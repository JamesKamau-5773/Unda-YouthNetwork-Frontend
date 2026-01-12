import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MindRootsParentCircle = () => {
  useEffect(() => {
    document.title = 'MindRoots Parent Circle | Unda Youth Network';
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute('content', 'Prevention support and family psychoeducation to enhance parent-youth conversation and proactive action.');
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Prevention support and family psychoeducation to enhance parent-youth conversation and proactive action.';
      document.head.appendChild(m);
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl text-center mx-auto">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">MindRoots Parent Circle</h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-6">Prevention support and family psychoeducation to enhance parent-youth conversation and proactive action.</p>

              <div className="flex justify-center gap-4 mb-12">
                <a href="https://www.skool.com/mindroots-parent-circle-2411/about" target="_blank" rel="noopener noreferrer">
                  <Button className="h-14 px-8 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal text-lg font-bold shadow-xl">Join the Parent Circle</Button>
                </a>
                <Button asChild variant="outline">
                  <Link to="/resources">Share With a Parent</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-2xl font-black text-unda-navy mb-4">Why MindRoots Parent Circle</h2>
            <p className="text-slate-600 mb-6">Immigrant families often carry resilience, values, and intergenerational strength — yet face unique pressures in new social, educational, and digital environments. MindRoots Parent Circle responds to these realities by offering prevention-first, culturally responsive support for parents navigating adolescence and young adulthood. This initiative complements Unda Youth Network’s UMV Prevention Program by strengthening the family environment, a critical protective factor in youth mental health.</p>

            <h3 className="text-xl font-bold text-unda-navy mb-3">What the Parent Circle Offers</h3>
            <ul className="list-none space-y-3 mb-8">
              <li className="flex items-start gap-3"><span className="text-unda-teal font-black">•</span><span className="text-slate-600">Prevention-focused conversations, not crisis response</span></li>
              <li className="flex items-start gap-3"><span className="text-unda-teal font-black">•</span><span className="text-slate-600">Culturally grounded parenting tools and guidance</span></li>
              <li className="flex items-start gap-3"><span className="text-unda-teal font-black">•</span><span className="text-slate-600">Honest discussions on identity, digital life, school stress, and mental health</span></li>
              <li className="flex items-start gap-3"><span className="text-unda-teal font-black">•</span><span className="text-slate-600">Peer connection with parents across cultures and backgrounds</span></li>
              <li className="flex items-start gap-3"><span className="text-unda-teal font-black">•</span><span className="text-slate-600">A safe, moderated online community rooted in respect and learning</span></li>
            </ul>

            <h3 className="text-xl font-bold text-unda-navy mb-3">Who It Is For</h3>
            <ul className="list-disc pl-6 text-slate-600">
              <li>Immigrant parents and caregivers raising teens and young adults</li>
              <li>Educators working with multicultural families</li>
              <li>Community and faith leaders supporting immigrant households</li>
              <li>Parent advocates interested in prevention-first youth mental health</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default MindRootsParentCircle;
