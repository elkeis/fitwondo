import 'expose?$!expose?jQuery!jquery';
import 'babel-polyfill';
import angular from 'angular';
import angularMaterial from 'angular-material';

import 'styles/index.scss';

import mainPage from 'pages/main';
import tokenStorage from 'services/tokenStorage/cordova';
import pedometer from 'services/pedometer/cordova';

var app = angular.module('app', [
  angularMaterial,
  mainPage,
  tokenStorage,
  pedometer
]);

app.constant('serverHost', 'https://fitnation.planningpoker.by');
app.constant('serverPath', '/api');
app.constant('env', 'cordova');

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

document.addEventListener("deviceready", function () {
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['app']);
    });
}, false);
