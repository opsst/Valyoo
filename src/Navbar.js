import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Navbar = () => {
  const [firstname,setFirstname] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const accessTokenObj = localStorage.getItem("token");
  const myHeaders = new Headers();
  // const myRequest = new Request('http://localhost:5000/users/protected',{
  //   method: 'GET',
  //   headers:{}
  // })
  useEffect(()=>
  {
   
    if(accessTokenObj){
      
       setTimeout(function() { localStorage.clear(); console.log('clear!'); window.location.reload(); }, (10000 *60));
      // myHeaders.append("Authorization", accessTokenObj.toString())
      const x = accessTokenObj
      myHeaders.append("Authorization", x)
      console.log(typeof accessTokenObj)
      setIsAuth(true)
      console.log(accessTokenObj)
      fetch('http://localhost:5000/users/protected',{
        method : 'Get',
        headers : myHeaders,
      })
      .then(res => res.json())
      .then(data => setFirstname(data));
      console.log(firstname);
    }
    else{
      console.log('no token');
    }
  })

    return ( 
        <nav className="">
        <div className="bg-black h-6 text-white text-center font-primary4 hidden text-xs pt-1 sm:block">
            
        <p>FREE SHIPPING WITHIN THE CONTINENTAL USA AT $100 AND MORE. Any purchases during sales periods & discounted items are final sale.</p>
      </div>

        <div className="navbar py-4 flex justify-around sm:justify-between items-center ml-2.5 sm:mx-36 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>
            <Link to="/"><h1 className="text-3xl font-primary2 pr-8 sm:pr-0">VALYOO</h1></Link>
            {/* <Link>hi</Link>
            <Link>hi</Link>
            <Link>hi</Link>
            <Link>hi</Link> */}
            
            <div className="links text-xs flex ml-9 sm:ml-0 ">
                <Link to="/test"className="px-3 "><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg></Link>
                <Link to="/user" className="px-3 hover-trigger ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
                
                </Link>
                <Link to="/cart" className="px-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
</svg></Link>
                {isAuth && 
                <div className = "text-lg font-primary2">Hi! {firstname} <Link to="/signout" className="font-primary text-sm">,Signed Out</Link></div>}
            </div>
        </div>
        </nav>
     );
}
 
export default Navbar;