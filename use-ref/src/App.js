import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const inputRef = useRef();
  const prevName = useRef('');

  const focus = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    prevName.current = name;
  }, [name]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn the useRef() hook
        </a>
      </header>
      <div className="useRef">
        <input ref={inputRef} onChange={(e) => setName(e.target.value)} />
        <button onClick={focus}>Focus input</button>
      </div>

      <div className="prevValue">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          My name is {name} and it used be {prevName.current}
        </div>
        <p>
          Previous value of name is stored in a prevName variable using useRef()
          hook
        </p>
        <p>
          useRef() does not cause re-render of the component, unlike useState()
        </p>
      </div>
    </div>
  );
}

export default App;
