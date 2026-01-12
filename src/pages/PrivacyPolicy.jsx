import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Shield, Lock, Eye, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
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
                Privacy & <span className="text-[#0090C0]">Policies.</span>
              </h1>
                <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                Unda Youth Network is committed to creating a safe, transparent, and secure environment for all users, members, and young people engaging with our UMV Prevention Program and broader Adolescent & Youth Mental Health Prevention initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Child Protection Policy */}
        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Shield size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Child Protection Policy</h2>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed">
                  We prioritize the safety and well-being of all children and adolescents. Our programs, events, and digital platforms follow strict safeguarding measures to protect participants from harm, abuse, and exploitation.
                </p>
                
                <div className="pl-6 border-l-4 border-[#00C2CB] bg-[#00C2CB]/5 p-6 rounded-r-xl">
                  <h3 className="text-xl font-black text-[#0B1E3B] mb-3">Media Consent & Protection</h3>
                  <p className="text-slate-600 leading-relaxed">
                    All media involving children and youth, including photos, videos, and stories, are shared only with informed consent from participants and, where required, their guardians. Consent is documented, voluntary, and can be withdrawn at any time. We ensure that all content respects privacy, dignity, and ethical guidelines in line with child protection standards.
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                    <p className="text-slate-600">Strict participant verification and background checks for all staff and supporters</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                    <p className="text-slate-600">Clear reporting mechanisms for safeguarding concerns</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                    <p className="text-slate-600">Age-appropriate content and engagement protocols</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                    <p className="text-slate-600">Regular safeguarding training for team members</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data Protection Policy */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Lock size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Data Protection Policy</h2>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed">
                  We respect your privacy and handle all personal data securely. Information collected through membership, contributions, or program participation is used solely to provide services, improve programs, and maintain communication.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-xl">
                    <h3 className="text-lg font-black text-[#0B1E3B] mb-3">What We Collect</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Name and contact information</li>
                      <li>• Age and demographic data</li>
                      <li>• Program participation records</li>
                      <li>• Payment and contribution information</li>
                      <li>• Screening and assessment responses</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-xl">
                    <h3 className="text-lg font-black text-[#0B1E3B] mb-3">How We Use It</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Deliver UMV program services</li>
                      <li>• Track progress and wellbeing</li>
                      <li>• Send updates and communications</li>
                      <li>• Process contributions and memberships</li>
                      <li>• Improve program effectiveness</li>
                    </ul>
                  </div>
                </div>

                <div className="pl-6 border-l-4 border-[#00C2CB] bg-[#00C2CB]/5 p-6 rounded-r-xl">
                  <h3 className="text-xl font-black text-[#0B1E3B] mb-3">Legal Compliance</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Data is stored according to <strong>Kenya's Data Protection Act 2019</strong> and relevant international standards. We never sell or share your data with third parties for marketing purposes without explicit consent.
                  </p>
                </div>

                <div className="bg-[#00C2CB]/5 border border-[#00C2CB]/20 rounded-xl p-6">
                  <h3 className="text-lg font-black text-[#0B1E3B] mb-3">Your Rights</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Access your personal data</li>
                    <li>• Request corrections or updates</li>
                    <li>• Withdraw consent at any time</li>
                    <li>• Request data deletion (subject to legal requirements)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Policy */}
        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#0090C0]/10 flex items-center justify-center">
                  <Cookie size={24} className="text-[#0090C0]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Cookie Policy</h2>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Our website uses cookies to enhance user experience, analyze traffic, and deliver relevant content. Users can manage cookie preferences at any time.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <div className="h-10 w-10 rounded-lg bg-[#00C2CB]/10 flex items-center justify-center mx-auto mb-3">
                      <Eye size={20} className="text-[#00C2CB]" />
                    </div>
                    <h3 className="text-sm font-black text-[#0B1E3B] mb-2">Essential Cookies</h3>
                    <p className="text-xs text-slate-600">Required for site functionality</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <div className="h-10 w-10 rounded-lg bg-[#00C2CB]/10 flex items-center justify-center mx-auto mb-3">
                      <Eye size={20} className="text-[#00C2CB]" />
                    </div>
                    <h3 className="text-sm font-black text-[#0B1E3B] mb-2">Analytics Cookies</h3>
                    <p className="text-xs text-slate-600">Help us improve the site</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <div className="h-10 w-10 rounded-lg bg-[#0090C0]/10 flex items-center justify-center mx-auto mb-3">
                      <Eye size={20} className="text-[#0090C0]" />
                    </div>
                    <h3 className="text-sm font-black text-[#0B1E3B] mb-2">Preference Cookies</h3>
                    <p className="text-xs text-slate-600">Remember your settings</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600">
                  No personal data is sold or shared with third parties for marketing purposes. You can disable cookies in your browser settings, though some features may not work properly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 bg-[#0B1E3B] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-6">
              Questions About Our <span className="text-[#0090C0]">Policies?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Contact us for more information about our privacy practices and policies.
            </p>
            <a href="mailto:info@undayouth.org" className="text-[#0090C0] font-bold text-lg hover:underline">
              info@undayouth.org
            </a>
            <p className="text-sm text-slate-400 mt-6">
              Last updated: January 2026
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
