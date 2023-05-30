import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose"
const app = express()
import dotenv from"dotenv";
dotenv.config()
app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connection Successful")).catch(e=>console.log(e))

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})