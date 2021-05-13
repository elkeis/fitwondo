import angular from 'angular';
import connectionLostPage from './connectionLostPage.js';

let app = angular.module('fitnation.connectionLost', []);
app.component('connectionLostPage', connectionLostPage);

export default app.name;
