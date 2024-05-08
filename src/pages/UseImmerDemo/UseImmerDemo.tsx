import React from 'react';
import { useImmer } from 'use-immer';
import style from './style.module.less';

const UseImmerDemo: React.FC = () => {
  const [info, setInfo] = useImmer({ name: 'jeff', age: 18, car: ['领克03', '智界S7'] });

  const handleAddCar = () => {
    setInfo(info => {
      info.car.push('问界M9');
    });
  };

  return (
    <div className={style.wrap}>
      <div>name:{info.name}</div>
      <div>age:{info.age}</div>
      <div>
        car:
        {info.car.map(item => {
          return <div key={item}>{item}</div>;
        })}
      </div>
      <button onClick={handleAddCar}>添加新车</button>
    </div>
  );
};
export default UseImmerDemo;
