import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Header extends Component {
  render() {
    return (
      <header>
        <h1><a href="/">Hue Steamer</a></h1>
      </header>
    );
  }
}

export default Header;
