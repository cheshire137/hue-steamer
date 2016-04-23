import React, { Component, PropTypes } from 'react';
import s from './LightsList.scss';
import Light from '../Light/Light';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class LightsList extends Component {
  static propTypes = {
    lights: PropTypes.object.isRequired,
    onLightLoaded: PropTypes.func.isRequired,
    ids: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ul className={s.lightList}>
        {this.props.ids.map((id) => {
          const light = this.props.lights[id];
          const loaded = typeof light === 'object';
          const key = 'light-' + id + '-loaded-' + loaded;
          return (
            <Light key={key} id={id} light={light}
              onLightLoaded={this.props.onLightLoaded}
            />
          );
        })}
      </ul>
    );
  }
}

export default LightsList;
