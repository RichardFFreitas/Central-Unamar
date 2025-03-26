import { Menu, Search, X, User2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginPopup from "./LoginPopUp";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useSupabase } from "@/hooks/useSupabase";
import { Business } from "@/interfaces/Business";
import Ticker from "./Ticker";



export default function Header() {
  const { getBusiness } = useSupabase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen((prev) => !prev);
  };

  

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className=" mr-6 space-x-2">
              <span className="text-2xl font-bold text-primary">
                Central Unamar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/businesses"
                className="text-white hover:text-primary transition-colors"
              >
                Comércios
              </Link>
              <Link
                to="/plans"
                className="text-white hover:text-primary transition-colors"
              >
                Planos
              </Link>
              <Link
                to="/news"
                className="text-white hover:text-primary transition-colors"
              >
                Notícias
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-primary transition-colors"
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-primary transition-colors"
              >
                Contato
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <User2Icon className="text-white cursor-pointer"/>
                </PopoverTrigger>

                <PopoverContent
                  align="center"
                  sideOffset={4}
                  className="w-80 p-4 bg-white rounded-md shadow-lg"
                >
                  <LoginPopup />
                </PopoverContent>
              </Popover>
            </nav>
            {isLoginPopupOpen && <LoginPopup />}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden bg-white p-2 rounded-lg hover:bg-grey-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-red" />
              ) : (
                <Menu className="w-6 h-6 text-red" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/"
                className=" hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/businesses"
                className=" hover:text-primary transition-colors"
              >
                Comércios
              </Link>
              <Link
                to="/plans"
                className=" hover:text-primary transition-colors"
              >
                Planos
              </Link>
              <Link
                to="/news"
                className=" hover:text-primary transition-colors"
              >
                Notícias
              </Link>
              <Link
                to="/about"
                className=" hover:text-primary transition-colors"
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                className=" hover:text-primary transition-colors"
              >
                Contato
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <span>Fazer login</span>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  sideOffset={4}
                  className="w-80 p-4 bg-white rounded-md shadow-lg"
                >
                  <LoginPopup />
                </PopoverContent>
              </Popover>
            </nav>
          </div>
        )}
      </header>
      <Ticker />
    </>
  );
}
