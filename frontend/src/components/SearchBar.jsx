import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, isDarkMode }) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch(query);
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded && query) {
      setQuery("");
      onSearch("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Real-time search as user types
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      toggleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center transition-all duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
        {isExpanded ? (
          <>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-2 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
              }`}
              placeholder="Search notes..."
              autoFocus
            />
            <button
              onClick={toggleSearch}
              className={`absolute right-3 p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
              }`}
              aria-label="Close search"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </>
        ) : (
          <button
            onClick={toggleSearch}
            className={`ml-auto p-2 rounded-full transition-colors ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            aria-label="Open search"
          >
            <Search size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool
};

SearchBar.defaultProps = {
  isDarkMode: false
};

export default SearchBar;