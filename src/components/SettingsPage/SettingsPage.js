import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Bridge from '../../actions/bridge';
import BridgeDisplay from './BridgeDisplay';

const title = 'Settings';

@withStyles(s)
class SettingsPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const data = LocalStorage.getJSON();
    this.state = {
      numLights: data.lightIDs ? data.lightIDs.length : undefined,
      bridgeConnectionID: data.bridgeConnectionID,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    if (typeof this.state.bridgeConnectionID !== 'undefined') {
      Bridge.get(this.state.bridgeConnectionID).
             then(this.onBridgeLoaded.bind(this));
    }
  }

  onAllLightsLoaded(group) {
    if (group.hasOwnProperty('errno')) {
      console.error('failed to load group of all lights', group);
      return;
    }
    this.setState({ numLights: group.lights.length });
    LocalStorage.set('lightIDs', group.lights);
  }

  onBridgeLoaded(bridgeAndConnection) {
    if (bridgeAndConnection.hasOwnProperty('error')) {
      console.error('failed to load bridge info', bridgeAndConnection.error);
      return;
    }
    const connection = bridgeAndConnection.connection;
    this.setState({
      user: connection.user,
      ip: connection.ip,
      bridge: bridgeAndConnection.bridge,
      haveBridge: true,
      bridgeConnectionID: connection.id,
    });
  }

  onBridgeSaved(bridgeAndConnection) {
    this.onBridgeLoaded(bridgeAndConnection);
    const connection = bridgeAndConnection.connection;
    LocalStorage.set('bridgeConnectionID', connection.id);
    Bridge.getAllLights(connection.id).
           then(this.onAllLightsLoaded.bind(this));
  }

  onBridgeSaveError(response) {
    console.error('failed to save bridge info', response);
  }

  handleUserChange(e) {
    let user = e.target.value.trim();
    if (user === '') {
      user = undefined;
    }
    this.setState({ user, haveBridge: false });
  }

  handleIPChange(e) {
    let ip = e.target.value.trim();
    if (ip === '') {
      ip = undefined;
    }
    this.setState({ ip, haveBridge: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    LocalStorage.setMany({
      lightIDs: undefined,
      bridgeConnectionID: undefined,
    });
    if (typeof this.state.ip === 'string' &&
        typeof this.state.user === 'string') {
      Bridge.save(this.state.ip, this.state.user).
             then(this.onBridgeSaved.bind(this)).
             catch(this.onBridgeSaveError.bind(this));
    }
  }

  render() {
    return (
      <div>
        <header>
          <h2>Settings</h2>
        </header>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className={s.field}>
            <label htmlFor="hue_bridge_ip">Philips Hue bridge IP address:</label>
            <input type="text" id="hue_bridge_ip"
              value={this.state.ip}
              onChange={this.handleIPChange.bind(this)}
              placeholder="e.g., 192.168.1.182"
            />
          </div>
          <div className={s.field}>
            <label htmlFor="hue_bridge_user">Philips Hue bridge user:</label>
            <input type="text" id="hue_bridge_user"
              value={this.state.user}
              onChange={this.handleUserChange.bind(this)}
              placeholder="e.g., 165131875f4bdff60d7f3dd05d46bd48"
            />
          </div>
          <div className={s.field}>
            <button type="submit">
              Save
            </button>
          </div>
        </form>
        {this.state.haveBridge ? (
          <BridgeDisplay {...this.state.bridge}
            numLights={this.state.numLights}
          />
        ) : ''}
      </div>
    );
  }
}

export default SettingsPage;
