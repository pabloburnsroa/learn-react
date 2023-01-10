import { useState, useMemo } from 'react';

export default function LearnUseMemo() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);
  const themeStyles = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black',
  };

  return (
    <>
      <h1>How to use useMemo</h1>
      <div>
        <p>
          <code>useMemo</code> is a React Hook that lets you cache the result of
          a calculation between re-renders.
        </p>
      </div>
      <input
        type="number"
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
}

const slowFunction = (num) => {
  console.log('Calling Slow Function');
  for (let i = 0; i <= 1000000; i++) {}
  return num * 2;
};
