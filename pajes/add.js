let socket = io()
socket.on('x', (qr) => {
    console.log(qr)
})
let id, studentName, osrh, data;
var resultContainer = document.getElementById('qr-reader-results');
$.ajax({
    url: "/data",
    type: "POST",
    data: { kind: "info" },
    success: function (res) {
        data = res
        console.log(data)
        start()
    },
    error: function (error) {
        console.log("error")
    }
});





document.querySelector("button").addEventListener('click', () => {
    let noqat = +document.querySelector('.noqat').value
    let lgnh = document.querySelector('.lgnh').value
    const weekday = ["الأحد", "الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const d = new Date();
    let day = weekday[d.getDay()];
    if (!studentName || !osrh || ['', 0].includes(noqat)) {
        alert(['', 0].includes(noqat) ? "خطأ بالرقم" : "خطأ بالبيانات")
        return;
    }
    $.ajax({
        url: "/insertion",
        type: "POST",
        data: { name: studentName, osrh: osrh, noqat: noqat, day: day, lgnh: lgnh },
        success: function (res) {
            alert("تم اضافة الدرجات")
            socket.emit('x');
        },
        error: function (error) {
            console.log("error")
        }
    });
})


function start() {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            // Handle on success condition with the decoded message.
            console.log(decodedText);
            if (data.map(x => x["id"]).includes(decodedText)) {
                let info = data.find(x => x.id == decodedText)
                console.log(info)
                studentName = info["name"];
                osrh = info["osrh"]
                document.querySelector(".lgnh").value = "غير محدد"
                document.querySelector(".name").innerHTML = `اسم الطالب :${studentName}`
                document.querySelector(".osrh").innerHTML = `الأسرة :${osrh}`
            } else {
                alert("no student")
            }

        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
}