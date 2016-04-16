import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';

const title = 'Settings';

@withStyles(s)
class SettingsPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const settings = LocalStorage.getJSON();
    console.log('settings', settings);
    this.state = {
      hueBridgeUser: settings.hueBridgeUser,
      hueBridgeIp: settings.hueBridgeIp,
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  handleBridgeIpChange(e) {
    this.setState({ hueBridgeIp: e.target.value });
  }

  handleBridgeUserChange(e) {
    this.setState({ hueBridgeUser: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    LocalStorage.setMany({
      hueBridgeUser: this.state.hueBridgeUser,
      hueBridgeIp: this.state.hueBridgeIp,
    });
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
              value={this.state.hueBridgeIp}
              onChange={this.handleBridgeIpChange.bind(this)}
              placeholder="e.g., 192.168.1.182"
            />
          </div>
          <div className={s.field}>
            <label htmlFor="hue_bridge_user">Philips Hue bridge user:</label>
            <input type="text" id="hue_bridge_user"
              value={this.state.hueBridgeUser}
              onChange={this.handleBridgeUserChange.bind(this)}
              placeholder="e.g., 165131875f4bdff60d7f3dd05d46bd48"
            />
          </div>
          <div className={s.field}>
            <button type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SettingsPage;
