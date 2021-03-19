const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const FotoRouter = require("./Routes/Fotoitem.Routes")
const VideoRouter = require("./Routes/VideoRouters")
const authRouter = require("./Routes/authRouter")
const concertsRouter = require("./Routes/ConcertsRoutes")
const fileUpload = require("express-fileupload")
const app = express()
const Port = process.env.PORT || config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')
const staticPathMiddleWare = require('./middleware/filePathMiddleWare')
const MainPageRouter = require('./Routes/mainPage')
const path = require("path")
process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'static/fotoStaticPath')));
app.use(express.static(path.join(process.env.PWD, 'static/videoStaticPath')));

app.use(express.json())
app.use(corsMiddleware)

 app.use(staticPathMiddleWare(path.join(process.env.PWD, 'static')))
 // app.use(staticPathMiddleWare(path.join(process.env.PWD, 'static')))


// app.use(staticPathMiddleWare(path.resolve(__dirname,'static/videoStaticPath')))

// app.use(express.static(path.normalize(__dirname + '/static')))
//app.use(express.static(path.join(process.env.PWD, 'public')));
//app.use(express.static('static/videoStaticPath'))


 // app.use('\\static',express.static(path.join(process.env.PWD, 'static')))
// app.use(express.static(path.join(process.env.PWD,'static/videoStaticPath')))
// app.use(express.static(path.normalize(path.join(__dirname, '../app/static'))))

// app.use(express.static(path.join(process.env.PWD + '/../app/static/videoStaticPath')))

app.use(fileUpload({}))
app.use('/foto', FotoRouter )
app.use('/video', VideoRouter)
app.use('/auth', authRouter)
app.use('/concerts', concertsRouter)
app.use('/', MainPageRouter)

const start = async ()=>{
    try{
        await mongoose.connect(config.get("dbUrl"))
        app.listen(Port,()=>{
            console.log(`server started on port ${Port}`)
            console.log('__dirname in start',__dirname)

        })
    }
    catch (e){
        console.log("ERORRRRRRRR 111  something get wrong int opening server",e)
    }

}
start()










