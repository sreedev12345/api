import mongoose from 'mongoose';

let organizationschema = new mongoose.Schema({
	organizationname : {
		type : String,
		required : true
	},userid : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
	},uuid : {
		type : String,
		required : true
	},created_at : {
		type : Date,
		default : Date.now
	},updated_at : {
		type : Date,
		default : Date.now
	}
})

const organization = mongoose.model('organization',organizationschema);
export default organization;