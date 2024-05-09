import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const videoSchema =  new Schema(
    {
      id : {
        type : String, 
        required : true,
        unique : true
      },
      videoFile : {
        type : String,  // cloudnery url
        required : true, 
      },
      tuhumbnail : {
        type : String, 
        required : true, 
      },
      owner : {
          type : mongoose.Schema.Types.ObjectId,
          ref  : "User"
        },
      title : {
        type : String, 
        required : true, 
      },
      description : {
        type : String, 
        required : true, 
      },
      duration : {
        type : number,    // cloudnery url
        required : true, 
      },
        views : {
        type : number, 
        default : 0
      },
        isPublished : {
        type : Boolean, 
      },
    },
    {
      timestamps : true 
    }
)


videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)
