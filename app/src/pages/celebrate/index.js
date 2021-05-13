import angular from 'angular';
import celebratePage from './celebratePage.js';

let app = angular.module('fitnation.celebrate', []);
app.component('celebratePage', celebratePage);

export default app.name;
