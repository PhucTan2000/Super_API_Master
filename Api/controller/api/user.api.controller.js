const User=require('../../model/user.model')
const md5 = require('md5')

module.exports.postCreate= async function(req,res){
    const user=await User.findOne({email:req.body.email});
    if(user){
        res.json({msg:'Email đã tồn tại'})
    }else{
        req.body.password=md5(req.body.password);
        req.body.name=req.body.name.toLowerCase().replace(/^.|\s\S/g,a=>{return a.toUpperCase()}).trim()
        await User.create(req.body);
        res.json({msg:'Đăng ký thành công'})
    }
}

module.exports.updatePassword=async function(req,res){

    await User.updateOne({email:req.body.email}, {password:md5(req.body.password)}, function(err,res) {
        if (err) return res.json({msg: err});        
    });
    res.json({msg:'Thay đổi mật khẩu thành công'})
}