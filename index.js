let socket = io()
socket.on('x', (qr) => {
    location.reload()
})

$.ajax({
    url: "/data",
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

    let score = { "اجى": 0, "مشار": 0, "توارن": 0 }
    data.forEach(x => {
        score[x.osrh] += +x.noqat
    })
    var xValues = [];
    var yValues = [];
    var barColors = ["black", "green", "blue"];
    for (x in score) {
        xValues.push(x)
        yValues.push(score[x])
    }
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "ترتيب الأسر"
            }
        }
    });
}
