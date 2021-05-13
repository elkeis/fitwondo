import heartUrl from './heart.svg';

class HealthProgressController {
  constructor() {
    this.heartUrl = heartUrl;
  }

  startBeating() {
    return this.value < 25;
  }
}

export default HealthProgressController;
