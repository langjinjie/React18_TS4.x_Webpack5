/*
该文件专门为count组件生成action对象
*/
// 加法
function createIncrementAction(data: number) {
  return { type: 'INCREMENT', data };
}

// 减法
function createDecrementAction(data: number) {
  return { type: 'DECREMENT', data };
}

// 异步
function asyncIncrementAction(data: number, time: number) {
  return (dispatch: any) => {
    setTimeout(() => dispatch(createIncrementAction(data)), time);
  };
}

export { createIncrementAction, createDecrementAction, asyncIncrementAction };
