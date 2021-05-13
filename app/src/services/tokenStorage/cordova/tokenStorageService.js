const KEY = 'username';

class TokenStorageService {
  constructor(StorageFacade) {
    this.StorageFacade = StorageFacade;
    this.initPromise = StorageFacade.createTableIfNotExist();
  }

  getToken() {
    return this.initPromise.then(() => {
      return this.StorageFacade.getKey(KEY);
    });
  }

  saveToken(token) {
    return this.initPromise.then(() => {
      return this.StorageFacade.saveKey(KEY, token);
    });
  }

  removeToken() {
    return this.initPromise.then(() => {
      return this.StorageFacade.deleteKey(KEY);
    });
  }
}

TokenStorageService.$inject = ['StorageFacade'];

export default TokenStorageService;
