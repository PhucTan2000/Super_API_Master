const md5 = require('md5')
const User=require('../../model/user.model')

module.exports.login=async function(req,res,next){
    const email=req.body.email;
    const password=md5(req.body.password);

    const user= await User.findOne({email:email});

     if(!user){
         return res.json({msg: "Email không tồn tại"})
     }else{
        if(password!==user.password){
            return res.json({msg: "Sai mật khẩu"})
         }
     }

     res.json({msg: "Đăng nhập thành công",user:user})
}

module.exports.forgetPassword=async function(req,res,next){
    const user=await User.findOne({email:req.body.email})

    if(!user){
        return res.json({msg: "Email chưa được đăng ký"})
    }

    next();

}