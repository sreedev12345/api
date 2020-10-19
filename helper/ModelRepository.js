import user from '../model/user';
import Config from './Config';
import { error,success,emailvalid,restriction,ACTION } from './appConst';

const config = new Config();

export default class ModelRepository {
	async userCreate(formdata,find,res) {
		console.log('find',find)
		 let data1 = await config.generateUniqueId()
		 const hash = await config.passwordHash(formdata.password)
		const user1 = new user({
		 	username : formdata.username,
		 	password : hash,
		 	email : formdata.email,
		 	role : formdata.role,
		 	uuid : data1,
		 	parentid :find ?  find.uuid : null 
		 })
		let data = await user1.save();
		if(data) {
			return res.json({
				status : success.status,
				message : success.createsuccessmessage,
				data : data
			})
		} else {
			return 'error'
		}
	}

	async findByRole(role,res) {
		const find = await user.findOne({role:role})
		if(find) {
			res.json ({
				status : error.status,
				message : find.role + ' is '+ error.exists	
			})
		}
	}
	async findByEmail(email,res) {
		const find = await user.findOne({email:email.email})
		if(find === null) {
			return false
		} else {
			res.json ({
				message : find.email + ' is '+ emailvalid.emailmessage	
			})
		}
	} 
	async getByEmail(email,res) {
		const find = await user.findOne({email:email.email});
		if(find) {
			return find;
		} else {
			return null
		}
	}
	async updateByUuid(uuid,token) {
		const update = await user.update({uuid:uuid},{$set : {authtoken :token }})
		if(update) {
			return update
		}
	} 
	async childUuid(uuid) {
		const find = await user.findOne({parentid:uuid})
		if(find) {
			return find;
		}
	}
	async findByUuid(uuid,res) {
		const find = await user.findOne({uuid:uuid})
		console.log('ModelRepository',find.uuid)
		if(find.uuid) {
			return find
		} else {
			res.json ({
				message :  emailvalid.emailmessage	
			})
		}
	}
}