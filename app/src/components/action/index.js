import angular from 'angular';

import actionProgress from 'components/actionProgress';
import actionIcon from 'components/actionIcon';

import Action from './action';

export default angular.module('fitnation.components.action', [
  actionProgress.name,
  actionIcon.name
])
.component('action', Action);
