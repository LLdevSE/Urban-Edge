import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Contact Hero */}
      <section className="bg-lightGray py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-textDark mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have questions about a property or looking to sell? Our team is ready to assist you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-400 uppercase text-xs mb-1">Call Us</p>
                      <p className="font-bold">+94 11 234 5678</p>
                      <p className="font-bold">+94 77 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-400 uppercase text-xs mb-1">Email Us</p>
                      <p className="font-bold">info@urbanedge.lk</p>
                      <p className="font-bold">sales@urbanedge.lk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-400 uppercase text-xs mb-1">Visit Us</p>
                      <p className="font-bold">123 Business Avenue,</p>
                      <p className="font-bold">Colombo 03, Sri Lanka</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-400 uppercase text-xs mb-1">Working Hours</p>
                      <p className="font-bold">Mon - Sat: 9 AM - 6 PM</p>
                      <p className="font-bold">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-textDark text-white rounded-3xl">
                <h3 className="text-xl font-bold mb-6">Connect on Social Media</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-cta transition-colors"><Facebook /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-cta transition-colors"><Instagram /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-cta transition-colors"><Twitter /></a>
                </div>
              </div>

              {/* Google Map Placeholder */}
              <div className="rounded-3xl overflow-hidden h-64 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <MapPin size={48} className="mb-4 opacity-20" />
                  <span className="font-bold">Google Maps Integration</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                  <select className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none transition-all">
                    <option>General Inquiry</option>
                    <option>Property Question</option>
                    <option>Selling Land</option>
                    <option>Legal Verification</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
                  <textarea className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl h-40 focus:ring-2 focus:ring-cta focus:outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-slate-800 transition-all shadow-lg text-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
