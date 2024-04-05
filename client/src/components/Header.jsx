import {Navbar,Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
export default function Header() {
  return (
    <nav>
        <Navbar className='bg-gray-100 ' >
            {/* logo */}
            <div className="flex justify-center">
                <Button gradientDuoTone= 'purpleToBlue' outline  > 
                
                <h1 className='font-bold text-2xl'>BWU ~ PYQ</h1>
                </Button>
            </div>


            <div className="flex gap-2">
               
                    <Link to='/sign-in'> <Button gradientDuoTone='purpleToPink' outline>Sign-In</Button></Link>
                
                    <Link to='/sign-up'><Button gradientDuoTone='purpleToPink' outline>Sign-Up    </Button></Link>
            


            </div>
        </Navbar>

      
    </nav>
    
  )
}
