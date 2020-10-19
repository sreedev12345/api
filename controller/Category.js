import Config from '../helper/Config';
import ModelRepository from '../helper/ModelRepository';
import mongoose from 'mongoose';
import Validation from '../helper/validate/Validation';
import Response from '../helper/validate/Response'
import { createcategory }from '../helper/schema/user';
import UserCreate from '../helper/create/UserCreate'

import organization from '../model/organization';
import {v4 as uuidv4 } from 'uuid';
import user from '../model/user';
import { restriction } from '../helper/appConst';
import category from '../model/category'

const validate = new Validation();
const modelrepository = new ModelRepository();
const config = new Config();
const resp = new Response();
const create = new UserCreate();

class Category {
	async createCategory(req,res) {
		let authtoken = req.headers['authtoken'];
		let formdata = req.body;
		let  data = validate.isValidRequest(formdata,createcategory);
		const { value,error } = data; 
		const token = await config.verifyToken(authtoken);
		console.log(value,error)
		if(error) {
			const getemail = await modelrepository.findByUuid(token);
			if(getemail.role == 'admin' || getemail.role == 'user') {
				const store = await create.createCategory(value,getemail.uuid,res);
				const action = await resp.createAction(res,store);
				return action;
			} else {
				return await validate.restriction(res);
			}
		} else {
			return resp.errorResponse(res)
		}
	}

	async listCategory(req,res) {
		let authtoken = req.headers['authtoken'];
		let formdata = req.body;
		const token = await config.verifyToken(authtoken);
	}
}

export default Category;