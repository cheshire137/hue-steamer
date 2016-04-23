import React, { Component, PropTypes } from 'react';
import s from './Group.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import FontAwesome from 'react-fontawesome';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch';
import Bridge from '../../actions/bridge';

@withStyles(s)
class Group extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    lights: PropTypes.array,
    onLightLoaded: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      on: false,
    };
  }

  onLightsToggle(turnOn) {
    if (turnOn) {
      Bridge.turnOnGroup(this.props.id).
             then(this.onLightsToggleComplete.bind(this, true));
    } else {
      Bridge.turnOffGroup(this.props.id).
             then(this.onLightsToggleComplete.bind(this, false));
    }
  }

  onLightsToggleComplete(on, success) {
    if (success) {
      for (let j = 0; j < this.props.lights.length; j++) {
        const light = this.props.lights[j];
        light.state.on = on;
        this.props.onLightLoaded(light);
      }
    }
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }

  toggleGroupOpen(event) {
    event.preventDefault();
    this.setState({ open: !this.state.open });
    event.target.blur();
  }

  areAllLightsOn() {
    for (let i = 0; i < this.props.lights.length; i++) {
      const light = this.props.lights[i];
      if (typeof light === 'string') {
        // Light not fully loaded, just have its ID
        return false;
      }
      if (!light.state.on) {
        return false;
      }
    }
    return true;
  }

  areSomeLightsOn() {
    for (let i = 0; i < this.props.lights.length; i++) {
      const light = this.props.lights[i];
      if (typeof light === 'string') {
        // Light not fully loaded, just have its ID
        return false;
      }
      if (light.state.on) {
        return true;
      }
    }
    return false;
  }

  render() {
    const groupStyle = {};
    if (this.state.open) {
      groupStyle.display = 'block';
    } else {
      groupStyle.display = 'none';
    }
    const checkboxID = 'group-' + this.props.id + '-toggle';
    let switchState = 0;
    if (this.areSomeLightsOn()) {
      switchState = 1;
    }
    if (this.areAllLightsOn()) {
      switchState = 2;
    }
    return (
      <li className={cx(s.group, this.isNight() ? s.night : s.day)}>
        <header className={s.groupHeader}>
          <h3 className={s.groupName}>
            <a href="#" onClick={this.toggleGroupOpen.bind(this)}>
              {this.state.open ? (
                <FontAwesome name="chevron-down" className={s.openIndicator} />
              ) : (
                <FontAwesome name="chevron-right" className={s.openIndicator} />
              )}
              {this.props.name}
            </a>
          </h3>
          <OnOffSwitch id={checkboxID} state={switchState}
            onToggle={this.onLightsToggle.bind(this)}
          />
        </header>
        <div className={s.groupContents} style={groupStyle}>
          <ul className={s.groupLights}>
            {this.props.lights.map((light) => {
              const isString = typeof light === 'string';
              const key = 'light-' + (isString ? light : light.id);
              return (
                <li key={key} className={s.groupLight}>
                  {isString ? light : light.name}
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    );
  }
}

export default Group;
