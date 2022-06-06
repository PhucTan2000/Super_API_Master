const Orders = require('../../model/history.model')
const Users=require('../../model/user.model')

module.exports.index = async (req, res) => {
    let orders= await Orders.find()
    
    const user=await Users.find()
    
    let ordersCount=[]
    let ordersMoney=[]
    let users=[]
    let sumMoney=0;
    let sumCount=0;
    
    orders.map(e=>{
        let countManager=0
        let moneyManager=0

        e.cart.map(e=>{
            countManager+=e.count
            moneyManager+=e.price*e.count                   
        })

        user.map(v=>{
            if(v._id==e.userID){
               users.push(v)
            }
        })

        sumMoney+=moneyManager;
        sumCount+=countManager;
        ordersCount.push(countManager)
        ordersMoney.push(moneyManager)

    })   

    res.render('orders/index', {
        orders: orders,
        users:  users,
        ordersCount:ordersCount,
        ordersMoney:ordersMoney,
        sumMoney:sumMoney,
        sumCount:sumCount
    })
}

module.exports.view= async (req,res)=>{
    const id=req.params.id;
        let sumMoney=0;
        let sumCount=0;
        let order=await Orders.findOne({_id:id});
        order.cart.map(v=>{
            sumMoney+=v.price*v.count;
            sumCount+=v.count;
        })
        res.render('orders/view',{
            order: order,
            sumMoney:sumMoney,
            sumCount:sumCount,
        })
}