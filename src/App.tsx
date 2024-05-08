import { Suspense } from 'react';
import 'src/App.css';
import 'src/App.less';
import { BrowserRouter, useRoutes } from 'react-router-dom-v6';
import { routerV6 } from './routes';
import StoreContext from './storeHook/index';

const RenderRoute: React.FC = () => {
  const element = useRoutes(routerV6);
  return element;
};

// 使用StoreContext包住所有的组件
function App() {
  return (
    <Suspense fallback={'加载中...'}>
      <StoreContext>
        <BrowserRouter>
          <RenderRoute />
        </BrowserRouter>
      </StoreContext>
    </Suspense>
  );
}

export default App;
