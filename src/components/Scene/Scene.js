import React, { Component, PropTypes } from 'react';
import s from './Scene.scss';
import withStyles from '../../decorators/withStyles';

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
    this.state = {};
  }

  render() {
    const lightCount = this.props.lights.length;
    const units = lightCount === 1 ? 'light' : 'lights';
    return (
      <li className={s.scene}>
        <h3 className={s.name}>
          {this.props.name}
          <span className={s.lightCount}>{lightCount} {units}</span>
        </h3>
        <p className={s.lights}>
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
