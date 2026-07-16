import { sendfile } from "../config/imagekit.js";

export const getImageController = async(req, res)=>{
    try {
        console.log(req.file);
        if(!req.file){
            return res.status(404).json({
            success:false,
            message:"file not found"
        })
        }
        let file = req.file;
        let uploadFile = await sendfile(file.buffer, file.originalname)
        console.log(uploadFile);
        return res.status(200).json({
            success:true,
            message:"file uploaded"
        })
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}