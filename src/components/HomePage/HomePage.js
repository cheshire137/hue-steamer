import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import Location from '../../core/Location';
import Bridge from '../../actions/bridge';
import LightsList from './LightsList';

const title = 'Hue Steamer';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    Bridge.get().then(this.onBridgeLoaded.bind(this)).
           catch(this.onBridgeLoadError.bind(this));
  }

  onBridgeLoaded(bridge) {
    this.setState({ bridgeConnectionID: bridge.connection.id });
    Bridge.getAllLights(bridge.connection.id).
           then(this.onAllLightsLoaded.bind(this));
  }

  onBridgeLoadError(response) {
    console.error('failed to load bridge', response);
    Location.push({
      ...(parsePath('/settings')),
    });
  }

  onAllLightsLoaded(group) {
    if (group.hasOwnProperty('errno')) {
      console.error('failed to load group of all lights', group);
      return;
    }
    this.setState({ lightIDs: group.lights });
  }

  render() {
    const haveLights = typeof this.state.lightIDs === 'object';
    return (
      <div>
        {haveLights ? (
          <LightsList ids={this.state.lightIDs} />
        ) : 'Loading...'}
      </div>
    );
  }
}

export default HomePage;
