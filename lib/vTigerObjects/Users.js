module.exports = class Users{
	constructor(data){
		this.type = 'Users';
		this.mandatory = {
			create : ['user_name', 'user_password', 'confirm_password', 'last_name', 'roleid', 'email1', 'is_owner']
		};
		this.data = data;
	}
}