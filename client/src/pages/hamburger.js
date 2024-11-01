import {RiCloseLine} from 'react-icons/ri'
import {HiOutlineMenu} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useContext} from 'react';
import { AuthContext } from '../Context/authcontext';

const Hamburger = ({menuOpen,setMenuOpen,handleLogout,myusername}) => {
    
    const {user} = useContext(AuthContext);
  
    const handleclick = () => {
        setMenuOpen(false)
       
    }
    return ( 
        <>
<div   className="absolute cursor-pointer md:hidden block top-7 right-2">

  {menuOpen ? (
    <RiCloseLine onClick={handleclick} className='w-6 h-6 text-white mr-2' />
):
<HiOutlineMenu  onClick ={() => setMenuOpen(true)} className='w-6 h-6 text-white mr-2'  />
}  


</div>


<div className={`absolute top-0 h-screen w-1/3 bg-gradient-to-tl from-white/10 to-[#0F172A] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${ menuOpen ?'left-0':'-left-full'}`}>





{myusername ? <Link to={`/profile/${user._id}`} onClick={handleclick}>Profile</Link>:  <Link to='/login' className='text-white'>Login</Link>}
<br />
{myusername ? <Link onClick={handleLogout}  className='text-white' >Logout</Link>:  <Link to='/registration'>Register</Link>}


<br />
<Link  to={`/profile/profilesetup/${user?._id}`} className='text-white'>Profile SetUp</Link>

    </div>
    </>


     );
}
 
export default Hamburger;