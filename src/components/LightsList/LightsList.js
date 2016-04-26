import React, { Component, PropTypes } from 'react';
import s from './LightsList.scss';
import Light from '../Light/Light';
import withStyles from '../../decorators/withStyles';
import TimerMixin from 'react-timer-mixin';

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
    this.state = {};
  }

  getFilteredLightIDs(filter) {
    let filteredIDs = this.props.ids;
    if (typeof filter !== 'undefined') {
      filteredIDs = filteredIDs.filter((id) => {
        const light = this.props.lights[id];
        if (typeof light !== 'object') {
          return true;
        }
        return light.name.toLowerCase().indexOf(filter) > -1;
      });
    }
    return filteredIDs;
  }

  filterLights(event) {
    const callback = () => {
      let filter = event.target.value.toLowerCase().trim();
      if (filter.length < 1) {
        filter = undefined;
      }
      if (this.state.filter !== filter) {
        this.setState({ filter });
        this.props.onFiltered(filter, this.getFilteredLightIDs(filter));
      }
    };
    TimerMixin.setTimeout(callback, 750);
  }

  render() {
    const filteredIDs = this.getFilteredLightIDs(this.state.filter);
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
