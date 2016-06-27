let request = require('request-promise');
let MD5 = require('crypto-js/md5');

module.exports = class User{
	constructor(name, accessKey){
		this.name = name;
		this.accessKey = accessKey;
	}
	login(serverUrl){
		this.serverUrl = serverUrl;
		return new Promise((resolve, reject) => {
			request({uri: this.serverUrl + 'operation=getchallenge&username=' + this.name, json: true})
			.then((data) => {
				if (!data.success)
					return reject('Cannot get user token : ' + data.error.message);
				this.token = data.result.token;
				let content = {username: this.name, accessKey: MD5(this.token + this.accessKey).toString()};
				request({method: 'POST', uri: this.serverUrl + 'operation=login', form: content, json: true})
				.then((data) => {
					if (!data.success)
						return reject('Cannot log user : ' + data.error.message);
					this.sessionName = data.result.sessionName;
					request({uri: this.serverUrl + 'operation=query&sessionName=' + this.sessionName  + '&query=' + encodeURIComponent("select id from Users where user_name='" + this.name + "';"), json: true})
					.then((data) => {
						if (!data.success)
							return reject('Cannot get user id : ' + data.error.message);
						this.fullId = data.result[0].id;
						this.id = this.fullId.split('x')[1],
						resolve('Login successful for user ' + this.id + ' : ' + this.name + ', sessionName = ' + this.sessionName);
					}, (err) => {reject(err)});
				}, (err) => {reject(err)});
			}, (err) => {reject(err)});
		});
	}
	logout(){
		return new Promise((resolve, reject) => {
			if (!this.sessionName)
				return reject('Disconnexion impossible before connexion...');
			request({uri: this.serverUrl + 'operation=logout&sessionName=' + this.sessionName, json: true})
			.then((data) => {
				if (!data.success)
					return reject('Cannot logout user: ' + data.error.message);
				this.sessionName = null;
				resolve('Logout successful for user ' + user.id + ' : ' + user.name);
			});
		});
	}
	query(operation, options, method = 'get') {
		if(!this.sessionName)
			return reject('User not connected');
		return new Promise((resolve, reject) => {
			if (method.toUpperCase() === 'POST') {
				request({method: 'POST', uri: this.serverUrl + 'operation=' + operation + '&sessionName=' + this.sessionName, form: options, json: true})
				.then((data) => {resolve(data)}, (err) => {reject(err)})	
			}else{
				request({uri: this.serverUrl + 'operation=' + operation + '&sessionName=' + this.sessionName + options, json: true})
				.then((data) => {resolve(data)}, (err) => {reject(err)})
			}
		});
	}
}