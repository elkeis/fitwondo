import controller from './chooseChampionPageController.js';
import templateUrl from './chooseChampionPage.html';

export default {
  controller: controller,
  templateUrl: templateUrl,
  bindings: {
    onChooseChampion: '&',
    disabled: '<',
    onBack: '&'
  }
};
