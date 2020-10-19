import mongoose from 'mongoose';

const productschema = new mongoose.Schema({
	productname : {
		type : String,
		required : true
	},productfilename : {
		type : String,
		required : true
	},path : {
		type :String,
		required :true
	},uuid : {
		type : String,
		required : true
	},useruuid : {
		type : String
	},created_at : {
		type : Date,
		default : Date.now
	},updated_at : {
		type : Date,
		default : Date.now
	},categoryuuid : {
		type :String,
		required :true
	}
})

const product = mongoose.model('product',productschema);
export default product;