import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import Group from './Group';

class GroupsList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Groups</h2>
        <ul className={s.groupList}>
          {this.props.groups.map((group) => {
            return <Group key={group.id} {...group} />;
          })}
        </ul>
      </div>
    );
  }
}

export default GroupsList;
