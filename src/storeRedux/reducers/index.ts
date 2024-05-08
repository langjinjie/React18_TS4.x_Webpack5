/*
该文件是用于创建一个为count组件提供reducer的文件
*/
import { AnyAction /* , Reducer */ } from 'redux';

// const counter: Reducer<number, AnyAction> = (state, action) => {
//   const { type, data } = action;
//   switch (type) {
//     case 'INCREMENT':
//       return state + data;
//     case 'DECREMENT':
//       return (state ?? 999) - data;
//     default:
//       return 999;
//   }
// };

function counter(state: number | undefined, action: AnyAction): number {
  const { type, data } = action;
  switch (type) {
    case 'INCREMENT':
      return state + data;
    case 'DECREMENT':
      return (state ?? 999) - data;
    default:
      return 999;
  }
}

export default counter;
