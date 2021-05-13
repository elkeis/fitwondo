import templateUrl from './action.html';
import controller from './actionController';
import './action.scss';

const Action = {
  bindings: {
    model: '<',
    value: '<'
  },
  templateUrl,
  controller
};
export default Action;
