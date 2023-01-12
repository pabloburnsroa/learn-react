import IncrementValue from '../components/IncrementValue';
import DisplayValue from '../components/DisplayValue';
import ServerContext from '../context/ServerContext';
import store from '../src/store';

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        value1: 12,
        value2: 14,
      },
    },
  };
}

function App({ initialState }) {
  store.serverInitialize(initialState)
  return (
    <ServerContext.Provider value={initialState}>
      <div>
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
      </div>
    </ServerContext.Provider>
  );
}

export default App;
