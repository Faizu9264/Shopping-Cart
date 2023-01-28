const { response } = require('express');
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const productHelpers = require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if (req.session.user) {
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/',async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  productHelpers.getAllProduct().then((products)=>{
    res.render('user/view-products',{products,user,cartCount})
  })
});
router.get('/login',(req,res)=>{
  if (req.session.loggedIn) {
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.userLoginErr})
    req.session.userLoginErr=false
  }
   
 
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')

})
router.post('/signup',(req,res)=>{
  console.log("test");
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    if (response.status){
    req.session.user=response
    req.session.user.loggedIn=true
    res.redirect('/')
  }else{
    req.session.loginErr="Verify Email & Password"
    res.redirect('/login')
  }
  })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if (response.status) {
      req.session.user=response.user
      req.session.user.loggedIn=true
      res.redirect('/')
    }else{
      req.session.userLoginErr="Invalid Email id or Password"
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.user=null
  // req.session.userLoggedIn=false
  res.redirect('/')
})
router.get('/cart',verifyLogin,async(req,res)=>{
  let products=await userHelpers.getCartProducts(req.session.user._id)
  let totalValue=0
  if(products.length>0){

    let totalValue=await userHelpers.getTotalAmount(req.session.user._id)
  }
  console.log(products);
  res.render('user/cart',{products,user:req.session.user,totalValue})
})
router.get('/add-to-cart/:id',(req,res)=>{
  console.log("api call");
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
  })
})
router.post('/change-product-quantity',(req,res,next)=>{
  console.log(req.body);
  userHelpers.changeProductQuantity(req.body).then(async(response)=>{
    console.log("Body:",req.body);
    // console.log("Response1",response);
    response.total=await userHelpers.getTotalAmount(req.body.user)
    // console.log(req.body.user);
    // console.log(response.total);
    res.json(response)
    // console.log("Response2",response);
  })
})
router.get('/place-order',verifyLogin, async(req,res)=>{
  let total=await userHelpers.getTotalAmount(req.session.user._id)
  res.render('user/place-order',{total,user:req.session.user})
  
})
// const paypal = require('paypal-rest-sdk');

router.post('/place-order', async (req, res) => {
let products = await userHelpers.getCartProductList(req.body.userId);
let totalPrice = await userHelpers.getTotalAmount(req.body.userId);
userHelpers.placeOrder(req.body, products, totalPrice).then((orderId) => {
res.json({ status: true });
  })
  })
  router.get('/order-success',(req,res)=>{
    res.render('user/order-success',{user:req.session.user})
  })
  router.get('/orders',async(req,res)=>{
    let orders=await userHelpers.getUserOrders(req.session.user._id)
    res.render('user/orders',{user:req.session.user,orders})
  })
  router.get('/view-order-products/:id',async(req,res)=>{
    let products=await userHelpers.getOrderProducts(req.params.id)
   
    res.render('user/view-order-products',{user:req.session.user,products})
  })

module.exports = router;
      
