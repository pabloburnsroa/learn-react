import { useEffect, useState } from 'react';
import store from '../src/store';
import { useSyncExternalStore } from 'react';
import { useContext } from 'react';
import ServerContext from '../context/ServerContext';

/*
const useStore = (selector = (state) => state) => {
  const [state, setState] = useState(selector(store.getState()));
  useEffect(() => store.subscribe((state) => setState(selector(state))), []);

  return state;
};

export default useStore;

*/

const useStore = (selector = (state) => state) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(useContext(ServerContext))
  );

export default useStore;
