import lineUrl from './line.svg';

class StartGamePageController {
  constructor($log) {
    this.$log = $log;

    this.lineUrl = lineUrl;
  }

  startGame() {
    this.onStartGame();
  }

  back() {
    this.onBack();
  }
}

StartGamePageController.$inject = ['$log'];

export default StartGamePageController;
