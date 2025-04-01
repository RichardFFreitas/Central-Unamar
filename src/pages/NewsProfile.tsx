import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';
import { News } from '@/interfaces/News';
import { LoaderCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet-async';

export default function NewsProfile() {
  const { getNews, getUser } = useSupabase(); // Adicionei getUser
  const [news, setNews] = useState<News | null>(null);
  const [author, setAuthor] = useState<string | null>(null); // Estado para o autor
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      if (id) {
        const data = await getNews(id);
        if (data && data.length > 0) {
          setNews(data[0]);
          setSelectedPhoto(data[0].images);
          fetchAuthor(data[0].user_id); // Buscar o autor
        }
      }
    };

    const fetchAuthor = async (userId: string) => {
      const user = await getUser(userId); // Buscar o usuário pelo ID
      if (user) {
        setAuthor(user.nome); // Pega o nome do usuário
      }
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return(
      <div className="flex justify-center items-center h-screen animate-spin"><LoaderCircle /></div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Helmet>
        <title>{news.title} - Central Unamar</title>
        <meta name="description" content={news.excerpt || "Leia mais sobre essa notícia na nossa plataforma."} />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">{news.title}</h1>
            {/* Photo Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="aspect-video relative">
                <img
                  src={selectedPhoto}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* News Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-primary font-semibold mt-1">{news.category}</h3>
                  <h4 className="text-primary font-medium mt-1">
                    {author ? `Por: ${author}` : "Carregando autor..."}
                  </h4>
                  <p className='text-pretty font-light mt-1'>{news.excerpt}</p>
                </div>
              </div>
                <div
                className='prose'
                dangerouslySetInnerHTML={{__html: `${news.content}`}}
                />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
