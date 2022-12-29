var express = require('express');
const { response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProduct().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{products,admin:true})
  })
  
});
router.get('/add-product',function (re,res) {
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{


  
   productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
    })
    
   })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})
module.exports = router;
