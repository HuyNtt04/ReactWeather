import { useState } from "react";
import { FaSearch, FaLocationArrow } from "react-icons/fa";

const SearchBar = ({ onSearch, onGetCurrentLocation }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập tên thành phố..."
            className="w-full py-2 px-4 pr-10 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          <FaSearch className="text-xl" />
        </button>
        <button
          type="button"
          onClick={onGetCurrentLocation}
          className="bg-green-500 text-white p-2 rounded-lg ml-2 hover:bg-green-600 transition-colors"
          aria-label="Vị trí hiện tại"
        >
          <FaLocationArrow className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
