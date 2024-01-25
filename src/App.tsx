// import { lazy } from 'react';
import 'src/App.css';
import 'src/App.less';
import Layout from 'src/Layouts/Layouts';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loading } from './components';

const NotFound = lazy(() => import('src/pages/NotFound/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router basename='/admin'>
        <Switch>
          <Route path='/404' component={NotFound} />
          <Route path='/' component={Layout} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
