import { useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetch';

const useStopWatch = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('useStopWatch useEffect');
    const interval = setInterval(() => {
      console.log(`Count: ${count}`);
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return count;
};

export default function MasteringUseEffect() {
  const [url, setUrl] = useState(null);
  const count = useStopWatch();
  const { data } = useFetch({
    url,
    onSuccess: () => console.log('Success....'),
  });
  console.log('App rendering...');
  return (
    <div>
      <h1>Lets master the useEffect hook</h1>
      <div>Using a custom useFetch hook to help us out...</div>
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => setUrl('/person1.json')}>person1</button>
      <button onClick={() => setUrl('/person2.json')}>person2</button>
      <div>
        What happens when we reference state inside a useEffect that alters that
        state...
        <p>Count: {count}</p>
      </div>
    </div>
  );
}
