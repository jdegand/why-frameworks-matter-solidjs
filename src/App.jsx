import { createSignal } from "solid-js";

const App = () => {

  const BASE_URL = 'https://hn.algolia.com/api/v1/';

  const doSearch = query => {
    const url = `${BASE_URL}search?query=${query}&hitsPerPage=200`;
    return fetch(url)
      .then(response => response.json())
      .then(result => setList(result.hits));
  }

  const [term, setTerm] = createSignal("");
  const [list, setList] = createSignal("");

  const handleSubmit = (event) => {
    event.preventDefault();
    doSearch(term())
    setTerm("")
  };

  return (
    <main class="App">
      <h1>Why Frameworks Matter - SolidJS</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-control">
          <label for="term">Search Hackernews for:</label>
          <input
            type="text"
            id="term"
            value={term()}
            onChange={(e) => setTerm(e.currentTarget.value)}
          />
        </div>
        <button>Submit</button>
      </form>
      {list() && <For each={list()}>{(item, i) =>
        <li>
          <a target="_blank" href={item.url}>
            {item.title}
          </a>
        </li>
      }</For>}
    </main>
  );
};

export default App;

/*

import { createSignal, createResource } from 'solid-js';
import styles from './App.module.css';

const BASE_URL = 'https://hn.algolia.com/api/v1/';

const doSearch = query => {
  const url = `${BASE_URL}search?query=${query}&hitsPerPage=200`;
  return fetch(url)
    .then(response => response.json())
    .then(result => result.hits);
}

function App() {

  const [results, setResults] = createSignal();
  const [list] = createResource(results, doSearch);

  return (
    <div class={styles.App}>
            
      <input
        type="text"
        placeholder="Search Hackernews for..."
        onInput={(e) => setResults(e.currentTarget.value)}
      />
      <button>Search</button>

      <For each={list()}>{(item, i) =>
        <li>
          <a target="_blank" href={item.url}>
            {item.title}
          </a>
        </li>
      }</For>
            
    </div>
  );
}

export default App;
*/
