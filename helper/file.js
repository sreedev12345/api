import multer from 'multer';
import path from 'path';
import _ from 'lodash';
const allowedMime = ["image/jpeg", 'image/png', 'image/jpg'];
const maxsize = 1*1000*1000;

const storage = multer.diskStorage({
	destination : function(req,file,cb) {
		cb(null,'./public/images')
	},
	filename:function(req,file,cb) {
		let image = file.originalname.split('.').pop();
		cb(null,Date.now() +'.' + image)
	}
})

const upload = multer({
	storage:storage,
	limits : {fileSize : maxsize},
	fileFilter(req, file, cb) {
	 let mimeclone = _.map(allowedMime,_.clone);
	 let include = _.includes(mimeclone,file.mimetype)
	 if (include === false) {
		cb('file is not valid' ,false);
	} else {
		cb(null, true);
	}
  }
}).single('file')

module.exports = upload;






