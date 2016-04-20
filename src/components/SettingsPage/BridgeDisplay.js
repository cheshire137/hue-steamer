import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';

class BridgeDisplay extends Component {
  static propTypes = {
    localtime: PropTypes.string,
    ipaddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modelid: PropTypes.string.isRequired,
    numLights: PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getPrettyTime() {
    const date = new Date(this.props.localtime);
    const utc = new Date(date.getUTCFullYear(), date.getUTCMonth(),
                         date.getUTCDate(), date.getUTCHours(),
                         date.getUTCMinutes(), date.getUTCSeconds());
    return utc.toLocaleString();
  }

  render() {
    const bridgeUrl = 'http://' + this.props.ipaddress;
    return (
      <table className={s.bridgeDetails}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{this.props.name}</td>
          </tr>
          <tr>
            <th>IP Address</th>
            <td>
              <a href={bridgeUrl} target="_blank">
                {this.props.ipaddress}
              </a>
            </td>
          </tr>
          <tr>
            <th>Model</th>
            <td>{this.props.modelid}</td>
          </tr>
          <tr>
            <th>Time</th>
            <td>{this.getPrettyTime()}</td>
          </tr>
          <tr>
            <th># Lights</th>
            <td>
              {typeof this.props.numLights === 'number' ? this.props.numLights : '--'}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default BridgeDisplay;
