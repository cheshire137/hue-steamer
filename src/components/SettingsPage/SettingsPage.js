import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';
import withStyles from '../../decorators/withStyles';
import Bridge from '../../actions/bridge';
import BridgeDisplay from './BridgeDisplay';
import UserForm from './UserForm';

const title = 'Settings';

@withStyles(s)
class SettingsPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      numLights: undefined,
      bridgeDiscovered: false,
      discoveredIP: undefined,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    Bridge.get().then(this.onBridgeLoaded.bind(this)).
           catch(this.onBridgeLoadError.bind(this));
  }

  onAllLightsLoaded(group) {
    if (group.hasOwnProperty('errno')) {
      console.error('failed to load group of all lights', group);
      return;
    }
    this.setState({ numLights: group.lights.length });
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

  onBridgeLoadError(response) {
    console.error('failed to load bridge', response);
  }

  onBridgeSaved(bridgeAndConnection) {
    this.onBridgeLoaded(bridgeAndConnection);
    const connection = bridgeAndConnection.connection;
    Bridge.getAllLights(connection.id).
           then(this.onAllLightsLoaded.bind(this));
  }

  onBridgeSaveError(response) {
    console.error('failed to save bridge info', response);
  }

  onBridgesDiscovered(bridges) {
    if (bridges.length > 0) {
      this.setState({
        discoveredIP: bridges[0].ipaddress,
        bridgeDiscovered: true,
      });
    }
  }

  discoverBridges() {
    Bridge.discover().then(this.onBridgesDiscovered.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (typeof this.state.ip === 'string' &&
        typeof this.state.user === 'string') {
      Bridge.save(this.state.ip, this.state.user).
             then(this.onBridgeSaved.bind(this)).
             catch(this.onBridgeSaveError.bind(this));
    }
  }

  handleIPChange(e) {
    let ip = e.target.value.trim();
    if (ip === '') {
      ip = undefined;
    }
    this.setState({ ip, haveBridge: false });
  }

  handleUserChange(e) {
    let user = e.target.value.trim();
    if (user === '') {
      user = undefined;
    }
    this.setState({ user, haveBridge: false });
  }

  render() {
    return (
      <div>
        <header>
          <h2>Bridge Setup</h2>
        </header>
        {this.state.haveBridge ? (
          <BridgeDisplay {...this.state.bridge}
            numLights={this.state.numLights}
          />
        ) : (
          <div>
            {this.state.bridgeDiscovered ? (
              <div>
                {this.state.attemptedRegistration ? '' : (
                  <div>
                    <p>
                      Found your bridge! Its IP address is
                      <strong> {this.state.discoveredIP}</strong>.
                    </p>
                    <UserForm ip={this.state.discoveredIP}
                      onBridgeSaved={this.onBridgeSaved.bind(this)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>
                  We have to connect to your Philips Hue bridge. You can connect to it
                  manually:
                </p>
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
                  <div className={s.formControls}>
                    <button type="submit">
                      Save
                    </button>
                  </div>
                </form>
                <hr />
                <p>
                  Or we can search for it on your network:
                </p>
                <button onClick={this.discoverBridges.bind(this)} type="button">
                  Discover Bridge
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SettingsPage;
