const History = require('../../model/history.model')
const Cart = require('../../model/cart.model');

module.exports.index = async (req, res) => {
    const history = await History.find();
    res.json(history)
}

module.exports.preOrder = async (req, res) => {
    const history = await History.findOne({ _id: req.body.id })
    history.cart.map(async (e) => {
        const query = [{ productID: e.productID },
        { size: e.size }, { color: e.color },
        { userID: history.userID }];
        const cart = await Cart.findOne({ $and: query });

        if (cart) {
            let count = cart.count + Number(e.count)
            await Cart.updateMany({ productID: e.productID }, { count: count })
        }
        else {
            await Cart.create({
                userID: history.userID,
                productID: e.productID,
                nameProduct: e.nameProduct,
                price: e.price,
                img: e.img,
                count: e.count,
                size: e.size,
                color: e.color
            })
        }


    })
    res.json('Đã thêm vào giỏ hàng');
}
