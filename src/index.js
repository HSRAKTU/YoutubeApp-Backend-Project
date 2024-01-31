// require('dotenv').config({path: './env'})

import dotenv from "dotenv"

import connectDB from "./db/index.js";

import {app} from './app.js'

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(` ⚙️ Server is Ready at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err)
})

















/*
import express from 'express';
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_UI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("error",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`listening on port${process.env.PORT}`)
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()      //IFFE FOR DATA BASE CONNECT FUNCTION
*/