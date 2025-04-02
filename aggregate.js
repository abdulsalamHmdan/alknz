let socket = io()
socket.on('x', (qr) => {
    location.reload()
})
const weekday = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const d = new Date();
let day = weekday[d.getDay()];

$.ajax({
    url: "/aggregate",
    type: "POST",
    data: { day: day },
    success: function (res) {
        console.log(res)
        creat(res)
    },
    error: function (error) {
        console.log("error")
    }
});

function creat(data) {
    let t1 = document.querySelector(".t1")
    console.log(data)
    data.forEach((x, i) => {
        console.log(x._id, i)
        t1.innerHTML += `
        <tr>
        <td>${i + 1}</td>
        <td>${x._id}</td>
        <td>${x.count}</td>
      </tr>`

    })

}
