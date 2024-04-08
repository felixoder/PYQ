import {Button, Spinner, TextInput} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast , {Toaster} from 'react-hot-toast'
import OAuth from "./OAuth.jsx";
export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    console.log(formData)
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setFormData({...formData , [e.target.id]:e.target.value.trim()})

    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!formData.username || !formData.password || !formData.email || formData.username === '' || formData.email === '' || formData.password ===''){
            return toast.error('Please Fill the all credentials')
        }
        try{
          const res =   await fetch('/api/auth/signup',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
          if(data.success === false){
              return toast.error(data.message)


          }
          setLoading(false);
          if(res.ok){
              toast.success('Registration done successfully')

              navigate('/sign-in')


          }



        }
        catch(error){

            setLoading(false);
            toast.error('check the all credentials')
        }
    }
    return (
    <>

    <div className=" flex flex-col items-center md:flex-row-reverse justify-around">
        <Toaster />
         {/* for image */}
    <div className="card w-[400px] mt-2 md:mt-20">
        <img className='rounded-md' src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" alt="" />
        <p className='text-xl text-gray-500 font-serif mt-3'>You can register using google also. Stay tuned to get all previous year question sets of your university</p>
    </div>

    {/* Authentication */}

    <div className='flex flex-col gap-2 items-center mt-2'>
        <h1 className='text-center font-bold text-3xl mt-2 mb-5'>Register & Be Smart people</h1>
        <form  className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
<TextInput type='text' name='username' id='username' className='w-[400px]' placeholder='Enter Your UserName' onChange={handleChange}/>
<TextInput type='email' name='email' id='email' className='w-[400px]' placeholder='Enter Your Email' onChange={handleChange}/>
<TextInput type='password' name='password' id='password' className='w-[400px]' placeholder='Enter Your Password' onChange={handleChange}/>


        <Button type='submit' disabled={loading} gradientDuoTone='purpleToBlue' outline>

            {loading ?

                <>
                <Spinner animation="border" size="sm" />
                    <span className='pl-3'>
                        Loading....
                    </span>
                </>
                : 'Sign-Up'}

        </Button>

        <OAuth/>
            <span>Already have an account do <Link to ='sign-in' className=' text-blue-700 border-b-2'>Sign In</Link></span>

        </form>



    </div>

    </div>
    </>
  )
}
