


// import { useState } from 'react';
// import PropTypes from 'prop-types';

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     onSearch(query);
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4">
//       <div className="relative">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Search notes..."
//         />
//         <button 
//           onClick={handleSearch}
//           className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// SearchBar.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };

// export default SearchBar;







import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search notes..."
        />
        <button 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
