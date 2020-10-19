import { createuser }from '../schema/user';
import joi from '@hapi/joi'
import { errormsg, ACTION,restriction} from '../appConst';


class Validation {
	 static responseFormat() {
    	return {
      		message: '',
      		data : {},
      		code : ''
    	}
    }
	isValidRequest(request) {
		return joi.validate(request,createuser)
	}
	validationError() {
		const error = Validation.responseFormat();
		error.message = errormsg.valiadationerror;
		error.code = errormsg.errorcode;
		return error;
	}
	notValid() {
		const error = Validation.responseFormat();
		error.message = errormsg.emailvalid;
		error.code = errormsg.errorcode
		error.data = ACTION.FIND
		return error;
	}
	restriction(res) {
		const error = Validation.responseFormat();
		error.message = restriction.message;
		error.data = restriction.status
		error.code = 404;
		return res.json({
			error : error
		})
	}
}

export default Validation;