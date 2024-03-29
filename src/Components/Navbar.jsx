import { useState } from 'react'

import { BiSolidTorch } from "react-icons/bi";
function Navbar() {
  return(
    <>
    <div className="bg-black shadow-sm shadow-gray-500">
         <div className="text-white max-w-screen-xl mx-auto h-15 p-2">
          <div className='flex justify-between items-center'>
            navbar
            <ul className="flex items-center space-x-4">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2  border border-blue-500 hover:border-transparent rounded">Button</button>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border  border-blue-500 hover:border-transparent rounded">Button</button>
            </ul>
          </div>
          
         </div>
    </div>
    
   </>
  )
  
}

export default Navbar