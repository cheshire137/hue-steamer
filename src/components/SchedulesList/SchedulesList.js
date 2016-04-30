import React, { Component, PropTypes } from 'react';
import s from './SchedulesList.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SchedulesList extends Component {
  static propTypes = {
    schedules: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ul className={s.schedulesList}>
        {this.props.schedules.map((schedule) => {
          const key = 'schedule-' + schedule.id;
          return (
            <li key={key}>
              schedule {schedule.id}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SchedulesList;
