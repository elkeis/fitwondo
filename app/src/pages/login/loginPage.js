import templateUrl from './loginPage.html';
import controller from './loginPageController.js';
import './loginPage.scss';

var loginPage = {
  bindings: {
    showProcessing: '<',
    onLogin: '&'
  },
  templateUrl,
  controller
};

export default loginPage;
