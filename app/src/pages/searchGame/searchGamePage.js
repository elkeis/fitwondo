import controller from './searchGamePageController.js';
import templateUrl from './searchGamePage.html';
import './searchGamePage.scss';

export default {
  controller: controller,
  templateUrl: templateUrl,
  bindings: {
    profile: '<',
    onCancel: '&',
    disabled: '<'
  }
};
