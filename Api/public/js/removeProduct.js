
const socket = io()
$(document).on('click','.removeProduct',function(e){
    let productID=$(this).attr('data-productid');
    socket.emit('web xóa sản phẩm',{note: 'Xin lỗi quý khách có sản phẩm không còn tồn tại',productID: productID})
})
    