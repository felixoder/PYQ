import {Button} from "flowbite-react";
import {app} from "../firebase.js";
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import {useDispatch} from "react-redux";
import {signInSuccess} from "../redux/user/userSlice.js";
import toast ,{Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
export default function OAuth (){
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
        try{

            const resultsFromGoogle = await signInWithPopup(auth,provider);
            const res = await fetch ('/api/auth/google',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            });
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data))
                toast.success('Successfully logged in');
                navigate('/')
            }
        }
        catch(err){
            toast.error('Failure in logged in');
            console.log(err);
        }
    }
    return(
        <>
            <Button gradientDuoTone='purpleToPink' className='w-[400px] flex justify-center items-center gap-2' onClick={handleGoogleClick}>Sign In using Google</Button>
        </>
    )
}