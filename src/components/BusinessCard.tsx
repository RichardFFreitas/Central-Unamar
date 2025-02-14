
import { Star } from "lucide-react";

interface BusinessCardProps {
  name: string;
  category: string;
  rating: number;
  image: string;
}

export default function BusinessCard({ name, category, rating, image }: BusinessCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-up">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-primary font-medium uppercase tracking-wider">{category}</p>
            <h3 className="font-semibold text-gray-900 mt-1">{name}</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">{rating}</span>
          </div>
        </div>
        <button className="mt-4 w-full py-2 px-4 bg-accent hover:bg-accent-hover text-primary font-medium rounded transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
