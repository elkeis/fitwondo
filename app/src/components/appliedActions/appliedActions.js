import templateUrl from './appliedActions.html';
import controller from './appliedActionsController';
import './appliedActions.scss';

const AppliedActions = {
  bindings: {
    shield: '<',
    slow: '<'
  },
  templateUrl,
  controller
};

export default AppliedActions;
