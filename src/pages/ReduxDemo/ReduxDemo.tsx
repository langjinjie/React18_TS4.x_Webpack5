// 引入store
import { useEffect, useState } from 'react';
import store from 'src/storeRedux/index';
// 引入action
import {
  createDecrementAction,
  createIncrementAction,
  asyncIncrementAction
} from 'src/storeRedux/actionCreators/counter';
// import style from './style.module.less';

function ReduxDemo() {
  const [num, setNum] = useState(store.getState());

  useEffect(() => {
    // store.subscribe(() => store.getState());
    store.subscribe(() => {
      console.log('监听');
      setNum(store.getState());
    });
  }, []);
  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => store.dispatch(createDecrementAction(1))}
        >
          Increment
        </button>
        <span>{num}</span>
        <button
          aria-label='Decrement value'
          onClick={() => store.dispatch(createIncrementAction(1))}
        >
          Decrement
        </button>
        <button
          aria-label='Increment value'
          onClick={() => store.dispatch(asyncIncrementAction(1, 1000))}
        >
          AsyncIncrement
        </button>
      </div>
    </div>
  );
}

export default ReduxDemo;
