import angular from 'angular';
import PageHeader from './pageHeader';
import './pageHeader.scss';

export default angular.module('fitnation.components.pageHeader', [])
  .component('pageHeader', PageHeader);
