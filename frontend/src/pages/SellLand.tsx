import React from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, MapPin, Send } from 'lucide-react';

const SellLand: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">Sell Your Land with URBAN EDGE</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Reach thousands of verified buyers and get the best market value for your property. Our team handles the verification and marketing.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Submit Details",
                desc: "Fill out our simple form with your land's location, size, and price.",
                icon: <Send className="text-cta" size={32} />
              },
              {
                step: "02",
                title: "Verification",
                desc: "Our legal team will verify the deeds and documentation for authenticity.",
                icon: <CheckCircle2 className="text-cta" size={32} />
              },
              {
                step: "03",
                title: "Reach Buyers",
                desc: "Once verified, your land goes live on our platform and social channels.",
                icon: <Upload className="text-cta" size={32} />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <span className="absolute top-4 right-6 text-5xl font-bold text-gray-50">{item.step}</span>
                <div className="mb-6 relative z-10">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-600 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-cta p-8 text-white text-center">
              <h2 className="text-3xl font-bold font-montserrat">List Your Property</h2>
              <p className="opacity-90 mt-2">Provide your contact and property information below</p>
            </div>
            
            <form className="p-8 md:p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase">Your Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase">Contact Number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="+94 77 XXX XXXX" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase">Property Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="Enter City/District" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase">Land Size (Perches)</label>
                  <input type="number" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="e.g. 10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase">Expected Price (LKR)</label>
                  <input type="number" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="e.g. 5,000,000" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase">Additional Description</label>
                <textarea className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl h-32 focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="Tell us more about the property..."></textarea>
              </div>

              <button className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-3 text-lg">
                Submit Property for Review
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

import { ArrowRight } from 'lucide-react';

export default SellLand;
