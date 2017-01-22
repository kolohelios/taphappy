import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Header from './Header/Header';
import Home from './Home';
import Error404 from './Error404';
import About from './About';
import Play from './Play';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="play" component={Play}/>
      <Route path="about" component={About}/>
      <Route path="home" component={Home}/>
    </Route>
    <Route path="*" component={Error404}/>
  </Router>),
  document.getElementById('app')
);
