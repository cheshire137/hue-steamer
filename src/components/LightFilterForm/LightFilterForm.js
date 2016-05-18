import React, { Component, PropTypes } from 'react';
import s from './LightFilterForm.scss';
import Light from '../Light/Light';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';

@withStyles(s)
class LightFilterForm extends Component {
  static propTypes = {
    lights: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    onFiltered: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: undefined,
      lightState: undefined,
      model: undefined,
      sort: undefined,
    };
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
    if (lightState.length < 1) {
      lightState = undefined;
    }
    this.setState({ lightState }, () => {
      this.handleSubmit();
    });
  }

  onModelChange(event) {
    let model = event.target.value;
    if (model.length < 1) {
      model = undefined;
    }
    this.setState({ model }, () => {
      this.handleSubmit();
    });
  }

  onSortChange(event) {
    let sort = event.target.value;
    if (sort === 'name') {
      sort = undefined;
    }
    this.setState({ sort }, () => {
      this.handleSubmit();
    });
  }

  getFilteredLightIDs() {
    const sortedLights = [];
    for (const id in this.props.lights) {
      if (this.props.lights.hasOwnProperty(id)) {
        sortedLights.push(this.props.lights[id]);
      }
    }
    sortedLights.sort(this.lightSorter.bind(this));
    let filteredIDs = sortedLights.map((l) => l.id);
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

  lightSorter(a, b) {
    const aIsLoaded = typeof a === 'object';
    const bIsLoaded = typeof b === 'object';
    if (!aIsLoaded && !bIsLoaded) {
      return 0;
    }
    if (!aIsLoaded) {
      return -1;
    }
    if (!bIsLoaded) {
      return 1;
    }
    if (this.state.sort === 'model') {
      return a.modelid.localeCompare(b.modelid);
    }
    if (this.state.sort === 'state') {
      const aIsOn = a.state.on;
      const bIsOn = b.state.on;
      if (aIsOn && bIsOn) {
        return 0;
      }
      return aIsOn ? -1 : 1;
    }
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    return aName.localeCompare(bName);
  }

  isFiltered() {
    const props = [this.state.filter, this.state.lightState, this.state.model];
    const types = props.map((prop) => typeof prop);
    return types.indexOf('string') > -1;
  }

  clearFilter(event) {
    event.preventDefault();
    this.setState({
      filter: undefined,
      model: undefined,
      lightState: undefined,
    }, () => {
      this.handleSubmit();
    });
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const props = [this.state.filter, this.state.lightState, this.state.model];
    const filters = props.map((prop) => {
      if (typeof prop === 'string' && prop.length > 0) {
        return prop;
      }
    });
    const filterName = filters.length > 0 ? filters.join(', ') : undefined;
    this.props.onFiltered(filterName, this.getFilteredLightIDs());
  }

  render() {
    const models = this.getModels();
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="search" placeholder="Filter lights..."
          className={s.lightFilter}
          onChange={this.onFilterChange.bind(this)}
          value={this.state.filter}
          autoFocus="autofocus"
        />
        <label className={s.label}>State:</label>
        <select className={s.stateFilter}
          onChange={this.onStateChange.bind(this)}
        >
          <option value="" selected={typeof this.state.lightState === 'undefined'}>
            Any
          </option>
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
        <label className={s.label}>Model:</label>
        <select className={s.modelFilter}
          onChange={this.onModelChange.bind(this)}
        >
          <option value="" selected={typeof this.state.model === 'undefined'}>
            Any
          </option>
          {models.map((model) => {
            const key = this.props.ids.join(',') + '-' + model;
            return (
              <option value={model} key={key}>{model}</option>
            );
          })}
        </select>
        <label className={s.label}>Sort:</label>
        <select className={s.sort}
          onChange={this.onSortChange.bind(this)}
        >
          <option value="name" selected={typeof this.state.sort === 'undefined'}>
            Name
          </option>
          <option value="model">Model</option>
          <option value="state">State</option>
        </select>
        {this.isFiltered() ? (
          <a href="#" className={s.clear} onClick={this.clearFilter.bind(this)}>
            Clear
          </a>
        ) : ''}
      </form>
    );
  }
}

export default LightFilterForm;
