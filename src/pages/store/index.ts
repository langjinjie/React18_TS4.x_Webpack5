import { configureStore } from '@reduxjs/toolkit';

// 引入counterSlice
import counterReducer from './counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});
