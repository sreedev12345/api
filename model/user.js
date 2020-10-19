import mongoose from 'mongoose';

let userschema = new mongoose.Schema({
	username : {
		type : String,
	},email : {
		type : String,
	},password : {
		type : String,
	},role : {
		type : String,
		enum : ['admin','subadmin','user'],
		default : 'subadmin'
	},parentid : {
		type : String
	},created_at : {
		type : Date,
		default : Date.now
	},updated_at : {
		type : Date,
		default : Date.now
	},uuid : {
		type : String
	},authtoken : {
		type : String,
	}
})

const user = mongoose.model('user',userschema);
export default user;