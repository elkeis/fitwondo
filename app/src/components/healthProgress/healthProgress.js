import templateUrl from './healthProgress.html';
import controller from './healthProgressController';
import './healthProgress.scss';

const HealthProgress = {
  bindings: {
    value: '<'
  },
  templateUrl,
  controller
};

export default HealthProgress;
