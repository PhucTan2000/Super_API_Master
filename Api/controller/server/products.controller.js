const Products = require('../../model/product.model');
const Carts = require('../../model/cart.model');
const Like=require('../../model/like.model')

// View Index Product
module.exports.index = async (req, res) => {

    var products =await Products.find();

    res.render('products/index', {
        products: products
    })

}


// View Index Create
module.exports.viewCreateProduct = (req, res) => {
    
    res.render('products/create', {
        success: false
    })

}

//Create Product
module.exports.addProduct = async (req, res) => {

    var product = new Products()
    let category;

    product.name = req.body.name
    product.price = req.body.price
    product.categories=req.body.categories
    product.status = req.body.status
    product.description=req.body.description

    var fileImage = req.files.image
    var fileName = fileImage.name

    if(req.body.categories==="Quần"){
        category="Pant"
    }else if(req.body.categories===("Áo")){
            category="Top"
    }else{
        category="Assc"
    }

    var fileProduct = "/img/" + category + "/" + fileName

    product.img = fileProduct
    product.save();

    fileImage.mv('./public/img/'+category+'/' + fileName)


    res.render('products/create', {
        success: true
    })

}

//Delete Product
module.exports.deleteProduct = async (req, res) => {

    var idDelete = req.body.productID

    await Products.findByIdAndDelete({_id: idDelete}, (err) => {
        if (err){
            console.log(err);
            return
        }
    });

   await Carts.deleteMany({productID:idDelete},(err)=>{
        if (err){
            console.log(err);
        }
    })

    await Like.deleteMany({productID:idDelete},(err)=>{
        if (err){
            console.log(err);
        }
    })

    res.redirect('/products');

}


//Update Product
module.exports.viewUpdate = async (req, res) => {
    
    var idProduct = req.params.id

    var product = await Products.findOne({_id: idProduct})

    res.render('products/update', {
        product: product,
        success: false
    })

}

module.exports.updateProduct = async (req, res) => {

    var idProduct = req.params.id

    
    await Products.updateOne({_id: idProduct}, req.body, function(err,res) {
        if (err) throw err;        
    });

    var product = await Products.findOne({_id: idProduct})

    await Like.updateMany({productID:idProduct},{ price: req.body.price, nameProduct: req.body.name, description: req.body.description})

    res.render('products/update', {
        product: product,
        success: true
    })
}