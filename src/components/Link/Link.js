/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    query: PropTypes.object,
    state: PropTypes.object,
    onClick: PropTypes.func,
  };

  static handleClick = (event) => {
    let allowTransition = true;
    let clickResult;

    if (this.props && this.props.onClick) {
      clickResult = this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (clickResult === false || event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      const link = event.currentTarget;
      if (this.props && this.props.to) {
        Location.push({
          ...(parsePath(this.props.to)),
          state: this.props && this.props.state || null,
        });
      } else {
        Location.push({
          pathname: link.pathname,
          search: link.search,
          state: this.props && this.props.state || null,
        });
      }
    }
  };

  render() {
    const { to, query, ...props } = this.props;
    return <a href={Location.createHref(to, query)} onClick={Link.handleClick.bind(this)} {...props} />;
  }

}

export default Link;
