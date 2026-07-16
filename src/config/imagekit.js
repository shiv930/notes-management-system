import dotenv from "dotenv";
dotenv.config();
import ImageKit from 'imagekit'

const storageInstance = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUB_KEY,
    privateKey:process.env.IMAGEKIT_PRIV_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL
})

export const sendfile = async(file, fileName)=>{
    return await storageInstance.upload({file,fileName})
}