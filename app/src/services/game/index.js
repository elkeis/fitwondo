import angular from 'angular';
import gameService from './gameService';

let app = angular.module('fitnation.services.game', [])
  .service('gameService', gameService);

export default app.name;
