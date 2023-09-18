function createStore(initialState) {
  let currentState = initialState;
  // Keep track of listeners using a Set DS
  const listeners = new Set();
  let isInitialized = false;
  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState;
      // Iterate over the listeners and will call that listening function w/ the current state
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    // Initialize store on client side
    serverInitialize: (initialState) => {
      // Only set state if not initialized
      if (!isInitialized) {
        currentState = initialState;
        isInitialized = true;
      }
    },
  };
}

const store = createStore({
  value1: 0,
  value2: 0,
});

export default store;
