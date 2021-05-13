import angular from 'angular';

import pageHeader from 'components/pageHeader';
import champion from 'components/champion';

import startGamePage from './startGamePage.js';

let app = angular.module('fitnation.startGame', [pageHeader.name, champion.name]);
app.component('startGamePage', startGamePage);

export default app.name;
