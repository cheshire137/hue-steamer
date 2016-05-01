import React, { Component, PropTypes } from 'react';
import s from './LightsList.scss';
import Light from '../Light/Light';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';
import LightFilterForm from '../LightFilterForm/LightFilterForm';
import Daytime from '../../models/daytime';

@withStyles(s)
class LightsList extends Component {
  static propTypes = {
    lights: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired,
    onFiltered: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filteredIDs: undefined };
  }

  onFiltered(filterName, filteredIDs) {
    this.setState({ filteredIDs });
    this.props.onFiltered(filterName, filteredIDs);
  }

  render() {
    let filteredIDs = this.props.ids;
    if (typeof this.state.filteredIDs === 'object') {
      filteredIDs = this.state.filteredIDs;
    }
    const nightDayClass = Daytime.isNight() ? s.night : s.day;
    return (
      <div className={s.lightListContainer}>
        <LightFilterForm ids={this.props.ids} lights={this.props.lights}
          onFiltered={this.onFiltered.bind(this)}
        />
        <ul className={s.lightList}>
          {filteredIDs.map((id) => {
            const light = this.props.lights[id];
            const loaded = typeof light === 'object';
            let xy = 'na';
            if (loaded) {
              xy = 'none';
              if (typeof light.state.xy === 'object') {
                xy = light.state.xy.join(',');
              }
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
