import { useEffect } from "react";

const Signout = () => {
    useEffect(()=>
    {
        console.log('logged out')
        window.location = '/';
    })
    return ( 
        <div onClick={(localStorage.clear())}></div>
     );
}
 
export default Signout;