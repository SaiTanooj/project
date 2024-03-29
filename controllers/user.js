const User=require("../models/user")
const crypto=require("crypto")
const EVT=require("../models/emailVerificationToken")
const Reset=require("../models/passowrdReset")
const nodemailer=require('nodemailer')
const{isValidObjectId}=require("mongoose")
const jwt=require("jsonwebtoken")
exports.getUser=(req,res)=>{
    res.send("hello from backend it is ")
}
exports.createUser=async(req,res)=>{
    const{name,email,password}=req.body
    
    const newUser=new User({name:name,email:email,password:password})
    await newUser.save()
    let Otp=""
    for(let i=0;i<=5;i++){
        randomval=Math.round(Math.random()*9)
        Otp=Otp+randomval
    }
    const Evt=new EVT({owner:newUser._id,token:Otp})
    await Evt.save()
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "778fc171d80ca7",
          pass: "bf8bcc2f4f31ec"
        }
      });
      transport.sendMail({
        from:"tantade2002@gmail.com",
        to:newUser.email,
        subject:"Email Verifictaion",
        html:`
        <h4>Your Otp for verification is</h4>
        <h3>${Otp}</h3>
        <h4>Will be valid for only ten minutes</h4>
        `
      })
    res.json("Otp sent to mail id succesfully")
}
exports.verifyEmail=async(req,res)=>{
  const{userId,Otp}=req.body
  if(!isValidObjectId(userId)){
    return res.status(400).json({error:"Invalid user id"})
  }
  const user=await User.findById(userId)
  if(!user){
    return res.status(400).json({error:"Invalid user id"})
  }
  if(user.isVerified){
    return res.status(400).json({error:"User is already verified"})
  }
  const Evt=await EVT.findOne({owner:userId})
  if(!Evt){
    return res.status(400).json({error:"Invalid user id"})
  }
  const ismatched=await Evt.compareToken(Otp)
  if(!ismatched){
    return res.status(400).json({error:"Invalid Otp"})
  }
  user.isVerified=true;
  await user.save()
  EVT.findByIdAndDelete(Evt._id)
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "778fc171d80ca7",
      pass: "bf8bcc2f4f31ec"
    }
  });
  transport.sendMail({
    from:"tantade2002@gmail.com",
    to:user.email,
    subject:"Welcome Email",
    html:`
    <h4>Your Email verified Succesfully</h4>
    `
  })
  res.json({message:"Email verified succesfully"})
}
exports.resendEmail = async(req, res) => {
  const{userId}=req.body
  if(!isValidObjectId(userId)){
    return res.status(400).json({error:"Invalid user id"})
  }
  const user=await User.findById(userId)
  if(!user){
    return res.status(400).json({error:"Invalid user id"})
  }
  if(user.isVerified){
    return res.status(400).json({error:"User is already verified"})
  }
  const Evt=await EVT.findOne({owner:userId})
  if(Evt){
    return res.status(400).json({error:"Request after 10 mins"})
  }
  const Otp=""
  for(let i=0;i<=5;i++){
    randomval=Math.round(Math.random()*9)
    Otp=Otp+randomval
  }
  const newEvt=new EVT({owner:newUser._id,token:Otp})
    await newEvt.save()
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "778fc171d80ca7",
          pass: "bf8bcc2f4f31ec"
        }
      });
      transport.sendMail({
        from:"tantade2002@gmail.com",
        to:newUser.email,
        subject:"Email Verifictaion",
        html:`
        <h4>Your Otp for verification is</h4>
        <h3>${Otp}</h3>
        <h4>Will be valid for only ten minutes</h4>
        `
      })
    res.json("Otp sent to mail id succesfully")

}
exports.generateRandomBytes=()=>{
  return new Promise((resolve, reject) =>{
    crypto.randomBytes(40, (err, buf) => {
      if (err) return reject(err);
      resolve(buf.toString('hex'));
    });
  })
}
exports.forgetPassword=async(req,res)=>{
  const{email}=req.body
  if(!isValidEmail(email)){
    return res.status(400).json({error:"Invalid email"})
  }
  const user=await User.findOne({email:email})
  if(!user){
    return res.status(400).json({error:"Invalid email"})
  }
  const token=this.generateRandomBytes()  
  const newReset=new Reset({owner:user._id,token})
  await newReset.save()
  const resetpswrdlink=`http://localhost:3000/reset-password?token=${token}&id=${user._id}`
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "778fc171d80ca7",
      pass: "bf8bcc2f4f31ec"
    }
  });
  transport.sendMail({
    from:"tantade2002@gmail.com",
    to:newUser.email,
    subject:"Password reset",
    html:`
    <h4>Your password fpor reset is </h4>
    <a href=${resetpswrdlink}>Password reset</a>
    `
  })  
  res.json({message:"Email sent succesfully"})

  
res.json("Otp sent to mail id succesfully")  

}
exports.sigin=async(req,res)=>{
  const{email,password}=req.body
  if(!isValidEmail(email)){
    return res.status(400).json({error:"Invalid email"})
  }
  const user=await User.findOne({email:email})
  if(!user){
    return res.status(400).json({error:"Invalid email"})
  }
  const ismatched=await user.comparePassword(password)
  if(!ismatched){
    return res.status(400).json({error:"Invalid password"})
  }
  const token=jwt.sign({userid:user._id},"170102Tanooj")
  res.json({token:token})
  
}