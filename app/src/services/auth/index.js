import authService from './authService';

let app = angular.module('fitnation.services.auth', [])
  .service('authService', authService);

export default app.name;
