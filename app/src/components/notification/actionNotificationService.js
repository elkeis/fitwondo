import angular from 'angular';
import dialogTemplateUrl from './actionNotification.html';
import ActionNotificationController from './ActionNotificationController';
import './actionNotification.scss';

class ActionNotificationService {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  showDialog(action) {
    return this.$mdDialog.show({
      templateUrl: dialogTemplateUrl,
      controller: ActionNotificationController,
      parent: angular.element(document.body),
      clickOutsideToClose: false,
      locals: {
        action: action
      }
    });
  }
}

ActionNotificationService.$inject = ['$mdDialog'];

export default ActionNotificationService;
