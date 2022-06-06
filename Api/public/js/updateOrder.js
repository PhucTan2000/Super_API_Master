const socket = io()


//View web sẽ nhận dữ liệu từ data gửi lên với key: "web nhan", value: data
socket.on('web nhan', function(data) {

    //Render dữ liệu ra view tại thẻ có id là note
    if(window.location.pathname=="/orders")
        document.getElementById('note').innerText=data.data
        setTimeout(()=> {
            location.reload()
        }, 2000);

    //Sau đó ta sẽ import file này nào view
});

