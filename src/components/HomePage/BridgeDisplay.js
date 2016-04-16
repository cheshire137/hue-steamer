import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class BridgeDisplay extends Component {
  static propTypes = {
    bridge: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getPrettyTime() {
    const date = new Date(this.props.bridge.localtime);
    const utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return utc.toLocaleString();
  }

  render() {
    return (
      <dl>
        <dt>Name</dt>
        <dd>{this.props.bridge.name}</dd>
        <dt>IP Address</dt>
        <dd>{this.props.bridge.ipaddress}</dd>
        <dt>Model</dt>
        <dd>{this.props.bridge.modelid}</dd>
        <dt>Time</dt>
        <dd>{this.getPrettyTime()}</dd>
      </dl>
    );
  }
}

export default BridgeDisplay;
