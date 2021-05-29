import { Link } from 'react-router-dom';
//import { DocumentQuery } from "mongoose";
import playv from "./video/banner.webm";
import playv2 from "./video/banner2.webm";
import playm from "./video/mbanner.webm";
const Home = () => {
    const testf = document.querySelectorAll('.test');
    localStorage.setItem('url','/');
    console.log(testf);


    return ( 
        <div >
        <div className="flex grid grid-cols-2 justify-center mt-1 mb-12">
            <div className="col-span-2 relative">
            <video className="object-cover w-full h-64 sm:h-96" autoPlay loop muted><source src={playm} type="video/webm"/></video>
            <div className="absolute top-0 right-8 text-right">
                    <h1 className="mt-7 font-primary2 text-3xl sm:text-4xl text-white opacity-100">RUNNER INSTINCTS</h1>
                    <br />
                    <p className="text-white font-primary4">This new women's training shoe will be avaliable</p>
                    <p className="text-white font-primary4">on July 13th at Valyoo</p>
                    <br /> <br /> <br /> <br /> <br /> <br />
                    <Link to='/all'><div className="pl-96"><p className="px-8 py-4 rounded-full cursor-pointer tracking-wide font-primary2 text-2xl bg-white">SHOP NOW</p></div></Link>
                </div>
            </div>
            <div className="relative">
                <video className="object-cover w-full h-64 sm:h-96" autoPlay loop muted><source src={playv2} type="video/webm"/></video>
                <div className="absolute bottom-8 right-8 text-right">
                    <h1 className="mt-7 font-primary2 text-3xl sm:text-4xl text-white opacity-100">PUMA X ADRIANA</h1>
                    <br />
                    <p className="text-white font-primary4">This new women's training shoe will be avaliable</p>
                    <p className="text-white font-primary4">on July 13th at Valyoo</p>
                    <br />
                    <div className="pl-96"><p className="px-5 py-2 rounded-full cursor-pointer tracking-wide font-primary2 bg-white">PRE-ORDER NOW</p></div>
                </div>

            </div>
            
            <div className="relative">
                <video className="object-cover w-full h-64 sm:h-96" autoPlay loop muted><source src={playv} type="video/webm"/></video>
                <div className="absolute bottom-8 right-8 text-right">
                    <h1 className="mt-7 font-primary2 text-3xl sm:text-4xl text-white opacity-100">BUILT TO BE BOLD</h1>
                    <br />
                    <p className="text-white font-primary4">Which classic from the ZX 8000 "Blackpink" collection </p>
                    <p className="text-white font-primary4">gets you in the mood to play?</p>
                    <br />
                    <div className="pl-96"><p className="px-5 py-2 rounded-full cursor-pointer tracking-wide font-primary2 bg-white">SHOP NOW</p></div>
                </div>
            </div>
            
        </div>

        <p  className="pt-16 font-primary2 text-center text-3xl sm:text-2xl text-gray-300 relative tracking-wider">NEW ARRIVAL</p>
        <div className="px-6 object-center flex grid grid-cols-4 place-items-center">
        <div className="bg-white ">
            <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy/4fc2902f3cf3459ab9c7ace200ac6529_9366/gp3461.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>

        <div className="bg-white ">
        <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto:sensitive,fl_lossy/5d761eaad4b143ddacc1ac650023afaa_9366/quiccs-tee-2.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>        
        <div className="bg-white ">
        <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto:sensitive,fl_lossy/0a57156c8dc8411fa637acb7010fa68e_9366/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B8%A5%E0%B8%B2%E0%B8%A2-primeblue-for-the-oceans-icons.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>        
        <div className="bg-white ">
        <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto:sensitive,fl_lossy/486e5058ad29416884efac5a0010db44_9366/%E0%B8%81%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%AD%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B8%87.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>

            
            
        </div>
        <div className="px-6 object-center flex grid grid-cols-4 place-items-center">
        <div className="bg-white ">
            <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/9378f69e4f364eaf9d96ac9400be64a6_9366/adidas_Own_The_Run_Primeblue_GM1526_21_model.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>
        <div className="bg-white ">
        <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/c3957ba827064d7284f5acf3015b5870_9366/TEE_DRESS_H56457_21_model.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>        
        <div className="bg-white ">
        <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/21fefa3475ec4ca09706acd700d956fd_9366/3_STRIPES_SHORT_H56441_21_model.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>        
        <div className="bg-white ">
        <img className="p-4 overflow-hidden cursor-pointer object-cover " src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/87ea94bcf32146bebaa5aca100f38250_9366/HER_Studio_London_GN8118_21_model.jpg" alt="" width="900" />
            <p className="px-4 text-center font-primary3 text-sm break-all" >Men's Charged Cotton® 6" Boxerjock® – 3-Pack</p>
            <p className="px-4 text-center font-primary2 text-sm break-all" >฿ 1,990.00</p>
        </div>

        

            
            
        </div>
        <div>
        <p  className=" font-primary2 text-center text-3xl mt-8 sm:text-2xl text-gray-300 relative tracking-wider">SHOP BY BRAND</p>
        <div className="px-24 flex grid grid-cols-6 h-96 mt-8 ">
            
            <div><img className="test h-96 object-cover cursor-pointer hover:opacity-50 " src="pics\50092713xlarge.jpg" alt="" />
            <span className="test block hover:hidden">ADIDAS</span></div>
            <img className="h-96 object-cover cursor-pointer" src="pics\54079813xlarge.jpg" alt="" />
            <img className="h-96 object-cover cursor-pointer" src="pics\newbalance_mt83530_front_lg.jpg" alt="" />
            <img className="h-96 object-cover cursor-pointer" src="pics\fila-WhiteNavy-Gregor-Stripe-T-shirt.jpeg" alt="" />
            <img className="h-96 object-cover cursor-pointer" src="pics\1329590100_white.jpg" alt="" />
            <img className="h-96 object-cover cursor-pointer" src="pics\Classics-Logo-Short-Sleeve-Men's-Tee.jpg" alt="" />
        </div>
            
        </div>
        
        </div>
     );
}
 
export default Home;