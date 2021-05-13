import angular from 'angular';

import spinner from 'components/spinner';
import champion from 'components/champion';

import searchGamePage from './searchGamePage.js';

let app = angular.module('fitnation.searchGame', [spinner, champion.name]);
app.component('searchGamePage', searchGamePage);

export default app.name;
