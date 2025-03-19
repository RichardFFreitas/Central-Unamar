import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export const About = () => {
  return (
    <div>
      <Helmet>
        <title>Sobre Nós - Central Unamar</title>
        <meta name="description" content="Saiba mais sobre a Central Unamar, a plataforma que conecta moradores e visitantes aos melhores comércios e serviços da região." />
        <meta name="keywords" content="Central Unamar, Unamar, negócios locais, comércio, serviços, sobre nós" />
        <meta property="og:title" content="Sobre Nós - Central Unamar" />
        <meta property="og:description" content="Conheça a Central Unamar, a plataforma que facilita o acesso a comércios e serviços em Unamar." />
        <meta property="og:image" content="/ORLA-DE-Unamar.jpg" />
        <meta property="og:url" content="https://www.central-unamar.com.br/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      <div className="min-h-[720px] bg-white font-sans">
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-16">
          <div className="relative overflow-hidden rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105">
            <img
              src="/ORLA-DE-Unamar.jpg"
              alt="Beach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-20 hover:opacity-5 transition-opacity duration-300"></div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-6xl font-extrabold tracking-tight text-neutral-900">
              <span className="relative inline-block">
                Sobre nós
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary transform transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </span>
            </h1>

            <p className="text-xl leading-relaxed text-gray-800">
              A Central Unamar é uma plataforma criada para conectar moradores e
              visitantes aos melhores comércios e serviços da região.
            </p>

            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Nosso objetivo é facilitar o acesso a estabelecimentos locais,
                ajudando tanto os consumidores a encontrarem o que precisam
                quanto os empreendedores a expandirem seus negócios.
              </p>
              <p>
                Além disso, oferecemos um espaço para notícias e atualizações
                sobre Unamar, garantindo que você esteja sempre bem informado.
              </p>
            </div>

            <div className="pt-6">
              <Link to="/plans" className="px-8 py-3 bg-primary text-neutral-50 rounded-md font-medium tracking-wide transform transition-transform duration-300 hover:bg-primary-hover hover:translate-y-[-2px] hover:shadow-lg">
                Participar
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
