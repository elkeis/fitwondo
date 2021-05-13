import smallHeartUrl from './images/small_heart.svg';

class ActionController {
  constructor() {
    this.smallHeartUrl = smallHeartUrl;
  }

  isReady() {
    return this.value >= this.model.cost;
  }
}

export default ActionController;
