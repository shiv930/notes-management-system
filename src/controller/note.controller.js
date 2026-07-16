import noteModel from "../models/note.model.js";

//NOTE CREATED API
export const noteCreate = async (req, res) => {
  try {
    let { title, description } = req.body;
    if (!title || !description ) {
    return   res.status(400).json({
        success: false,
        message: "all feild is required",
      });
    }
    const noteData = await noteModel.create({
      title,
      description,
      userId:req.userId
    });
    res.status(201).json({
      success: true,
      message: "note register successfully",
      data: noteData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//NOTE READ API
export const noteRead = async (req, res) => {
  try {
    let read = await noteModel.find({userId:req.userId});
    return res.status(200).json({
      success: true,
      message: "all notes fetched successfully",
      data: read,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//NOTE UPDATED API
export const noteUpdate = async(req,res)=>{
try {
     let {id} = req.params;
    const{title, description} = req.body;
    let  updated = await noteModel.findByIdAndUpdate(id,{title,description },{new:true, runValidators:true})
    return res.status(200).json({
        success:true,
        message:" data should be updated",
        data:updated
    })
} catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
}

}

// NOTE DELETED API 
export const noteDelete = async(req,res)=>{
    try {
        let {id}= req.params
        let deleteNote = await noteModel.findByIdAndDelete(id)
        return res.status(200).json({
            success:true,
            message:"note is deleted ✨",
            data:deleteNote
        })
    } catch (error) {
         res.status(500).json({
        success:false,
        message:error.message
    })
    }
}

//single note api

export const singleNote = async(req,res)=>{
    try {
        let {id}=  req.params
    let single = await noteModel.findById(id)
     return res.status(200).json({
        success:true,
        message:"single note fetched",
        data:single

    })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:error.message
    })
    }
}