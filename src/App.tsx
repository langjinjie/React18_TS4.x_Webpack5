import { Suspense } from 'react';
import 'src/App.css';
import 'src/App.less';
import { BrowserRouter, useRoutes } from 'react-router-dom-v6';
import { routerV6 } from './routes';

const RenderRoute: React.FC = () => {
  const element = useRoutes(routerV6);
  return element;
};

function App() {
  return (
    <Suspense fallback={'加载中...'}>
      <BrowserRouter>
        <RenderRoute />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
