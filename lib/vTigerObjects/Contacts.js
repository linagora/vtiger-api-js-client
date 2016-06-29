module.exports = class Contacts{
	constructor(data){
		this.type = 'Contacts';
		this.mandatory = {
			create : [ 'lastname', 'assigned_user_id' ]
		};
		this.data = data;
	}
}