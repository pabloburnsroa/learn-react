import { useEffect, useState } from 'react';
import store from '../store/store';
import { useSyncExternalStore } from 'react';

/*
const useStore = (selector = (state) => state) => {
  const [state, setState] = useState(selector(store.getState()));
  useEffect(() => store.subscribe((state) => setState(selector(state))), []);

  return state;
};

export default useStore;

*/

const useStore = (selector = (state) => state) =>
  useSyncExternalStore(store.subscribe, () => selector(store.getState()));

export default useStore;
