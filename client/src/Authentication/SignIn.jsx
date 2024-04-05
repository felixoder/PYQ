import { Button, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
export default function SignIn() {
  return (
    <>
    
    <div className=" flex flex-col items-center md:flex-row-reverse justify-around">
         {/* for image */}
    <div className="card w-[400px] mt-2 md:mt-20">
        <img className='rounded-md' src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" alt="" />
        <p className='text-xl text-gray-500 font-serif mt-3'>You can SignIn using google also. Stay tuned to get all previous year question sets of your university</p>
    </div>
    
    {/* Authentication */}
   
    <div className='flex flex-col gap-2 items-center mt-2'>
        <h1 className='text-center font-bold text-3xl mt-2 mb-5'>Do SignIn and get 100% marks in exam</h1>
        <form  className='flex flex-col gap-2 '>
<TextInput type='text' name='username' id='username' className='w-[400px]' placeholder='Enter Your UserName'/>
<TextInput type='email' name='email' id='email' className='w-[400px]' placeholder='Enter Your Email'/>
<TextInput type='password' name='password' id='password' className='w-[400px]' placeholder='Enter Your Password'/>

        </form>
        <Button gradientDuoTone='purpleToBlue' outline>Sign-In</Button>
        <Link to='/' className=''>
            


        <Button gradientDuoTone='purpleToPink' className='w-[400px] flex justify-center items-center gap-2' >Sign In using Google</Button>

        </Link>


      
    </div>
   
    </div>
    </>
  )
}
