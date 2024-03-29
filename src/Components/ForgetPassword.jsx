import { Link } from "react-router-dom"
function ForgetPassword(){
    return(
        <>
             <div className="fixed inset-0  bg-primary -z-10 flex justify-center items-center">
          <div className="max-w-screen-xl mx-auto h">
              <form className='bg-secondary rounded p-6 w-96 space-y-6'>
                <h1 className='text-xl text-white font-semibold text-center'>Please Enter Your Email</h1>
                
                <div className='flex  flex-col-reverse'>
                <input placeholder='Please Enter your email' type="text" className='transition peer text-lg  p-2 text-white outline-none focus:border-primary bg-transparent rounded border-2 border-darksubtle focus:border-primary w-full'></input>
                <label  className="self-start font-semibold text-darksubtle peer-focus:text-white transition" htmlFor='Email'>Email</label>
                </div>
                
                <input type='submit' value="Send Link" className='w-full rounded bg-white hove:bg-opacity-90  cursor-pointer p-1 transistion font-semibold text-lg text-secondary'></input>
                <div className='flex justify-between'>
                <Link to="/signin" className='text-darksuble hover:text-white transition'>Signin</Link>
                <Link to="/signup" className='text-darksuble hover:text-white transition'>Sign up</Link>
              </div>
              
              </form>
              
              
          </div>
            
         </div>
        </>
    )
}
export default ForgetPassword