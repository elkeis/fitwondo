import angular from 'angular';
import mainPage from './mainPage.js';
import loginPage from 'pages/login';
import chooseChampionPage from 'pages/chooseChampion';
import startGamePage from 'pages/startGame';
import searchGamePage from 'pages/searchGame';
import gamePage from 'pages/game';
import celebratePage from 'pages/celebrate';
import connectionLostPage from 'pages/connectionLost';
import spinner from 'components/spinner';
import './mainPage.scss';

let app = angular.module('main-page', [
  loginPage,
  chooseChampionPage,
  startGamePage,
  searchGamePage,
  gamePage,
  celebratePage,
  connectionLostPage,
  spinner
]);

app.component('mainPage', mainPage);

export default app.name;
