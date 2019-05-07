import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  console.log(results);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
      setError(null);
    } catch (error) {
      setError(error);
    }
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
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks news</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={clearQuery}
          className="bg-teal text-white p-1 rounded"
        >
          Clear
        </button>
      </form>
      {loading ? (
        <p className="font-bold text-orange-dark">loading</p>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(item => {
            return (
              <li key={item.objectID}>
                <a
                  href={item.url}
                  className="text-indigo-dark
                  hover:text-indigo-darkest"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}

export default App;
