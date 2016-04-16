import fetch from '../core/fetch';
import Config from '../config.json';

class Bridge {
  static async getInfo(ip, user) {
    return this.makeRequest('/bridge?ip=' + encodeURIComponent(ip) +
                            '&user=' + encodeURIComponent(user));
  }

  static async makeRequest(path) {
    const url = Config[process.env.NODE_ENV].serverUri + path;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export default Bridge;
