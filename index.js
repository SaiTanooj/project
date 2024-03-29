const express =require("express")
const route=require("./routes/user")
const app=express()
const morgan=require("morgan")
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/userdb").then(()=>{
    console.log("db is connected")
}).catch((ex)=>{
    console.log("db connection failed")
})
app.use(
    morgan("dev")
)
app.use(express.json())
app.use('/api',route)

app.listen(8000,()=>{
    console.log("Website logged in succesfully")
})