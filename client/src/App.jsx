import Header from './components/Header'
import Main from './components/Main'
import {  Routes,Route } from 'react-router-dom'
import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'
export default function App() {
  return (
   <>
   <Header/>
   
   <Main/>
   
   <Routes>

<Route path='/sign-in' element={<SignIn/>}/>
<Route path='/sign-up' element={<SignUp/>}/>

   </Routes>
   
   
   </>
  )
}

