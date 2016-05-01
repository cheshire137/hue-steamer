import React, { Component, PropTypes } from 'react';
import s from './OnOffSwitch.scss';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';
import Daytime from '../../models/daytime';

@withStyles(s)
class OnOffSwitch extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  onToggle() {
    const on = this.props.state > 0;
    this.props.onToggle(!on);
  }

  render() {
    const stateClass = this.props.state === 1 ? s.partial : s.full;
    const nightDayClass = Daytime.isNight() ? s.night : s.day;
    return (
      <div className={s.onoffswitch}>
        <input type="checkbox" name="onoffswitch"
          className={cx(s.onoffswitchCheckbox, stateClass)} id={this.props.id}
          checked={this.props.state > 0}
          onChange={this.onToggle.bind(this)}
        />
        <label className={cx(s.onoffswitchLabel, stateClass, nightDayClass)} htmlFor={this.props.id}>
          <span className={cx(s.onoffswitchInner, stateClass, nightDayClass)}></span>
          <span className={cx(s.onoffswitchSwitch, nightDayClass)}></span>
        </label>
      </div>
    );
  }
}

export default OnOffSwitch;
