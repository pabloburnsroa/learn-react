# useSyncExternalStore && Client Side Rendering

## Synchronizing the react state and the state of the store...

## But first lets create our own store first before using useSyncExternalStore

How do we create a connection between store and react app?
We need to subscribe to the store... create a subscribe function on the createStore function

```
subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
```

return an unsubscribe function when you subscribe

Call listeners when you set state:

```
setState: (newState) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
},
```

## Create custom hook that will connect the store with the app

Subscribe to the store and update the state when changes occur. Will use this hook wherever we display the value of store

```
const useStore = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => store.subscribe(setState), []);

  return state;
};

```

### We should be able to implement a selector to be more specific about the state we want to listen to

```
const useStore = (selector = (state) => state) => {
  const [state, setState] = useState(selector(store.getState()));
  useEffect(() => store.subscribe((state) => setState(selector(state))), []);

  return state;
```

### Using useSyncExternalStore instead...

```
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```
