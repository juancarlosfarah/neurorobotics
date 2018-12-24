import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../units/home/Home';
import Templates from '../units/templates/Templates';
import Workspace from '../units/workspace/Workspace';
import {
  HOME_PATH,
  TEMPLATES_PATH,
  WORKSPACE_PATH,
} from '../../config/paths';
import ScrollToTop from './ScrollToTop';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    // allow space for header
    this.setState({ height: window.innerHeight - 100 });
  };

  render() {
    const { height } = this.state;
    return (
      <main style={{ height }}>
        <ScrollToTop>
          <Switch>
            <Route exact path={HOME_PATH} component={Home} />
            <Route exact path={TEMPLATES_PATH} component={Templates} />
            <Route exact path={WORKSPACE_PATH} component={Workspace} />
          </Switch>
        </ScrollToTop>
      </main>
    );
  }
}


export default Main;
