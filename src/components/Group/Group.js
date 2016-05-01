import React, { Component, PropTypes } from 'react';
import s from './Group.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import FontAwesome from 'react-fontawesome';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch';
import Bridge from '../../api/bridge';
import { SliderPicker } from 'react-color';
import Converter from '../../models/converter';
import Daytime from '../../models/daytime';

@withStyles(s)
class Group extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    lights: PropTypes.array,
    onLightLoaded: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    class: PropTypes.string,
    onDeleted: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    let latestColor = undefined;
    const colors = this.getColorsFromLights(props.lights);
    if (colors.length === 1) {
      latestColor = colors[0];
    }
    this.state = {
      open: false,
      on: false,
      showColorPicker: false,
      latestColor,
      canSetColor: colors.length > 0,
    };
  }

  onLightsToggle(turnOn) {
    if (turnOn) {
      Bridge.turnOnGroup(this.props.id).
             then(this.onLightsToggleComplete.bind(this, true));
    } else {
      Bridge.turnOffGroup(this.props.id).
             then(this.onLightsToggleComplete.bind(this, false));
    }
  }

  onLightsToggleComplete(on, success) {
    if (success) {
      for (let i = 0; i < this.props.lights.length; i++) {
        const light = this.props.lights[i];
        light.state.on = on;
        this.props.onLightLoaded(light);
      }
      const colors = this.getColorsFromLights(this.props.lights);
      let latestColor = undefined;
      if (colors.length === 1) {
        latestColor = colors[0];
      }
      this.setState({ latestColor, canSetColor: colors.length > 0 });
    }
  }

  onDeleted(success) {
    if (success) {
      this.props.onDeleted(this.props.id);
    }
  }

  onDeleteError(response) {
    console.error('failed to delete group', this.props.id, response);
  }

  onEdit(event) {
    event.preventDefault();
    event.target.blur();
    this.props.onEdit(this.props.id, this.props.name, this.props.lights);
  }

  onColorPickerChange(color) {
    this.setState({ latestColor: color.hex });
    this.changeColor(color.hex);
  }

  onColorPickerCancel() {
    this.setState({ showColorPicker: false });
  }

  onColorChanged(x, y, success) {
    if (success) {
      for (let i = 0; i < this.props.lights.length; i++) {
        const light = this.props.lights[i];
        if (light.state.on && typeof light.state.xy === 'object') {
          light.state.xy = [x, y];
          this.props.onLightLoaded(light);
        }
      }
    } else {
      console.error('failed to change group color', this.props.name);
    }
  }

  onLightLoadError(response) {
    console.error('failed to load light ' + this.props.id, response);
  }

  getColorsFromLights(lights) {
    const colors = [];
    lights.forEach((light) => {
      if (typeof light === 'object') {
        colors.push(this.getLightHex(light.state));
      }
    });
    return [...new Set(colors)].filter((c) => typeof c === 'string');
  }

  getLightHex(lightState) {
    if (lightState.on) {
      const xy = lightState.xy;
      if (typeof xy === 'object') {
        return Converter.cie1931ToHex(xy[0], xy[1], lightState.bri);
      }
    }
  }

  changeColor(color) {
    const xy = Converter.hexToCIE1931(color);
    const x = xy[0];
    const y = xy[1];
    Bridge.setGroupColor(this.props.id, x, y).
           then(this.onColorChanged.bind(this, x, y));
  }

  toggleGroupOpen(event) {
    event.preventDefault();
    this.setState({ open: !this.state.open });
    event.target.blur();
  }

  areAllLightsOn() {
    for (let i = 0; i < this.props.lights.length; i++) {
      const light = this.props.lights[i];
      if (typeof light === 'string') {
        // Light not fully loaded, just have its ID
        return false;
      }
      if (!light.state.on) {
        return false;
      }
    }
    return true;
  }

  areSomeLightsOn() {
    for (let i = 0; i < this.props.lights.length; i++) {
      const light = this.props.lights[i];
      if (typeof light === 'string') {
        // Light not fully loaded, just have its ID
        return false;
      }
      if (light.state.on) {
        return true;
      }
    }
    return false;
  }

  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  deleteGroup(event) {
    event.preventDefault();
    event.target.blur();
    if (!confirm('Are you sure you want to delete ' + this.props.name + '?')) {
      return;
    }
    Bridge.deleteGroup(this.props.id).
           then(this.onDeleted.bind(this)).
           catch(this.onDeleteError.bind(this));
  }

  render() {
    const groupStyle = {};
    if (this.state.open) {
      groupStyle.display = 'block';
    } else {
      groupStyle.display = 'none';
    }
    const checkboxID = 'group-' + this.props.id + '-toggle';
    let switchState = 0;
    if (this.areSomeLightsOn()) {
      switchState = 1;
    }
    if (this.areAllLightsOn()) {
      switchState = 2;
    }
    const themeClass = Daytime.isNight() ? s.night : s.day;
    const colorPickerStyle = {
      display: this.state.showColorPicker ? 'block' : 'none',
    };
    let pickerColor = undefined;
    if (typeof this.state.latestColor === 'string') {
      pickerColor = '#' + this.state.latestColor;
    }
    return (
      <li className={cx(s.group, themeClass)}>
        <header className={s.groupHeader}>
          <h3 className={s.groupName}>
            <a href="#" onClick={this.toggleGroupOpen.bind(this)}>
              {this.state.open ? (
                <FontAwesome name="chevron-down" className={s.openIndicator} />
              ) : (
                <FontAwesome name="chevron-right" className={s.openIndicator} />
              )}
              {this.props.name}
            </a>
          </h3>
          {this.state.canSetColor ? (
            <div className={s.colorBlockAndPicker}>
              <button type="button" onClick={this.toggleColorPicker.bind(this)}
                className={cx(s.colorBlock, themeClass)}
              >
                Set Color
              </button>
              <div style={colorPickerStyle} className={cx(s.colorPickerWrapper, themeClass)}>
                <SliderPicker color={pickerColor}
                  onChangeComplete={this.onColorPickerChange.bind(this)}
                />
              </div>
            </div>
          ) : ''}
          <OnOffSwitch id={checkboxID} state={switchState}
            onToggle={this.onLightsToggle.bind(this)}
          />
        </header>
        <div className={s.groupContents} style={groupStyle}>
          <ul className={s.groupLights}>
            {this.props.lights.map((light) => {
              const isString = typeof light === 'string';
              const key = 'light-' + (isString ? light : light.id);
              return (
                <li key={key} className={s.groupLight}>
                  {isString ? light : light.name}
                </li>
              );
            })}
          </ul>
          <a href="#" onClick={this.onEdit.bind(this)} className={s.editLink}>
            <FontAwesome name="pencil" className={s.editIcon} />
            Edit
          </a>
          <footer className={s.footer}>
            <div className={s.classContainer}>
              Class:
              {typeof this.props.class === 'string' ? (
                <span className={s.class}>{this.props.class}</span>
              ) : (
                <span className={s.class}>&mdash;</span>
              )}
            </div>
            <div className={s.deleteButtonContainer}>
              <button type="button" className={cx(s.deleteButton, themeClass)}
                onClick={this.deleteGroup.bind(this)}
              >
                <FontAwesome name="trash-o" className={s.deleteIcon} />
                Delete
              </button>
            </div>
          </footer>
        </div>
      </li>
    );
  }
}

export default Group;
