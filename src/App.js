import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  console.log(results);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getData();
  };

  const clearQuery = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearQuery}>
          Clear
        </button>
      </form>
      {loading ? (
        <p>loading</p>
      ) : (
        <ol>
          {results.map(item => {
            return (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}

export default App;
