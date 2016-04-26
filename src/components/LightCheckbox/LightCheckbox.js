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
    this.state = { checked: undefined };
  }

  onChange(e) {
    e.target.blur();
    this.setState({ checked: e.target.checked }, () => {
      this.props.onToggle(this.props.id, this.state.checked);
    });
  }

  render() {
    const id = 'light-checkbox-' + this.props.id;
    let checked = false;
    if (typeof this.state.checked === 'undefined') {
      checked = this.props.checked;
    } else {
      checked = this.state.checked;
    }
    return (
      <label className={s.label} htmlFor={id}>
        <input type="checkbox" id={id} name="light"
          onChange={this.onChange.bind(this)}
          className={s.checkbox} checked={checked}
        />
        {this.props.name}
      </label>
    );
  }
}

export default LightCheckbox;
