import templateUrl from './actionIcon.html';
import './actionIcon.scss';

const ActionIcon = {
  templateUrl: templateUrl,
  bindings: {
    type: '<',
    large: '@'
  }
};

export default ActionIcon;
