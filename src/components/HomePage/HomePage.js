import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';
import Bridge from '../../actions/bridge';
import BridgeDisplay from './BridgeDisplay';
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
      user: data.hueBridgeUser,
      ip: data.hueBridgeIp,
      bridge: data.bridge,
      haveBridge: typeof data.bridge === 'object',
      allLights: data.allLights,
      haveAllLights: typeof data.allLights === 'object',
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
    this.redirectIfNoBridgeSettings();
  }

  componentDidMount() {
    if (!this.state.haveBridge) {
      this.getBridgeState();
    }
    if (!this.state.haveAllLights) {
      this.getAllLights();
    }
  }

  onAllLightsLoaded(group) {
    this.setState({ allLights: group, haveAllLights: true });
    LocalStorage.set('allLights', group);
  }

  onBridgeLoaded(bridge) {
    this.setState({ bridge, haveBridge: true });
    LocalStorage.set('bridge', bridge);
  }

  getAllLights() {
    console.log('getting all lights for', this.state.ip, this.state.user);
    Bridge.getAllLights(this.state.ip, this.state.user).
           then(this.onAllLightsLoaded.bind(this));
  }

  getBridgeState() {
    console.log('getting bridge for', this.state.ip, this.state.user);
    Bridge.getInfo(this.state.ip, this.state.user).
           then(this.onBridgeLoaded.bind(this));
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
    let numLights = NaN;
    if (this.state.haveAllLights) {
      numLights = this.state.allLights.lights.length;
    }
    return (
      <div>
        {this.state.haveBridge ? (
          <div className={s.bridgeAndLights}>
            <BridgeDisplay {...this.state.bridge} numLights={numLights} />
            {this.state.haveAllLights ? (
              <LightsList ip={this.state.ip}
                user={this.state.user}
                group={this.state.allLights}
              />
            ) : (
              <span>Loading lights...</span>
            )}
          </div>
        ) : (
          <span>Loading bridge info...</span>
        )}
      </div>
    );
  }
}

export default HomePage;
