import _ from 'lodash';

const MIN_UPDATE_DELAY = 500;
const MAX_UPDATE_DELAY = 2000;
const MIN_STEPS_COUNT = 1;
const MAX_STEPS_COUNT = 5;

class Pedometer {
  constructor($q, $log, $timeout) {
    let pedometerNextUpdatePromise;
    let pedometerTotal = 0;
    this.pedometer = {
      startPedometerUpdates(callback) {
        function fireNextUpdate() {
          pedometerNextUpdatePromise = $timeout(
            function() {}, _.random(MIN_UPDATE_DELAY, MAX_UPDATE_DELAY))
            .then(() => {
              if (pedometerNextUpdatePromise) {
                pedometerTotal += _.random(MIN_STEPS_COUNT, MAX_STEPS_COUNT);
                callback({
                  numberOfSteps: pedometerTotal
                });
                fireNextUpdate();
              }
            });
        }
        fireNextUpdate();
      },

      stopPedometerUpdates(callback) {
        if (pedometerNextUpdatePromise) {
          $timeout.cancel(pedometerNextUpdatePromise);
          pedometerNextUpdatePromise = null;
          pedometerTotal = 0;
        }
        callback('OK');
      }
    };
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

Pedometer.$inject = ['$q', '$log', '$timeout'];

export default Pedometer;
