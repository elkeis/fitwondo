import controller from './connectionLostPageController.js';
import templateUrl from './connectionLostPage.html';
import './connectionLostPage.scss';

export default {
  controller: controller,
  templateUrl: templateUrl,
  bindings: {
    onReconnect: '&'
  }
};
