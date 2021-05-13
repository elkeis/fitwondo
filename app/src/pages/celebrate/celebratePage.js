import controller from './celebratePageController.js';
import templateUrl from './celebratePage.html';
import './celebratePage.scss';

export default {
  controller: controller,
  templateUrl: templateUrl,
  bindings: {
    game: '<',
    onOk: '&',
    profile: '<',
    disabled: '<'
  }
};
