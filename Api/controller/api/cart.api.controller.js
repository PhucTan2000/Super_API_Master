const Cart = require('../../model/cart.model')
const History=require('../../model/history.model')
const Product=require('../../model/product.model')

module.exports.index=async (req,res)=>{
    const userID = req.params.userID
    const carts = await Cart.find({userID:userID}).sort({id: -1});
    const products=await Product.find()
    let msg=""

    await carts.map(async (e)=>{
        let flag1=true;
        let flag2=true;
        let price=0;

        const query=[{productID : e.productID},{userID : userID}]

        await products.map((p)=>{
            if(p._id==e.productID && p.status==false){
                flag1=false;
            }
            else if(p._id==e.productID && p.price!==e.price){
                flag2=false
                price=p.price
            }
        })

        if(!flag1){
            msg="Có sự thay đổi trong giỏ hàng vui lòng kiểm tra lại"
            await Cart.deleteOne({$and:query},(err) => {
                if (err){
                    console.log(err);
                    return;
                }     
           })

        }else if(!flag2){
            msg="Có sự thay đổi trong giỏ hàng vui lòng kiểm tra lại"
            await Cart.updateOne({$and:query},{price: price})
        }
    })

    res.json({carts:carts,msg:msg})
}

module.exports.addCart = async (req, res) => {
    const cartItem=await Cart.find({userID:req.body.userID});
    const query=[{productID:req.body.productID},
                {size:req.body.size},{color:req.body.color},
                {userID:req.body.userID}];
    const cart=await Cart.findOne({$and:query});
    if(cartItem.length>0)
    {
       if(cart){
           let count=cart.count+Number(req.body.count)
            await Cart.updateOne({productID:req.body.productID},{count:count})
            res.json("Đã thêm vào giỏ hàng");
       }
       else{
            await Cart.create(req.body)
            res.json("Đã thêm vào giỏ hàng");
       }
    }
    else{
        await Cart.create(req.body)
        res.json("Đã thêm vào giỏ hàng");
    }
}

module.exports.deleteCart= async function(req,res){
    const query=[{_id:req.body.id},{userID:req.body.userID}];
    await Cart.deleteOne({$and:query},(err) => {
        if (err){
            console.log(err);
            return;
        }     
    })
    res.json("Xóa hàng thành công")
}

module.exports.checkPostIndex= async function(req,res,next){
    const userID=req.body.userID

    let carts=await Cart.find({userID:userID})
    const products=await Product.find()
    let isFlag=true;

    await carts.map(async (e)=>{
        let flag3=true;
        let flag4=true;
        let price=0;

        const query=[{productID : e.productID},{userID : userID}]

        await products.map((p)=>{
            if(p._id==e.productID && p.status==false){
                flag3=false;
            }
            else if(p._id==e.productID && p.price!==e.price){
                flag4=false
                price=p.price
            }         
        })

        if(!flag3){
            isFlag=false
            await Cart.deleteOne({$and:query},(err) => {
                if (err){
                    console.log(err);
                    return;
                }     
           })

        }else if(!flag4){
            isFlag=false
            await Cart.updateOne({$and:query},{price: price})
        }

    })
    
    if(!isFlag){
       return res.json({msg: "Có sự thay đổi trong giỏ hàng vui lòng kiểm tra lại"})
    }

    next();

}

module.exports.postIndex= async function(req,res){
        const userID=req.body.userID
        const carts=await Cart.find({userID:userID})

        let cartArr=carts.map(e=>{
            return e
        })
    
        await History.create({
            userID:  userID,
            address:req.body.address,
            phone:req.body.phone,
            cart: cartArr
                
        })
        await Cart.deleteMany({userID:userID})
        res.json({msg: "Đặt hàng thành công"})
}


