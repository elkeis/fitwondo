import controller from './startGamePageController.js';
import templateUrl from './startGamePage.html';
import './startGamePage.scss';

export default {
  controller: controller,
  templateUrl: templateUrl,
  bindings: {
    profile: '<',
    onStartGame: '&',
    disabled: '<',
    onBack: '&'
  }
};
