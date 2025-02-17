import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
              >
                Registre seu Comércio
              </Link>
            </nav>

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
                className="text-White hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/businesses"
                className="text-White hover:text-primary transition-colors"
              >
                Businesses
              </Link>
              <Link
                to="/plans"
                className="text-White hover:text-primary transition-colors"
              >
                Plans
              </Link>
              <Link
                to="/about"
                className="text-White hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-White hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors text-center"
              >
                Register Business
              </Link>
            </nav>
          </div>
        )}
      </header>
      <div className="ticker mt-16">
        <div className="ticker-content">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-8">
              <span className="text-sm">Featured: Café Marina ⭐ 4.8</span>
              <span className="text-sm">New: Tech Hub Opening 🎉</span>
              <span className="text-sm">Top Rated: Wellness Spa ⭐ 4.9</span>
              <span className="text-sm">
                Special Offer: 20% off Premium Plans 🔥
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
