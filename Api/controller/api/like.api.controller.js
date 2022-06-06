const Like = require('../../model/like.model');

module.exports.index=async (req,res)=>{
    const userID = req.params.userID
    const like = await Like.find({userID:userID}).sort({_id:-1});
    res.json(like)
}

module.exports.add = async (req, res) => {
    await Like.create(req.body)
    res.json('Đã thích');
}

module.exports.delete = async (req, res) => {
    const query=[{_id:req.body.id},{userID:req.body.userID}];
    await Like.deleteOne({$and:query},(err) => {
        if (err){
                console.log(err);
        }     
    })
    res.json("Đã bỏ thích")
}