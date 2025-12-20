import React, { useState } from 'react';
import PropertyCard from '../components/ui/PropertyCard';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';

const mockProperties = [
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
  },
  {
    id: '4',
    title: 'Coastal Breeze Blocks',
    location: 'Negombo',
    price: 6000000,
    size: 8,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Land'
  }
];

const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-lightGray min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-montserrat mb-4 text-textDark">Lands for Sale in Sri Lanka</h1>
          <p className="text-gray-600">Browse verified land listings across Sri Lanka. Filter by location, price, and size to find your perfect plot.</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 flex flex-wrap items-center gap-6">
          <div className="flex-grow flex items-center bg-gray-50 border border-gray-100 p-3 rounded-xl min-w-[300px]">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or location..." 
              className="bg-transparent border-none focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <select className="bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none min-w-[150px]">
              <option value="">All Districts</option>
              <option value="colombo">Colombo</option>
              <option value="gampaha">Gampaha</option>
              <option value="kandy">Kandy</option>
            </select>

            <select className="bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none min-w-[150px]">
              <option value="">Price Range</option>
              <option value="0-5">Below 5M</option>
              <option value="5-10">5M - 10M</option>
              <option value="10+">Above 10M</option>
            </select>

            <button className="flex items-center gap-2 bg-textDark text-white px-6 py-3 rounded-xl hover:bg-black transition-colors font-semibold">
              <SlidersHorizontal size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">1</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">12</button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Properties;
