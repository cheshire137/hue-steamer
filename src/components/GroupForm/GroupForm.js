import React, { Component, PropTypes } from 'react';
import s from './GroupForm.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import LightCheckbox from '../LightCheckbox/LightCheckbox';
import Bridge from '../../actions/bridge';

@withStyles(s)
class GroupForm extends Component {
  static propTypes = {
    lights: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    onCreated: PropTypes.func.isRequired,
    onUpdated: PropTypes.func.isRequired,
    onCanceled: PropTypes.func.isRequired,
    name: PropTypes.string,
    action: PropTypes.object,
    recycle: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string,
    checkedLightIDs: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { name: undefined, checkedLightIDs: undefined };
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onLightToggled(id, checked) {
    let checkedLightIDs = this.state.checkedLightIDs;
    const index = checkedLightIDs.indexOf(id);
    if (checked && index < 0) {
      checkedLightIDs.push(id);
    } else if (!checked && index > -1) {
      checkedLightIDs = checkedLightIDs.slice(0, index).
          concat(checkedLightIDs.slice(index + 1, checkedLightIDs.length));
    }
    this.setState({ checkedLightIDs });
  }

  onGroupSaved(name, lightIDs, group) {
    group.name = name;
    const lights = this.props.lights;
    group.lights = lightIDs.map((id) => lights[id]);
    if (typeof this.props.id === 'string') {
      this.props.onUpdated(group);
    } else {
      this.props.onCreated(group);
    }
    this.setState({ checkedLightIDs: undefined, name: undefined });
  }

  onGroupUpdated(name, lightIDs, success) {
    if (success) {
      const group = { id: this.props.id };
      this.onGroupSaved(name, lightIDs, group);
    }
  }

  onGroupSaveError(name, response) {
    const action = typeof this.props.id === 'string' ? 'update' : 'create';
    console.error('failed to ' + action + ' group', name, response);
  }

  onCancel(event) {
    event.preventDefault();
    event.target.blur();
    this.setState({ name: undefined, checkedLightIDs: undefined }, () => {
      this.props.onCanceled();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.isValid()) {
      return;
    }
    let name = this.props.name;
    if (typeof this.state.name === 'string') {
      name = this.state.name;
    }
    let lightIDs = this.props.checkedLightIDs;
    if (typeof this.state.checkedLightIDs === 'object') {
      lightIDs = this.state.checkedLightIDs;
    }
    if (typeof this.props.id === 'string') {
      Bridge.updateGroup(this.props.id, name, lightIDs).
             then(this.onGroupUpdated.bind(this, name, lightIDs)).
             catch(this.onGroupSaveError.bind(this, name));
    } else {
      Bridge.createGroup(name, lightIDs).
             then(this.onGroupSaved.bind(this, name, lightIDs)).
             catch(this.onGroupSaveError.bind(this, name));
    }
  }

  isValid() {
    if (typeof this.state.name === 'string' && this.state.name.trim().length < 1) {
      return false;
    }
    if (typeof this.state.checkedLightIDs === 'object' && this.state.checkedLightIDs.length < 1) {
      return false;
    }
    return true;
  }

  render() {
    let checkedLightIDs = [];
    if (typeof this.state.checkedLightIDs === 'undefined') {
      checkedLightIDs = this.props.checkedLightIDs || [];
    } else {
      checkedLightIDs = this.state.checkedLightIDs;
    }
    const name = typeof this.state.name === 'string' ? this.state.name : (this.props.name || '');
    const showCancelLink = typeof this.props.id === 'string' ||
        typeof this.props.name === 'string';
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p className={s.helpText}>
          Use groups to control multiple lights at once.
        </p>
        <div className={s.field}>
          <label className={s.label} htmlFor="new-group-name">Name:</label>
          <input type="text" id="new-group-name"
            onChange={this.onNameChange.bind(this)}
            value={name}
            placeholder="e.g., Back Bedroom"
            className={s.textField}
            autoFocus="autofocus"
          />
        </div>
        <div className={cx(s.lightsField, s.field)}>
          {this.props.ids.map((lightID) => {
            const checked = checkedLightIDs.indexOf(lightID) > -1;
            const key = 'light-' + lightID + '-checked-' + checked;
            return (
              <LightCheckbox key={key} id={lightID}
                onToggle={this.onLightToggled.bind(this)}
                checked={checked} {...this.props.lights[lightID]}
              />
            );
          })}
        </div>
        <div className={s.formControls}>
          <button type="submit" className={s.btn} disabled={!this.isValid()}>
            Save
          </button>
          {showCancelLink ? (
            <a href="#" className={s.cancelLink} onClick={this.onCancel.bind(this)}>
              Cancel
            </a>
          ) : ''}
        </div>
      </form>
    );
  }
}

export default GroupForm;
