import './App.css';

import LearnUseMemo from './learnUseMemo';
import MasteringUseEffect from './masteringUseEffect';
import Counter from './react-compound-components/Counter';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Lets practice our React skills!</header>
      {/* <LearnUseMemo /> */}
      {/* <MasteringUseEffect /> */}
      <div>
      <Counter>
          <Counter.Decrease icon="◀️" />
          <div>
            <Counter.Count />
          </div>
          <Counter.Increase icon="▶️" />
        </Counter>
      </div>
    </div>
  );
};

export default App;
