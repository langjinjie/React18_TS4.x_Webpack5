// 引入 createStore 用于创建store
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// 引入为对应的reducer
import counter from './reducers';

// 创建 Redux store 来存放应用的状态。applyMiddleware(thunk)异步action必须
export default createStore(counter, applyMiddleware(thunk));
