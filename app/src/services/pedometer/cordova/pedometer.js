class Pedometer {
  constructor($window, $q, $log) {
    this.pedometer = $window.pedometer;
    this.$q = $q;
    this.$log = $log;
    this.total = 0;
    this.toSync = 0;
    this.subscribeFn = null;
  }

  subscribe(fn) {
    this.subscribeFn = fn;
    return this.$q.when(10);
  }

  unsubscribe() {
    this.subscribeFn = null;
  }

  start() {
    this.pedometer.startPedometerUpdates(data => {
      if (this.subscribeFn) {
        this.subscribeFn(this.toSync);
        this.toSync = 0;
      }
      this.toSync += data.numberOfSteps - this.total;
      this.total = data.numberOfSteps;
    }, error => {
      this.$log.error(error);
    });
  }

  stop() {
    let defered = this.$q.defer();
    this.pedometer.stopPedometerUpdates(ok => {
      defered.resolve(ok);
      this.total = 0;
    }, error => {
      defered.reject(error);
      this.$log.error(error);
    });
    return defered.promise;
  }

  reset() {
    this.total = 0;
    this.toSync = 0;
  }
}

Pedometer.$inject = ['$window', '$q', '$log'];

export default Pedometer;
