console.log("hh")
let socket = io()
socket.on('x', (qr) => {
    location.reload()
})
$.ajax({
    url: "/data",
    type: "POST",
    data:{kind:"noqat"},
    success: function (res) {
        console.log(res)
        creat(res)
    },
    error: function (error) {
        console.log("error")
    }
});

function creat(data) {
    let score = { "السودة": 0, "الحبلة": 0, "الفرعاء": 0, "الواديين": 0 }
    console.log(data)
data.forEach(x => {
    score[x.osrh] += +x.point
})
var xValues = [];
var yValues = [];
var barColors = ["black", "green", "blue", "gray"];
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
