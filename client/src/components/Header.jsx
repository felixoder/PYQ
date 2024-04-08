import {Navbar,Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice.js';

export default function Header() {
 const {currentUser} = useSelector(state => state.user);
 const dispatch = useDispatch();
 const handleSignOut = async ()=>{
    try {
      const res = await fetch('/api/auth/sign-out',{
        method:'POST'
  
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signOutSuccess())
  
      }
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <nav>
        <Navbar className='bg-gray-100 ' >
            {/* logo */}
            <div className="flex justify-center">
                <Link to='/'>
                    

                        <h1 className='font-bold text-2xl'>Felix-Bank</h1>
                   


                </Link>

            </div>


            <div className="flex gap-2">
                {currentUser ? (
                    <>
                    <Link to='create-post'><Button gradientDuoTone='purpleToBlue'>Post-Questions</Button></Link>
                        <Button onClick={handleSignOut}>Sign-Out</Button>

                    </>
                ):(
                    <>



                    <Link to='/sign-in'> <Button gradientDuoTone='purpleToPink' outline>Sign-In</Button></Link>

                    <Link to='/sign-up'><Button gradientDuoTone='purpleToPink' outline>Sign-Up</Button></Link>
                    </>
                )}
               

            


            </div>
        </Navbar>

      
    </nav>
    
  )
}
