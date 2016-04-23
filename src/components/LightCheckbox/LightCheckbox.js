import React, { Component, PropTypes } from 'react';
import s from './LightCheckbox.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class LightCheckbox extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  onChange(e) {
    e.target.blur();
    this.props.onToggle(this.props.id, !this.props.checked);
  }

  render() {
    const id = 'light-checkbox-' + this.props.id;
    return (
      <label className={s.label} htmlFor={id}>
        <input type="checkbox" id={id} name="light"
          onChange={this.onChange.bind(this)}
          className={s.checkbox}
        />
        {this.props.name}
      </label>
    );
  }
}

export default LightCheckbox;
