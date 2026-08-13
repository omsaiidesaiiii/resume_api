import { Router } from "express";
import multer from "multer";

const router = Router();

const upload=multer({storage:multer.memoryStorage()});

router.post('/upload',upload.single('resume'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({
            message:"No file uploaded"
        })
    }

    console.log("received file",
        {
            name:req.file.originalname,
            type:req.file.mimetype,
            size:req.file.size
        }
    )

    res.status(200).json({
        fileName:req.file.originalname,
        sizeInBytes:req.file.size,
    })

})

export default router;