import Config from '../config.json';
import cookie from 'react-cookie';

class CookieAndLocalStorage {
  getItem(key) {
    if (typeof window !== 'undefined') {
      if (window.localStorage) {
        return window.localStorage.getItem(key);
      }
      console.error('browser does not support local storage');
    }
    return cookie.load(key);
  }

  setItem(key, value) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
    cookie.save(key, value, { path: '/' });
  }
}

class LocalStorage {
  static getStore() {
    if (typeof this.store === 'undefined') {
      this.store = new CookieAndLocalStorage();
    }
    return this.store;
  }

  static getJSON() {
    const store = this.getStore();
    const appData = store.
        getItem(Config[process.env.NODE_ENV].localStorageKey) || '{}';
    return JSON.parse(appData);
  }

  static get(key) {
    const appData = this.getJSON();
    return appData[key];
  }

  static set(key, value) {
    const appData = this.getJSON();
    appData[key] = value;
    this.writeHash(appData);
  }

  static setMany(data) {
    const appData = this.getJSON();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (typeof value === 'undefined') {
          delete appData[key];
        } else {
          appData[key] = value;
        }
      }
    }
    this.writeHash(appData);
  }

  static writeHash(appData) {
    const store = this.getStore();
    store.setItem(Config[process.env.NODE_ENV].localStorageKey,
                  JSON.stringify(appData));
  }

  static delete(key) {
    const appData = this.getJSON();
    delete appData[key];
    this.writeHash(appData);
  }
}

export default LocalStorage;
