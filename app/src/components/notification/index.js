import angular from 'angular';
import ActionNotificationService from './ActionNotificationService';
import actionIcon from 'components/actionIcon';

let app = angular.module('fitnation.notification', [
  actionIcon.name
]);
app.service('actionNotificationService', ActionNotificationService);

export default app;
