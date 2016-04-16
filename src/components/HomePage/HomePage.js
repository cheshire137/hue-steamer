import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';
import Bridge from '../../actions/bridge';
import BridgeDisplay from './BridgeDisplay';

const title = 'Hue Steamer';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const settings = LocalStorage.getJSON();
    this.state = {
      hueBridgeUser: settings.hueBridgeUser,
      hueBridgeIp: settings.hueBridgeIp,
      bridge: settings.bridge,
      haveBridge: typeof settings.bridge === 'object',
    };
    console.log(settings.bridge);
  }

  componentWillMount() {
    this.context.onSetTitle(title);
    this.redirectIfNoBridgeSettings();
  }

  componentDidMount() {
    if (!this.state.haveBridge) {
      this.getBridgeState();
    }
  }

  onBridgeLoaded(bridge) {
    console.log('loaded bridge', bridge);
    this.setState({ bridge, haveBridge: true });
    LocalStorage.set('bridge', bridge);
  }

  getBridgeState() {
    console.log('getting bridge for', this.state.hueBridgeIp, this.state.hueBridgeUser);
    Bridge.getInfo(this.state.hueBridgeIp, this.state.hueBridgeUser).
           then(this.onBridgeLoaded.bind(this));
  }

  redirectIfNoBridgeSettings() {
    const haveBridgeIp = typeof this.state.hueBridgeIp !== 'undefined';
    const haveBridgeUser = typeof this.state.hueBridgeUser !== 'undefined';
    if (!haveBridgeIp || !haveBridgeUser) {
      Location.push({
        ...(parsePath('/settings')),
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.haveBridge ? (
          <BridgeDisplay bridge={this.state.bridge} />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default HomePage;
