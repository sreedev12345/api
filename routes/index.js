var express = require('express');
var router = express.Router();
import User from '../controller/User';
import Organization from '../controller/Organization';
import Category from '../controller/Category';
import Product from '../controller/Product';
import Demo from '../controller/Demo'
import errormsg  from '../helper/appConst'

const user = new User();
const orga = new Organization();
const category = new Category();
const product = new Product();




cat.identify();
router.post('/getuser',user.createAdmin);
 router.post('/signin',user.signIn);
 router.post('/create',user.createUser);
router.post('/createorganization',orga.createOrganization);
 router.post('/getorganization',orga.getOrganization);
router.post('/createcategory',category.createCategory);
router.post('/createproduct',product.createProduct);


// router.post('/productlist',product.productList)

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


module.exports = router;
