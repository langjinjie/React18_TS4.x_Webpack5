import React, { useState } from 'react';
import style from './style.module.less';

const LzayDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  console.log('更新了~~');

  // 异步更新
  const handleUpdate = () => {
    setCount(count + 1);
    console.log('count: ', count);
    setIndex(index - 1);
    console.log('index: ', index);
  };

  // 异步更新
  const handleTimeoutUpdate = () => {
    setTimeout(() => {
      setCount(count + 1);
      console.log('count: ', count);
      setIndex(index - 1);
      console.log('index: ', index);
    }, 0);
  };

  return (
    <div className={style.wrap}>
      <span>count: {count}</span>
      <span>index: {index}</span>
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleTimeoutUpdate}>setTimeout更新</button>
    </div>
  );
};
export default LzayDemo;
