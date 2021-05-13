import angular from 'angular';

import action from 'components/action';
import champion from 'components/champion';
import healthProgress from 'components/healthProgress';
import appliedActions from 'components/appliedActions';

import gamePage from './gamePage.js';
import notification from 'components/notification';

let app = angular.module('fitnation.game', [
  action.name,
  champion.name,
  healthProgress.name,
  appliedActions.name,
  notification.name
]);
app.component('gamePage', gamePage);

export default app.name;
