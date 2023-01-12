# React Knowledge Base

## UseEffect Cleanup Functions

UseEffect can optionally have a cleanup function after it. When the values changes, the original cleanup func is called before useEffect func is called.

```
useEffect(() =>
let isCancelled = false
fetch()
  .then((res) => res.json())
  .then((json) => {
    if(!isCancelled){
      setData(json)
    }
  })
return () => {
isCancelled = true
}
}, [])
```

Above ^
If component gets unmounted, cancel the current fetch if it hasn't already completed.

## Referencing state inside a useEffect that alters that state

TODO

## You don't need useEffect for transforming data

Updating total - when items change thats an effect. We can do this directly inside of the function instead of within a useEffect. We can use a useMemo() only when really need to (i.e. expensive calculations)

```
const total = items.reduce((currentTotal,item) => {
  return currentTotal + item.price;
}, 0);
```

## You don't need use effect to communicate with parents

We can use an eventHandler() instead
Below, we might be introducing additional renders

```
useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpen]);
```

May be better to move these affects (onOpen()... ) closer to where the state changed happened.

```
function toggleView() {
    const nextIsOpen = !isOpen;
    setIsOpen(!isOpen);
    if (nextIsOpen) {
      onOpen();
    } else {
      onClose();
    }
  }
```

We can even refactor it into a hook

```
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
```

## You don't need useEffect for subscribing to external stores

useSyncExternalStore() instead???

```
function Product({ id }) {
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
```

## You don't need useEffect for fetching data
renderAsYouFetch()

Use frameworks
useQuery() from react-query works well for fetching data
Next.js - getServerSideProps()

