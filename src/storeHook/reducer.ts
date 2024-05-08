// 定义一个useReducer的reducer\
// 定义一个初始化的state
export const initState = {
  count: 0
};
// 这个reducer有两个参数,一个是state,一个是action
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, count: state.count + action.value };
    default:
      return state;
  }
};
