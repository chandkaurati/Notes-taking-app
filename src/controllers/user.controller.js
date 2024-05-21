import { asynchHandler } from "../utils/asynchandler.js";


const registerUser = asynchHandler(async (req,res,next)=>{
    res.status(200).json({
    message : "ok"
    })
})

export {registerUser}