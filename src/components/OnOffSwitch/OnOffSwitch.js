import React, { Component, PropTypes } from 'react';
import s from './OnOffSwitch.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class OnOffSwitch extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    on: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className={s.onoffswitch}>
        <input type="checkbox" name="onoffswitch"
          className={s.onoffswitchCheckbox} id={this.props.id}
          checked={this.props.on}
          onChange={this.props.onToggle.bind(this)}
        />
        <label className={s.onoffswitchLabel} htmlFor={this.props.id}>
          <span className={s.onoffswitchInner}></span>
          <span className={s.onoffswitchSwitch}></span>
        </label>
      </div>
    );
  }
}

export default OnOffSwitch;
