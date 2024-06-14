import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express";

const app = express()

const  conntectDB = async()=>{
     try{
     
     // read About returned responce
     const connectionInstance  =   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`)
      
      // TO handle express side errors 
      app.on('errror',(error)=>{
      console.log('express side error')

      })
     } catch (error) {
      // handle  database side error 
        console.log(`MONGODB CONNECTION ERROR:${error}`)
        process.exit(1)
        //read about the process the exit
     }
}  

export default conntectDB