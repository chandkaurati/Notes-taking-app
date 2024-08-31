 import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema  = new Schema(
    {
    
     watchHistory : [  
        {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Video"
    }
],

    username:{
     type : String,
     required : true,
      unique : true,
      lowcase : true,
      trim  : true,
       index : true
    },
    email:{
         type : String,
         required : true,
         unique : true,
         trim  : true, 
    },
    fullname:{
         type : String,
         required : true,
         trim  : true,
         index : true
    },
    avatar:{
         type : String,
         required : true,
    },
    coverImage:{
         type : String,
    },
    password:{
         type : String,
         required : [true, "password id reqired "],
    },
    refreshToken:{
         type : String,
    },


    },
    {
       timestamps : true  
    }

)

userSchema.pre("save",  async function(next){
  if(!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  // it will returns boolean value true false if  password is correct
return await bcrypt.compare(password, this.password)

} 

userSchema.methods.generateAccessToken =  function(){
  return  jwt.sign(
    {
        _id: this.id,
        email: this.email,
        username: this.username,
        fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  ) 
 
}
userSchema.methods.generateRefreshToken = function(){
  return  jwt.sign(  
    {
        _id: this.id,
    },
    process.env.REFRESH_TOKEN_SERCRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
 
}


export const User  = mongoose.model("User", userSchema)

