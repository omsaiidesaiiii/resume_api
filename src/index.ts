import express from "express"

const app=express()
const PORT=4000

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"this is root"
    })
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})