import * as firebase from 'firebase/app';
import 'firebase/database';

import firebaseFn from './function';

let app = angular.module('fitnation.services.firebase', [])
  .constant('$firebase', firebase)
  .constant('$firebaseConfig', {
      apiKey: "AIzaSyADUVsm3BtZECp64QbDp9L6N6rWPyv_ULk",
      authDomain: "fitnation-9cbef.firebaseapp.com",
      databaseURL: "https://fitnation-9cbef.firebaseio.com",
      functionURL: "https://us-central1-fitnation-9cbef.cloudfunctions.net",
      projectId: "fitnation-9cbef",
      storageBucket: "fitnation-9cbef.appspot.com",
      messagingSenderId: "878924457778"
  })
  .run(['$firebase', '$firebaseConfig', ($firebase, $firebaseConfig) => {
    $firebase.initializeApp($firebaseConfig);
  }])
  .service('$firebaseFn', firebaseFn)
  .factory('$firebaseDb', ['$firebase', ($firebase) => {
    return $firebase.database();
  }]);

export default app.name;
