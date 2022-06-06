const nodemailer = require('nodemailer');
const {google}=require('googleapis')
let content='';
const Cart=require('./model/cart.model')
const User=require('./model/user.model')

module.exports.contentMail=async function(req,res,next){
    const carts=await Cart.find({userID:req.body.userID})
    let count=0;
    let tong=0;
    content='<div style="text-align:center"><h1>Thông tin người mua là</h1>'+
            `<h3>Tên: ${req.body.name}</h3>`+
            `<h3>SĐT: ${req.body.phone}</h3>`+
            `<h3>Địa chỉ: ${req.body.address}</h3></div>`+
            '<h1 style="text-align:center">Sản phẩm đã mua là </h1>'+
            '<table><tr><th>Tên</th><th>Gía</th><th>Số lượng</th></tr>'
    carts.map(carts=>{
        count+=carts.count
        tong+=carts.count*carts.price
        content+=`<tr><td><h3>${carts.nameProduct}</h3></td>`+
        `<td><h3>${new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(carts.price)} đ</h3>`+
        `</td>`+`<td><h3>${carts.count}</h3></td></tr>`
    })
    content+=`</table><h2 style="text-align:right">Tổng tiền: ${new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(tong)} đ</h2>`+
            `<h2 style="text-align:right">Tổng số lượng đã mua: ${count}</h2>`
    next();
}

module.exports.contentOTP=async function(req,res,next){

    content='<div style="text-align:center">'+
            '<p style="font-size: 15px;">Mã OTP của bạn là</p>'+
            `<h1>${req.body.OTP}</h1>`+
            '</div>'

    next();
}

module.exports.sendMail=async function(req,res,next){
    const option = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // email hoặc username
            pass: process.env.PASSWORD // password
        }
    };
    
    var transporter = nodemailer.createTransport(option);
    
    const mail = {
        from: process.env.EMAIL, // Địa chỉ email của người gửi
        to: req.body.email, // Địa chỉ email của người gửi
        subject: 'Thông tin từ shop Respresent', // Tiêu đề mail
        html: content
    };

    await transporter.sendMail(mail, function(error, info) {
        if (error) { // nếu có lỗi
            return res.json({msg:error})
        } else { //nếu thành công
            // console.log(info)
        }
    });

    res.json({msg:'Vui lòng kiểm tra mail để lấy mã OTP'})

}


// module.exports.sendMail=async function(req,res,next){
//     const oAuth2Client=new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
//     oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
//     let accessToken=await oAuth2Client.getAccessToken()
//     console.log(accessToken)
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             type:'OAuth2',
//             user:process.env.EMAIL,
//             clientId:process.env.CLIENT_ID,            
//             refresh_token:process.env.REFRESH_TOKEN,
//             accessToken:process.env.ACCESS_TOKEN
//         }
//     });
     
//         const mail = {
//                 from: process.env.EMAIL, // Địa chỉ email của người gửi
//                 to: req.body.email, // Địa chỉ email của người gửi
//                 subject: 'Thông tin từ shop Respresent', // Tiêu đề mail
//                 html: content
//         };
//             //Tiến hành gửi email
//         await transporter.sendMail(mail, function(error, info) {
//                 if (error) { // nếu có lỗi
//                     return res.json({msg:error})
//                 } else { //nếu thành công
//                     console.log(info)
//                 }
//         });
//         res.json({msg:'Vui lòng kiểm tra mail để lấy mã OTP'})
// }

