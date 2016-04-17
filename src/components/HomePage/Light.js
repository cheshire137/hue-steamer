import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import Bridge from '../../actions/bridge';
import Converter from '../../api/converter';

class Light extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { lights: [], loaded: false };
  }

  componentDidMount() {
    Bridge.getLight(this.props.ip, this.props.user, this.props.id).
           then(this.onLightLoaded.bind(this));
  }

  onLightLoaded(light) {
    if (light.hasOwnProperty('errno')) {
      console.error('failed to load light ' + this.props.id, light);
      return;
    }
    this.setState({ light, loaded: true });
  }

  onLightToggle() {
    const light = this.state.light;
    if (light.state.on) {
      Bridge.turnOffLight(this.props.ip, this.props.user, this.props.id).
             then(this.onLightToggleComplete.bind(this));
    } else {
      Bridge.turnOnLight(this.props.ip, this.props.user, this.props.id).
             then(this.onLightToggleComplete.bind(this));
    }
  }

  onLightToggleComplete(result) {
    if (result) {
      const light = this.state.light;
      light.state.on = !light.state.on;
      this.setState({ light });
    }
  }

  getLightHex() {
    const lightState = this.state.light.state;
    if (lightState.on) {
      const xy = lightState.xy;
      if (typeof xy === 'object') {
        return '#' + Converter.cie1931ToHex(xy[0], xy[1], lightState.bri);
      }
    }
  }

  render() {
    const checkboxID = 'light-' + this.props.id + '-toggle';
    const colorStyle = {};
    if (typeof this.state.light === 'object') {
      const backgroundColor = this.getLightHex();
      if (typeof backgroundColor !== 'undefined') {
        colorStyle.backgroundColor = backgroundColor;
      }
    }
    return (
      <li className={s.light}>
        {this.state.loaded ? (
          <div>
            <header className={s.lightHeader}>
              <div className={s.lightNameArea}>
                <span className={s.name} title={this.state.light.name}>
                  {this.state.light.name}
                </span>
              </div>
              <div className={s.onoffswitch}>
                <input type="checkbox" name="onoffswitch"
                  className={s.onoffswitchCheckbox} id={checkboxID}
                  checked={this.state.light.state.on}
                  onChange={this.onLightToggle.bind(this)}
                />
                <label className={s.onoffswitchLabel} htmlFor={checkboxID}>
                  <span className={s.onoffswitchInner}></span>
                  <span className={s.onoffswitchSwitch}></span>
                </label>
              </div>
            </header>
            <footer className={s.lightFooter}>
              <div className={s.metadata}>
                <span className={s.type}>{this.state.light.type}</span>
                <span className={s.manufacturer}>
                  {this.state.light.manufacturername}
                </span>
                <span className={s.model}>{this.state.light.modelid}</span>
              </div>
              <div className={s.colorBlock} style={colorStyle}>
              </div>
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
