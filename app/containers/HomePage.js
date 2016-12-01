// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';

import { fetchGames } from '../actions/gameActions';
import { getGames } from '../reducers/gameReducer'

class HomePage extends Component {
  componentDidMount() {
    this.porps.dispatch(fetchGames());
  };

  render() {
    return (
      <Home games={this.props.games}/>
    );
  }
}

HomePage.need = [() => { return fetchPosts(); }];

function mapStateToProps(state) {
  return {
    games: getGames(state),
  };
}

export default connect(mapStateToProps)(HomePage);
