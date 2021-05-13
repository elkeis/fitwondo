import angular from 'angular';
import tokenStorage from './tokenStorageService';
import StorageFacade from './sqlStorageFacade';

let app = angular.module('fitnation.services.token.storage.cordova', []);
app.service('tokenStorage', tokenStorage);
app.service('StorageFacade', StorageFacade);

export default app.name;
