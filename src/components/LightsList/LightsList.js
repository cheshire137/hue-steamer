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
    this.state = { filter: undefined };
  }

  filterLights(event) {
    let filter = event.target.value.toLowerCase().trim();
    if (filter.length < 1) {
      filter = undefined;
    }
    this.setState({ filter });
  }

  render() {
    let filteredIDs = this.props.ids;
    if (typeof this.state.filter !== 'undefined') {
      filteredIDs = this.props.ids.filter((id) => {
        const light = this.props.lights[id];
        if (typeof light !== 'object') {
          return true;
        }
        return light.name.toLowerCase().indexOf(this.state.filter) > -1;
      });
    }
    return (
      <div className={s.lightListContainer}>
        <input type="search" placeholder="Filter lights"
          className={s.lightFilter}
          onChange={this.filterLights.bind(this)}
          autoFocus="autofocus"
        />
        <ul className={s.lightList}>
          {filteredIDs.map((id) => {
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
      </div>
    );
  }
}

export default LightsList;
