import _ from 'lodash';

class GamePageController {
  constructor($scope, $log, $mdDialog, actionNotificationService, env) {
    this.$log = $log;
    this.$mdDialog = $mdDialog;
    this.env = env;
    this.actionNotificationService = actionNotificationService;
    this.onGameStart();
    $scope.$on('$destroy', () => {
      this.onGameEnd();
    });

    // watch notifications
    $scope.$watch(() => {
      let notifications = this.getMyChampion().notifications;
      return notifications.length ?
        notifications[0] : undefined;
    }, notification => {
      this.$log.debug('got-new-notification', notification);
      if (notification && notification.action) {
        this.showDialog(notification.action).then(() => {
          this.$log.debug('notification dialog closed');
        });
      }
    }, true);
  }

  back() {
    var confirm = this.$mdDialog.confirm()
      .title('Leaving fight?')
      .textContent('You are about to leave the fight, are you sure?')
      .ok('Yes please')
      .cancel('No! This is Sparta!');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.onBack();
      });
  }

  getMyChampion() {
    return _.find(this.game.champions, c => {
      return c.profile.username === this.profile.username;
    });
  }

  getOpponentChampion() {
    return _.find(this.game.champions, c => {
      return c.profile.username !== this.profile.username;
    });
  }

  add100() {
    this.onAddSteps({amount: 100});
  }

  performAction(action) {
    const myChampion = this.getMyChampion();

    if (myChampion.steps >= action.cost) {
      this.onAction({action: action});
    }
  }

  showDialog(action) {
    this.$log.debug('try ack notification');
    return this.actionNotificationService.showDialog(action).then(() => {
      return this.onAckNotification().then(() => {
        this.$log.debug('notification ack OK');
      }, err => {
        this.$log.error('notification ack err:', err);
      });
    });
  }

  getProgress(action) {
    let steps = this.getMyChampion().steps;
    return Math.min(1, _.round(steps / action.cost, 2));
  }
}

GamePageController.$inject = [
  '$scope',
  '$log',
  '$mdDialog',
  'actionNotificationService',
  'env'
];

export default GamePageController;
