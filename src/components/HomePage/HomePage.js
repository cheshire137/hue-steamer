import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import Location from '../../core/Location';
import Bridge from '../../actions/bridge';
import LightsList from './LightsList';
import GroupsList from '../GroupsList/GroupsList';

const title = 'Hue Steamer';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { lights: {} };
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
           then(this.onAllLightsLoaded.bind(this)).
           catch(this.onAllLightsLoadError.bind(this));
    Bridge.getGroups().
           then(this.onGroupsLoaded.bind(this)).
           catch(this.onGroupsLoadError.bind(this));
  }

  onBridgeLoadError(response) {
    console.error('failed to load bridge', response);
    Location.push({
      ...(parsePath('/settings')),
    });
  }

  onAllLightsLoaded(group) {
    this.setState({ lightIDs: group.lights });
  }

  onAllLightsLoadError(response) {
    console.error('failed to load group of all lights', response);
  }

  onGroupsLoaded(rawGroups) {
    const groups = [];
    for (let i = 0; i < rawGroups.length; i++) {
      if (rawGroups[i].id !== '0') {
        groups.push(rawGroups[i]);
      }
    }
    this.setState({ groups });
  }

  onGroupsLoadError(response) {
    console.error('failed to load groups', response);
  }

  onLightLoaded(light) {
    const lights = this.state.lights;
    lights[light.id] = light;
    const groups = this.state.groups;
    if (typeof groups === 'object') {
      for (let i = 0; i < groups.length; i++) {
        const group = this.state.groups[i];
        for (let j = 0; j < group.lights.length; j++) {
          const lightID = group.lights[j];
          if (lightID === light.id) {
            group.lights[j] = light;
            break;
          }
        }
      }
    }
    this.setState({ lights, groups });
  }

  render() {
    const haveLights = typeof this.state.lightIDs === 'object';
    const haveGroups = typeof this.state.groups === 'object';
    return (
      <div>
        {haveGroups ? (
          <GroupsList groups={this.state.groups} />
        ) : 'Loading groups...'}
        {haveLights ? (
          <LightsList ids={this.state.lightIDs}
            onLightLoaded={this.onLightLoaded.bind(this)}
          />
        ) : 'Loading lights...'}
      </div>
    );
  }
}

export default HomePage;
