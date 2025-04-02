
const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const path = require("path");
const port = 2020;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const Info = require("./schema/info")
const Point = require("./schema/point")

const url = "mongodb+srv://family:aS0507499583@cluster0.dvljyns.mongodb.net/alknz?retryWrites=true&w=majority"
const url2 = "mongodb+srv://family:aS0507499583@cluster0.dvljyns.mongodb.net/?retryWrites=true&w=majority"
app.use(express.static(path.join(__dirname, 'pajes')));
app.use(express.urlencoded({ extended: true }))
let theDay = 'aa';
mongoose.connect(url).then(() => {
    console.log("connect")
}).catch((err) => {
    console.log(err);
});

// Info.deleteMany({}).then(() => {
//     console.log("done")
// }).catch((err) => {
//     console.log(err)
// });

// let osr = [["عبدالرحمن بن زياد القرعاوي","اجى","58754"],["عبدالرحمن بن عبدالله الضبيبان","اجى","58755"],["جواد بن عبدالله الرميح","اجى","58756"],["خالد بن عبدالله الغشام","اجى","58757"],["محمد بن حمد السليم","اجى","58758"],["فواز الحصين","اجى","58759"],["ابراهيم علي الدوسري","اجى","58760"],["عمار الحشيان","اجى","58761"],["محمد القبيسي","اجى","58762"],["صالح علي العرهبي","اجى","58763"],["تميم الشهري","اجى","58764"],["فياض المذن","توارن","58765"],["بدر خالد الحربي","توارن","58766"],["عبدالرحمن فهد السنيدان","توارن","58767"],["عبدالرحمن يوسف القرعاوي","توارن","58768"],["طلحه سليمان علي الصالحي","توارن","58769"],["مجاهد السلطان","توارن","58770"],["عبدالله موسى علي التركي","توارن","58771"],["علي السويداني","توارن","58772"],["عبدالله تميم القاضي","توارن","58773"],["عبدالعزيز الضيف","توارن","58774"],["سلطان عبدالرحمن العثيمين","مشار","58775"],["عبدالرحمن عبدالعزيز القرعاوي","مشار","58776"],["صالح انس العمار","مشار","58777"],["سلطان ياسر السمنان","مشار","58778"],["عبدالله الخشيبان","مشار","58779"],["محمد خالد العريفج","مشار","58780"],["محمد المانع","مشار","58781"],["معن فهد الشبيلي","مشار","58782"],["عبدالله حمد الجربوع","مشار","58783"],["انس ماجد الحصين","مشار","58784"],["عبدالله رائد البريكان","مشار","58785"]]
// osr.forEach((x) => {
//     const info = new Info({
//         name: x[0],
//         id: (x[2]),
//         osrh: x[1]
//     });
//     info.save().then(() => {
//         console.log("done")
//     }).catch((err) => {
//         console.log(err)
//     });

// })



app.get('/show', (req, res) => {
    res.sendFile(__dirname + '/pajes/show.html')

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pajes/main.html')

})

app.get('/insertion', (req, res) => {
    res.sendFile(__dirname + '/pajes/add.html')
})
app.post('/insertion', (req, res) => {
    let x = req.body;
    const point = new Point(x);
    point.save().then(() => {
        res.json("done")
    }).catch((err) => {
        res.json(err)
    });


})

app.get('/delete', (req, res) => {
    res.sendFile(__dirname + '/pajes/delete.html')
})

app.post('/delete', (req, res) => {
    let x = req.body.id;
    Point.deleteMany({ _id: new ObjectId(x) }).then(() => {
        res.json("done")
    }).catch((err) => {
        res.json(err)
    });
})
app.post('/deleteAll', (req, res) => {

    Point.deleteMany({}).then(() => {
        res.json("done")
    }).catch((err) => {
        res.json(err)
    });
})
app.post('/deleteToday', (req, res) => {
    let x = req.body.day;
    Point.deleteMany({ day: x }).then(() => {
        res.json("done")
    }).catch((err) => {
        res.json(err)
    });
})

app.get('/aggregate', async (req, res) => {
    res.sendFile(__dirname + '/pajes/aggregate.html')
})

app.get('/aggregate/:day', async (req, res) => {
    theDay = req.params.day
    res.sendFile(__dirname + '/pajes/aggregate2.html')
})

app.post('/aggregate', async (req, res) => {
    let x = await Point.aggregate([
        {
            $match: {
                name: { $not: { $regex: "نقاط اسرية" } }
            }
        },
        {
            $group: {
                _id: "$name",
                count: {
                    $sum: "$noqat"
                }
            }
        }, {
            $sort: {
                count: -1
            }
        }
    ])

    res.json(x)
})

app.post('/aggregate2', async (req, res) => {
    let x = await Point.aggregate([
        {
            $match: {
                "day": theDay,
                name: { $not: { $regex: "نقاط اسرية" } }
            }
        },
        {
            $group: {
                _id: "$name",
                count: {
                    $sum: "$noqat"
                }
            }
        }, {
            $sort: {
                count: -1
            }
        }
    ])

    res.json(x)
})

app.post('/data', async (req, res) => {
    let x = req.body.kind;
    let arr
    if (x == "info") {
        await Info.find().then(res => {
            arr = res

        }).catch(err => {
            res.json(err);

        })
    } else {
        await Point.find().then(res => {
            arr = res

        }).catch(err => {
            res.json(err);

        })
    }
    res.json(arr);
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

