import React, { Component, PropTypes } from 'react';
import s from './Light.scss';
import Bridge from '../../actions/bridge';
import Converter from '../../api/converter';
import { SketchPicker } from 'react-color';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch';

@withStyles(s)
class Light extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onLightLoaded: PropTypes.func.isRequired,
    light: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    let latestColor = undefined;
    let loaded = false;
    if (typeof props.light === 'object') {
      latestColor = this.getLightHex(props.light.state);
      loaded = true;
    }
    this.state = {
      loaded,
      showColorPicker: false,
      latestColor,
    };
  }

  componentDidMount() {
    if (!this.state.loaded) {
      Bridge.getLight(this.props.id).
             then(this.onLightLoaded.bind(this)).
             catch(this.onLightLoadError.bind(this));
    }
  }

  onLightLoaded(light) {
    light.id = this.props.id;
    this.props.onLightLoaded(light);
  }

  onLightLoadError(response) {
    console.error('failed to load light ' + this.props.id, response);
  }

  onLightToggle(turnOn) {
    if (turnOn) {
      Bridge.turnOnLight(this.props.id).
             then(this.onLightToggleComplete.bind(this));
    } else {
      Bridge.turnOffLight(this.props.id).
             then(this.onLightToggleComplete.bind(this));
    }
  }

  onLightToggleComplete(success) {
    if (success) {
      const light = this.props.light;
      light.state.on = !light.state.on;
      this.setState({ light });
    }
  }

  onColorPickerChange(color) {
    this.setState({ latestColor: color.hex });
    this.changeColor(color.hex);
  }

  onColorPickerCancel() {
    this.setState({ showColorPicker: false });
  }

  onColorChanged(success) {
    if (!success) {
      console.error('failed to change light color', this.props.light.name);
    }
  }

  getLightHex(optionalLightState) {
    const lightState = optionalLightState || this.props.light.state;
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
    Bridge.setLightColor(this.props.id, x, y).
           then(this.onColorChanged.bind(this));
  }

  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }

  render() {
    const checkboxID = 'light-' + this.props.id + '-toggle';
    const colorStyle = {};
    const colorPickerStyle = {
      display: this.state.showColorPicker ? 'block' : 'none',
    };
    if (typeof this.props.light === 'object') {
      if (typeof this.state.latestColor !== 'undefined') {
        colorStyle.backgroundColor = '#' + this.state.latestColor;
      }
    }
    return (
      <li className={cx(s.light, this.isNight() ? s.night : s.day)}>
        {this.state.loaded ? (
          <div>
            <header className={s.lightHeader}>
              <div className={s.lightNameArea}>
                <span className={s.name} title={this.props.light.name}>
                  {this.props.light.name}
                </span>
              </div>
              <OnOffSwitch id={checkboxID} state={this.props.light.state.on ? 2 : 0}
                onToggle={this.onLightToggle.bind(this)}
              />
            </header>
            <footer className={s.lightFooter}>
              <div className={s.metadata}>
                <span className={s.type}>{this.props.light.type}</span>
                <span className={s.manufacturer}>
                  {this.props.light.manufacturername}
                </span>
                <span className={s.model}>{this.props.light.modelid}</span>
              </div>
              {colorStyle.backgroundColor ? (
                <div className={s.colorBlockAndPicker}>
                  <button type="button" onClick={this.toggleColorPicker.bind(this)}
                    className={s.colorBlock} style={colorStyle}
                  ></button>
                  <div style={colorPickerStyle} className={s.colorPickerWrapper}>
                    <SketchPicker color={colorStyle.backgroundColor}
                      onChangeComplete={this.onColorPickerChange.bind(this)}
                    />
                  </div>
                </div>
              ) : ''}
            </footer>
          </div>
        ) : (
          <span>Loading light {this.props.id}...</span>
        )}
      </li>
    );
  }
}

export default Light;
