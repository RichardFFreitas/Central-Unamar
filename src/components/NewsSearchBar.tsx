import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Se estiver na página news, usa o onSearch
      if (window.location.pathname === '/news') {
        onSearch?.(searchQuery);
      } else {
        // Se não, redireciona para news com o query parameter
        navigate(`/news?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar Notícias..."
        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <Search className="w-5 h-5 text-gray-400" />
      </button>
    </form>
  );
}
