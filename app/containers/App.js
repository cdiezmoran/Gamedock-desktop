// @flow
import React, { Component, PropTypes } from 'react';

import MenuHeader from '../components/MenuHeader';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div id="container">
        <section id="menu">
          <MenuHeader />
        </section>
        <div id="content-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
