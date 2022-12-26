var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"IPHONE 12 pro",
      category:"Mobile",
      description:"All are regorous quality to ensure Best Quality",
      image:"https://ovantica.com/pub/media/catalog/product/cache/359e51c8e354c4e2b5af98e814f93978/1/2/12_pro_grp_1__1.jpg" 
    },
    {
      name:"OnePlus 9 5G",
      category:"Mobile",
      description:"All are regorous quality to ensure Best Quality",
      image:"https://www.reliancedigital.in/medias/OnePlus-9-SmartPhones-491947285-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w2NDgwOHxpbWFnZS9qcGVnfGltYWdlcy9oMGEvaGFiLzk4NjkxMjYxMzk5MzQuanBnfGQ5ZmU4MTc4MjQ4Y2FhOTM3YzM0NTk5MjkwODg3MmQ3MWE3MTE4YTA2YjllMzY3ZDdjY2M1NGYyZDNlNzc5MmU"
    },
    {
      name:"Oppo F21 pro",
      category:"Mobile",
      description:"All are regorous quality to ensure Best Quality",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"Redmi note 11",
      category:"Mobile",
      description:"All are regorous quality to ensure Best Quality",
      image:"data:image/jpeg;base64,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"
    }
  ]
  res.render('admin/view-products',{products,admin:true})
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
module.exports = router;
