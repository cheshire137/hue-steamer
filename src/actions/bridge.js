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

  static async turnOnLight(id) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + id + '/on', opts);
  }

  static async turnOffLight(id) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + id + '/off', opts);
  }

  static async setLightColor(id, x, y) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + id + '/color' +
                            '?x=' + x + '&y=' + y, opts);
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
