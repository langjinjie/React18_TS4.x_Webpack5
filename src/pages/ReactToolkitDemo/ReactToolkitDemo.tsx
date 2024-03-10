import { useSelector, useDispatch } from 'react-redux';
// 引入actions
import {
  decrement,
  increment,
  incrementByAmount,
  requestIncrement,
  requestDecrement
} from 'src/pages/store/counterSlice';
// import style from './style.module.less';

export default function ReactToolkitDemo() {
  // 获取store中的reducer中的对象
  const { counter } = useSelector(state => state) as {
    counter: { value: number; status: string };
  };
  console.log('status', counter.status);
  // 相当于以前的store.dispatch
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label='Increment value' onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{counter?.value ?? 0}</span>
        <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button aria-label='Decrement value' onClick={() => dispatch(incrementByAmount(99))}>
          incrementByAmount
        </button>
        <br />
        <button
          aria-label='Increment value'
          disabled={counter.status === 'loading'}
          onClick={() => dispatch(requestIncrement())}
        >
          AsyncIncrement
        </button>
        <button
          aria-label='Increment value'
          disabled={counter.status === 'loading'}
          onClick={() => dispatch(requestDecrement())}
        >
          AsyncIncrement
        </button>
      </div>
    </div>
  );
}
