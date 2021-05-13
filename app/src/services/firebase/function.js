
class FirebaseFn {
  constructor($http, $firebaseConfig, authService) {
    this.http = $http;
    this.functionURL = $firebaseConfig.functionsURL;
    this.authService = authService;
  }

  invoke(functionName, data) {
    return this.authService.getCurrentUser().then(user => {
      return this.$http.post(`${this.functionURL}/${functionName}`, data, {
        headers: {
          'X-USER-ID': user.id
        }
      });
    }).then(response => {
      return response.data;
    });
  }
}

FirebaseFn.$inject = ['$http', '$firebaseConfig', 'authService'];

export default FirebaseFn;
