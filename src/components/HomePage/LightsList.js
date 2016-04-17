import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';

class LightsList extends Component {
  static propTypes = {
    lights: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    console.log('group props', props);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default LightsList;
