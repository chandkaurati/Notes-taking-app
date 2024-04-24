
import conntectDB from "./db/index.js";
import dotenv  from 'dotenv'

dotenv.config({
    path: "./env"
})

conntectDB()
 
// ;(async()=>{
//     try {
//        await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
//     } catch (error) { 
//       console.log(error)
//     }
//   })