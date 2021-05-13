class ActionNotificationController {
  constructor($scope, $mdDialog, action) {
    this.$mdDialog = $mdDialog;
    $scope.$ctrl = this;
    this.action = action;
    this.actionType = this.action.name.match(/(\w+)-\d/)[1];
  }

  close() {
    this.$mdDialog.hide();
  }
}

ActionNotificationController.$inject = ['$scope', '$mdDialog', 'action'];

export default ActionNotificationController;
