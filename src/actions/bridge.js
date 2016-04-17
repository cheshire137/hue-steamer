import fetch from '../core/fetch';
import Config from '../config.json';

class Bridge {
  static async getInfo(ip, user) {
    return this.makeRequest('/bridge?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user));
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

  static async makeRequest(path) {
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export default Bridge;
