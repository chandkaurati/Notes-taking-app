import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express";

const app = express()
const  conntectDB = async()=>{
     try {

      const connectionInstance  =   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`)
      app.on('errror',(error)=>{
      console.log('express side error')

      })
     } catch (error) {

        console.log(`MONGODB CONNECTION ERROR:${error}`)
        process.exit(1)
      //read about the process the exit

     }
}  

export default conntectDB