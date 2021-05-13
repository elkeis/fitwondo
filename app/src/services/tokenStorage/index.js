import angular from 'angular';
import tokenStorage from './tokenStorageService';

let app = angular.module('fitnation.services.token.storage', []);
app.service('tokenStorage', tokenStorage);

export default app.name;
