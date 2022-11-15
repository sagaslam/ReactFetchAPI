import "./styles.css";
import { useState } from "react";

export default function App() {
  // state for textbox
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  // fetch api

  const fetchAPI = async () => {
    const syns = await fetch(`https://api.datamuse.com/words/?rel_syn=${word}`);
    const resp = await syns.json();
    console.table(resp);
    setSynonyms(resp); // Side-effect logic...
  };

  const handleFetchSyn = (e) => {
    e.preventDefault();
    setWord(e.target.value);
    fetchAPI();
  };

  return (
    <div className="App">
      <form onSubmit={handleFetchSyn}>
        <label htmlFor="word-input">Your word</label>
        <input
          onChange={(e) => setWord(e.target.value)}
          id="word-input"
        ></input>
        <button>Submit</button>
        <ul>
          {synonyms.map((synn) => {
            return <li key={synn.index}>{synn.word}</li>;
          })}
        </ul>
      </form>
    </div>
  );
}
