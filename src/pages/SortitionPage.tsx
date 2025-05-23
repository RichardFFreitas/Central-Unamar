import Header from "@/components/Header";
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileUser,
  Fish,
  Info,
  Mail,
  MailCheck,
  MessageCircleWarning,
  Smartphone,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function SortitionPage() {
  return (
    <div>
      <Header />
      <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black min-h-screen font-sans text-white">
        <div className="w-full max-w-[1200px] mx-auto p-6 md:p-8 lg:p-12">
          {/* Header Section */}
          <header className="flex flex-col items-center justify-center text-center mb-12 pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-red-600 drop-shadow-lg transform hover:scale-[1.01] transition-transform">
              Participe do sorteio da Central Unamar e concorra a um Rodizio de
              comida japonesa para 2 pessoas no IKON!
            </h1>
            <h2 className="text-xl md:text-2xl max-w-3xl mx-auto font-light mb-8">
              É fácil, gratuito e você ainda conhecerá o novo portal da cidade!
            </h2>
            <div className="w-20 h-1 bg-yellow-300 rounded-full mb-8"></div>
          </header>

          {/* Hero Image Section */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="IKON Japanese Restaurant"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  IKON Restaurante Japones
                </h3>
                <p className="text-sm md:text-base">
                  A melhor experiência de Rodizio japonês em Unamar, RJ
                </p>
              </div>
            </div>
          </div>

          {/* How to Participate Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-red-600 text-white px-4 py-1 rounded-full">
                Como participar
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-white/15 hover:translate-y-[-5px]">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Nos siga no instagram
                </h3>
                <p className="mb-4">
                  Siga @central_unamar no Instagram para ficar ligado nos
                  próximos sorteios e sobre as notícias da região
                </p>
                <span className="material-symbols-outlined text-5xl text-white/70">
                  <UserPlus />
                </span>
              </div>

              {/* Step 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-white/15 hover:translate-y-[-5px]">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Registre-se no Portal
                </h3>
                <p className="mb-4">
                  Crie sua conta no Central Unamar para poder acompanhar as
                  notícias da região, conhecer novos comércios, ficar por dentro
                  de novos eventos e oportunidades de emprego em unamar!
                </p>
                <span className="material-symbols-outlined text-5xl text-white/70">
                  <FileUser />
                </span>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:bg-gray-800 hover:translate-y-[-5px] border border-gray-800">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Comente no instagram
                </h3>
                <p className="mb-4">
                  Comente o email que você utilizou para se registrar na
                  plataforma e marque 2 amigos.
                </p>
                <span className="material-symbols-outlined text-5xl text-white/70">
                  <MailCheck />
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <a
                href="https://instagram.com/central_unamar"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Participe Agora</span>
                <span className="material-symbols-outlined">
                  <ArrowRight />
                </span>
              </a>
            </div>
          </section>

          {/* Rules Section */}
          <section className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-16 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Regras do Sorteio
            </h2>

            <ul className="space-y-3 max-w-2xl mx-auto">
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-yellow-300 flex-shrink-0 mt-1">
                  <Calendar />
                </span>
                <div>
                  <p>O sorteio será até o dia 31/06</p>
                  <small>no dia 01/07 iremos revelar o resultado</small>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-red-600 flex-shrink-0 mt-1">
                  <MessageCircleWarning />
                </span>
                <p>
                  O resultado será publicado no Instagram{" "}
                  <a
                    href="https://www.instagram.com/central_unamar/"
                    className="text-blue-400"
                  >
                    @central_unamar
                  </a>
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-yellow-300 flex-shrink-0 mt-1">
                  <CheckCircle2 />
                </span>
                <p>Válido apenas para os que fizerem as 3 etapas.</p>
              </li>
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-yellow-300 flex-shrink-0 mt-1">
                  <Fish />
                </span>
                <p>
                  O premio será um rodizio para duas pessoas no restaurante IKON
                  em Unamar, RJ
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-red-600 flex-shrink-0 mt-1">
                  <Info />
                </span>
                <p>
                  O prêmio é intransferível e não pode ser trocado por dinheiro
                </p>
              </li>
            </ul>
          </section>

          {/* Beach Visual Section */}
          <div className="relative w-full h-[200px] md:h-[250px] rounded-2xl overflow-hidden mb-16 shadow-xl">
            <img
              src="/ORLA-DE-Unamar.jpg"
              alt="Unamar Beach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold">
                  Descubra Unamar, RJ
                </h3>
                <p>
                  Os melhores comércios, serviços e notícias da região em um
                  lugar só
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              <div>
                <span className="text-2xl font-bold text-primary">
                  Central Unamar
                </span>
                <p className="text-sm opacity-75">
                  O mais novo portal de comercios, serviços e notícias da
                  região, em Unamar, RJ.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-yellow-300 transition-colors flex items-center"
                    >
                      <span className="material-symbols-outlined mr-2 text-sm">
                        <ArrowRight />
                      </span>{" "}
                      Portal
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/central_unamar/"
                      target="_blank"
                      className="hover:text-red-600 transition-colors flex items-center"
                    >
                      <span className="material-symbols-outlined mr-2 text-sm">
                        <ArrowRight />
                      </span>{" "}
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Fale conosco</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2">
                      <Smartphone />
                    </span>
                    <a
                      href="https://wa.me/5522997586193"
                      className="hover:text-red-600 transition-colors"
                    >
                      +55 22 99758-6193
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2">
                      <Mail />
                    </span>
                    <a
                      href="mailto:contato@centralunamar.com.br"
                      className="hover:text-red-600 transition-colors"
                    >
                      contato@centralunamar.com.br
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Siga-nos</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://www.instagram.com/central_unamar/"
                    target="_blank"
                    className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-blue-800 transition-all"
                  >
                    <i className="fa-brands fa-instagram">
                      <SiInstagram />
                    </i>
                  </a>
                  <a
                    href="https://www.facebook.com/people/Central-Unamar/61575040281604/"
                    target="_blank"
                    className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                  >
                    <i className="fa-brands fa-facebook-f">
                      <SiFacebook />
                    </i>
                  </a>
                  <a
                    href="https://wa.me/5522997586193"
                    target="_blank"
                    className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                  >
                    <i className="fa-brands fa-twitter">
                      <SiWhatsapp />
                    </i>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center py-6 border-t border-white/10 text-sm opacity-75">
              <p>© 2025 Central Unamar. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SortitionPage;
