import { Suspense } from 'react';
import 'src/App.css';
import 'src/App.less';
import Index from 'src/pages/Index/Index';

function App() {
  return (
    <Suspense fallback={'加载中...'}>
      <Index />
    </Suspense>
  );
}

export default App;
