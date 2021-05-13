
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class AuthService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  login(username) {
    let userId =  guid();

    return this.tokenStorage.saveToken(userId).then(() => {
      return this.getCurrentUser();
    });
  }

  logout() {
    return this.tokenStorage.removeToken();
  }

  getCurrentUser() {
    return this.tokenStorage.getToken().then(userId => {
      if (!userId) {
        return null;
      }

      return {
        // TODO: user profile
        id: userId
      };
    });
  }
}

AuthService.$inject = ['tokenStorage'];

export default AuthService;
