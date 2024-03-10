import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 模拟一个异步请求
const asyncIncrement = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(101);
    }, 1000);
  });
};

// 异步新增,createAsyncThunk的第一个参数需要在extraReducers中通过addCase进行监听处理
export const requestIncrement = createAsyncThunk('requestIncrement', async () => {
  const res = await asyncIncrement();
  return res;
});
// 异步减少
export const requestDecrement = createAsyncThunk('requestDecrement', async () => {
  const res = await asyncIncrement();
  return res;
});

export const counterSlice = createSlice({
  // 此处的name最好跟configureStore中的reducer中的名称一致
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle',
    error: null
  },
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload ?? 0;
    }
  },
  // 实现异步处理数据
  extraReducers(builder) {
    builder
      .addCase(requestIncrement.pending, state => {
        console.log('pending', state);
        state.status = 'loading';
      })
      .addCase(requestIncrement.fulfilled, (state, action) => {
        console.log('action', action);
        state.status = 'succeeded';
        state.value += action.payload as number;
      })
      .addCase(requestDecrement.pending, state => {
        console.log('pending', state);
        state.status = 'loading';
      })
      .addCase(requestDecrement.fulfilled, (state, action) => {
        console.log('action', action);
        state.status = 'succeeded';
        state.value -= action.payload as number;
      });
  }
});

// 每个 case reducer 函数会生成对应的 同步的 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
