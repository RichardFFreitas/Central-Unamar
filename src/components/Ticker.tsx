import { Business } from "@/interfaces/Business";
import { News } from "@/interfaces/News";
import React, { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";

export const Ticker = () => {
  const { getBusinesses, getNews } = useSupabase();
  const [newBusiness, setNewBusiness] = useState<Business | null>(null);
  const [latestNews, setLatestNews] = useState<News | null>(null);
  const [topRatedBusiness, setTopRatedBusiness] = useState<Business | null>(null);

  // Buscar o comércio mais recente
  const fetchNewBusiness = async () => {
    const businesses = await getBusinesses();
    if (businesses && businesses.length > 0) {
      const latestBusiness = businesses.sort(
        (a, b) => b.created_at - a.created_at
      )[0];
      setNewBusiness(latestBusiness);
    }
  };

  // Buscar a notícia mais recente
  const fetchLatestNews = async () => {
    const newsList = await getNews();
    if (newsList && newsList.length > 0) {
      const latest = newsList.sort((a, b) => b.created_at - a.created_at)[0];
      setLatestNews(latest);
    }
  };

  const fetchTopRatedBusiness = async () => {
    const businesses = await getBusinesses();
    if (businesses && businesses.length > 0) {
        const highestRated = businesses.sort((a, b) => b.rating - a.rating)[0]; 
        setTopRatedBusiness(highestRated);
    }
};

  useEffect(() => {
    fetchNewBusiness();
    fetchLatestNews();
    fetchTopRatedBusiness();
  }, []);

  return (
    <div className="ticker mt-16">
      <div className="ticker-content">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-8">
            <span className="text-sm">
              Novo Comércio:{" "}
              {newBusiness
                ? `${newBusiness.name} ⭐ ${newBusiness.rating}`
                : "Carregando..."}
            </span>
            <span className="text-sm">
              Notícia: {latestNews ? `${latestNews.title} 🎉` : "Carregando..."}
            </span>
            <span className="text-sm">
            Comércio com maior avaliação: {topRatedBusiness ? `${topRatedBusiness.name} ⭐ ${topRatedBusiness.rating}` : "Carregando..."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
