import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';

class BridgeDisplay extends Component {
  static propTypes = {
    localtime: PropTypes.string.isRequired,
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
      <dl className={s.bridgeDetails}>
        <dt>Name</dt>
        <dd>{this.props.name}</dd>
        <dt>IP Address</dt>
        <dd>
          <a href={bridgeUrl} target="_blank">
            {this.props.ipaddress}
          </a>
        </dd>
        <dt>Model</dt>
        <dd>{this.props.modelid}</dd>
        <dt>Time</dt>
        <dd>{this.getPrettyTime()}</dd>
        <dt># Lights</dt>
        <dd>
          {typeof this.props.numLights === 'number' ? this.props.numLights : '--'}
        </dd>
      </dl>
    );
  }
}

export default BridgeDisplay;
