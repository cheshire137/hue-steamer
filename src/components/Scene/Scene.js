import React, { Component, PropTypes } from 'react';
import s from './Scene.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Daytime from '../../models/daytime';
import FontAwesome from 'react-fontawesome';
import Bridge from '../../api/bridge';

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
    this.state = { open: false, picture: undefined, lightstates: undefined };
  }

  onSceneLoaded(scene) {
    this.setState({ picture: scene.picture, lightstates: scene.lightstates });
  }

  onSceneLoadError(response) {
    console.error('failed to get scene', response);
  }

  loadPicture() {
    Bridge.getScene(this.props.id).
           then(this.onSceneLoaded.bind(this)).
           catch(this.onSceneLoadError.bind(this));
  }

  toggleSceneOpen(event) {
    event.preventDefault();
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open && typeof this.state.picture === 'undefined') {
        this.loadPicture();
      }
    });
    event.target.blur();
  }

  render() {
    const lightCount = this.props.lights.length;
    const units = lightCount === 1 ? 'light' : 'lights';
    const themeClass = Daytime.isNight() ? s.night : s.day;
    const openStyle = { display: 'none' };
    if (this.state.open) {
      openStyle.display = 'block';
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
        <div style={openStyle}>
          <p className={s.lights}>
            {this.props.lights.map((light) => {
              if (typeof light === 'string') {
                return light;
              }
              return light.name;
            }).join(', ')}
          </p>
          <div className={s.id}>
            ID: {this.props.id}
          </div>
        </div>
      </li>
    );
  }
}

export default Scene;
