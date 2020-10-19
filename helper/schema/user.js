import joi from '@hapi/joi'
import { errormsg } from '../appConst';

const createuser = joi.object().keys({
      username: joi.string().regex(/^[A-Za-z ]+$/),
      email: joi.string().email(),
      password: joi.string(),
      role : joi.string(),
}).required();

const createcategory = joi.object().keys({
  categoryname : joi.string(),
})

const createorganization = joi.object().keys({
  organizationname : joi.string().required()
  .error(new Error('error'))
}).required();

module.exports = {
  createuser:createuser,
  createcategory : createcategory,
  createorganization : createorganization
}