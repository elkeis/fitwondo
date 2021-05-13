import {gameModel, profileModel, championModel, actionModel, notificationModel} from './model';

class GameService {
  constructor($q, $firebaseDb, $firebaseFn, authService) {
    this.$q = $q;
    this.$db = $firebaseDb;
    this.$fn = $firebaseFn;
    this.authService = authService;
  }

  connect() {
    return this.authService.getCurrentUser().then(user => {
      let userId = user.id;
      let game = gameModel();
      let myProfile = profileModel();

      let tryJoinGame = () => {
        return this.$q.when(
          this.$db.ref(`players/${userId}/activeGameId`).once('value', activeGameIdRef => {
            if (activeGameIdRef.val()) {
              return this.$db.ref(`games/${activeGameId.val()}`).once('value', gameRef => {
                game.champions = gameRef.val().champions;
                game.finished = gameRef.val().finished;
                if (game.finished) {
                  game.state = 'CELEBRATE';
                } else {
                  game.state = 'IN_GAME';
                }
              });
            } else {
              game.state = 'CHOOSE_CHAMPION';
            }
          })
        );
      };

      let chooseChampion = championId => {
        return this.$q.when(
          this.$db.ref(`players/${userId}/championId`).set(championId).then(() => {
            game.state = 'START_GAME';
          })
        );
      };

      let startGame = () => {
        const gameId = this.$db.ref('games').push().key;

        return this.$q.when(
          this.$db.ref(`games/${gameId}`).set({
            champions: [],
            finished: false
          }).then(() => {
            game.state = 'SEARCHING_GAME'
          })
        );
      };

      return tryJoinGame().then(() => {
        let session = {
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
          }
        };

        return session;
      });
    });
  }
}

GameService.$inject = ['$q', '$firebaseDb', '$firebaseFn', 'authService'];

export default GameService;
