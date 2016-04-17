import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Header extends Component {
  render() {
    return (
      <header className={s.pageHeader}>
        <h1 className={s.pageTitle}><a href="/">Hue Steamer</a></h1>
        <nav className={s.mainNav}>
          <ul>
            <li>
              <Link className={s.brand} to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <Link className={s.brand} to="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
