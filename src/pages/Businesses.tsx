import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/BusinessSearchBar";
import BusinessCard from "@/components/BusinessCard";
import { useSupabase } from "@/hooks/useSupabase";
import { CATEGORIES } from "@/constantes/categories";
import { LOCATIONS } from "@/constantes/locations";
import { Business } from "@/interfaces/Business";
import { LoaderCircle } from "lucide-react";


export default function Businesses() {
  const { getBusinesses } = useSupabase();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLocation, setSelectedLocation] = useState("Todos");

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    setLoading(true);
    const data = await getBusinesses();
    setBusinesses(data || []);
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ search: query });
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || business.category === selectedCategory;
    const matchesLocation = selectedLocation === "Todos" || business.address.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-screen animate-spin"><LoaderCircle /></div>
          ) : (
            <>
              <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Descubra Negócios Locais
                </h1>
                <SearchBar 
                  onSearch={handleSearch} 
                  initialQuery={initialSearch}
                />
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
                  <BusinessCard
                  key={business.id}
                  id={business.id.toString()}
                  name={business.name}
                  category={business.category}
                  rating={business.rating || 0}
                  photos={business.photos}
                  address={business.address}
                  whatsapp={business.whatsapp}
                  telephone={business.telephone}
                  plan={business.plan}
                  />
                ))}
              </div>

              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Nenhum negócio encontrado com os critérios selecionados.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
