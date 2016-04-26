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
    onFiltered: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: undefined, lightState: undefined };
  }

  onFilterChange(event) {
    let filter = event.target.value.toLowerCase().trim();
    if (filter.length < 1) {
      filter = undefined;
    }
    this.setState({ filter }, () => {
      this.handleSubmit();
    });
  }

  onStateChange(event) {
    let lightState = event.target.value;
    if (lightState.length === 0) {
      lightState = undefined;
    }
    this.setState({ lightState }, () => {
      this.handleSubmit();
    });
  }

  getFilteredLightIDs() {
    let filteredIDs = this.props.ids;
    if (typeof this.state.filter !== 'undefined') {
      filteredIDs = filteredIDs.filter((id) => {
        const light = this.props.lights[id];
        if (typeof light !== 'object') {
          return true;
        }
        return light.name.toLowerCase().indexOf(this.state.filter) > -1;
      });
    }
    if (typeof this.state.lightState !== 'undefined') {
      filteredIDs = filteredIDs.filter((id) => {
        const light = this.props.lights[id];
        if (typeof light !== 'object') {
          return true;
        }
        if (light.state.on && this.state.lightState === 'on') {
          return true;
        }
        return !light.state.on && this.state.lightState === 'off';
      });
    }
    return filteredIDs;
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const filters = [];
    if (typeof this.state.filter === 'string') {
      filters.push(this.state.filter);
    }
    if (typeof this.state.lightState === 'string') {
      filters.push(this.state.lightState);
    }
    const filterName = filters.length > 0 ? filters.join(', ') : undefined;
    this.props.onFiltered(filterName, this.getFilteredLightIDs());
  }

  render() {
    const filteredIDs = this.getFilteredLightIDs();
    return (
      <div className={s.lightListContainer}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="search" placeholder="Filter lights..."
            className={s.lightFilter}
            onChange={this.onFilterChange.bind(this)}
            autoFocus="autofocus"
          />
          <label className={s.label}>State:</label>
          <select className={s.stateFilter} onChange={this.onStateChange.bind(this)}>
            <option value="">Any</option>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </form>
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
