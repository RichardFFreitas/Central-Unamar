
import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BusinessCard from "@/components/BusinessCard";

// Temporary mock data - will be replaced with real data from backend
const MOCK_BUSINESSES = [
  {
    id: "1",
    name: "Ocean View Restaurant",
    category: "Restaurant",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    location: "Unamar Beach",
  },
  {
    id: "2",
    name: "Sunset Beach Hotel",
    category: "Hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    location: "Central Unamar",
  },
  {
    id: "3",
    name: "Waves Surf Shop",
    category: "Retail",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=800&q=80",
    location: "Harbor District",
  },
];

const CATEGORIES = [
  "All",
  "Restaurant",
  "Hotel",
  "Retail",
  "Service",
  "Entertainment",
  "Healthcare",
];

const LOCATIONS = ["All", "Unamar Beach", "Central Unamar", "Harbor District"];

export default function Businesses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredBusinesses = MOCK_BUSINESSES.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || business.category === selectedCategory;
    const matchesLocation = selectedLocation === "All" || business.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Local Businesses</h1>
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full md:w-48 px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No businesses found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
