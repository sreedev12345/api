import Config from '../helper/Config';
import ModelRepository from '../helper/ModelRepository';
import mongoose from 'mongoose'

const modelrepository = new ModelRepository();
const config = new Config();
import organization from '../model/organization';
import {v4 as uuidv4 } from 'uuid';
import user from '../model/user';
import { restriction } from '../helper/appConst';
import { createorganization }from '../helper/schema/user';
import Response from '../helper/validate/Response'
import Validation from '../helper/validate/Validation';
import UserCreate from '../helper/create/UserCreate'


const resp = new Response();
const validate = new Validation();
const create = new UserCreate();

export default class Organization {
	async createOrganization(req,res) {
		const formdata = req.body;
		let  data = validate.isValidRequest(formdata,createorganization);
		const { value,error } = data; 
		if(error) {
			let authtoken = 'eyJhbGciOiJIUzI1NiJ9.YTEyYjMyMjgtMmE3Zi00MmVmLTk2NjktZWQ1ODE3YTliNjU5.TXGc0HA1_UwuY2TUqVv2y6XRo37iSZJKPAnGLjeotEo';
			const token = await config.verifyToken(authtoken);
			const find = await modelrepository.findByUuid(token,res);
			if(find.role == 'admin' || find.role == 'subadmin') {
				console.log('find',find)
				const store = await create.createOrganization(value,find._id,res);
				const action = await resp.createAction(res,store);
				return action;
			} else {
				return find;
		}
		} else {
			return resp.errorResponse(res)
		}
	}
	async getOrganization(req,res) {
		let authtoken = req.headers['authtoken'];
		const token = await config.verifyToken(authtoken);
		const find = await modelrepository.findByUuid(token);
		if(find.role === 'admin') {
			const data = organization.aggregate([
			{
				$lookup : {
					from : 'users',
					localField : 'userid',
					foreignField : '_id',
					as : 'organization'
				}
			},
			{
				$unwind : '$organization'
			},
			{
				$project : {
					organizationname : '$organizationname',
					username : '$organization.username',
					email : '$organization.email',
					organizationuuid : '$organization.uuid',
					parentid : '$organization.parentid',
					useruuid : '$organization.uuid'
				}
			},{
				$group : {
					_id :'$parentid',
					organizationname : {
						$push : '$organizationname'
					},
					username : {
						$push : '$username'
					},
					email : {
						$push : '$email'
					},
					organizationuuid : {
						$push : '$organizationuuid'
					},
					useruuid : {
						$push : '$useruuid'
					}
				}
			},
			{
				$project : {
					parentid : {
						$cond : {if :{ _id :1} , then : '$_id' ,else : 0}
					},
					organizationname : '$organizationname',
					username : '$username',
					email : '$email',
					organizationname : '$organizationname',
					organizationuuid : '$organizationuuid',
					useruuid : '$useruuid',
					_id : 0
				},
			}
		]).exec((err,data)=>{
			res.json({
				data : data
			})
		})
	} else {
		res.json({
			status : restriction.status,
			message : restriction.message
		})
	}
	}
}