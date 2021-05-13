'use strict';
StepsSyncFactory.$inject = ['$q', '$window', 'socket', 'promiseWrap'];

function StepsSyncFactory($q, $window, socket, wrap) {
  let pedometer = $window.pedometer;
  let service;
  if (pedometer) {
    let steps = 0;
    pedometer.startPedometerUpdates(function(data) {
      console.log('steps counted:', data.numberOfSteps);
      steps = data.numberOfSteps;
    });

    let synced = 0;
    let currentSync;
    socket().then(socket => {
      socket.on('error', function() {
        console.log('remove current sync promise');
        currentSync = undefined;
      });
    });
    service = {
      sync: function() {
        console.log('syncing steps');
        return socket().then(socket => {
          console.log('socket received');
          function registerSync() {
            const totalSteps = steps;
            const stepsToSync = totalSteps - synced;
            console.log('sync REGISTERED',
              'totalSteps: ' + totalSteps,
              'stepsToSync: ' + stepsToSync,
              'synced: ', synced);
            let promise = wrap(socket.execute('syncSteps', {
              steps: stepsToSync
            }), 5000).then(function() {
              synced += stepsToSync;
              console.log('sync SUCCEED',
              'totalSteps: ' + totalSteps,
              'stepsToSync: ' + stepsToSync,
              'synced: ', synced);
            }).catch(function(err) {
              console.log('sync FAILED',
              'totalSteps: ' + totalSteps,
              'stepsToSync: ' + stepsToSync,
              'synced: ', synced);
              console.log(err);
            });
            return promise;
          }
          let promise;
          if (currentSync) {
            console.log('current sync is in progress, register after it resolved');
            promise = currentSync = currentSync.then(registerSync);
          } else {
            promise = currentSync = registerSync();
          }
          promise.finally(() => {
            if (promise === currentSync) {
              currentSync = undefined;
            }
          });
          return promise;
        }).catch(err => {
          console.log(err);
          console.log('socket broken');
        });
      }
    };
  } else {
    service = {
      sync() {
        console.log('fake sync');
      }
    };
  }

  return service;
}

module.exports = StepsSyncFactory;
