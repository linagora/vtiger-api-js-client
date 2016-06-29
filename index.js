let Client = require('./lib/Client');
let Users = require('./lib/vTigerElements/Users');

let localhost_clientOptions = {
	url: 'http://localhost/vtigercrm/webservice.php?',
	user : {
		name: 'admin',
		accessKey: 'sGBsf1zXF9tQ2bP7'
	}
};

let objectTest = new Users({
	user_name: 'john_doe',
    user_password: 'adminadmin',  
    confirm_password: 'adminadmin',  
    last_name: 'Doe',  
    roleid: 'H5',  
    email1: 'john.doe@localhost',
});

let client = new Client(localhost_clientOptions);
client.connect()

/********************Test CRUD operation on objectTest********************/

.then((data) => {console.log(data);return client.create(objectTest)}, (err) => {return new Promise((resolve, reject) => {console.log(err);reject('');})})
.then((data) => {console.log(data);return client.retrieve(new Users({id: data.result.id}))}, (err) => {return new Promise((resolve, reject) => { console.log(err);reject('');})})
.then((data) => {console.log('Retrieve : ' + data.success);return client.update(new Users({user_name: 'chris_tucker', id: data.result.id}))}, (err) => {return new Promise((resolve, reject) => { console.log(err);reject('');})})
.then((data) => {console.log('Update : ' + data.success);return client.delete(new Users({id: data.result.id}))}, (err) => {return new Promise((resolve, reject) => { console.log(err);reject('');})})
.then((data) => {console.log('Delete : ' + data.success)}, (err) => {console.log(err)});