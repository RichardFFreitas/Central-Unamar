import Header from "@/components/Header";
import SearchBar from "@/components/BusinessSearchBar";
import BusinessCard from "@/components/BusinessCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { Footer } from "@/components/Footer";
import { useSupabase } from "@/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Business } from "@/interfaces/Business";
import { News } from "@/interfaces/News";
import NewsCard from "@/components/NewsCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const Index = () => {
  const { getBusinesses, getNews } = useSupabase();
  const [allNews, setAllnews] = useState<News[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const newsData = await getNews();
      const formattedNewsData = newsData.map((news) => ({
        ...news,
        date: format(new Date(news.date), "dd-MM-yyyy", { locale: ptBR }),
      }));
      setAllnews(formattedNewsData || []);

      const businessesData = await getBusinesses();
      setAllBusinesses(businessesData || []);

      const enterpriseBusinesses =
        businessesData?.filter((business) => business.plan === "enterprise") ||
        [];
      setFeaturedBusinesses(enterpriseBusinesses);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-screen animate-spin">
          <LoaderCircle />
        </div>
      ) : (
        <div>
          {/* Hero Section */}
          <div className="relative bg-black h-[500px] flex items-center">
            <div className="absolute inset-0">
              <img
                src="/Unamar.jpg"
                alt="Unamar City"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Encontre os Melhores comércios de Unamar!
              </h1>
              <div className="max-w-2xl mx-auto">
                <SearchBar />
                <a href="https://wa.me/5522997586193?text=Ol%C3%A1%2C%20vim%20pela%20central%20unamar%2C%20e%20gostaria%20de%20saber%20como%20posso%20anunciar%20tamb%C3%A9m">
                  <button className="mt-8 bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors">
                    Fale com um de nossos atendentes.
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Featured Businesses */}
          <div className="flex flex-col w-[90%] justify-center mx-auto">
            {featuredBusinesses.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-8 text-center">
                  Comércios em destaque
                </h2>
                <FeaturedCarousel businesses={featuredBusinesses} />
              </>
            )}
          </div>

          <h2 className="text-3xl font-bold pt-4 text-gray-900 mb-8 mt-8 text-center">
            Todos os comércios
          </h2>
          <section className="mx-auto px-4 pb-4 sm:px-6 lg:px-8 xl:mr-80 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 w-[100%]">
              {allBusinesses.slice(0, 12).map((business) => (
                <BusinessCard
                  key={business.id}
                  id={business.id.toString()}
                  name={business.name}
                  category={business.category}
                  rating={business.rating}
                  photos={business.photos}
                  address={business.address}
                  whatsapp={business.whatsapp}
                  telephone={business.telephone}
                  plan={business.plan}
                />
              ))}
            </div>
            <Link
              to="/businesses"
              className="flex justify-center mt-8 font-medium rounded-xl w- text-xl border px-2 py-2 bg-primary text-white hover:bg-primary-hover"
            >
              Ver mais comércios
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-8 text-center">
              Principais notícias da região
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {allNews.map((news) => (
                <NewsCard
                  key={news.id}
                  id={news.id.toString()}
                  title={news.title}
                  date={news.date}
                  category={news.category}
                  image={news.image}
                  excerpt={news.excerpt}
                />
              ))}
            </div>
          </section>
          <div className="absolute right-5 bottom-0 top-[1063px] w-80 z-40 flex flex-col p-6 space-y-4">
            <Sidebar />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
