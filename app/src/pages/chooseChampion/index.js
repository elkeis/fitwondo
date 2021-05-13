import angular from 'angular';

import pageHeader from 'components/pageHeader';
import champion from 'components/champion';

import chooseChampionPage from './chooseChampionPage.js';
import './chooseChampionPage.scss';

let app = angular.module('fitnation.chooseChampion', [pageHeader.name, champion.name]);
app.component('chooseChampionPage', chooseChampionPage);

export default app.name;
