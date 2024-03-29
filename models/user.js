const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false
    }
})
userSchema.pre('save',async function(next){//hooks provided in mongodb execute when the document is saved
    if(this.isModified("password")){//if my password is modifies 
     this.password= await bcrypt.hash(this.password,10)//10 round of salting 

    }
    next();
})
userSchema.methods.comparePassword = async function(password){
    const result=await  bcrypt.compare(password,this.password)
    return result
 }
module.exports=mongoose.model("User",userSchema)