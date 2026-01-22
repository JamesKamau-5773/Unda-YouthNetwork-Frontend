import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Target, Eye, Globe, Users, Heart, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const alignmentPoints = [
    {
      title: "Awareness & Storytelling",
      description: "The UMV campaigns and storytelling initiatives promote youth mental-health literacy, practical life skills, and risk-reduction strategies, directly supporting WHO's emphasis on psychosocial promotion and preventive interventions."
    },
    {
      title: "Multi-Setting Engagement",
      description: "By implementing programs across schools, campuses, and community spaces, UMV mirrors global guidance to integrate mental-health promotion into everyday, non-clinical environments."
    },
    {
      title: "Peer-Led Access & Support",
      description: "Our peer-driven models provide person-centered support close to communities, expand access to early preventive interventions, and strengthen referral pathways, consistent with WHO recommendations for integrated, youth-centered mental health strategies."
    }
  ];

  const objectives = [
    {
      icon: Users,
      title: "Awareness",
      goal: "Reach 50,000 adolescents and youth",
      description: "Targeted prevention campaigns, storytelling and knowledge-sharing by October 2026"
    },
    {
      icon: Heart,
      title: "Access",
      goal: "Provide 5,000 young people",
      description: "Affordable, accessible and standardized preventive mental-health support through peer-led and digital models by October 2026"
    },
    {
      icon: Lightbulb,
      title: "Advocacy",
      goal: "Mobilize 100 multi-sectoral partnerships",
      description: "Influence inclusion, funding and policy in youth mental-health prevention by October 2026"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Our <span className="text-unda-yellow">Story.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                UNDA Youth Network is a youth-led movement advancing adolescent and youth mental-health prevention across Kenya and the United States. We believe prevention should be accessible, practical, and grounded in the lived experiences of young people.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-unda-teal/10 border border-unda-teal/20">
                  <Target size={18} className="text-unda-teal" />
                  <span className="text-xs font-black uppercase tracking-widest text-unda-navy">Our Mission</span>
                </div>
                <h2 className="text-4xl font-black text-unda-navy leading-tight font-unda">
                  Promoting Prevention, Increasing Access, Advocating Change
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To promote awareness of Adolescents and Youth Mental Health Prevention, increase access to preventative services, and advocate for meaningful engagement and funding.
                </p>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-unda-yellow/10 border border-unda-yellow/20">
                  <Eye size={18} className="text-unda-yellow" />
                  <span className="text-xs font-black uppercase tracking-widest text-unda-navy">Our Vision</span>
                </div>
                <h2 className="text-4xl font-black text-unda-navy leading-tight font-unda">
                  Making Prevention a Global Priority
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To make Adolescents and Youth Mental Health Prevention a visible global priority through digital innovation, storytelling, community activation, and strategic partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Alignment */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 mb-6">
                  <Globe size={18} className="text-unda-teal" />
                  <span className="text-xs font-black uppercase tracking-widest text-unda-navy">Global Alignment</span>
                </div>
                <h2 className="text-5xl font-black text-unda-navy mb-6">
                  Aligned with WHO <span className="text-unda-teal">HAT Guidelines</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  Our work aligns strongly with global mental-health guidance, particularly the World Health Organization's "Helping Adolescents Thrive (HAT)" Guidelines, which emphasize promotive and preventive interventions for young people across schools, communities, and digital spaces.
                </p>
              </div>

              <div className="space-y-8">
                {alignmentPoints.map((point, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-2xl font-black text-unda-navy mb-4">{point.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-unda-navy/5 rounded-2xl border border-unda-navy/10">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-unda-navy">Global Youth Mental Health Priorities:</strong> UMV supports the recent WHO/UN joint call for sustained investment in child and youth mental health as a global policy priority. Our approach, combining youth participation, digital innovation, and whole-of-society collaboration, reflects global guidance for rights-based, community-led, cross-sectoral strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* UMV Program Strategic Goals */}
        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-unda-navy mb-6">
                UMV Program <span className="text-unda-teal">Strategic Goals</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                To strengthen adolescent and youth mental-health prevention through the UMV Prevention Program by advancing holistic wellbeing via collaborative, youth-centered, and evidence-informed interventions in Kenya, the United States, and beyond.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {objectives.map((objective, idx) => {
                const Icon = objective.icon;
                return (
                  <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="h-16 w-16 rounded-2xl bg-unda-teal/10 flex items-center justify-center mb-6">
                      <Icon size={32} className="text-unda-teal" />
                    </div>
                    <h3 className="text-2xl font-black text-unda-navy mb-2">{objective.title}</h3>
                    <p className="text-lg font-bold text-unda-teal mb-4">{objective.goal}</p>
                    <p className="text-slate-600 leading-relaxed">{objective.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Target Regions */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-lg">
                <h2 className="text-4xl font-black text-unda-navy mb-6">Target Regions & Population</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  The UMV Prevention Program will pilot in <strong className="text-unda-navy">Kenya and U.S.A regions</strong>, reaching adolescents and youth across urban, peri-urban, and rural contexts, including high schools, tertiary institutions, and community settings.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <p className="text-4xl font-black text-unda-teal mb-2">Adolescents and youth</p>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Age Range</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <p className="text-4xl font-black text-unda-navy mb-2">2</p>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-wider"> Regions</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <p className="text-4xl font-black text-unda-yellow mb-2">50K+</p>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Target Reach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-unda-navy mb-6">
                  Multi-Sectoral <span className="text-unda-teal">Collaboration</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  UMV thrives on strong partnerships that strengthen impact, scale and sustainability. We collaborate with:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Youth networks and community-based organizations",
                  "Schools, universities and colleges",
                  "Mental-health professionals and researchers",
                  "Government institutions aligned with national policy goals",
                  "Media, creative agencies and digital platforms",
                  "Corporate organizations and philanthropic partners"
                ].map((partner, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-6 rounded-2xl border border-slate-100">
                    <CheckCircle size={20} className="text-unda-teal flex-shrink-0 mt-1" />
                    <p className="text-slate-700 font-medium">{partner}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button
                  asChild
                  className="h-14 px-8 rounded-2xl text-lg font-bold shadow-2xl"
                  style={{ backgroundColor: '#0B1E3B', color: '#ffffff', zIndex: 20 }}
                >
                  <Link to="/partner">Partner With Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
