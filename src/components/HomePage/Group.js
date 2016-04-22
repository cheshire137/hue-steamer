import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import cx from 'classnames';

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
        {this.props.name} {lightNames}
      </li>
    );
  }
}

export default Group;
