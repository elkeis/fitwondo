import templateUrl from './actionProgress.html';
import controller from './actionProgressController';
import './actionProgress.scss';

const ActionProgress = {
  bindings: {
    value: '<',
    total: '<'
  },
  templateUrl,
  controller
};

export default ActionProgress;
