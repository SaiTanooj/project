const express=require("express")
const router=express.Router()
const {getUser, forgetPassword, sigin}=require("../controllers/user")
const {createUser,verifyEmail}=require("../controllers/user")
const {check,validationResult}=require("express-validator")
const validate=(req,res,next)=>{
    const error=validationResult(req).array();
    if(error.length){
       return  res.json({error:error[0].msg})
    }
    next()
}
const signinvalidator=[
    check('name').trim().not().isEmpty().withMessage("Name is missing"),
    check('email').normalizeEmail().trim().not().isEmpty().withMessage("Email is missing"),
    check('password').trim().not().isEmpty().withMessage("Password is missing").isLength({min:8,max:20}).withMessage("Password must be 8 to 20 length"),
    
]
router.get("/",getUser)
router.post("/createUser",[check('name').trim().not().isEmpty().withMessage("Name is missing"),check('email').normalizeEmail().trim().not().isEmpty().withMessage("Email is missing")],check('password').trim().not().isEmpty().withMessage("Password is missing").isLength({min:8,max:20}).withMessage("Password must be 8 to 20 length"),validate,createUser)
router.post("/verifyEmail",verifyEmail)
router.post("/resetPassword",forgetPassword)
router.post("/signin",signinvalidator,validate,sigin)
module.exports=router