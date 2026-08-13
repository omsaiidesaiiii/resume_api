import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../services/extractText.js";
import { parseResumeText } from "../services/parseResume.js";

const router = Router();

const upload=multer({storage:multer.memoryStorage()});

router.post('/upload',upload.single("resume"),async (req,res)=>{
    if(!req.file){
        return res.status(400).json({
            message:"No file uploaded"
        })
    }

    const text=await extractTextFromPdf(req.file.buffer);
    const structuredResume=await parseResumeText(text);

    res.status(200).json(structuredResume);

    console.log("extracted text",text);


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