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
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      lights: [],
      loaded: false,
      showColorPicker: false,
    };
  }

  componentDidMount() {
    this.updateLight();
  }

  onLightLoaded(light) {
    if (light.hasOwnProperty('errno')) {
      console.error('failed to load light ' + this.props.id, light);
      return;
    }
    light.id = this.props.id;
    this.setState({
      light,
      loaded: true,
      latestColor: this.getLightHex(light.state),
    });
    this.props.onLightLoaded(light);
  }

  onLightToggle() {
    const light = this.state.light;
    if (light.state.on) {
      Bridge.turnOffLight(this.props.id).
             then(this.onLightToggleComplete.bind(this));
    } else {
      Bridge.turnOnLight(this.props.id).
             then(this.onLightToggleComplete.bind(this));
    }
  }

  onLightToggleComplete(success) {
    if (success) {
      const light = this.state.light;
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
      console.error('failed to change light color', this.state.light.name);
    }
  }

  getLightHex(optionalLightState) {
    const lightState = optionalLightState || this.state.light.state;
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

  updateLight() {
    Bridge.getLight(this.props.id).then(this.onLightLoaded.bind(this));
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
    if (typeof this.state.light === 'object') {
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
                <span className={s.name} title={this.state.light.name}>
                  {this.state.light.name}
                </span>
              </div>
              <OnOffSwitch id={checkboxID} on={this.state.light.state.on}
                onToggle={this.onLightToggle.bind(this)}
              />
            </header>
            <footer className={s.lightFooter}>
              <div className={s.metadata}>
                <span className={s.type}>{this.state.light.type}</span>
                <span className={s.manufacturer}>
                  {this.state.light.manufacturername}
                </span>
                <span className={s.model}>{this.state.light.modelid}</span>
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
