const mongoose=require("mongoose")
const Reset=mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:360,
        default:Date.now
    }
})
Reset.pre('save',async function(next){//hooks provided in mongodb execute when the document is saved
    if(this.isModified("token")){//if my password is modifies 
     this.token= await bcrypt.hash(this.token,10)//10 round of salting 

    }
    next();
})
Reset.methods.compareToken = async function(token){
   const result=await  bcrypt.compare(token,this.token)
   return result
}
module.exports=mongoose.model("Reset",Reset)