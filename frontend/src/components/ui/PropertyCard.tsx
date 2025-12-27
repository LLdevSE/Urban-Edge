import React from 'react';
import { MapPin, Maximize, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  size: number;
  image: string;
  type: string;
}

const PropertyCard = ({ id, title, location, price, size, image, type }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-cta text-white px-3 py-1 rounded-full text-sm font-bold">
          {type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
        <div className="flex items-center text-gray-500 mb-4 gap-1 text-sm">
          <MapPin size={16} className="text-cta" />
          <span>{location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 border-y border-gray-50 py-4">
          <div className="flex items-center gap-2">
            <Maximize size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Size</p>
              <p className="font-semibold">{size} Perches</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right justify-end">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Starting From</p>
              <p className="font-bold text-primary">Rs. {(price / 100000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <Link 
          to={`/property/${id}`}
          className="w-full bg-lightGray text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group/btn"
        >
          View Details
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
