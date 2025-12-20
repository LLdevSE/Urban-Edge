import React from 'react';
import { Target, Eye, ShieldCheck, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* About Hero */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cta/10 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-8">Redefining Land Ownership in Sri Lanka</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              URBAN EDGE is a modern land and property platform dedicated to connecting buyers with high-quality, legally verified land opportunities across the island.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Urban Edge Office" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat">About URBAN EDGE</h2>
              <div className="w-20 h-1.5 bg-cta"></div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded with a vision to simplify the often complex process of buying land, Urban Edge has grown into a trusted name in the Sri Lankan real estate market. We specialize in land block developments, residential plots, and investment lands.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team of legal experts, land surveyors, and real estate professionals work tirelessly to ensure that every property listed on our platform meets the highest standards of legality and value.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <p className="text-4xl font-bold text-primary mb-1">10+</p>
                  <p className="text-gray-400 font-bold uppercase text-xs">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-1">500+</p>
                  <p className="text-gray-400 font-bold uppercase text-xs">Properties Sold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide transparent, legally secure, and high-value land solutions that empower Sri Lankans to build their dreams and secure their financial future.
              </p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-cta/5 rounded-2xl flex items-center justify-center text-cta mb-8">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the most trusted and innovative land development partner in Sri Lanka, recognized for excellence, integrity, and sustainable urban growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-cta mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "Honesty in every deal and clear documentation.", icon: ShieldCheck },
              { title: "Transparency", desc: "No hidden costs or legal surprises.", icon: Eye },
              { title: "Quality", desc: "Superior land prep and infrastructure.", icon: Target },
              { title: "Customer First", desc: "Dedicated support throughout the journey.", icon: Users }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <value.icon size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
