
import Validation from '../helper/validate/Validation'
import { createuser }from '../helper/schema/user';
import UserCreate from '../helper/create/UserCreate'
import { ACTION } from '../helper/appConst';
import Config from '../helper/Config';
import ModelRepository from '../helper/ModelRepository'
import Response from '../helper/validate/Response'
import user from '../model/user';

const validate = new Validation();
const create = new UserCreate();
const config = new Config();
const modelrep = new ModelRepository();
const resp = new Response();

class User {
	async createAdmin(req,res) {
		let formdata = req.body;
		let  data = validate.isValidRequest(formdata,createuser);
		const { value,error } = data;
		if(error === null && value) {
			const find = await modelrep.findByEmail(value,res)
			if(find === false) {
				const store = await create.createAdmin(value,'parentid',res);
				const action = await resp.createAction(res,store);
				return action;
			} else {
				return find;
			} 
		} else {
			return resp.errorResponse(res)
		}
	}


	async signIn(req,res) {
		let formdata = req.body;
		let data = validate.isValidRequest(formdata,createuser);
		const { value,error } = data;
		console.log(value,error)
		if(value && error === null) {
			const get = await modelrep.getByEmail(value,res);
		    if(get !== null) {
		    	const pwd = await config.passwordCheck(value.password,get.password,res);
		    	console.log('pwd',pwd)
		    	const token = await config.generateToken(get.uuid);
		    	const update = await modelrep.updateByUuid(get.uuid,token);
		    	if(update) {
		    		const msg = await resp.authentication();
		    		msg.data = {
		    			authtoken : token,
		    			role : get.role,
		    			uuid : get.uuid
		    		}
		    		const action = await resp.createAction(res,msg);
		    		return action
		    	}
		    } else {
		    	 const validmsg = validate.notValid();
		    	 validmsg.data = validmsg.data +' email with ' + value.email
		    	 const action = await resp.createAction(res,validmsg);
		    	 return action
		    }
		} else {
			return resp.errorResponse(res)
		}
	} 


	async createUser(req,res) {
		let formdata = req.body;
		let authtoken = req.headers['authtoken'];
		let data = validate.isValidRequest(formdata,createuser);
		const { value,error } = data;
		console.log('authtoken',authtoken)
		const token = await config.verifyToken(authtoken);
		const getemail = await modelrep.findByUuid(token);
		if(getemail.role === 'admin' || getemail.role === 'subadmin') {
			const store = await create.createAdmin(value,getemail.uuid,res);
			return store;
		} else {
			return ACTION.ERROR
		}
	}
 }

export default User;