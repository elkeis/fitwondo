function gameModel() {
  return {
    champions: [],
    state: null, // 'CHOOSE_CHAMPION', 'START_GAME', 'SEARCHING_GAME', 'IN_GAME', 'CELEBRATE', 'CONNECTION_LOST'
    finished: null
  };
}

function profileModel() {
  return {
    username: '',
    championId: null
  };
}

function championModel() {
  return {
    profile: null,
    health: 0,
    steps: 0,
    shield: 0,
    slow: 0,
    actions: [],
    notifications: []
  };
}

function actionModel() {
  return {
    name: '',
    cost: 0,
    value: 0
  };
}

function notificationModel() {
  return {
    action: null
  };
}

module.exports = {
  gameModel: gameModel,
  profileModel: profileModel,
  championModel: championModel,
  actionModel: actionModel,
  notificationModel: notificationModel
};
