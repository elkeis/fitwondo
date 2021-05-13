import angular from 'angular';

import actionIcon from 'components/actionIcon';

import AppliedActions from './appliedActions';

export default angular.module('fitnation.components.applied-actions', [actionIcon.name])
  .component('appliedActions', AppliedActions);
