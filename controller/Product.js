import Config from '../helper/Config';
import ModelRepository from '../helper/ModelRepository';
import mongoose from 'mongoose'

const modelrepository = new ModelRepository();
const config = new Config();
import organization from '../model/organization';
import {v4 as uuidv4 } from 'uuid';
import user from '../model/user';
import { restriction} from '../helper/appConst';
import upload from '../helper/file';
import category from '../model/category';
import product from '../model/product'

import multer from 'multer';
import path from 'path';
import Response from '../helper/validate/Response'
const resp = new Response();


class Product {
		 async createProduct(req, res) {
		 	let authtoken = req.headers['authtoken'];
			let formdata = req.body
			const verify = await config.verifyToken(authtoken);
			const find = await modelrepository.findByUuid(verify);
			if(find.role === 'admin' || find.role === 'user') {
				const cate = await category.findOne({useruuid :find.uuid })
				if(cate!==null) {
						upload(req,res,function(err) {
							let index = req.file.originalname.lastIndexOf('.')
							let originalname = req.file.originalname.slice(0,index)
		 					if(err) {
		 						res.json({
		 							err:err
		 						})
		 					} else {
		 						let addproduct = new product({
		 							productname : originalname,
		 							productfilename : req.file.filename,
		 							path : req.file.path,
		 							uuid : uuidv4(),
		 							useruuid : find.uuid,
		 							categoryuuid : cate.uuid
		 						})
		 						let prod = addproduct.save((err,data)=>{
		 							let dat = Response.productResponse(data,res)
		 							return dat
		 						});
		 						
		 					}
		 				})
					} else {
						res.json({
							status : 'error',
							message : 'without category product cant category'
						})
					}
				} else {
					res.json({
						message : 'you dont have permission to create product'
					})
				}
		}

		
		async productList(req,res) {
			let authtoken = req.headers['authtoken'];
			const verify = await config.verifyToken(authtoken);
			const find = await modelrepository.findByUuid(verify);
			if(find.role === 'subadmin' || find.role === 'user') {
				product.aggregate([
					{
						$match : {
							useruuid : find.uuid
						}
					},{
						$project : {
							productname :1,
							productfilename :1,
							path :1,
							uuid : 1
						}
					}
				]).exec((err,data)=>{
					res.json({
						data : data
					})
				})
			}
		}
}

export default Product;