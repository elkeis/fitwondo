var io = require('socket.io-client');
ServerApi.$inject = ['$http', '$q', '$timeout', '$rootScope', 'serverHost', 'serverPath'];

function ServerApi($http, $q, $timeout, $rootScope, serverHost, serverPath) {

  console.log('SERVER HOST: %s; SERVER PATH: %s', serverHost, serverPath);

  function url(path) {
    return serverHost + serverPath + path;
  }

  return {
    connect: function(token) {
      return $q(function(resolve, reject) {
        var socketOptions = {
          forceNew: true,
          reconnection: false,
          timeout: 5000,
          query: {
            token: token
          },
          transports: ['websocket']
        };

        var socket = serverHost ? io.connect(serverHost, socketOptions) : io.connect(socketOptions);

        socket.on('connect', function() {
          resolve(socket);
        });
        socket.on('connect_error', reject);

      }).then(function(socket) {

        function ackFn(resolve, reject) {
          return function(ack) {
            // console.debug('[SOCKET] Received %s', JSON.stringify(ack, null, 2));
            if (!ack || !ack.error) {
              if (resolve) {
                $rootScope.$apply(function() {
                  resolve(ack);
                });
              }
            } else if (reject) {
              $rootScope.$apply(function() {
                reject(ack.error);
              });
            }
          };
        }

        function callbackFn(callback) {
          return function() {
            var that = this;
            var args = arguments;
            // console.debug('[SOCKET] Received %s', JSON.stringify(args, null, 2));
            $rootScope.$apply(function() {
              callback.apply(that, args);
            });
          };
        }

        function timeoutFn(callback) {
          return function() {
            var that = this;
            var args = arguments;
            // console.debug('[SOCKET] Received %s', JSON.stringify(args, null, 2));
            $timeout(function() {
              callback.apply(that, args);
            });
          };
        }

        return {
          // system actions & events
          disconnect: function() {
            return $q.when(socket.disconnect());
          },
          onDisconnect: function(callback) {
            socket.on('disconnect', timeoutFn(callback));
          },
          onTransportError: function(callback) {
            socket.on('error', callbackFn(callback));
          },

          // actions
          getMyProfile: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('profileInfo', data, ackFn(resolve, reject));
            });
          },
          chooseChampion: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('chooseChampion', data, ackFn(resolve, reject));
            });
          },
          startGame: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('startGame', data, ackFn(resolve, reject));
            });
          },
          cancelSearch: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('cancelSearch', data, ackFn(resolve, reject));
            });
          },
          acceptInvite: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('acceptInvite', data, ackFn(resolve, reject));
            });
          },
          joinGame: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('joinGame', data, ackFn(resolve, reject));
            });
          },
          syncSteps: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('syncSteps', data, ackFn(resolve, reject));
            });
          },
          concede: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('concede', data, ackFn(resolve, reject));
            });
          },
          performAction: function(action, data) {
            return $q(function(resolve, reject) {
              socket.emit(action, data, ackFn(resolve, reject));
            });
          },
          ackNotification: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('ackNotification', data, ackFn(resolve, reject));
            });
          },

          leaveGame: function(data) {
            return $q(function(resolve, reject) {
              socket.emit('leaveGame', data, ackFn(resolve, reject));
            });
          },

          // events
          onProfileUpdate: function(callback) {
            socket.on('profileUpdate', callbackFn(callback));
          },
          onGameInvite: function(callback) {
            socket.on('gameInvite', callbackFn(callback));
          },
          onGameStarted: function(callback) {
            socket.on('gameStarted', callbackFn(callback));
          },
          onGameUpdate: function(callback) {
            socket.on('gameUpdate', callbackFn(callback));
          }
        };
      });
    },

    login: function(username) {
      return $http.post(url('/login'), {
        username: username
      }).then(function(response) {
        return response.data;
      });
    }
  };
}

module.exports = ServerApi;
