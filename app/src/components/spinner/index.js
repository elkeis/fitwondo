import angular from 'angular';
import templateUrl from './template.html';
import './style.scss';

let module = angular.module('spinner', [])
.directive('spinner', () => {
  return {
    templateUrl,
    restrict: 'E'
  };
});

export default module.name;
