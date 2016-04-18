import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import Light from './Light';

class LightsList extends Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    bridgeConnectionID: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul className={s.lightList}>
          {this.props.ids.map((id) => {
            return (
              <Light key={id}
                bridgeConnectionID={this.props.bridgeConnectionID}
                id={id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default LightsList;
