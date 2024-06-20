
const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const path = require("path");
const port = 2020;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://family:aS0507499583@cluster0.dvljyns.mongodb.net/?retryWrites=true&w=majority"
app.use(express.static(path.join(__dirname, 'pajes')));
app.use(express.urlencoded({ extended: true }))








// app.post('/sending', async (req, res) => {
//     let x = req.body.array;
// })


// app.get('/reset', (req, res) => {
//     MongoClient.connect(url, { family: 4 }, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("sessions");
//         dbo.collection("roqy").deleteMany({});
//     });
//     res.send('reset');
// })

// app.get('/reload', (req, res) => {
//     MongoClient.connect(url, { family: 4 }, function (err, db) {
//         if (err) throw err;
//         console.log("done2")
//         var dbo = db.db("sessions");
//         dbo.collection("roqy").find().forEach(x => {
//             console.log(x["name"], '-----', x["snf"])
//             if (data[x["snf"]]) {
//                 data[x["snf"]].names[data[x["snf"]].counter++] = x["name"];
//                 msgleen.push(x["name"]);
//             }
//         });
//         res.json("x");
//     });
// })



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pajes/report.html')

})

app.get('/insertion', (req, res) => {
    res.sendFile(__dirname + '/pajes/add.html')
})
app.post('/insertion', (req, res) => {
    let x = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("alknz");
        dbo.collection("noqat").insertOne({ name: x.name, osrh: x.osrh, point: x.noqat, lgnh: x.lgnh, day: x.day }).then(x => {
            res.json("done")
        }).catch(err => {
            console.log(err)

        })

    });
})

app.get('/delete', (req, res) => {
    res.sendFile(__dirname + '/pajes/delete.html')
})

app.get('/df', (req, res) => {

    let x = [
        {
            "name": "مهند النداوي",
            "id": "64373",
            "osrh": "السودة"
        },
        {
            "name": "عبدالرحمن يوسف القرعاوي",
            "id": "64374",
            "osrh": "السودة"
        },
        {
            "name": "عدنان الشهري",
            "id": "64375",
            "osrh": "السودة"
        },
        {
            "name": "عبدالرحمن عبدالعزيز القرعاوي",
            "id": "64409",
            "osrh": "السودة"
        },
        {
            "name": "فوزان السلطان",
            "id": "64377",
            "osrh": "السودة"
        },
        {
            "name": "عزام الصغير",
            "id": "64387",
            "osrh": "السودة"
        },
        {
            "name": "جواد الرميح",
            "id": "64379",
            "osrh": "السودة"
        },
        {
            "name": "سلطان السمنان",
            "id": "64380",
            "osrh": "السودة"
        },
        {
            "name": "حمد المطلق",
            "id": "64381",
            "osrh": "السودة"
        },
        {
            "name": "تميم القريشي",
            "id": "64382",
            "osrh": "الحبلة"
        },
        {
            "name": "عبدالله القاضي",
            "id": "64383",
            "osrh": "الحبلة"
        },
        {
            "name": "عبدالعزيز الضبيبان",
            "id": "64384",
            "osrh": "الحبلة"
        },
        {
            "name": "عبدالله السلمان",
            "id": "64385",
            "osrh": "الحبلة"
        },
        {
            "name": "تميم العثيمين",
            "id": "64378",
            "osrh": "الحبلة"
        },
        {
            "name": "عبدالرحمن عبدالعال",
            "id": "64386",
            "osrh": "الحبلة"
        },
        {
            "name": "مازن الحركان",
            "id": "64388",
            "osrh": "الحبلة"
        },
        {
            "name": "عبدالعزيز الضيف",
            "id": "64389",
            "osrh": "الحبلة"
        },
        {
            "name": "صالح العرهبي",
            "id": "64390",
            "osrh": "الحبلة"
        },
        {
            "name": "عزام الخشان",
            "id": "64410",
            "osrh": "الحبلة"
        },
        {
            "name": "عبدالله العثيمين",
            "id": "64391",
            "osrh": "الفرعاء"
        },
        {
            "name": "أحمد القاضي",
            "id": "64392",
            "osrh": "الفرعاء"
        },
        {
            "name": "عبدالله الخشيبان",
            "id": "64393",
            "osrh": "الفرعاء"
        },
        {
            "name": "رائد العجروش",
            "id": "64394",
            "osrh": "الفرعاء"
        },
        {
            "name": "صالح العبيكي",
            "id": "64408",
            "osrh": "الفرعاء"
        },
        {
            "name": "محمد المرزوقي",
            "id": "64396",
            "osrh": "الفرعاء"
        },
        {
            "name": "أنس الحصين",
            "id": "64397",
            "osrh": "الفرعاء"
        },
        {
            "name": "عبدالرحمن الضبيبان",
            "id": "64398",
            "osrh": "الفرعاء"
        },
        {
            "name": "منصور الحميدان",
            "id": "64400",
            "osrh": "الفرعاء"
        },
        {
            "name": "بدر الحربي",
            "id": "64401",
            "osrh": "الفرعاء"
        },
        {
            "name": "سلمان الغطيمل",
            "id": "64402",
            "osrh": "الواديين"
        },
        {
            "name": "عبدالله الجربوع",
            "id": "64403",
            "osrh": "الواديين"
        },
        {
            "name": "ياسر العامر",
            "id": "64404",
            "osrh": "الواديين"
        },
        {
            "name": "تميم الشهري",
            "id": "64405",
            "osrh": "الواديين"
        },
        {
            "name": "عبدالرحمن العجروش",
            "id": "64406",
            "osrh": "الواديين"
        },
        {
            "name": "سلطان فواز العثيمين",
            "id": "64407",
            "osrh": "الواديين"
        },
        {
            "name": "عمر العيدهي",
            "id": "64399",
            "osrh": "الواديين"
        },
        {
            "name": "عبدالملك العبيكي",
            "id": "64395",
            "osrh": "الواديين"
        },
        {
            "name": "فيصل السلمان",
            "id": "64376",
            "osrh": "الواديين"
        }
    ]
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("alknz");
        dbo.collection("info").insertMany(x).then(x => {
            res.json("done")
        }).catch(err => {
            console.log(err)

        })

    });

    // res.sendFile(__dirname + '/pajes/delete.html')
})
app.post('/delete', (req, res) => {
    let x = req.body.id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("alknz");
        dbo.collection("noqat").deleteOne({ _id: new ObjectId(x) }).then(x => {
            res.json("done")
        }).catch(err => {
            console.log(err)

        })

    });
})
app.post('/deleteAll', (req, res) => {
    // let x = req.body.id;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("alknz");
        dbo.collection("noqat").deleteMany({}).then(x => {
            res.json("done")
        }).catch(err => {
            console.log(err)

        })

    });
})
app.post('/deleteToday', (req, res) => {
    let x = req.body.day;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("alknz");
        dbo.collection("noqat").deleteMany({ day: x }).then(x => {
            res.json("done")
        }).catch(err => {
            console.log(err)

        })

    });
})




app.post('/data', async (req, res) => {
    // res.sendFile(__dirname + '/pajes/a.html')
    let x = req.body.kind;
    let data = [];
    await MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        console.log("done2")
        var dbo = db.db("alknz");
        await dbo.collection(x).find().forEach(x => {
            console.log(x)
            data.push(x)
        });
        console.log(data)

        res.json(data);
    });

})



io.on('connection', (socket) => {
    // socket.emit("load", data)
    socket.on('x', (kind, name) => {
        io.emit("x", 1)
        // socket.emit("x", 2)

    })
})


server.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

