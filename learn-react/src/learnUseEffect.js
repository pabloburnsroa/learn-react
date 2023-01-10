// You dont need useEffect for transforming data

import { useSyncExternalStore } from 'react';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';

// How not to use useEffect()
function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      items.reduce((currentTotal, item) => {
        return currentTotal + item.price;
      }, 0)
    );
  }, [items]);

  // ...
}

// Better approach?
function Cart2() {
  const [items, setItems] = useState([]);
  // We can calculate total directly inside of the component
  const total = items.reduce((currentTotal, item) => {
    return currentTotal + item.price;
  }, 0);
  // You can use useMemo() if you have an expensive calculation but don't overload useMemo as you are trading performance for memory
  const totalWithUseMemo = useMemo(
    () =>
      items.reduce((currentTotal, item) => {
        return currentTotal + item.price;
      }, 0),
    [items]
  );

  // ...
}

// You don't need useEffect for communicating with parents
function Product({ onOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Toggle Quick View
      </button>
    </div>
  );
}

// Move the effects closer to where the state changes happen
function Product2({ onOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleView() {
    const nextIsOpen = !isOpen;
    setIsOpen(!isOpen);
    if (nextIsOpen) {
      onOpen();
    } else {
      onClose();
    }
  }
  return (
    <div>
      <button onClick={toggleView}>Toggle Quick View</button>
    </div>
  );
}

// We can create a hook instead
function useToggle({ onOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggler() {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    if (nextIsOpen) {
      onOpen();
    } else {
      onClose();
    }
  }

  return [isOpen, toggler];
}

function Product3({ onOpen, onClose }) {
  const [isOpen, toggler] = useToggle({ onOpen, onClose });

  return (
    <div>
      <button onClick={toggler}>Toggle Quick View</button>{' '}
    </div>
  );
}

// You don't need useEffect for subscribing to external stores
// :(
function Store() {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    // if you're setting state, might be a warning sign that you might be able to refactor out this useEffect
    const sub = storeApi.subscribe(({ status }) => {
      setIsConnected(status === 'connected');
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);
}

// We can the useSyncExternalStore hook
// :)
function Product4({ id }) {
  const isConnected = useSyncExternalStore(
    // subscribe
    storeApi.subscribe,
    // get snapshot
    () => storeApi.getStatus() === 'connected',
    // get server snapshot so can run on server side rendering
    true
  );
  // ....
}

// You don't need useEffect for fetching data, better way is to render as you fetch
// :(
function Store2() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let isCanceled = false;
    getItems().then((data) => {
      if (isCanceled) return;
      setItems(data);
    });
    return () => {
      isCanceled = true;
    };
  }, []);
}

// If using NEXT.js
function Store3({ items }) {
  //...
}

export async function getServerSideProps() {
  const items = await getItems();
  return { props: { items } };
}

/* 
useQuery()
useSWR()
use()
*/

// You don't need useEffect for handling user events.. useEventHandler() instead....

function handlingUserEvent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div>
      <form
        onSubmit={(event) => {
          if (isLoading) {
            return;
          }
          // side-effect!
          submitData(event)
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              setError(err);
            });

          setIsLoading(true);
        }}
      >
        {/* ... */}
      </form>
    </div>
  );
}

// Extract logic above to a hook?

const [state, send] = useCheckoutForm();

<form
  onSubmit={(event) => {
    send({ type: 'submit', data: event });
  }}
></form>;

export default function learnUseEffect() {
  return (
    <div>
      <h1>Learn how to use useEffect</h1>
    </div>
  );
}
