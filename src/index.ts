import express from "express"
import resumeRouter from "./routes/resume.js"
import { errorHandler } from "./middleware/errorHandler.js";

const app=express()
const PORT=4000

app.use('/api/resumes',resumeRouter)



app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"this is root"
    })
})



app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})