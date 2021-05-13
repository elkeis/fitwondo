import controller from './gamePageController.js';
import templateUrl from './gamePage.html';
import './gamePage.scss';

export default {
  controller: controller,
  templateUrl: templateUrl,
  bindings: {
    game: '<',
    onBack: '&',
    disabled: '<',
    profile: '<',
    onAction: '&',
    onAddSteps: '&',
    onGameStart: '&',
    onGameEnd: '&',
    onAckNotification: '&'
  }
};
