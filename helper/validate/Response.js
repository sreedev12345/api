
import { success,STATUSCODE,AUTHENTICATION } from '../../helper/appConst';
import Validation from './Validation';
const validate = new Validation();

class Response {
	 static responseFormat() {
    	return {
      	message: '',
      	data : {},
      	code : ''
    };
  }
  async successResponse(res) {
  	const success123 = Response.responseFormat();
  	const message = success.createsuccessmessage;
  	success123.message = message;
  	success123.code = STATUSCODE.success
  	return success123
  }
  async authentication() {
  	const success123 = Response.responseFormat();
  	const message = AUTHENTICATION.message;
  	success123.message = message;
  	success123.code = AUTHENTICATION.code
  	return success123;
  }

  async alreadyPresent() {
  	const success123 = Response.responseFormat();
  	success123.message = 'data already present with',
  	success123.code = 404;
  }

  async errorResponse(res) {
  	const data = validate.validationError();
  	res.json({
  		err : data
  	})
  }
  
  async createAction(res,data) {
	  	res.json({
	  		data : data
	  	})
  }

  static productResponse(prod,res) {
  	const success123 = Response.responseFormat();
  	success123.data = prod;
  	success123.code = 200;
  	success123.message = success.createsuccessmessage
  	res.json({
  		data : success123
  	})
  }
}

export default Response;