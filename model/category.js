import mongoose from 'mongoose';

let categoryschema = new mongoose.Schema({
	categoryname : {
		type:String
	},
	uuid : {
		type :String,
		required:true,
	},useruuid : {
		type : String,
		required:true
	}
})
const category = mongoose.model('category',categoryschema);
export default category;