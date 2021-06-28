import { Link } from 'react-router-dom';
const Notpage = () => {
    return ( 
        <div className=" h-5/6 my-32 flex items-center font-primary2">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                   <div className="max-w-md">
                      <div className="text-5xl font-dark font-bold">404</div>
                    <p
                      className="text-2xl md:text-3xl font-light "
                    >Sorry we couldn't find this page. </p>
                  <p className="mt-4 mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
                  
                  <Link to="/"> <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700 uppercase">back to homepage</button>
                  </Link>
            </div>
              <div className="max-w-lg">
            </div>
            
          </div>
        </div> );
}
 
export default Notpage;