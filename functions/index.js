const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.database();

const app = express();
app.use(express.json());

function checkNotNull(argName, argValue) {
  if (!argValue) {
    throw new Error(`${argName} cannot be null`);
  }
}

class FitnationController {

  constructor(router) {
    router.post('/tryJoinGame', this.tryJoinGame);
    router.post('/chooseChampion', this.chooseChampion);
  }

  tryJoinGame(req) {
    const userId = this._getUserId(req);
    checkNotNull('userId', userId);

    return db.ref(`players/${userId}/activeGame`).once('value', (activeGame) => {
      
    });
  }

  chooseChampion(req) {
    const userId = this._getUserId(req);
    checkNotNull('userId', userId);
    const championId = req.body.championId;
    checkNotNull('championId', championId);

    return db.ref(`players/${userId}/championId`).set(championId);
  }

  _getUserId(req) {
    return req.header('X-USER-ID');
  }
};

const controller = new FitnationController({
  post: function(route, handler) {
    app.post(route, (req, res) => {
      try {
        handler(req)
          .then(data => {
            res.send(200, {status: 'ok', data: data});
          })
          .catch(error => {
            res.send(500, {status: 'error', error: error});
          });
      } catch(error) {
        res.send(500, {status: 'error', error: error});
      }
    })
  }
});

exports.fitnation = functions.https.onRequest(app);
