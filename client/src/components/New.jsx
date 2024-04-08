import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import toast , {Toaster} from 'react-hot-toast'
import {useSelector} from 'react-redux';
export default function New() {
  const {currentUser} = useSelector((state)=> state.user);
  useEffect(() => {

    const callAlert = () => {
      setTimeout(() => {
        toast.success('Sign In To Post Your Question Paper');
      }, 1000); 
    };
if(!currentUser){

  callAlert();
}
  }, []);
  return (
    <div className=''>
      <Toaster/>
      <p className='text-center font-semibold text-2xl mb-2 text-blue-600'>Want to Score 100 in all subjects and fade up to find all PYQs Welcome to our collaborative platform. Practise Others Question and Post your Question to learn collaboratively</p>
    <h1 className='text-center font-bold text-3xl'>Choose Your Board</h1>
    <div className="container flex">
      <div className="flex flex-col md:flex-row justify-center items-center mx-auto gap-2">
        <Link to='/wb'><div className="card w-[100px] h-[100px] bg-red-400 mt-6 rounded-xl"> <h1 className='text-center font-bold text-3xl'>WBSE</h1></div></Link>
        <Link to='/icse'><div className="card w-[100px] h-[100px] bg-green-400 mt-6 rounded-xl"> <h1 className='text-center font-bold text-3xl'>ICSE</h1></div></Link>
        <Link to='/cbse'> <div className="card w-[100px] h-[100px] bg-yellow-400 mt-6 rounded-xl"> <h1 className='text-center font-bold text-3xl'>CBSE</h1></div></Link>
      </div>
    </div>
    <p className='text-center mt-10'>Do Sign In to post Question paper of Your School</p>
    <p>
      
    </p>
    </div>
  )
}
