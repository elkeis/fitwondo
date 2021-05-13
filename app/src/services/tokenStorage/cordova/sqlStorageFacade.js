const TABLE_NAME = 'fitnationStorage';
const KEY_COL = 'key';
const VAL_COL = 'val';

class SqlStorageFacade {
  constructor($window, $q, $log) {
    this.$q = $q;
    this.$log = $log;
    this.$window = $window;
    this.db = $window.sqlitePlugin.openDatabase({
      name: 'fitnation.db',
      location: 'default'
    });
  }

  createTableIfNotExist() {
    let defered = this.$q.defer();
    this.$log.debug('start transaction');
    this.db.transaction(tx => {
      this.$log.debug('create table');
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${KEY_COL}, ${VAL_COL});`);
    }, error => {
      this.$log.debug('Transaction ERROR: ' + error.message);
      defered.reject(error.message);
    }, () => {
      this.$log.debug('transaction ended');
      defered.resolve(true);
    });
    return defered.promise;
  }

  deleteKey(key) {
    let defered = this.$q.defer();
    this.$log.debug('start transaction');
    this.db.transaction(tx => {
      this.$log.debug(`trying to delete key ${key}`);
      tx.executeSql(`DELETE FROM ${TABLE_NAME} WHERE ${TABLE_NAME}.${KEY_COL}="${key}";`);
    }, error => {
      this.$log.error('Transaction ERROR: ' + error.message);
      defered.reject(error.message);
    }, () => {
      this.$log.debug(`transaction ended`);
      defered.resolve(true);
    });
    return defered.promise;
  }

  getKey(key) {
    let defered = this.$q.defer();
    let err;
    let result;
    this.$log.debug('start transaction');
    this.db.transaction(tx => {
      this.$log.debug(`trying to select key ${key}`);
      tx.executeSql(`SELECT * FROM ${TABLE_NAME} WHERE ${TABLE_NAME}.${KEY_COL}="${key}";`,
        [],
        (tx, rs) => {
          if (rs.rows.length > 0) {
            let value = rs.rows.item(0)[VAL_COL];
            this.$log.debug(`key ${key} found, returning ${value}`);
            result = value;
          } else {
            this.$log.error(`key ${key} not found in db`);
            result = null;
          }
        }, (tx, error) => {
          err = error.message;
          this.$log.error('sql error', error.message);
        });
    }, error => {
      this.$log.error('Transaction ERROR: ' + error.message);
      defered.reject(error.message);
    }, () => {
      this.$log.debug(`transaction ended`);
      if (err) {
        defered.reject(err);
      } else {
        defered.resolve(result);
      }
    });
    return defered.promise;
  }

  saveKey(key, value) {
    let defered = this.$q.defer();
    this.$log.debug('start transaction');
    this.db.transaction(tx => {
      this.$log.debug(`trying to insert key ${key} = ${value}`);
      tx.executeSql(`INSERT INTO ${TABLE_NAME} VALUES ("${key}", "${value}")`);
    }, error => {
      this.$log.debug('Transaction ERROR: ' + error.message);
      defered.reject(error.message);
    }, () => {
      this.$log.debug(`key ${key}=${value} inserted`);
      defered.resolve(true);
    });
    return defered.promise;
  }
}

SqlStorageFacade.$inject = ['$window', '$q', '$log'];

export default SqlStorageFacade;
