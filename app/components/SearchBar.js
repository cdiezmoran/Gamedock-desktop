/*
* Created on Tue Nov 8 2016
*
* Searchbar component that handles user input for searching.
*
*/

import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" placeholder=" &#xF002; Search" className="icon-input" />
        </div>
      </form>
    )
  }
}
