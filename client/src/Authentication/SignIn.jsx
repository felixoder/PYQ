import {Button, Spinner, TextInput} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {useState} from "react";
import {useDispatch , useSelector} from "react-redux";
import  {signInFailure, signInStart, signInSuccess} from "../redux/user/userSlice.js";
import toast , {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import OAuth from "./OAuth.jsx";

export default function SignIn() {
    const [formData , setFormData] = useState({});
    const dispatch = useDispatch();
    const {loading, error:errorMessage} = useSelector((state) =>state.user);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!formData.email || !formData.password || formData.email === '' || formData.password === ''){
            toast.error('Please fill the all credentials')
            return dispatch(signInFailure('Please fill all fields'))
        }
        try{
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(signInFailure(data.message));
                return toast.error(data.message)
            }
            if(res.ok){
                dispatch(signInSuccess(data))
                toast.success('Successfully logged in');
                navigate('/');
            }
        }
        catch(error){
            dispatch(signInFailure(error.message));
            return toast.error('Logged in Failed');
        }

    }
  return (
    <>
    
    <div className=" flex flex-col items-center md:flex-row-reverse justify-around">
        <Toaster/>
         {/* for image */}
    <div className="card w-[400px] mt-2 md:mt-20">
        <img className='rounded-md' src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" alt="" />
        <p className='text-xl text-gray-500 font-serif mt-3'>You can SignIn using google also. Stay tuned to get all previous year question sets of your university</p>
    </div>
    
    {/* Authentication */}
   
    <div className='flex flex-col gap-2 items-center mt-2'>
        <h1 className='text-center font-bold text-3xl mt-2 mb-5'>Do SignIn and get 100% marks in exam</h1>
        <form  className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
<TextInput type='email' name='email' id='email' className='w-[400px]' placeholder='Enter Your Email' onChange={handleChange}/>
<TextInput type='password' name='password' id='password' className='w-[400px]' placeholder='Enter Your Password' onChange={handleChange}/>

            <Button gradientDuoTone='purpleToBlue' outline type='submit'>
                {loading ? (
                    <>
                    <Spinner size="sm" />
                        <span className='pl-3'>Loading...</span>
                    </>
                    ):(
                       'Sign-In'
                )}
                </Button>
            <OAuth/>
        </form>
        <Link to='/' className=''>




        </Link>


      
    </div>
   
    </div>
    </>
  )
}
