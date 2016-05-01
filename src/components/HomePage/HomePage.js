import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import cx from 'classnames';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import Location from '../../core/Location';
import Bridge from '../../api/bridge';
import LightsList from '../LightsList/LightsList';
import GroupsList from '../GroupsList/GroupsList';
import SchedulesList from '../SchedulesList/SchedulesList';
import GroupForm from '../GroupForm/GroupForm';
import LocalStorage from '../../stores/localStorage';

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
      activeTab: LocalStorage.get('activeTab') || 'lights',
      lightIDs: [],
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
    this.setState({ bridgeConnectionID: bridge.connection.id }, () => {
      if (this.state.activeTab === 'schedules') {
        this.getSchedules();
      }
    });
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

  onSchedulesLoadError(response) {
    console.error('failed to load schedules', response);
  }

  onAllLightsLoaded(group) {
    this.setState({ lightIDs: group.lights }, () => {
      group.lights.forEach((id) => {
        Bridge.getLight(id).then((light) => {
          light.id = id;
          this.onLightLoaded(light);
        }).catch(this.onLightLoadError.bind(this, id));
      });
    });
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
    groups.sort((groupA, groupB) => groupA.name.localeCompare(groupB.name));
    this.setState({ groups });
  }

  onGroupsLoadError(response) {
    console.error('failed to load groups', response);
  }

  onSchedulesLoaded(schedules) {
    console.log(schedules);
    this.setState({ schedules });
  }

  onGroupCreated(group) {
    this.onGroupsLoaded(this.state.groups.slice().concat(group));
    this.showGroupsTab();
  }

  onEditGroup(id, name, lights) {
    this.setState({
      editGroupName: name,
      editGroupID: id,
      editGroupLightIDs: lights.map((l) => {
        return typeof l === 'string' ? l : l.id;
      }),
    }, () => {
      this.showGroupFormTab();
    });
  }

  onGroupUpdated(group) {
    const newGroups = this.state.groups.slice();
    for (let i = 0; i < newGroups.length; i++) {
      if (newGroups[i].id === group.id) {
        const oldGroup = newGroups[i];
        for (const key in oldGroup) {
          if (oldGroup.hasOwnProperty(key)) {
            if (typeof group[key] === 'undefined') {
              group[key] = oldGroup[key];
            }
          }
        }
        newGroups[i] = group;
        break;
      }
    }
    this.onGroupsLoaded(newGroups);
    this.setState({
      editGroupName: undefined,
      editGroupID: undefined,
      editGroupLightIDs: undefined,
    }, () => {
      this.showGroupsTab();
    });
  }

  onGroupCanceled() {
    const wasEditing = typeof this.state.editGroupID !== 'undefined';
    this.setState({
      editGroupName: undefined,
      editGroupID: undefined,
      editGroupLightIDs: undefined,
      newGroupName: undefined,
      newGroupLightIDs: undefined,
    }, () => {
      if (wasEditing) {
        this.showGroupsTab();
      } else {
        this.showLightsTab();
      }
    });
  }

  onLightLoaded(light) {
    const oldLights = this.state.lights;
    const lightsHash = {};
    for (const id in oldLights) {
      if (oldLights.hasOwnProperty(id)) {
        lightsHash[id] = oldLights[id];
      }
    }
    lightsHash[light.id] = light;
    const lights = this.hashValues(lightsHash);
    lights.sort(this.lightCompare);
    this.setState({
      lights: lightsHash,
      groups: this.updateLightInGroups(light),
      lightIDs: lights.map((l) => l.id),
    });
  }

  onLightLoadError(id, response) {
    console.error('failed to load light ' + id, response);
  }

  onLightsFiltered(filter, lightIDs) {
    if (typeof filter === 'string') {
      this.setState({ newGroupLightIDs: lightIDs, newGroupName: filter });
    } else {
      this.setState({ newGroupLightIDs: undefined, newGroupName: undefined });
    }
  }

  updateLightInGroups(light) {
    const groups = this.state.groups;
    if (typeof groups !== 'object') {
      return groups;
    }
    return groups.slice().map((group) => {
      return this.updateLightInGroup(light, group);
    });
  }

  updateLightInGroup(light, oldGroup) {
    const group = {};
    const lights = oldGroup.lights.slice();
    for (let i = 0; i < lights.length; i++) {
      const lightID = lights[i];
      if (lightID === light.id) {
        lights[i] = light;
        break;
      }
    }
    lights.sort(this.lightCompare);
    for (const key in oldGroup) {
      if (oldGroup.hasOwnProperty(key)) {
        group[key] = oldGroup[key];
      }
    }
    group.lights = lights;
    return group;
  }

  lightCompare(lightA, lightB) {
    const isLightALoaded = typeof lightA === 'object';
    const isLightBLoaded = typeof lightB === 'object';
    if (!isLightALoaded && !isLightBLoaded) {
      return 0;
    }
    if (!isLightALoaded) {
      return -1;
    }
    if (!isLightBLoaded) {
      return 1;
    }
    return lightA.name.localeCompare(lightB.name);
  }

  hashValues(hash) {
    const values = [];
    for (const key in hash) {
      if (hash.hasOwnProperty(key)) {
        values.push(hash[key]);
      }
    }
    return values;
  }

  showTab(event, activeTab) {
    if (event) {
      event.preventDefault();
      event.target.blur();
    }
    this.setState({ activeTab });
    LocalStorage.set('activeTab', activeTab);
  }

  showLightsTab(event) {
    this.showTab(event, 'lights');
  }

  showGroupsTab(event) {
    this.showTab(event, 'groups');
  }

  showGroupFormTab(event) {
    this.showTab(event, 'group-form');
  }

  showSchedulesTab(event) {
    this.showTab(event, 'schedules');
    if (typeof this.state.schedules !== 'object') {
      this.getSchedules();
    }
  }

  getSchedules() {
    Bridge.getSchedules().
           then(this.onSchedulesLoaded.bind(this)).
           catch(this.onSchedulesLoadError.bind(this));
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }

  render() {
    const haveLights = typeof this.state.lightIDs === 'object';
    const haveGroups = typeof this.state.groups === 'object';
    const haveSchedules = typeof this.state.schedules === 'object';
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
          <li className={this.state.activeTab === 'group-form' ? s.active : s.inactive}>
            <a href="#" onClick={this.showGroupFormTab.bind(this)}>
              {typeof this.state.editGroupName === 'string' ? (
                <span>Edit &ldquo;{this.state.editGroupName}&rdquo;</span>
              ) : 'New Group'}
            </a>
          </li>
          <li className={this.state.activeTab === 'schedules' ? s.active : s.inactive}>
            <a href="#" onClick={this.showSchedulesTab.bind(this)}>
              Schedules
            </a>
          </li>
        </ul>
        <div className={s.tabs}>
          <div className={cx(s.lightsTab, s.tab, this.state.activeTab === 'lights' ? s.active : s.inactive)}>
            {haveLights ? (
              <LightsList lights={this.state.lights}
                ids={this.state.lightIDs}
                onFiltered={this.onLightsFiltered.bind(this)}
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
                onEdit={this.onEditGroup.bind(this)}
              />
            ) : (
              <p className={s.loading}>
                Loading groups...
              </p>
            )}
          </div>
          <div className={cx(s.newGroupTab, s.tab, this.state.activeTab === 'group-form' ? s.active : s.inactive)}>
            <GroupForm lights={this.state.lights}
              ids={this.state.lightIDs}
              onCreated={this.onGroupCreated.bind(this)}
              onUpdated={this.onGroupUpdated.bind(this)}
              onCanceled={this.onGroupCanceled.bind(this)}
              name={this.state.editGroupName || this.state.newGroupName}
              id={this.state.editGroupID}
              checkedLightIDs={this.state.editGroupLightIDs || this.state.newGroupLightIDs}
            />
          </div>
          <div className={cx(s.schedulesTab, s.tab, this.state.activeTab === 'schedules' ? s.active : s.inactive)}>
            {haveSchedules ? (
              <SchedulesList schedules={this.state.schedules} />
            ) : (
              <p className={s.loading}>
                Loading schedules...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
