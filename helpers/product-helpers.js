var db=require('../config/connection')
var collection=require('../config/collections');
const { ObjectID } = require('bson');
var objectId=require('mongodb').ObjectID
module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
           
            callback(data.insertedId)
        })
    },
    getAllProduct:()=>{
       return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
       })
    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            console.log(prodId);
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
                // console.log(response);
                resolve(response)
            })
        })
    }
}