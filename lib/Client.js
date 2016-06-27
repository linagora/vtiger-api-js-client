let User = require('./User');

module.exports = class Client{
	constructor(options){
		this.serverUrl = options.url;
		this.user = new User(options.user.name, options.user.accessKey);
	}

	connect(){
		return this.user.login(this.serverUrl);
	}

	createUser(userData){
		let mandatoryContent = ['user_name', 'user_password', 'confirm_password', 'last_name', 'roleid', 'email1'];
		let isContentValid = true;
		mandatoryContent.forEach(function(element){
			if (!(element in userData) || (userData[element] === '')){
				isContentValid = false;
				console.log('Element missing : ' + element);
			}
		});
		if (!isContentValid) 
			throw new Error('Mandatory fields missing in user data');
		let temp = {elementType: 'Users', element: JSON.stringify(userData)};
		return this.user.query('create', temp, 'POST');
	}

	updateUser(userData){
		if (!userData.id)
			throw new Error('User ID missing');
		return this.retrieveUser(userData.id)
		.then((data) => {
			let retrievedData = data.result;
			for(var key in userData){
				if (userData[key])
					retrievedData[key] = userData[key];
			};
			let mandatoryContent = ['user_name', 'user_password', 'confirm_password', 'last_name', 'roleid', 'email1'];
			let isContentValid = true;
			mandatoryContent.forEach(function(element){
				if (!(element in retrievedData) || (retrievedData[element] === '')){
					isContentValid = false;
					console.log('Element missing : ' + element);
				}
			});
			if (!isContentValid) 
				throw new Error('Mandatory fields missing in user data');
			let temp = {element: JSON.stringify(retrievedData)};
			return this.user.query('update', temp, 'POST');
		}, (err) => {reject(err)})
	}

	retrieveUser(userId){
		return this.user.query('retrieve', '&id=' + userId);
	}

	deleteUser(userId){
		return this.user.query('delete', '&id=' + userId, 'POST');
	}
}