import {v4 as uuidv4 } from 'uuid';
const jwt = require('jsonwebtoken');
import Crypt from 'cryptr';
const cryptr = new Crypt('myTotalySecretKey');
import { passwordmatch,restriction } from './appConst';
import _ from 'lodash';


class Config {
	async generateUniqueId() {
		const data = uuidv4();
		return data;
	}
	async generateToken(data) {
		const token = await jwt.sign(data,process.env.SECRET_KEY);
		if(token) {
			return token;
		}
	} async passwordHash(data) {
		const pwd = cryptr.encrypt(data);
		if(pwd) {
			return pwd;
		}
	}  async passwordCheck(reqpwd,dbpwd,res) {
		const pwd = cryptr.decrypt(dbpwd);
		let has = _.has(pwd,reqpwd);
		if(pwd === reqpwd) {
			return true
		} else {
			return res.json({
				status : passwordmatch.status,
				message : passwordmatch.message
			})
		}
	}  async verifyToken(token) {
		console.log('token',token)
		const decoded = jwt.verify(token,process.env.SECRET_KEY);
		console.log('decoded',decoded)
		return decoded
	}   
	async hasValidHeader(req) {
		const reqHeader = req.headers;
		console.log('reqHeader',reqHeader)
		return _.has(reqHeader,'authtoken')
  }  

}

export default Config