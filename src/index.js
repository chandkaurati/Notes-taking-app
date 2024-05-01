import conntectDB from "./db/index.js";
import dotenv  from 'dotenv'
import { app } from "./app.js";
dotenv.config({
path: "./env"
})

conntectDB()
.then(()=>{
     app.on("error",(error)=>{
        console.log(error)
     })
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })
})

.catch((err)=>{
    console.log("MONGO connetion failed", err)
})

// const app = express()

// ;(async()=>{
//     try {
//        await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
//        app.on("error",(error)=>{
//         // to handle express errors
//        console.log('on express error')
//        throw error
//        })

//        app.listen(process.env.PORT,()=>{
//        console.log(`app is listining on port ${process.env.PORT}`)
//        })

//     } catch (error) { 
//     console.log(error)
//     }
//   })
