import React, { Component, PropTypes } from 'react';
import s from './LightsList.scss';
import Light from '../Light/Light';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';

@withStyles(s)
class LightsList extends Component {
  static propTypes = {
    lights: PropTypes.object.isRequired,
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

  onModelChange(event) {
    let model = event.target.value;
    if (model.length === 0) {
      model = undefined;
    }
    this.setState({ model }, () => {
      this.handleSubmit();
    });
  }

  isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
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
    if (typeof this.state.model !== 'undefined') {
      filteredIDs = filteredIDs.filter((id) => {
        const light = this.props.lights[id];
        if (typeof light !== 'object') {
          return true;
        }
        return light.modelid === this.state.model;
      });
    }
    return filteredIDs;
  }

  getModels() {
    const models = this.props.ids.map((id) => {
      const light = this.props.lights[id];
      if (typeof light !== 'object') {
        return undefined;
      }
      return light.modelid;
    });
    return [...new Set(models)];
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
    if (typeof this.state.model === 'string') {
      filters.push(this.state.model);
    }
    const filterName = filters.length > 0 ? filters.join(', ') : undefined;
    this.props.onFiltered(filterName, this.getFilteredLightIDs());
  }

  render() {
    const filteredIDs = this.getFilteredLightIDs();
    const models = this.getModels();
    const nightDayClass = this.isNight() ? s.night : s.day;
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
          <label className={s.label}>Model:</label>
          <select className={s.modelFilter} onChange={this.onModelChange.bind(this)}>
            <option value="">Any</option>
            {models.map((model) => {
              return (
                <option value={model} key={model}>{model}</option>
              );
            })}
          </select>
        </form>
        <ul className={s.lightList}>
          {filteredIDs.map((id) => {
            const light = this.props.lights[id];
            const loaded = typeof light === 'object';
            let xy = 'na';
            if (loaded) {
              xy = typeof light.state.xy === 'object' ? light.state.xy.join(',') : 'none';
            }
            const key = 'light-' + id + '-loaded-' + loaded +
                '-on-' + (loaded ? light.state.on : 'na') + '-xy-' + xy;
            return (
              <li key={key} className={cx(s.light, nightDayClass)}>
                {loaded ? (
                  <Light id={id} light={light} />
                ) : (
                  <span>Loading light {id}...</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default LightsList;
