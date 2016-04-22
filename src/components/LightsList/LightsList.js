import React, { Component, PropTypes } from 'react';
import s from './LightsList.scss';
import Light from '../Light/Light';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class LightsList extends Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    onLightLoaded: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Lights</h2>
        <ul className={s.lightList}>
          {this.props.ids.map((id) => {
            return (
              <Light key={id} id={id}
                onLightLoaded={this.props.onLightLoaded}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default LightsList;
