import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Info, Share2, Heart, Loader2, CheckCircle2 } from 'lucide-react';
import { propertyService, inquiryService } from '../services/api';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const response = await propertyService.getById(id);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      propertyId: id,
      type: 'Buy'
    };

    try {
      await inquiryService.create(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={64} />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <Link to="/properties" className="text-primary hover:underline">Back to listings</Link>
      </div>
    );
  }

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
                {property.features.map((feature: string, idx: number) => (
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
              {success ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center">
                  <CheckCircle2 className="mx-auto mb-4" size={48} />
                  <h4 className="font-bold text-xl mb-2">Inquiry Sent!</h4>
                  <p>Our team will contact you shortly.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-sm font-bold underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input name="name" type="text" placeholder="Your Name" required className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta transition-all" />
                  <input name="email" type="email" placeholder="Your Email" required className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta transition-all" />
                  <input name="phone" type="tel" placeholder="Phone Number" required className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta transition-all" />
                  <textarea name="message" placeholder="I'm interested in this property..." required className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-cta transition-all"></textarea>
                  <button 
                    disabled={formLoading}
                    className="w-full bg-cta text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {formLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send Inquiry'}
                  </button>
                </form>
              )}

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

export default PropertyDetails;
