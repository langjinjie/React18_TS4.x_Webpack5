import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'src/storeHook';
import { usePrevious } from 'src/utils/useHook';
import style from './style.module.less';

const Demo = React.memo(
  class Demo extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { count: 0 };
    }

    componentDidMount(): void {
      console.log('DemoDidMount');
    }

    render() {
      return (
        <div>
          <h2>Demo</h2>
          <div>{this.state.count}</div>
        </div>
      );
    }
  }
);

const UseReducerDemo: React.FC = () => {
  // 使用context
  const { store, dispatch } = useContext(Context);

  const [count, setCount] = useState(0);

  const oldCount = usePrevious(count);

  const incr = () => {
    // setTimeout(() => {
    setCount(count + 1);
    // });
  };
  const handleAdd = () => {
    dispatch({ type: 'ADD', value: 1 });
  };

  useEffect(() => {
    console.log('UseReducerDemoDidMount');
  }, []);

  return (
    <div>
      <h1 className={style.count} onClick={incr}>
        <div>count:{count}</div>
        <div>oldCount{oldCount}</div>
      </h1>
      <div>count:{store?.count}</div>
      <button onClick={handleAdd}>Add</button>
      <Demo />
    </div>
  );
};
export default UseReducerDemo;
