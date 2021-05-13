var models = require('./model');
var gameModel = models.gameModel;
var championModel = models.championModel;
var actionModel = models.actionModel;
var notificationModel = models.notificationModel;
var profileModel = models.profileModel;

GameService.$inject = ['$q', 'serverApi'];

function GameService($q, serverApi) {
  return {
    login: function(username) {
      return serverApi.login(username);
    },

    connect: function(token) {
      return serverApi.connect(token).then(function(api) {
        var game = gameModel();
        var myProfile = profileModel();

        function resetGame() {
          game = gameModel();
        }

        function findMyChampion(gameData) {
          var champion;
          for (var i = 0; i < gameData.champions.length; i++) {
            var c = gameData.champions[i];
            if (c.username === myProfile.username) {
              champion = c;
              break;
            }
          }
          return champion;
        }

        function applyGameData(game, gameData) {
          game.finished = gameData.finished;
          game.winner = gameData.winner;

          var champion = findMyChampion(gameData);
          if (game.finished && champion.notifications.length === 0) {
            setGameState('CELEBRATE');
          }
          game.champions = gameData.champions.map(convertChampion);
        }

        function updateMyProfile(profileData) {
          myProfile = convertProfile(profileData);
        }

        function setGameState(state) {
          game.state = state;
        }

        function convertProfile(profileData) {
          var profile = profileModel();
          profile.username = profileData.username || '';
          profile.championId = profileData.championId || null;
          return profile;
        }

        function convertChampion(championData) {
          var champion = championModel();
          champion.profile = convertProfile(championData);
          champion.health = championData.health || 0;
          champion.steps = championData.steps || 0;
          champion.shield = championData.shield || 0;
          champion.slow = championData.slow || 0;
          champion.actions = championData.actions.map(convertAction);
          champion.notifications = championData.notifications.map(convertNotification);
          return champion;
        }

        function convertAction(actionData) {
          var action = actionModel();
          action.name = actionData.name || '';
          action.cost = actionData.cost || 0;
          action.value = actionData.value || 0;
          return action;
        }

        function convertNotification(notificationData) {
          var notification = notificationModel();
          notification.action = convertAction(notificationData.action);
          notification.id = notificationData.id;
          return notification;
        }

        function getMyProfile() {
          return api.getMyProfile().then(function(profileData) {
            updateMyProfile(profileData);
          }).catch(function(error) {
            console.warn('Failed to get my profile: %s', error);
          });
        }

        function chooseChampion(championId) {
          return api.chooseChampion({championId: championId}).then(function() {
            setGameState('START_GAME');
          }).catch(function(error) {
            console.warn('Failed to choose champion: %s', error);
          });
        }

        function resetChampion() {
          setGameState('CHOOSE_CHAMPION');
          return $q.when(true);
        }

        function tryJoinGame() {
          return api.joinGame().then(function(gameData) {
            setGameState('IN_GAME');
            applyGameData(game, gameData);
          }).catch(function(error) {
            console.warn('Failed to join existing game: %s', error);
            setGameState('CHOOSE_CHAMPION');
          });
        }

        function startGame() {
          setGameState('SEARCHING_GAME');
          return api.startGame().catch(function(error) {
            console.warn('Failed to start game: %s', error);
            setGameState('START_GAME');
          });
        }

        function cancelSearch() {
          return api.cancelSearch().then(function() {
            setGameState('START_GAME');
          }).catch(function(error) {
            console.warn('Failed to cancel game search: %s', error);
          });
        }

        function syncSteps(numberOfSteps) {
          return api.syncSteps({value: numberOfSteps}).catch(function(error) {
            console.warn('Failed to sync steps: %s', error);
          });
        }

        function leaveGame() {
          return api.leaveGame().then(function() {
            resetGame();
            setGameState('CHOOSE_CHAMPION');
          }).catch(function(error) {
            console.warn('Failed to leave Game: %s', error);
          });
        }

        function performAction(action) {
          return api.performAction(action).catch(function(error) {
            console.warn('Failed to perform action: %s', error);
          });
        }

        function ackNotification() {
          return api.ackNotification().catch(function(error) {
            console.warn('Failed to acknowledge notification: %s', error);
          });
        }

        function concede() {
          return api.concede().catch(function(error) {
            console.warn('Failed to concede: %s', error);
          });
        }

        function disconnect() {
          return api.disconnect();
        }

        api.onProfileUpdate(function(profileData) {
          updateMyProfile(profileData);
        });

        api.onGameInvite(function() {
          api.acceptInvite().catch(function(error) {
            console.warn('Failed to accept invite: %s', error);
            setGameState('START_GAME');
          });
        });

        api.onGameUpdate(function(gameData) {
          applyGameData(game, gameData);
        });

        api.onGameStarted(tryJoinGame);

        api.onDisconnect(function() {
          console.warn('Connection lost.');
        });

        return getMyProfile().then(function() { return tryJoinGame(); }).then(function() {
          var session = {
            getGame: function() {
              return game;
            },

            getMyProfile: function() {
              return myProfile;
            },

            chooseChampion: function(championId) {
              return chooseChampion(championId).then(function() { return session; });
            },

            resetChampion: function() {
              return resetChampion().then(function() { return session; });
            },

            tryJoinGame: function() {
              return tryJoinGame().then(function() { return session; });
            },

            startGame: function() {
              return startGame().then(function() { return session; });
            },

            cancelSearch: function() {
              return cancelSearch().then(function() { return session; });
            },

            syncSteps: function(numberOfSteps) {
              return syncSteps(numberOfSteps).then(function() { return session; });
            },

            performAction: function(action) {
              return performAction(action).then(function() { return session; });
            },

            ackNotification: function() {
              return ackNotification().then(function() { return session; });
            },

            leaveGame: function() {
              return leaveGame().then(function () { return session; });
            },

            concede: function() {
              return concede().then(function() { return session; });
            },

            onDisconnect: function(callback) {
              api.onDisconnect(callback);
            },

            disconnect: function() {
              return disconnect().then(function() { return session; });
            }
          };

          return session;
        });
      });
    }
  };
}

module.exports = GameService;
