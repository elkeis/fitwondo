import _ from 'lodash';

class CelebratePageController {
  constructor($log) {
    this.$log = $log;
    this.percentOfWorldPopulation = _.random(60, 99);
  }

  won() {
    return this.game.winner === this.profile.username;
  }

  getMyChampion() {
    return _.find(this.game.champions, c => {
      return c.profile.username === this.profile.username;
    });
  }

  getTotalSteps() {
    return this.getMyChampion().totalSteps || 100500;
  }

  ok() {
    this.onOk();
  }
}

CelebratePageController.$inject = ['$log'];

export default CelebratePageController;
