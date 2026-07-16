import mongoose from "mongoose"

export const connectDb = async()=>{
    try {
    await mongoose.connect(process.env.MONGODB_URI)
        console.log("database is connncted ");
        
    } catch (error) {
        console.log("error form connnecDb functionn ", error);
        
        
    }
}