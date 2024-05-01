// const asynchHandler = ()=>{
     
// }

// export {asynchHandler}



// const asynchHandler = (fn)=> async(error,req,res,next )=> {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//       res.status(err.code || 500).jsong({
//         succes :  false,
//         message : error.message
//       })   
//     }
// }


const asynchHandler = (requestHandler)=>{
     (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next)).
        catch((err)=> next(err))
     }
}