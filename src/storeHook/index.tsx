// 定义一个Store组件
import React, { createContext, useReducer } from 'react';
import { initState, reducer } from './reducer';

// 使用useContext创建一个Context
export const Context = createContext<{ [key: string]: any }>({});

const StoreContext: React.FC<any> = ({ children }) => {
  // 使用useReducer管理state
  const [store, dispatch] = useReducer(reducer, initState);
  return <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>;
};
export default StoreContext;
