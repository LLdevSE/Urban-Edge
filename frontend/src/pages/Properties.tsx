import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/ui/PropertyCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { propertyService } from '../services/api';

const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyService.getAll();
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDistrict = district === '' || p.location.toLowerCase().includes(district.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === '0-5') matchesPrice = p.price <= 5000000;
    else if (priceRange === '5-10') matchesPrice = p.price > 5000000 && p.price <= 10000000;
    else if (priceRange === '10+') matchesPrice = p.price > 10000000;

    return matchesSearch && matchesDistrict && matchesPrice;
  });

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
            <select 
              className="bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none min-w-[150px]"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">All Districts</option>
              <option value="colombo">Colombo</option>
              <option value="gampaha">Gampaha</option>
              <option value="kandy">Kandy</option>
              <option value="negombo">Negombo</option>
              <option value="kurunegala">Kurunegala</option>
            </select>

            <select 
              className="bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none min-w-[150px]"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Price Range</option>
              <option value="0-5">Below 5M</option>
              <option value="5-10">5M - 10M</option>
              <option value="10+">Above 10M</option>
            </select>

            <button 
              onClick={() => {setSearchTerm(''); setDistrict(''); setPriceRange('');}}
              className="flex items-center gap-2 bg-textDark text-white px-6 py-3 rounded-xl hover:bg-black transition-colors font-semibold"
            >
              <SlidersHorizontal size={18} />
              Reset
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard 
                key={prop._id} 
                id={prop._id}
                title={prop.title}
                location={prop.location}
                price={prop.price}
                size={prop.size}
                image={prop.images[0]}
                type={prop.type}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-xl font-medium">No properties found matching your criteria.</p>
          </div>
        )}

        {/* Pagination Placeholder */}
        {!loading && filteredProperties.length > 0 && (
          <div className="mt-16 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">1</button>
              <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors text-gray-400" disabled>2</button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
