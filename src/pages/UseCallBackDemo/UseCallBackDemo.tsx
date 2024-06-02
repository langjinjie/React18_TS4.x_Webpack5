import React, { useCallback, useState } from 'react';

const UseCallBackDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  const handAdd = () => {
    setCount(count + 1);
  };

  const handleAdd = useCallback(() => {
    setCount(count + 1);
  }, []);
  return (
    <div>
      <div>{count}</div>
      <button onClick={handAdd}>add</button>
      <button onClick={handleAdd}>callBackAdd</button>
    </div>
  );
};
export default UseCallBackDemo;
