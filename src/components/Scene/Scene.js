import React, { Component, PropTypes } from 'react';
import s from './Scene.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Daytime from '../../models/daytime';
import FontAwesome from 'react-fontawesome';

@withStyles(s)
class Scene extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    appdata: PropTypes.object.isRequired,
    owner: PropTypes.string.isRequired,
    locked: PropTypes.bool.isRequired,
    recycle: PropTypes.bool.isRequired,
    lights: PropTypes.array.isRequired,
    version: PropTypes.number.isRequired,
    picture: PropTypes.string,
    lastupdated: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { open: false };
  }

  toggleSceneOpen(event) {
    event.preventDefault();
    this.setState({ open: !this.state.open });
    event.target.blur();
  }

  render() {
    const lightCount = this.props.lights.length;
    const units = lightCount === 1 ? 'light' : 'lights';
    const themeClass = Daytime.isNight() ? s.night : s.day;
    const lightStyle = { display: 'none' };
    if (this.state.open) {
      lightStyle.display = 'block';
    }
    return (
      <li className={cx(s.scene, themeClass)}>
        <h3 className={cx(s.name, themeClass)}>
          <a href="#" onClick={this.toggleSceneOpen.bind(this)}>
            {this.state.open ? (
              <FontAwesome name="chevron-down" className={s.openIndicator} />
            ) : (
              <FontAwesome name="chevron-right" className={s.openIndicator} />
            )}
            &ldquo;{this.props.name}&rdquo;
          </a>
          <span className={s.lightCount}>{lightCount} {units}</span>
        </h3>
        <p className={s.lights} style={lightStyle}>
          {this.props.lights.map((light) => {
            if (typeof light === 'string') {
              return light;
            }
            return light.name;
          }).join(', ')}
        </p>
      </li>
    );
  }
}

export default Scene;
