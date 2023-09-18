import './App.css';
import CompoundComponentPattern from './compoundComponentPattern';
import LearnUseMemo from './learnUseMemo';
import MasteringUseEffect from './masteringUseEffect';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Lets practice our React skills!</header>
      {/* <LearnUseMemo /> */}
      {/* <MasteringUseEffect /> */}
      <CompoundComponentPattern/>
    </div>
  );
};

export default App;
