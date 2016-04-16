import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';

const title = 'Hue Steamer';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
    const hueBridgeIp = LocalStorage.get('hue-bridge-ip');
    const hueBridgeUser = LocalStorage.get('hue-bridge-user');
    const haveBridgeIp = typeof hueBridgeIp !== 'undefined';
    const haveBridgeUser = typeof hueBridgeUser !== 'undefined';
    if (!haveBridgeIp || !haveBridgeUser) {
      Location.push({
        ...(parsePath('/settings'))
      });
    }
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default HomePage;
