import Header from './components/Header'
import WB from './components/WB.jsx'
import {  Routes,Route } from 'react-router-dom'
import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'
import PrivateRoute from "./Private_Routes/PrivateRoute.jsx";
import CreatePost from "./post/CreatePost.jsx";
import PostPage from "./components/PostPage.jsx";
import New from './components/New.jsx'
import ICSE from './components/ICSE.jsx'
import FooterCom from './components/Footer.jsx'
import CBSE from './CBSE.jsx'
export default function App() {
  return (
   <>
   <Header/>


       <Routes>

           <Route path='/' element={<New/>}/>
           <Route path='/wb' element={<WB/>}/>
           <Route path='/cbse' element={<CBSE/>}/>
           <Route path='/icse' element={<ICSE/>}/>
           <Route path='/post/:postslug' element={<PostPage/>}/>

<Route path='/sign-in' element={<SignIn/>}/>
<Route path='/sign-up' element={<SignUp/>}/>
           <Route element={<PrivateRoute/>}>
               <Route path='create-post' element={<CreatePost/>}/>
               </Route>

   </Routes>
   <FooterCom/>
   
   </>
  )
}

