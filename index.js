let Client = require('./lib/Client');

let localhost_clientOptions = {
	url: 'http://localhost/vtigercrm/webservice.php?',
	user : {
		name: 'admin',
		accessKey: '0wNhPwAwV4JV0Eia'
	}
};
let lintounsi_clientOptions = {
	url: 'http://lintounsi.linagora.dc1/vtigercrm/webservice.php?',
	user : {
		name: 'admin',
		accessKey: 'PKXs0w1HaOJfTDB'
	}
};

let mandatoryContent = {
	user_name: 'johnDoe', //string
	user_password: 'doe', //password
	confirm_password: 'doe', //password
	last_name: 'Doe', //string
	roleid: 'H2', //string
	email1: 'john.doe@nobody.com', //email 
};
let optionalContent = {
	is_admin: false , //boolean
	first_name: 'john', //string
	status: '', //string
	activity_view: '', //picklist - Today - This Week - This Month - This Year
	lead_view: '', //picklist - Today - Last 2 Days - Last Week
	hour_format: '', //picklist - 12 - 24
	end_hour: '', //string
	start_hour: '', //picklist - 00:00 - 01:00 - 02:00 - 03:00 - 04:00 - 05:00 - 06:00 - 07:00 - 08:00 - 09:00 - 10:00 - 11:00 - 12:00 - 13:00 - 14:00 - 15:00 - 16:00 - 17:00 - 18:00 - 19:00 - 20:00 - 21:00 - 22:00 - 23:00
	title: '', //string
	phone_work: '', //phone
	department: '', //string
	phone_mobile: '', //phone
	reports_to_id: '', //reference
	phone_other: '', //phone
	email2: '', //email
	phone_fax: '', //phone
	secondaryemail: '', //email
	phone_home: '', //phone
	date_format: '', //picklist - dd-mm-yyyy - mm-dd-yyyy - yyyy-mm-dd
	signature: '', //text
	description: '', //text
	address_street: '', //text
	address_city: '', //string
	address_state: '', //string
	address_postalcode: '', //string
	address_country: '', //string
	time_zone: '', //picklist - Pacific/Midway - Pacific/Samoa - Pacific/Honolulu - America/Anchorage - America/Los_Angeles - America/Tijuana - America/Denver - America/Chihuahua - America/Mazatlan - America/Phoenix - America/Regina - America/Tegucigalpa - America/Chicago - America/Mexico_City - America/Monterrey - America/New_York - America/Bogota - America/Lima - America/Rio_Branco - America/Indiana/Indianapolis - America/Caracas - America/Halifax - America/Manaus - America/Santiago - America/La_Paz - America/Cuiaba - America/Asuncion - America/St_Johns - America/Argentina/Buenos_Aires - America/Sao_Paulo - America/Godthab - America/Montevideo - Atlantic/South_Georgia - Atlantic/Azores - Atlantic/Cape_Verde - Europe/London - UTC - Africa/Monrovia - Africa/Casablanca - Europe/Belgrade - Europe/Sarajevo - Europe/Brussels - Africa/Algiers - Europe/Amsterdam - Europe/Minsk - Africa/Cairo - Europe/Helsinki - Europe/Athens - Europe/Istanbul - Asia/Jerusalem - Asia/Amman - Asia/Beirut - Africa/Windhoek - Africa/Harare - Asia/Kuwait - Asia/Baghdad - Africa/Nairobi - Asia/Tehran - Asia/Tbilisi - Europe/Moscow - Asia/Muscat - Asia/Baku - Asia/Yerevan - Asia/Karachi - Asia/Tashkent - Asia/Kolkata - Asia/Colombo - Asia/Katmandu - Asia/Dhaka - Asia/Almaty - Asia/Yekaterinburg - Asia/Rangoon - Asia/Novosibirsk - Asia/Bangkok - Asia/Brunei - Asia/Krasnoyarsk - Asia/Ulaanbaatar - Asia/Kuala_Lumpur - Asia/Taipei - Australia/Perth - Asia/Irkutsk - Asia/Seoul - Asia/Tokyo - Australia/Darwin - Australia/Adelaide - Australia/Canberra - Australia/Brisbane - Australia/Hobart - Asia/Vladivostok - Pacific/Guam - Asia/Yakutsk - Pacific/Fiji - Asia/Kamchatka - Pacific/Auckland - Asia/Magadan - Pacific/Tongatapu - Etc/GMT-11
	currency_id: '', //reference
	currency_grouping_pattern: '', //picklist - 123,456,789 - 123456789 - 123456,789 - 12,34,56,789
	currency_decimal_separator: '', //picklist - . - , - ' -   - $
	currency_grouping_separator: '', //picklist - . - , - ' -   - $
	currency_symbol_placement: '', //picklist - $1.0 - 1.0$
	imagename: '', //string
	internal_mailer: '', //boolean
	theme: '', //string
	language: '', //string
	reminder_interval: '', //picklist - 1 Minute - 5 Minutes - 15 Minutes - 30 Minutes - 45 Minutes - 1 Hour - 1 Day
	phone_crm_extension: '', //phone
	no_of_currency_decimals: '', //picklist - 2 - 3 - 4 - 5 - 0 - 1
	truncate_trailing_zeros: '', //boolean
	dayoftheweek: '', //picklist - Sunday - Monday - Tuesday - Wednesday - Thursday - Friday - Saturday
	callduration: '', //picklist - 5 - 10 - 30 - 60 - 120
	othereventduration: '', //picklist - 5 - 10 - 30 - 60 - 120
	calendarsharedtype: '', //picklist - public - private - seletedusers
	default_record_view: '', //picklist - Summary - Detail
	leftpanelhide: '', //boolean
	rowheight: '', //picklist - wide - medium - narrow
	defaulteventstatus: '', //picklist - Planned - Held - Not Held
	defaultactivitytype: '', //picklist - Call - Meeting
	hidecompletedevents: '', //boolean
	is_owner: '', //string
}

let updateUserTab = {
	id: '19x26',
	first_name: 'test'
}

let client = new Client(lintounsi_clientOptions);
client.connect()


/******************** CREATE USER ********************/
/*.then(() => {
	return client.createUser(myJSONConcat(mandatoryContent, optionalContent));
}, (err) => {console.log(err)})
.then((data) => {
	console.log(data);
}, (err) => {console.log(err)});*/


/******************** RETRIEVE USER ********************/
/*.then(() => {
	return client.retrieveUser('19x26');
}, (err) => {console.log(err)})
.then((data) => {
	console.log(data);
}, (err) => {console.log(err)});*/


/******************** UPDATE USER ********************/
/*.then(() => {
	return client.updateUser(updateUserTab);
}, (err) => {console.log(err)})
.then((data) => {
	console.log(data);
}, (err) => {console.log(err)});*/


/******************** DELETE USER ********************/
/*.then(() => {
	return client.deleteUser('19x25');
}, (err) => {console.log(err)})
.then((data) => {
	console.log(data);
}, (err) => {console.log(err)});*/


/******************** DESCRIBE USER ********************/
/*.then(() => {
	client.user.query('describe', '&elementType=Users')
	.then((data) => {
		parseElement(data.result.fields);
	}, (err) => {console.log(err)})
})*/

function parseElement(element){
	element.forEach(function(fields, index){
		let picklistValues = '';
		if (fields.editable) {
			if (fields.mandatory) {
				if(fields.type.name === 'picklist'){
					fields.type.picklistValues.forEach(function(picklist){
						picklistValues = picklistValues + ' - ' + picklist.value;
					});
				}
				//console.log(fields.name + ': \'\', //' + fields.type.name + picklistValues);
			}else{
				if(fields.type.name === 'picklist'){
					fields.type.picklistValues.forEach(function(picklist){
						picklistValues = picklistValues + ' - ' + picklist.value;
					});
				}
				console.log(fields.name + ': \'\', //' + fields.type.name + picklistValues);
			}
		}
	});
}

function myJSONConcat(json1, json2){
	return JSON.parse(JSON.stringify(json1).split('}')[0] + ',' + JSON.stringify(json2).split('{')[1]);
} 