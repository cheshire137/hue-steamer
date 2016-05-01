import React, { Component, PropTypes } from 'react';
import s from './ScenesList.scss';
import withStyles from '../../decorators/withStyles';
import Scene from '../Scene/Scene';

@withStyles(s)
class ScenesList extends Component {
  static propTypes = {
    scenes: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ul className={s.scenesList}>
        {this.props.scenes.map((scene) => {
          let loaded = true;
          scene.lights.forEach((light) => {
            loaded = loaded && typeof light === 'object';
          });
          const key = 'scene-' + scene.id + '-loaded-' + loaded;
          return (
            <Scene key={key} {...scene} />
          );
        })}
      </ul>
    );
  }
}

export default ScenesList;
