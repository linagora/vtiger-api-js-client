module.exports = class Calendar{
	constructor(data){
		this.type = 'Calendar';
		this.mandatory = {
			create : [ 'subject', 'assigned_user_id', 'date_start', 'due_date', 'taskstatus' ]
		};
		this.data = data;
	}
}