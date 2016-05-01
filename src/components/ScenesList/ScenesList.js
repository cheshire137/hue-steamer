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

  sceneSort(a, b) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    return aName.localeCompare(bName);
  }

  render() {
    const orderedScenes = this.props.scenes.sort(this.sceneSort);
    return (
      <ul className={s.scenesList}>
        {orderedScenes.map((scene) => {
          const key = 'scene-' + scene.id;
          return (
            <Scene key={key} {...scene} />
          );
        })}
      </ul>
    );
  }
}

export default ScenesList;
