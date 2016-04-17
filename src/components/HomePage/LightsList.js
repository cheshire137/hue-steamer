import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import Light from './Light';

class LightsList extends Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
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
                user={this.props.user} ip={this.props.ip} id={id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default LightsList;
