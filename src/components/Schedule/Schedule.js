import React, { Component, PropTypes } from 'react';
import s from './Schedule.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Daytime from '../../models/daytime';

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
    if (parts.length < 1) {
      return days;
    }
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

  localtimeToTime() {
    const parts = this.props.localtime.split('/');
    if (parts.length < 2) {
      return '';
    }
    const fullTime = parts[1].slice(1); // 24hr timestamp like 20:00:00
    const timeParts = fullTime.split(':').map((t) => parseInt(t, 10));
    const hour = timeParts[0];
    const minute = timeParts[1];
    let time = '';
    let amPm = 'am';
    if (hour > 12) {
      time = String(hour - 12);
      amPm = 'pm';
    } else {
      time = String(hour);
      if (hour === 12) {
        amPm = 'pm';
      }
    }
    time += ':';
    if (minute < 10) {
      time += '0';
    }
    time += String(minute);
    return time + ' ' + amPm;
  }

  summarizeDays(days) {
    if (days.length === 7) {
      return 'Every day';
    }
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    if (days.length === weekdays.length) {
      const includesWeekday = days.map((d) => weekdays.indexOf(d) > -1);
      if (includesWeekday.indexOf(false) < 0) {
        return 'Weekdays';
      }
    }
    const weekends = ['Saturday', 'Sunday'];
    if (days.length === weekends.length) {
      const includesWeekend = days.map((d) => weekends.indexOf(d) > -1);
      if (includesWeekend.indexOf(false) < 0) {
        return 'Weekends';
      }
    }
    return days.join(', ');
  }

  render() {
    const days = this.localtimeToDays();
    const time = this.localtimeToTime();
    const themeClass = Daytime.isNight() ? s.night : s.day;
    return (
      <li className={s.schedule}>
        <h3 className={s.name}>{this.props.name}</h3>
        {this.summarizeDays(days)} at {time}
        {this.props.status === 'enabled' ? (
          <span className={cx(themeClass, s.enabled)}>Enabled</span>
        ) : (
          <span className={cx(themeClass, s.disabled)}>Disabled</span>
        )}
      </li>
    );
  }
}

export default Schedule;
