const KEY = 'username';

class TokenStorageService {
  constructor($q, $window) {
    this.$q = $q;
    this.$window = $window;
  }

  getToken() {
    return this.$q.when(this.$window.localStorage.getItem(KEY));
  }

  saveToken(token) {
    return this.$q.when(this.$window.localStorage.setItem(KEY, token) || 'OK');
  }

  removeToken() {
    return this.$q.when(this.$window.localStorage.removeItem(KEY));
  }
}

TokenStorageService.$inject = ['$q', '$window'];

export default TokenStorageService;
