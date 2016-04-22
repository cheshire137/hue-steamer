import React, { Component, PropTypes } from 'react';
import s from './Group.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

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
    this.state = {};
  }

  componentDidMount() {
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }

  render() {
    const lightNames = this.props.lights.map((l) => {
      if (typeof l === 'string') {
        return l;
      }
      return l.name;
    }).join(', ');
    return (
      <li className={cx(s.group, this.isNight() ? s.night : s.day)}>
        <h3 className={s.groupName}>{this.props.name}</h3>
        {lightNames}
      </li>
    );
  }
}

export default Group;
