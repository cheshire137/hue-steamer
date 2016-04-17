import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';
import LightsList from './LightsList';

const title = 'Hue Steamer';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const data = LocalStorage.getJSON();
    this.state = {
      user: data.user,
      ip: data.ip,
      lightIDs: data.lightIDs,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
    this.redirectIfNoBridgeSettings();
  }

  redirectIfNoBridgeSettings() {
    const haveBridgeIp = typeof this.state.ip !== 'undefined';
    const haveBridgeUser = typeof this.state.user !== 'undefined';
    if (!haveBridgeIp || !haveBridgeUser) {
      Location.push({
        ...(parsePath('/settings')),
      });
    }
  }

  render() {
    const haveLights = typeof this.state.lightIDs === 'object';
    return (
      <div>
        {haveLights ? (
          <LightsList ip={this.state.ip}
            user={this.state.user}
            ids={this.state.lightIDs}
          />
        ) : 'Loading...'}
      </div>
    );
  }
}

export default HomePage;
