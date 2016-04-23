import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import cx from 'classnames';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import Location from '../../core/Location';
import Bridge from '../../actions/bridge';
import LightsList from '../LightsList/LightsList';
import GroupsList from '../GroupsList/GroupsList';

const title = 'Hue Steamer';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      lights: {},
      activeTab: 'lights',
    };
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

  showLightsTab(e) {
    e.preventDefault();
    e.target.blur();
    this.setState({ activeTab: 'lights' });
  }

  showGroupsTab(e) {
    e.preventDefault();
    e.target.blur();
    this.setState({ activeTab: 'groups' });
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }

  render() {
    const haveLights = typeof this.state.lightIDs === 'object';
    const haveGroups = typeof this.state.groups === 'object';
    return (
      <div className={this.isNight() ? s.night : s.day}>
        <ul className={s.tabList}>
          <li className={this.state.activeTab === 'lights' ? s.active : s.inactive}>
            <a href="#" onClick={this.showLightsTab.bind(this)}>
              Lights
            </a>
          </li>
          <li className={this.state.activeTab === 'groups' ? s.active : s.inactive}>
            <a href="#" onClick={this.showGroupsTab.bind(this)}>
              Groups
            </a>
          </li>
        </ul>
        <div className={s.tabs}>
          <div className={cx(s.lightsTab, s.tab, this.state.activeTab === 'lights' ? s.active : s.inactive)}>
            {haveLights ? (
              <LightsList ids={this.state.lightIDs}
                onLightLoaded={this.onLightLoaded.bind(this)}
              />
            ) : (
              <p className={s.loading}>
                Loading lights...
              </p>
            )}
          </div>
          <div className={cx(s.groupsTab, s.tab, this.state.activeTab === 'groups' ? s.active : s.inactive)}>
            {haveGroups ? (
              <GroupsList groups={this.state.groups}
                onLightLoaded={this.onLightLoaded.bind(this)}
              />
            ) : (
              <p className={s.loading}>
                Loading groups...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
