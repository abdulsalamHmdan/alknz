let socket = io()
socket.on('x', (qr) => {
    location.reload()
})
const weekday = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const d = new Date();
let day = weekday[d.getDay()];
document.querySelector(".all").addEventListener('click', () => {
    $.ajax({
        url: "/deleteAll",
        type: "POST",
        success: function (res) {
            // alert("tm al7thf")
            socket.emit('x');
        },
        error: function (error) {
            console.log("error")
        }
    });
})

document.querySelector(".today").addEventListener('click', () => {

    $.ajax({
        url: "/deleteToday",
        type: "POST",
        data: { day: day },
        success: function (res) {
            // alert("tm al7thf")
            socket.emit('x');
        },
        error: function (error) {
            console.log("error")
        }
    });
})


$.ajax({
    url: "/data",
    type: "POST",
    data: { kind: "noqat" },
    success: function (res) {
        start(res)
    },
    error: function (error) {
        console.log("error")
    }
});

function start(res) {
    res.forEach(x => {
        let nqth = document.createElement("div")
        let name = document.createElement("h3")
        name.innerText = x.name
        let osrh = document.createElement("h3")
        osrh.innerText = x.osrh
        let point = document.createElement("h3")
        point.innerText = x.point
        let lgnh = document.createElement("h3")
        point.innerText = x.lgnh
        nqth.appendChild(name)
        nqth.appendChild(osrh)
        nqth.appendChild(point)
        nqth.appendChild(lgnh)
        let b = document.createElement("button")
        b.innerText = "X";
        b.className = 'delete'
        b.addEventListener('click', () => {
            $.ajax({
                url: "/delete",
                type: "POST",
                data: { id: x["_id"] },
                success: function (res) {
                    // alert("tm al7thf")
                    socket.emit('x');
                },
                error: function (error) {
                    console.log("error")
                }
            });

        })
        nqth.appendChild(b)
        document.querySelector("body").appendChild(nqth)

    });

}