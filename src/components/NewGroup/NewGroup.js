import React, { Component, PropTypes } from 'react';
import s from './NewGroup.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import LightCheckbox from '../LightCheckbox/LightCheckbox';
import Bridge from '../../actions/bridge';

@withStyles(s)
class NewGroup extends Component {
  static propTypes = {
    lights: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    onCreated: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      checkedLightIDs: [],
    };
  }

  onNameChange(e) {
    this.setState({ name: e.target.value.trim() });
  }

  onLightToggled(id, checked) {
    let checkedLightIDs = this.state.checkedLightIDs;
    const index = checkedLightIDs.indexOf(id);
    if (checked) {
      if (index < 0) {
        checkedLightIDs.push(id);
      }
    } else {
      if (index > -1) {
        checkedLightIDs = checkedLightIDs.slice(0, index).
            concat(checkedLightIDs.slice(index + 1, checkedLightIDs.length));
      }
    }
    this.setState({ checkedLightIDs });
  }

  onGroupSaved(name, lightIDs, group) {
    group.name = name;
    const lights = this.props.lights;
    group.lights = lightIDs.map((id) => lights[id]);
    this.props.onCreated(group);
  }

  onGroupSaveError(response) {
    console.error('failed to create group', this.state.name, response);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.isValid()) {
      return;
    }
    const name = this.state.name;
    const lightIDs = this.state.checkedLightIDs;
    Bridge.createGroup(name, lightIDs).
           then(this.onGroupSaved.bind(this, name, lightIDs)).
           catch(this.onGroupSaveError.bind(this));
  }

  isValid() {
    if (this.state.name.length < 1) {
      return false;
    }
    if (this.state.checkedLightIDs.length < 1) {
      return false;
    }
    return true;
  }

  render() {
    const checkedLightIDs = this.state.checkedLightIDs;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className={s.field}>
          <label className={s.label} htmlFor="new-group-name">Name</label>
          <input type="text" id="new-group-name"
            onChange={this.onNameChange.bind(this)}
            placeholder="e.g., Back Bedroom"
          />
        </div>
        <div className={cx(s.lightsField, s.field)}>
          {this.props.ids.map((lightID) => {
            return (
              <LightCheckbox key={lightID} id={lightID}
                onToggle={this.onLightToggled.bind(this)}
                checked={checkedLightIDs.indexOf(lightID) > -1}
                {...this.props.lights[lightID]}
              />
            );
          })}
        </div>
        <div className={s.formControls}>
          <button type="submit" disabled={!this.isValid()}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default NewGroup;
