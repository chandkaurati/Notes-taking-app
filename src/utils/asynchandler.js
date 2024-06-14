// const asynchHandler = ()=>{
     
// }

// export {asynchHandler}



// const asynchHandler = (fn)=> async(error,req,res,next )=> {
//     try {
//         await fn(req,res,next)
 //       res.status(err.code || 500).jsong({
//         succes :  false,
//         message : error.message
//       })   
//     }
// }


const asynchHandler = (requestHandler)=>{
     return (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next)).
        catch((err)=> next(err))
     }
} 

export {asynchHandler}