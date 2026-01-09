import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MindRootsParentCircle = () => {
  useEffect(() => {
    document.title = 'MindRoots Parent Circle | UNDA Youth Network';
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute('content', 'MindRoots Parent Circle is a prevention-focused online community supporting immigrant parents raising teens and young adults across cultures, identity, and digital life.');
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'MindRoots Parent Circle is a prevention-focused online community supporting immigrant parents raising teens and young adults across cultures, identity, and digital life.';
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="py-24 bg-white">
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-unda-navy mb-4">MindRoots Parent Circle</h1>
        <p className="text-lg text-slate-600 mb-6">A prevention-focused support community for immigrant parents raising teens and young adults across cultures.</p>
        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">Raising adolescents and young adults across cultures is powerful — and complex. Immigrant parents often navigate identity gaps, digital pressures, school-related stress, and mental-health conversations many of us were never taught how to have. MindRoots Parent Circle is an online, culturally grounded space designed to support parents and caregivers before challenges escalate, strengthening family relationships and youth wellbeing through conversation, learning, and community.</p>

        <div className="flex justify-center gap-4 mb-12">
          <a href="https://www.skool.com/mindroots-parent-circle-2411/about" target="_blank" rel="noopener noreferrer">
            <Button className="px-6 py-3 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal text-lg font-bold shadow-xl">Join the Parent Circle</Button>
          </a>
          <Button asChild variant="outline">
            <Link to="/resources">Share With a Parent</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl font-black text-unda-navy mb-4">Why MindRoots Parent Circle</h2>
        <p className="text-slate-600 mb-6">Immigrant families often carry resilience, values, and intergenerational strength — yet face unique pressures in new social, educational, and digital environments. MindRoots Parent Circle responds to these realities by offering prevention-first, culturally responsive support for parents navigating adolescence and young adulthood. This initiative complements UNDA Youth Network’s UMV Prevention Program by strengthening the family environment, a critical protective factor in youth mental health.</p>

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
      </section>
    </main>
  );
};

export default MindRootsParentCircle;
