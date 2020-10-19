module.exports = {
	errormsg : {
		username : 'username is required',
		email : 'email is required',
		mobilenumber : 'mobilenumber is required',
		password : 'password is required',
		role : 'role is required',
		status : 'error',
		emailvalid : 'email is not valid',
		exists : 'already exists',
		valiadationerror : 'validation error',
		errorcode : 404
	},
	success : {
		status : 'success',
		createsuccessmessage : 'created successfully'
	},
	passwordmatch : {
		status : 'error',
		message : 'password does not match'
	},
	emailvalid : {
		status : 'error',
		message : 'email not valid',
		emailmessage : 'email already exists'
	},
	restriction : {
		status : 'error',
		message : 'you dont have permission'
	},
	ACTION : {
		CREATE : 'create',
		ERROR : 'cant create',
		FIND : 'cant find '
	},
	STATUSCODE : {
		success : 200
	},AUTHENTICATION : {
		STATUS : 'success',
		message : 'authenticated successfully',
		code : 200
	}
}