const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
                userID: String,
                productID:String,
                nameProduct: String,
                price: Number,
                img: String,
                description:String,
                status:Boolean
                      
});
const Like = mongoose.model('Like', likeSchema,'likes');
module.exports=Like;