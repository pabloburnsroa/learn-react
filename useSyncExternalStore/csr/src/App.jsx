import './App.css';

import IncrementValue from './components/IncrementValue';
import DisplayValue from './components/DisplayValue';

function App() {
  return (
    <>
      <h3>UseSyncExternalStore - Client Side Rendering</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: 600,
          gap: '1rem',
        }}
      >
        <IncrementValue item="value1" />
        <DisplayValue item="value1" />
        <IncrementValue item="value2" />
        <DisplayValue item="value2" />
      </div>
    </>
  );
}

export default App;
