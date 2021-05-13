class SearchGamePageController {
  constructor($log) {
    this.$log = $log;
  }

  cancel() {
    this.onCancel();
  }
}

SearchGamePageController.$inject = ['$log'];

export default SearchGamePageController;
