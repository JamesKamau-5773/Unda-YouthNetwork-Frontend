import React, { useState } from "react";

const Contribute = () => {
  const [type, setType] = useState("one-time");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-4xl font-black text-unda-navy mb-8">Contribute</h1>
        <div className="mb-8">
          <label className="block text-sm font-bold text-unda-navy mb-4">Select Contribution Type</label>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => setType("one-time")} className={`p-4 rounded-xl border-2 font-bold transition-all ${type === "one-time" ? "border-unda-teal bg-unda-teal/10 text-unda-teal" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>One-Time</button>
            <button onClick={() => setType("monthly")} className={`p-4 rounded-xl border-2 font-bold transition-all ${type === "monthly" ? "border-unda-teal bg-unda-teal/10 text-unda-teal" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>Monthly</button>
            <button onClick={() => setType("corporate")} className={`p-4 rounded-xl border-2 font-bold transition-all ${type === "corporate" ? "border-unda-teal bg-unda-teal/10 text-unda-teal" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>Corporate</button>
          </div>
        </div>
        <form className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl">
          <div className="mb-6">
            <label className="block text-sm font-bold text-unda-navy mb-2">Amount (KES)</label>
            <input type="number" className="w-full p-4 rounded-xl border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-teal/20 focus:border-unda-teal transition-all" />
          </div>
          <button type="submit" className="w-full h-14 rounded-2xl bg-unda-teal text-white hover:bg-unda-navy text-lg font-bold shadow-xl">{type === "corporate" ? "Contact Us" : "Contribute Now"}</button>
        </form>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-black text-unda-navy mb-4">Your Impact</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">Every contribution directly supports youth mental health prevention programs across Kenya. Here's how your contribution helps:</p>
          <ul className="space-y-3">
            <li>KES 1,000: Provides screening tools and resources for 5 youth</li>
            <li>KES 5,000: Supports a peer champion's training</li>
            <li>KES 10,000: Funds a full UMV event reaching 50+ youth</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contribute;
