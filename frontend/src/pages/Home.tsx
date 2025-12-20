import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, CheckCircle } from 'lucide-react';

import PropertyCard from '../components/ui/PropertyCard';

const Home: React.FC = () => {
  const featuredProperties = [
    {
      id: '1',
      title: 'Emerald Gardens - Gampaha',
      location: 'Gampaha Town',
      price: 4500000,
      size: 10,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Land'
    },
    {
      id: '2',
      title: 'Silver Line Residency',
      location: 'Kottawa',
      price: 8200000,
      size: 6.5,
      image: 'https://images.unsplash.com/photo-1449156003053-c3d8c0f11273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Land'
    },
    {
      id: '3',
      title: 'Pine Hills Development',
      location: 'Kandy',
      price: 3500000,
      size: 15,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Land'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold font-montserrat mb-6"
          >
            Discover Premium Lands & <br /> Block Developments Across Sri Lanka
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto"
          >
            Find legally verified lands, ideal blockouts, and investment-ready properties in prime locations.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-4 rounded-xl shadow-2xl flex flex-wrap md:flex-nowrap items-center gap-4 max-w-4xl mx-auto"
          >
            <div className="flex-grow flex items-center bg-gray-100 p-3 rounded-lg text-textDark">
              <Search className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search by Location, District..." 
                className="bg-transparent border-none focus:outline-none w-full font-medium"
              />
            </div>
            <button className="bg-cta text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-all flex items-center gap-2 w-full md:w-auto justify-center">
              Search Lands
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Urban Edge?</h2>
            <div className="w-20 h-1.5 bg-cta mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Legally Verified",
                desc: "All properties undergo rigorous legal checks to ensure clear titles and peace of mind.",
                icon: <CheckCircle className="text-cta" size={40} />
              },
              {
                title: "Prime Locations",
                desc: "We select lands in high-growth areas with easy access to infrastructure and amenities.",
                icon: <CheckCircle className="text-cta" size={40} />
              },
              {
                title: "Flexible Payment",
                desc: "Easy payment plans and bank loan facilities arranged for your convenience.",
                icon: <CheckCircle className="text-cta" size={40} />
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
              <div className="w-20 h-1.5 bg-cta"></div>
            </div>
            <Link to="/properties" className="text-primary font-bold flex items-center gap-2 hover:text-cta transition-colors">
              View All Properties <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
