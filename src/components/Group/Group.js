import React, { Component, PropTypes } from 'react';
import s from './Group.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import FontAwesome from 'react-fontawesome';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch';

@withStyles(s)
class Group extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    lights: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
  }

  onLightsToggle() {
    console.log('toggle lights in group', this.props.id);
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }

  toggleGroup(event) {
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

  render() {
    const lightNames = this.props.lights.map((l) => {
      if (typeof l === 'string') {
        return l;
      }
      return l.name;
    }).join(', ');
    const groupStyle = {};
    if (this.state.open) {
      groupStyle.display = 'block';
    } else {
      groupStyle.display = 'none';
    }
    const checkboxID = 'group-' + this.props.id + '-toggle';
    return (
      <li className={cx(s.group, this.isNight() ? s.night : s.day)}>
        <h3 className={s.groupName}>
          {this.state.open ? (
            <FontAwesome name="chevron-down" className={s.openIndicator} />
          ) : (
            <FontAwesome name="chevron-right" className={s.openIndicator} />
          )}
          <a href="#" onClick={this.toggleGroup.bind(this)}>
            {this.props.name}
          </a>
        </h3>
        <OnOffSwitch id={checkboxID} on={this.areAllLightsOn()}
          onToggle={this.onLightsToggle.bind(this)}
        />
        <div className={s.groupContents} style={groupStyle}>
          {lightNames}
        </div>
      </li>
    );
  }
}

export default Group;
