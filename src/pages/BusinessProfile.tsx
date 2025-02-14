
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Star, MapPin, Phone, Globe, Facebook, Instagram, Twitter } from "lucide-react";

// Temporary mock data - will be replaced with real data from backend
const MOCK_BUSINESS = {
  id: "1",
  name: "Ocean View Restaurant",
  category: "Restaurant",
  rating: 4.8,
  description: "Experience the finest seafood with a breathtaking ocean view. Our restaurant offers fresh, locally-sourced ingredients prepared by expert chefs.",
  address: "123 Beach Road, Unamar Beach",
  telephone: "+55 (21) 99999-9999",
  website: "https://oceanview.example.com",
  socialMedia: {
    facebook: "oceanview",
    instagram: "oceanviewunamar",
    twitter: "oceanview",
  },
  photos: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
    "https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=800&q=80",
  ],
  reviews: [
    {
      id: "1",
      author: "John Doe",
      rating: 5,
      comment: "Amazing food and service! The view is breathtaking.",
      date: "2024-02-15",
    },
    {
      id: "2",
      author: "Jane Smith",
      rating: 4,
      comment: "Great atmosphere and delicious seafood. A bit pricey but worth it.",
      date: "2024-02-10",
    },
  ],
};

export default function BusinessProfile() {
  const { id } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState(MOCK_BUSINESS.photos[0]);

  // In a real app, we would fetch the business data based on the ID
  const business = MOCK_BUSINESS;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Photo Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="aspect-video relative">
                <img
                  src={selectedPhoto}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex gap-4 overflow-x-auto">
                {business.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                      selectedPhoto === photo ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                  <p className="text-primary font-medium mt-1">{business.category}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-xl font-bold text-gray-900">{business.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{business.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{business.telephone}</span>
                </div>
                {business.website && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {business.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                {business.socialMedia.facebook && (
                  <a
                    href={`https://facebook.com/${business.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {business.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${business.socialMedia.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {business.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${business.socialMedia.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
              <div className="space-y-6">
                {business.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.author}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
