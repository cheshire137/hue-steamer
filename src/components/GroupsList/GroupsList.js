import React, { Component, PropTypes } from 'react';
import s from './GroupsList.scss';
import Group from '../Group/Group';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class GroupsList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    onLightLoaded: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ul className={s.groupList}>
        {this.props.groups.map((group) => {
          let loaded = true;
          group.lights.forEach((light) => {
            loaded = loaded && typeof light === 'object';
          });
          const key = 'group-' + group.id + '-loaded-' + loaded;
          return (
            <Group key={key} {...group}
              onLightLoaded={this.props.onLightLoaded}
              onEdit={this.props.onEdit}
            />
          );
        })}
      </ul>
    );
  }
}

export default GroupsList;
