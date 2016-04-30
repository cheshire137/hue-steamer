import React, { Component, PropTypes } from 'react';
import s from './Schedule.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Schedule extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    localtime: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    recycle: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    command: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  localtimeToDays() {
    const parts = this.props.localtime.split('/');
    const days = [];
    const listOfDays = parts[0].slice(1); // number up to 127
    const sunday = 1;
    const monday = 64;
    const tuesday = 32;
    const wednesday = 16;
    const thursday = 8;
    const friday = 4;
    const saturday = 2;
    if (listOfDays & sunday) {
      days.push('Sunday');
    }
    if (listOfDays & monday) {
      days.push('Monday');
    }
    if (listOfDays & tuesday) {
      days.push('Tuesday');
    }
    if (listOfDays & wednesday) {
      days.push('Wednesday');
    }
    if (listOfDays & thursday) {
      days.push('Thursday');
    }
    if (listOfDays & friday) {
      days.push('Friday');
    }
    if (listOfDays & saturday) {
      days.push('Saturday');
    }
    return days;
  }

  render() {
    return (
      <li className={s.schedule}>
        <h3 className={s.name}>{this.props.name}</h3>
        {this.props.localtime}
        <span> &mdash; </span>
        {this.localtimeToDays().join(', ')}
      </li>
    );
  }
}

export default Schedule;
