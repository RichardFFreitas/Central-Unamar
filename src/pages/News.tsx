
import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";

// Temporary mock data - will be replaced with backend data
const MOCK_NEWS = [
  {
    id: "1",
    title: "New Beach Cleanup Initiative Launches in Unamar",
    excerpt: "Local community groups partner with businesses to keep our beaches clean and beautiful.",
    date: "2024-02-14",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80",
    category: "Environment",
  },
  {
    id: "2",
    title: "Unamar Cultural Festival Announced",
    excerpt: "Annual celebration of local arts and culture set to take place next month.",
    date: "2024-02-13",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800&q=80",
    category: "Events",
  },
  {
    id: "3",
    title: "Local Businesses Report Tourism Surge",
    excerpt: "Tourism numbers show significant increase in visitor activity compared to last year.",
    date: "2024-02-12",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80",
    category: "Business",
  },
];

const CATEGORIES = ["All", "Environment", "Events", "Business", "Community", "Sports"];

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews = MOCK_NEWS.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Regional News</h1>
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No news articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
