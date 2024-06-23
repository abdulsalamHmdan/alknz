
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

mongoose.connect(url).then(() => {
    console.log("connect")
}).catch((err) => {
    console.log(err);
});

// let osr = ["السودة", "الحبلة", "الفرعاء", "الواديين"]
// osr.forEach((x, i) => {

//     const info = new Info({
//         name: "نقاط اسرية",
//         id: (i + 1),
//         osrh: x
//     });
//     info.save().then(() => {
//         console.log("done")
//     }).catch((err) => {
//         console.log(err)
//     });

// })



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pajes/index.html')

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


app.post('/aggregate', async (req, res) => {
    let x = await Point.aggregate([
        {
            $match: {
                "day": "الأحد",
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

