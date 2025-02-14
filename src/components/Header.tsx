
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Central Unamar</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </a>
            <a href="/businesses" className="text-gray-700 hover:text-primary transition-colors">
              Businesses
            </a>
            <a href="/plans" className="text-gray-700 hover:text-primary transition-colors">
              Plans
            </a>
            <a href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </a>
            <a href="/businesses" className="text-gray-700 hover:text-primary transition-colors">
              Businesses
            </a>
            <a href="/plans" className="text-gray-700 hover:text-primary transition-colors">
              Plans
            </a>
            <a href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
