import angular from 'angular';
import angularMaterial from 'angular-material';
import spinner from 'components/spinner';
import loginPage from './loginPage.js';

let app = angular.module('fitnation.login', [angularMaterial, spinner])
  .component('loginPage', loginPage);

export default app.name;
