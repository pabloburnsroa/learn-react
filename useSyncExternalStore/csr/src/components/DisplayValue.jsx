import useStore from '../hooks/useStore';

const DisplayValue = ({ item }) => (
  <div>
    {item}: {useStore((state) => state[item])}
  </div>
);

export default DisplayValue;
