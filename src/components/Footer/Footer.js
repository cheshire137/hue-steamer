import React, { Component } from 'react';
import s from './Footer.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Footer extends Component {
  render() {
    return (
      <footer className={s.pageFooter}>
        &copy; 2016 Sarah Vessels
      </footer>
    );
  }
}

export default Footer;
