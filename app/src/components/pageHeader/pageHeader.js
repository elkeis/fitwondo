import templateUrl from './pageHeader.html';
import controller from './pageHeaderController';

const PageHeader = {
  bindings: {
    showAddSteps: '<',
    hideBack: '@',
    onAddSteps: '&',
    onBack: '&'
  },
  templateUrl,
  controller
};

export default PageHeader;
