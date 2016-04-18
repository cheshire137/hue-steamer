import fetch from '../core/fetch';
import Config from '../config.json';

class Bridge {
  static async getInfo(id) {
    return this.makeRequest('/bridge/' + id);
  }

  static async saveConnection(ip, user) {
    const opts = { method: 'POST' };
    return this.makeRequest('/bridgeConnection?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user), opts);
  }

  static async getConnection(id) {
    return this.makeRequest('/bridgeConnection/' + id);
  }

  static async getGroup(connectionID, optionalGroupID) {
    const groupID = optionalGroupID || '0';
    return this.makeRequest('/group/' + groupID +
                            '?connectionID=' + connectionID);
  }

  static async getLight(connectionID, lightID) {
    return this.makeRequest('/light/' + lightID +
                            '?connectionID=' + connectionID);
  }

  static async getAllLights(connectionID) {
    return this.getGroup(connectionID, '0');
  }

  static async turnOnLight(connectionID, lightID) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + lightID + '/on' +
                            '?connectionID=' + connectionID, opts);
  }

  static async turnOffLight(connectionID, lightID) {
    const opts = { method: 'POST' };
    return this.makeRequest('/light/' + lightID + '/off' +
                            '?connectionID=' + connectionID, opts);
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
