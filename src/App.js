import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reacthooks');

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [query]);
  console.log(results);

  const getData = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
  };

  return (
    <>
      <input type="text" onChange={event => setQuery(event.target.value)} />
      <ol>
        {results.map(item => {
          return (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default App;
