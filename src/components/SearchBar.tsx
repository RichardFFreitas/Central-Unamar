
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search businesses by name, category, or location..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}
