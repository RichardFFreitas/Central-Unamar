import React from 'react';
import { Star, MapPin, Globe, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  id:string;
  name: string;
  category: string;
  rating: number;
  image: string;
  location: string;
  whatsapp?: string;
  website?: string;
}

const BusinessCard = ({ 
  id,
  name, 
  category, 
  rating, 
  image, 
  location,
  whatsapp = "+5521999999999",
}: BusinessCardProps) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden group h-[300px]">
      {/* Image */}
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
      
      {/* Featured Badge */}
      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium z-10">
        Featured
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 mt-4 rounded">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-white">{rating}</span>
            </div>
          </div>
          <p className="text-white/80 text-sm mb-2">{category}</p>
          <div className="flex items-center text-white/80 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a 
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            WhatsApp
          </a>
          <Link
            to={`/business/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
          >
            <Globe className="w-4 h-4 mr-2" />
            Visit Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;