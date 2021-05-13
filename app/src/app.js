import 'expose?$!expose?jQuery!jquery';
import 'babel-polyfill';
import angular from 'angular';
import angularMaterial from 'angular-material';

import 'styles/index.scss';

import mainPage from 'pages/main';
import tokenStorage from 'services/tokenStorage';
import pedometer from 'services/pedometer';
import firebase from 'services/firebase';
import game from 'services/game';
import auth from 'services/auth';

var app = angular.module('app', [
  angularMaterial,
  mainPage,
  tokenStorage,
  pedometer,
  firebase,
  game,
  auth
]);

app.config([
  '$mdThemingProvider',
  ($mdThemingProvider) => {
    const fitnationPalette = $mdThemingProvider.extendPalette('cyan', {
      '500': '#24CAC9'
    });

    $mdThemingProvider.definePalette('fitnation', fitnationPalette);

    $mdThemingProvider.theme('fitnation-dark', 'default')
      .primaryPalette('fitnation')
      .dark();
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});
