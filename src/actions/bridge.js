import fetch from '../core/fetch';
import Config from '../config.json';

class Bridge {
  static async getInfo(ip, user) {
    return this.makeRequest('/bridge?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user));
  }

  static async saveConnection(ip, user) {
    const opts = { method: 'POST' };
    return this.makeRequest('/bridgeConnection?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user), opts);
  }

  static async getConnection(id) {
    return this.makeRequest('/bridgeConnection/' + id);
  }

  static async getGroup(ip, user, id) {
    let path = '/group?ip=' + encodeURIComponent(ip) +
               '&user=' + encodeURIComponent(user);
    if (typeof id !== 'undefined') {
      path += '&id=' + encodeURIComponent(id);
    }
    return this.makeRequest(path);
  }

  static async getLight(ip, user, id) {
    return this.makeRequest('/light/' + id + '?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user));
  }

  static async getAllLights(ip, user) {
    return this.getGroup(ip, user, '0');
  }

  static async turnOnLight(ip, user, id) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + id + '/on?ip=' +
                            encodeURIComponent(ip) + '&user=' +
                            encodeURIComponent(user), opts);
  }

  static async turnOffLight(ip, user, id) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + id + '/off?ip=' +
                            encodeURIComponent(ip) + '&user=' +
                            encodeURIComponent(user), opts);
  }

  static async makeRequest(path, optionalOptions) {
    const options = optionalOptions || {};
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
}

export default Bridge;
