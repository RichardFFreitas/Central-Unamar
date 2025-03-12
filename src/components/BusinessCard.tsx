import React, { useState } from "react";
import {
  Star,
  MapPin,
  Globe,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Business } from "@/interfaces/Business";

const BusinessCard = ({
  id,
  name,
  category,
  rating,
  photos = [],
  address,
  telephone,
  plan,
}: Business) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const whatsapp =
    telephone + "?text=Ol%C3%A1%20vim%20pelo%20site%20central%20unamar";

  return (
    <div className="relative bg-white rounded-lg overflow-hidden group h-[300px]">
      {/* photos */}
      <div className="relative h-full w-full">
        {photos.length === 0 ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sem fotos</span>
          </div>
        ) : (
          photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${name} - Foto ${index + 1}`}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        )}

        {/* Controles do Carrossel (se houver mais de uma foto) */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className=" z-50 absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="z-50 absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Destaque Badge - Só aparece se plan for enterprise */}
      {plan === "enterprise" && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium z-10">
          Destaque
        </div>
      )}
      {/* Hover Content */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            {plan === "enterprise" && (
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 mt-4 rounded">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-white">
                  {rating}
                </span>
              </div>
            )}
          </div>
          <p className="text-white/80 text-sm mb-2">{category}</p>
          <div className="flex items-center text-white/80 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {address}
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
          {plan === "enterprise" && (
            <Link
              to={`/business/${id}`}
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
            >
              <Globe className="w-4 h-4 mr-2" />
              Visitar a Pagina
            </Link>
          )}

          {plan === "professional" && (
            <Link
              to={`/business/${id}`}
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
            >
              <Globe className="w-4 h-4 mr-2" />
              Visitar a Pagina
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
