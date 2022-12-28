const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProduct().then((products)=>{
    console.log(products);
    res.render('user/view-products',{products})
  })
});
router.get('/login',(req,res)=>{
  res.render('user/login')

})
router.get('/signup',(req,res)=>{
  res.render('user/signup')

})
router.post('/signupaction',(req,res)=>{
  console.log("test");
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })
})

module.exports = router;
