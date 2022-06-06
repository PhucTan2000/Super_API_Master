require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var upload = require('express-fileupload');
const cors=require('cors');
const socket=require('socket.io')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},
    function (err, db) {
     if(err) console.log(err);
     else console.log("Connect is successfull")
  });


  const app = express()
  app.set('view engine', 'ejs');
  app.set('views', './views');

  app.use(express.static('public'));
  app.use(cookieParser('ahdsjasdhjkashdsdf099'));

const productRoute=require('./routes/server/products.router')
const authRoute=require('./routes/server/auth.router')
const userRoute=require('./routes/server/users.router')
const historyRoute=require('./routes/server/history.router')

const middleware = require('./middleware/auth.middleware');

const authRouteAPI=require('./routes/api/auth.api.route')
const userRouteAPI=require('./routes/api/user.api.route')
const cartRouteAPI=require('./routes/api/cart.api.route')
const productRouteAPI=require('./routes/api/product.api.route')
const historyRouteAPI=require('./routes/api/history.api.route');
const likeRouteAPI=require('./routes/api/like.api.route');
 

let port=process.env.PORT || 3000
app.use(cors())
  


  app.use('/', express.static('public'))
  app.use(upload());
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(middleware.userNav)

  app.use('/', authRoute);
  app.use('/products',middleware.CheckMiddle,middleware.checkAdmin,productRoute)
  app.use('/users',middleware.CheckMiddle,middleware.checkAdmin,userRoute)
  app.use('/orders',middleware.CheckMiddle,middleware.checkAdmin,historyRoute)

  app.use('/api/user',userRouteAPI)
  app.use('/api',authRouteAPI)
  app.use('/api/product',productRouteAPI)
  app.use('/api/cart',cartRouteAPI)
  app.use('/api/history',historyRouteAPI)
  app.use('/api/like',likeRouteAPI)

  const server=app.listen(port, () => {
      console.log('server running at ' + port)
    })

  let io=socket(server)

  io.on('connection',(socket)=>{
    // console.log(`Có người vừa kết nối, socketID: ${socket.id}`)

    //Đầu tiên client sẽ gửi data lên server với Key Order
    //server on để nhận dữ liệu với Key là Order
    socket.on('Order', (data)=> {
      console.log(data)
      
      //Sau đó Server gửi dữ liệu lên view của Web với key "web nhan", value: data
      io.sockets.emit('web nhan',{data:data})
    });

    socket.on('web xóa sản phẩm',(data)=>{
      console.log(data)
      io.sockets.emit('app xoa',{note: data.note, productID: data.productID})
    })

  })