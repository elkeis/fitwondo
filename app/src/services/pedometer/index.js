import angular from 'angular';
import pedometer from './pedometer';

let app = angular.module('fitnation.services.pedometer', []);
app.service('pedometer', pedometer);

export default app.name;
