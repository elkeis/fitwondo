class ActionProgressController {
  getPercentage() {
    return this.value / this.total * 100;
  }
}

export default ActionProgressController;
