import user from '../../model/user';
import category from '../../model/category'
import Response from '../validate/Response';
import organization from '../../model/organization'
import Config from '../Config';
const config = new Config();
const resp = new Response();

class UserCreate {
		async createAdmin(value,parentid,res) {
		const pwd = await config.passwordHash(value.password);
		console.log('pwd',pwd)
		const uniquid = await config.generateUniqueId();
		const msg = await resp.successResponse(res);
		const obj = new user({
			username : value.username,
			email : value.email,
			role : value.role,
			password : pwd,
			uuid : uniquid,
			parentid : value.parentid ? value.parentid : null
		})
		let saveddata = await obj.save()
		msg.data = saveddata
		return msg;
	}  

	async createCategory(value,useruuid,res) {
		const uniquid = await config.generateUniqueId();
		const msg = await resp.successResponse(res);
		const obj = new category({
			categoryname : value.categoryname,
			useruuid : useruuid,
			uuid : uniquid
		})
		let saveddata = await obj.save();
		msg.data = saveddata;
		const data = await resp.createAction(res,msg)
		return data;
	}

	async createOrganization(value,_id,res) {
		const uniquid = await config.generateUniqueId();
		const msg = await resp.successResponse(res);
		 const obj = new organization({
			organizationname : value.organizationname,
			userid : _id,
			uuid : uniquid
		})
		 let saveddata = await obj.save();
		 msg.data = saveddata
		 const data = await resp.createAction(res,msg)
		return data;
	}

	async adddProduct(req,user,cate,res) {
		const uniquid = config.generateUniqueId();
		const msg = resp.successResponse(res);
		let index = req.file.originalname.lastIndexOf('.')
		let originalname = req.file.originalname.slice(0,index)
		let addproduct = new product({
		 	productname : originalname,
		 	productfilename : req.file.filename,
		 	path : req.file.path,
		 	uuid : uuidv4(),
		 	useruuid : user,
		 	categoryuuid : cate
		})
		let saveddata = addproduct.save();
		msg.data = saveddata;
		const data = resp.createAction(res,msg)
		return data;
	}
}

export default UserCreate