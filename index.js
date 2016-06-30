let Client = require('./lib/Client');
let Users = require('./lib/vTigerObjects/Users');

let objectTest = new Users({
	user_name: 'john_doe',
    user_password: 'adminadmin',  
    confirm_password: 'adminadmin',  
    last_name: 'Doe',  
    roleid: 'H5',  
    email1: 'john.doe@localhost',
});

let client = new Client()
.withAPIUrl('http://localhost/vtigercrm/webservice.php?')
.withUserName('admin')
.withUserAccessKey('sGBsf1zXF9tQ2bP7');
client.connect()

/********************Test CRUD operation on objectTest********************/

.then((data) => {console.log(data); return client.create(objectTest)}, (err) => {return new Promise((resolve, reject) => {console.log(err);reject('');})})
.then((data) => {console.log(data); return client.retrieve(new Users({id: data.result.id}))}, (err) => {return new Promise((resolve, reject) => { console.log(err);reject('');})})
.then((data) => {console.log('Retrieve : ' + data.success); return client.update(new Users({user_name: 'chris_tucker', id: data.result.id}))}, (err) => {return new Promise((resolve, reject) => { console.log(err);reject('');})})
.then((data) => {console.log('Update : ' + data.success); return client.delete(new Users({id: data.result.id}))}, (err) => {return new Promise((resolve, reject) => { console.log(err);reject('');})})
.then((data) => {console.log('Delete : ' + data.success)}, (err) => {console.log(err)});