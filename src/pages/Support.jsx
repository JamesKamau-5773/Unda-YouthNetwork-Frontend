import React from "react";

const Support = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-4xl font-black text-unda-navy mb-8">Support</h1>
        <p className="text-lg text-slate-600 mb-6">Thank you for your interest in supporting youth mental health prevention. You can contribute your time, skills, or resources to help us make a difference.</p>
        <ul className="space-y-3 mb-8">
          <li>Become a member and join our community</li>
          <li>Partner with us for events and programs</li>
          <li>Contribute financially to support our initiatives</li>
        </ul>
        <p className="text-slate-500">For more information, please contact <a href="mailto:info@undayouth.org" className="text-unda-teal font-bold hover:underline">info@undayouth.org</a></p>
      </div>
    </section>
  );
};

export default Support;
