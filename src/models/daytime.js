class Daytime {
  static isNight() {
    const curTime = new Date();
    return curTime.getHours() >= 20;
  }
}

export default Daytime;
