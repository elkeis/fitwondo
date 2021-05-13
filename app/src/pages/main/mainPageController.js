class MainPageController {
  constructor($log, gameService, pedometer, authService) {
    this.gameService = gameService;
    this.$log = $log;
    this.authService = authService;
    this.pedometer = pedometer;
    // callback functions has that crappy interface "function({property: value});"
    // scope events looks more simple.

    authService.getCurrentUser().then(user => {
      if (user) {
        this.$log.info('the user already logged in; user info: ', user);
        this._connect();
      }
    });
  }

  _connect() {
    return this.gameService.connect().then(session => {
      this.$log.info('connected!');
      this.session = session;
    }).catch(e => {
      this.$log.error('failed to connect:', e);
      this.session = null;
    });
  }

  login(username) {
    this.$log.info('logging in; username:' + username);
    this.authService.login(username)
      .then(user => {
        this.$log.info('successfully logged in; user info: ', user);
        this._connect();
      })
      .catch(e => {
        this.$log.warn('failed to log in', e);
      });
  }

  chooseChampion(championId) {
    this.$log.debug('shoose chamption event emit', championId);
    this.disableChooseChampionPage = true;
    this.session.chooseChampion(championId).finally(() => {
      this.$log.debug('shoose chamption event emit END');
      this.disableChooseChampionPage = false;
    });
  }

  startGame() {
    this.$log.debug('start game');
    this.disableStartGamePage = true;
    this.session.startGame().finally(() => {
      this.$log.debug('start game END');
      this.disableStartGamePage = false;
    });
  }

  logout() {
    this.$log.debug('logout');
    this.disableChooseChampionPage = true;
    return this.authService.logout().finally(() => {
      this.disableChooseChampionPage = false;
      location.reload();
    });
  }

  leaveGame() {
    this.disableCelebrationPage = true;
    this.session.leaveGame().finally(() => {
      this.disableCelebrationPage = false;
    });
  }

  reload() {
    this.$log.debug('reload');
    this.session.disconnect().finally(() => {
      location.reload();
    });
  }

  resetChampion() {
    this.$log.debug('reset champion');
    this.disableStartGamePage = true;
    this.session.resetChampion().finally(() => {
      this.disableStartGamePage = false;
    });
  }

  cancelSearch() {
    this.$log.debug('cancel search game');
    this.disableSearchGamePage = true;
    this.session.cancelSearch().finally(() => {
      this.$log.debug('cancel search game END');
      this.disableSearchGamePage = false;
    });
  }

  startPedometer() {
    this.pedometer.subscribe(stepsToSync => {
      this.session.syncSteps(stepsToSync);
    });
    this.pedometer.start();
  }

  stopPedometer() {
    this.pedometer.unsubscribe();
    this.pedometer.stop();
    this.pedometer.reset();
  }

  concede() {
    this.$log.debug('concede');
    this.disableGamePage = true;
    this.session.concede().finally(() => {
      this.disableGamePage = false;
    });
  }

  addSteps(amount) {
    this.session.syncSteps(amount);
  }

  ackNotification() {
    return this.session.ackNotification();
  }

  performAction(action) {
    this.disableGamePage = true;
    this.session.performAction(action.name).finally(() => {
      this.disableGamePage = false;
    });
  }
}

MainPageController.$inject = [
  '$log',
  'gameService',
  'pedometer',
  'authService'
];

export default MainPageController;
