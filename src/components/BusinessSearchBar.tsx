import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialQuery?: string; // Adicionamos de volta como opcional
}

export default function BusinessSearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Sincroniza com a URL e initialQuery
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('search') || initialQuery;
    setSearchQuery(urlQuery);
  }, [location.search, initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const targetPath = '/businesses';

    const searchParams = new URLSearchParams();
    if (query) searchParams.set('search', query);

    if (location.pathname !== targetPath) {
      navigate(`${targetPath}?${searchParams.toString()}`);
    } else {
      navigate(`?${searchParams.toString()}`, { replace: true });
      onSearch?.(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar comércios..."
        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="w-5 h-5 text-gray-400" />
      </button>
    </form>
  );
}