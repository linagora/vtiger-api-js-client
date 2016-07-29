'use strict';

let ES6PromiseProvider = require('./promises/ES6PromiseProvider');
let Utils = require('./Utils');
let MD5 = require('crypto-js/md5');

module.exports = class Client{
  constructor(transport, promiseProvider) {
    this.promiseProvider = promiseProvider || new ES6PromiseProvider();
    this.transport = Utils.assertRequiredParameterIsNotEmpty(transport, 'transport');
    this.transport.promiseProvider = this.promiseProvider;

    this.url = null;
    this.userName = null;
    this.accessKey = null;
    this.sessionName = null;
    this.token = null;
    this.fullId = null;
    this.id = null;
  }
  withUserName(userName) {
    this.userName = userName;

    return this;
  }
  withUserAccessKey(userAccessKey) {
    this.accessKey = userAccessKey;

    return this;
  }
  withUrl(url) {
    this.url = url;

    return this;
  }
  _defaultHeaders() {
    return {
      Accept: 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  connect() {
    return this.promiseProvider.newPromise((resolve, reject) => {
      this.transport.get(this.url + 'operation=getchallenge&username=' + this.userName, this._defaultHeaders())
      .then((data) => {
        if (!data.success) {
          return reject('Cannot get user token : ' + data.error.message);
        }
        this.token = data.result.token;
        let content = {username: this.userName, accessKey: MD5(this.token + this.accessKey).toString()};

        this.transport.post(this.url + 'operation=login', this._defaultHeaders(), content)
        .then((data) => {
          if (!data.success) {
            return reject('Cannot log user : ' + data.error.message);
          }
          this.sessionName = data.result.sessionName;
          this.transport.get(this.url + 'operation=query&sessionName=' + this.sessionName  + '&query=' + encodeURIComponent('select id from Users where user_name=\'' + this.userName + '\';'), this._defaultHeaders())
          .then((data) => {
            if (!data.success) {
              return reject('Cannot get user id : ' + data.error.message);
            }
            this.fullId = data.result[0].id;
            this.id = this.fullId.split('x')[1],
            resolve('Login successful for user ' + this.id + ' : ' + this.userName + ', sessionName = ' + this.sessionName);
          }, (err) => {reject(err);});
        }, (err) => {reject(err);});
      }, (err) => {reject(err);});
    });
  }
  disconnect() {
    return this.promiseProvider.newPromise((resolve, reject) => {
      if (!this.sessionName) {
        return reject('Disconnexion impossible before connexion...');
      }
      this.transport.get(this.url + 'operation=logout&sessionName=' + this.sessionName, this._defaultHeaders())
      .then((data) => {
        if (!data.success) {
          return reject('Cannot logout user: ' + data.error.message);
        }
        this.sessionName = null;
        resolve('Logout successful for user ' + this.id + ' : ' + this.userName);
      });
    });
  }
  query(operation, options, method = 'get') {
    if (!this.sessionName) {
      return this.promiseProvider.newPromise((resolve, reject) => {
        reject('User not connected');
      });
    }

    return this.promiseProvider.newPromise((resolve, reject) => {
      if (method.toUpperCase() === 'POST') {
        this.transport.post(this.url + 'operation=' + operation + '&sessionName=' + this.sessionName, this._defaultHeaders(), options)
        .then((data) => {resolve(data);}, (err) => {reject(err);});
      }else {
        this.transport.get(this.url + 'operation=' + operation + '&sessionName=' + this.sessionName + options, this._defaultHeaders())
        .then((data) => {resolve(data);}, (err) => {reject(err);});
      }
    });
  }
  create(element) {
    element.checkData('create');
    if (element.create && typeof element.create === 'function') {
      return element.create(element);
    }else {
      let temp = {elementType: element.type, element: JSON.stringify(element.data)};

      return this.query('create', temp, 'POST');
    }
  }
  retrieve(element) {
    element.checkData('retrieve');
    if (element.retrieve && typeof element.retrieve === 'function') {
      return element.retrieve(element);
    }else {
      return this.query('retrieve', '&id=' + element.data.id);
    }
  }
  update(element) {
    element.checkData('update');
    if (element.update && typeof element.update === 'function') {
      return element.update(element);
    }else {
      return this.retrieve(element)
      .then((data) => {
        let retrievedData = data.result;

        for (var key in element.data) {
          if (element.data[key]) {
            retrievedData[key] = element.data[key];
          }
        }
        element.checkData('update');
        let temp = {element: JSON.stringify(retrievedData)};

        return this.query('update', temp, 'POST');
      }, (err) => {
        return this.promiseProvider.newPromise((resolve, reject) => {
          reject(err);
        });
      });
    }
  }
  delete(element) {
    element.checkData('delete');
    if (element.delete && typeof element.delete === 'function') {
      return element.delete(element);
    }else {
      return this.query('delete', '&id=' + element.data.id, 'POST');
    }
  }
};
