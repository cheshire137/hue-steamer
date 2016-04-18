import fetch from '../core/fetch';
import Config from '../config.json';

class Bridge {
  static async get(id) {
    if (typeof id === 'undefined') {
      return this.makeRequest('/bridge');
    }
    return this.makeRequest('/bridges/' + id);
  }

  static async save(ip, user) {
    const opts = { method: 'POST' };
    return this.makeRequest('/bridges?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user), opts);
  }

  static async getGroup(groupID) {
    return this.makeRequest('/group/' + (groupID || '0'));
  }

  static async getLight(lightID) {
    return this.makeRequest('/light/' + lightID);
  }

  static async getAllLights() {
    return this.getGroup('0');
  }

  static async turnOnLight(lightID) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + lightID + '/on', opts);
  }

  static async turnOffLight(lightID) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + lightID + '/off', opts);
  }

  static async makeRequest(path, optionalOptions) {
    const options = optionalOptions || {};
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(response.statusText);
  }
}

export default Bridge;
