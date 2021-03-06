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
    onGroupDeleted: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
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
          const action = (group.action.on ? 'on' : 'off') + '.' +
              group.action.hue;
          const key = 'group-' + group.id + '-loaded-' + loaded + '-action-' +
              action;
          return (
            <Group key={key} {...group}
              onLightLoaded={this.props.onLightLoaded}
              onDeleted={this.props.onGroupDeleted}
              onEdit={this.props.onEdit}
              onError={this.props.onError}
            />
          );
        })}
      </ul>
    );
  }
}

export default GroupsList;
