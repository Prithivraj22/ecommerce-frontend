import React, { useState } from 'react';
import '../styles/styles.css'; 
import { items } from './items'; 

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery) {
      const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
      );
      setResults(filteredItems);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-page">
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for items..."
        className="search-input"
      />
      <ul className="search-results">
        {results.map(item => (
          <li key={item.id} className="search-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
      {results.length === 0 && query && <p>No items found</p>}
    </div>
  );
};

export default Search;
