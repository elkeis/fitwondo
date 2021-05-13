class ChooseChampionPageController {
  constructor($log) {
    this.$log = $log;
  }

  chooseChampion(championId) {
    this.$log.debug('chooseChampion', championId);
    this.onChooseChampion({championId: championId});
  }

  back() {
    this.onBack();
  }
}

ChooseChampionPageController.$inject = ['$log'];

export default ChooseChampionPageController;
