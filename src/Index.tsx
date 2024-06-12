/* 入口文件 */
// 引入react-dom
import { createRoot } from 'react-dom/client';

// 引入App组件
import App from 'src/App';

// 引入Redux
import store from 'src/store/index';
import { Provider } from 'react-redux';

// 获取root节点
const root = document.getElementById('root');

console.log(root?.nodeType);
console.log(root?.firstChild);
// 判断是否存在
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
