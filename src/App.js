import React, { useEffect, useState } from "react";
import wordList from "./resources/words.json";

const MAX_TYPED_KEYS = 30;

const getWord = () => {
  const index = Math.floor(Math.random() * wordList.length);
  const word = wordList[index];
  return word.toLowerCase();
};

const isValidKey = (key, word) => {
  if (!word) return false;
  const result = word.split("").includes(key);
  return result;
};

const Word = ({ word, validKeys }) => {
  if (!word) return null;

  const joinedKeys = validKeys.join("");
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);
  return (
    <>
      <span className="matched">{matched}</span>
      <span className="remainder">{remainder}</span>
    </>
  );
};

const App = () => {
  const [typedKeys, setTypedKeys] = useState([]);
  const [validKeys, setValidKeys] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    setWord(getWord());
  }, []);

  const handleKeyDown = (event) => {
    event.preventDefault();
    const { key } = event;
    setTypedKeys((prev) => [...prev, key].slice(MAX_TYPED_KEYS * -1));

    if (isValidKey(key, word)) {
      setValidKeys((prev) => {
        const isValidLength = prev.length <= word.length;
        const isNextChar = isValidLength && word[prev.length] === key;
        return isNextChar ? [...prev, key] : prev;
      });
    }
  };

  return (
    <div className="container" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>
      <div className="typed-keys">{typedKeys ? typedKeys.join(" ") : null}</div>
      <div className="completed-words">
        <ol>
          <li>Carro</li>
          <li>Cidade</li>
          <li>Arbusto</li>
        </ol>
      </div>
    </div>
  );
};

export default App;
