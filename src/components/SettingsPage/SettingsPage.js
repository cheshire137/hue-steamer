import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Settings';

@withStyles(s)
class SettingsPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div>
        Settings
      </div>
    );
  }
}

export default SettingsPage;
