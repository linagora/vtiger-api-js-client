'use strict';

var vtiger_client = require('../../dist/vtiger-client');

var objectTest = new vtiger_client.Users({
  user_name: 'john_doe',
  user_password: 'adminadmin',  
  confirm_password: 'adminadmin',  
  last_name: 'Doe',  
  roleid: 'H5',  
  email1: 'john.doe@localhost',
  is_owner : false
});

var client = new vtiger_client.Client(new vtiger_client.RequestTransport(), new vtiger_client.QPromiseProvider())
.withUrl('http://localhost/vtiger/webservice.php?')
.withUserName('admin')
.withUserAccessKey('sGBsf1zXF9tQ2bP7');

client.connect()

/********************Test CRUD operations on objectTest********************/

/*.then(function(data) {
  console.log(data);
  return client.create(objectTest);
}, function(err) {
  console.log(err);
})
.then(function(data) {
  console.log(data);
  return client.retrieve(new vtiger_client.Users({id: data.result.id}));
}, function(err) {
  console.log(err);
})
.then(function(data) {
  console.log('Retrieve : ' + data.success);
  return client.update(new vtiger_client.Users({user_name: 'chris_tucker', id: data.result.id}));
}, function(err) {
  console.log(err);
})
.then(function(data) {
  console.log('Update : ' + data.success);
  return client.devare(new vtiger_client.Users({id: data.result.id}));
}, function(err) {
  console.log(err);
})*/
.then(function(data) {
  //console.log('Devare : ' + data.success);
  console.log(data);
  var sqlQuery = encodeURI("select * from Contacts where assigned_user_id='19x" + client.id + "';");
  return client.query('query', '&query=' + sqlQuery);
}, function(err) {
  console.log(err);
})
.then(function(data) {
  console.log(data);
}, function(err) {
  console.log(err);
})