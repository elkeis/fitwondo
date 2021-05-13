import angular from 'angular';

import HealthProgress from './healthProgress';

export default angular.module('fitnation.components.health-progress', [])
  .component('healthProgress', HealthProgress);
