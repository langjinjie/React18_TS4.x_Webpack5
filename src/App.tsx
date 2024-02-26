import 'src/App.css';
import 'src/App.less';
import Layout from 'src/Layouts/Layouts';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { lazy } from 'react';

const NotFound = lazy(() => import('src/pages/NotFound/NotFound'));

function App() {
  return (
    <Router basename='/admin'>
      <Switch>
        <Route path='/404' component={NotFound} />
        <Route path='/*' component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
