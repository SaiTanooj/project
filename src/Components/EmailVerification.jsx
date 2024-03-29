import { Link } from "react-router-dom"
import { useState } from "react"
function EmailVerification(){
    const[otp,setOtp]=useState(Array(6).fill(""))

    return(
        <>
          <div className="fixed inset-0  bg-primary -z-10 flex justify-center items-center">
          <div className="max-w-screen-xl mx-auto h">
              <form className='bg-secondary rounded p-6 w-96 space-y-6'>
                <h1 className='text-xl text-white font-semibold text-center'>Please Enter Your OTP Here</h1>
                
                <div className="flex justify-center items-center space-x-4">
                {otp.map((_,index)=>{
                    return(
                        <input type="number" className=" w-12 h-12 border-2 outline-none text-center text-white font-semibold text-xl bg-transparent border-darksubtle focus:white rounded spin-button-none"></input>
                    )
                })}

                </div>
                
                
                
                <input type='submit' value="Send Link" className='w-full rounded bg-white hove:bg-opacity-90  cursor-pointer p-1 transistion font-semibold text-lg text-secondary'></input>
                
              
              </form>
              
              
          </div>
            
         </div>
        </>
    )
}
export default EmailVerification