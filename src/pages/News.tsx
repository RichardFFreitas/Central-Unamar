import { useEffect, useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/NewsSearchBar";
import { useSearchParams } from "react-router-dom";
import { useSupabase } from "@/hooks/useSupabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CATEGORIES = ["Todas", "Economia e negócios", "Eventos e cultura", "Esportes", "Segurança pública", "Clima e trânsito", "Saúde"];

export default function News() {
  const { getNews } = useSupabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const formattedNewsData = news.map((news) => ({
              ...news,
              date: format(new Date(news.date), "dd-MM-yyyy", { locale: ptBR }),
            }));
            setNews(formattedNewsData || []);
    };
    fetchNews();
  }, [getNews]);

  
  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ search: query });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Regional News</h1>
            <SearchBar onSearch={handleSearch} initialQuery={initialSearch} />
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
            {filteredNews.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Não temos nenhuma notícia sobre isso.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
