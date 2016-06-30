let request = require('request-promise');
let MD5 = require('crypto-js/md5');

module.exports = class Client{
	constructor(options){
		this.APIUrl = null;
		this.userName = null;
		this.accessKey = null;
		this.sessionName = null;
		this.token = null;
		this.fullId = null;
		this.id = null
	}
	connect(){
		return new Promise((resolve, reject) => {
			request({uri: this.APIUrl + 'operation=getchallenge&username=' + this.userName, json: true})
			.then((data) => {
				if (!data.success){
					return reject('Cannot get user token : ' + data.error.message);
				}
				this.token = data.result.token;
				let content = {username: this.userName, accessKey: MD5(this.token + this.accessKey).toString()};
				request({method: 'POST', uri: this.APIUrl + 'operation=login', form: content, json: true})
				.then((data) => {
					if (!data.success){
						return reject('Cannot log user : ' + data.error.message);
					}
					this.sessionName = data.result.sessionName;
					request({uri: this.APIUrl + 'operation=query&sessionName=' + this.sessionName  + '&query=' + encodeURIComponent("select id from Users where user_name='" + this.userName + "';"), json: true})
					.then((data) => {
						if (!data.success){
							return reject('Cannot get user id : ' + data.error.message);
						}
						this.fullId = data.result[0].id;
						this.id = this.fullId.split('x')[1],
						resolve('Login successful for user ' + this.id + ' : ' + this.userName + ', sessionName = ' + this.sessionName);
					}, (err) => {reject(err)});
				}, (err) => {reject(err)});
			}, (err) => {reject(err)});
		});
	}
	disconnect(){
		return new Promise((resolve, reject) => {
			if (!this.sessionName){
				return reject('Disconnexion impossible before connexion...');
			}
			request({uri: this.APIUrl + 'operation=logout&sessionName=' + this.sessionName, json: true})
			.then((data) => {
				if (!data.success){
					return reject('Cannot logout user: ' + data.error.message);
				}
				this.sessionName = null;
				resolve('Logout successful for user ' + this.id + ' : ' + this.userName);
			});
		});
	}
	query(operation, options, method = 'get') {
		if(!this.sessionName){
			return reject('User not connected');
		}
		return new Promise((resolve, reject) => {
			if (method.toUpperCase() === 'POST') {
				request({method: 'POST', uri: this.APIUrl + 'operation=' + operation + '&sessionName=' + this.sessionName, form: options, json: true})
				.then((data) => {resolve(data)}, (err) => {reject(err)})	
			}else{
				request({uri: this.APIUrl + 'operation=' + operation + '&sessionName=' + this.sessionName + options, json: true})
				.then((data) => {resolve(data)}, (err) => {reject(err)})
			}
		});
	}
	create(element){
		if (!this.checkData(element.mandatory.create, element.data)) {
			return new Promise((resolve, reject) => {
				throw new Error('Mandatory fields missing in ' + element.type + ' data');
			});
		}
		if (element.create && typeof element.create === 'function') {
			return element.create(element);
		}else{
			let temp = {elementType: element.type, element: JSON.stringify(element.data)};
			return this.query('create', temp, 'POST');
		}
	}
	retrieve(element){
		if (!this.checkData(element.mandatory.retrieve ? ['id'].concat(element.mandatory.retrieve) : ['id'], element.data)) {
			return new Promise((resolve, reject) => {
				throw new Error('Mandatory fields missing in ' + element.type + ' data');
			});
		}
		if (element.retrieve && typeof element.retrieve === 'function') {
			return element.retrieve(element);
		}else{
			return this.query('retrieve', '&id=' + element.data.id);
		}
	}
	update(element){
		if (!this.checkData(element.mandatory.update ? ['id'].concat(element.mandatory.update) : ['id'], element.data)) {
			return new Promise((resolve, reject) => {
				throw new Error('Mandatory fields missing in ' + element.type + ' data');
			});
		}
		if (element.update && typeof element.update === 'function') {
			return element.update(element);
		}else{
			return this.retrieve(element)
			.then((data) => {
				let retrievedData = data.result;
				for(var key in element.data){
					if (element.data[key]){
						retrievedData[key] = element.data[key];
					}
				};
				if (!this.checkData(element.mandatory.update ? ['id'].concat(element.mandatory.update) : ['id'], element.data)) {
					return new Promise((resolve, reject) => {
						throw new Error('Mandatory fields missing in user data');
					});
				}
				let temp = {element: JSON.stringify(retrievedData)};
				return this.query('update', temp, 'POST');
			}, (err) => {reject(err)});
		}
	}
	delete(element){
		if (!this.checkData(element.mandatory.delete ? ['id'].concat(element.mandatory.delete) : ['id'], element.data)) {
			return new Promise((resolve, reject) => {
				throw new Error('Mandatory fields missing in ' + element.type + ' data');
			});
		}
		if (element.delete && typeof element.delete === 'function') {
			return element.delete(element);
		}else{
			return this.query('delete', '&id=' + element.data.id, 'POST');
		}
	}
	checkData(mandatoryContent, unsafeData){
		mandatoryContent.forEach(function(key){
			if (!(key in unsafeData) || (unsafeData[key] === '')){
				return false
			}
		});
		return true;
	}
	withUserName(userName){
		this.userName = userName;

		return this;
	}
	withUserAccessKey(userAccessKey){
		this.accessKey = userAccessKey;

		return this;
	}
	withAPIUrl(APIUrl){
		this.APIUrl = APIUrl;

		return this;
	}
}