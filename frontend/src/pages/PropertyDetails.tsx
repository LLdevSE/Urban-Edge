import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Maximize, Phone, Mail, Calendar, Info, Share2, Heart } from 'lucide-react';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for a single property
  const property = {
    id: id,
    title: 'Emerald Gardens - Gampaha',
    location: 'Gampaha Town, Western Province',
    price: 4500000,
    size: 10,
    type: 'Residential Land',
    status: 'Available',
    description: 'This prime land is ideally located with easy access to main roads, utilities, and essential services. Suitable for residential or investment purposes. Just 5 minutes from Gampaha town center and 10 minutes to the highway entrance.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Clear Deeds', 'Electricity', 'Water Supply', 'Wide Roads', 'Security Provided']
  };

  return (
    <div className="bg-lightGray min-h-screen pb-20">
      {/* Image Gallery Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden h-[500px]">
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-6 h-[500px]">
              <div className="rounded-3xl overflow-hidden">
                <img src={property.images[1]} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <div className="bg-textDark rounded-3xl flex flex-col items-center justify-center text-white cursor-pointer hover:bg-black transition-colors">
                <span className="text-3xl font-bold">+5</span>
                <span className="font-medium">More Photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-textDark mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-500 gap-2">
                    <MapPin className="text-cta" size={20} />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"><Share2 size={20} /></button>
                  <button className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"><Heart size={20} /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100 mb-8">
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Price</p>
                  <p className="text-2xl font-bold text-primary">Rs. {(property.price / 100000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Land Size</p>
                  <p className="text-xl font-bold">{property.size} Perches</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Type</p>
                  <p className="text-xl font-bold">{property.type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Status</p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">{property.status}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Info className="text-cta" size={24} />
                  Property Overview
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-bold mb-8">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="text-green-500" size={20} />
                    </div>
                    <span className="font-semibold text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-lg sticky top-32">
              <h3 className="text-2xl font-bold mb-6">Inquire About This Land</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta transition-all" />
                <input type="email" placeholder="Your Email" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta transition-all" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta transition-all" />
                <textarea placeholder="I'm interested in this property..." className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-cta transition-all"></textarea>
                <button className="w-full bg-cta text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                  Send Inquiry
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Call Agent</p>
                  <p className="text-lg font-bold text-textDark">+94 11 234 5678</p>
                </div>
                <div className="flex gap-2">
                  <a href="#" className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"><Phone size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors"><Mail size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { CheckCircle2 } from 'lucide-react';

export default PropertyDetails;
