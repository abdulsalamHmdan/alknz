let socket = io()
socket.on('x', (qr) => {
    location.reload()
})


$.ajax({
    url: "/aggregate",
    type: "POST",
    data: { kind: "noqat" },
    success: function (res) {
        console.log(res)
        creat(res)
    },
    error: function (error) {
        console.log("error")
    }
});

function creat(data) {
    let t1 =document.querySelector(".t1")
    console.log(data)
    data.forEach((x, i) => {
        console.log(x._id,i)
        t1.innerHTML +=`
        <tr>
        <td>${i+1}</td>
        <td>${x._id}</td>
        <td>${x.count}</td>
      </tr>`

    })

}
