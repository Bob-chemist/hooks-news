import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(response => setResults(response.data.hits));
  }, []);
  console.log(results);

  return (
    <ol>
      {results.map(item => {
        return (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        );
      })}
    </ol>
  );
}

export default App;
