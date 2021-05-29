import { Link, useHistory } from 'react-router-dom';
import React ,{ Component } from 'react';
import axios from 'axios';
// import { useHistory } from "react-router-dom";

export default class User extends Component{
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',        
        }
    }

    
        onChangeEmail(e) {
            this.setState({
              email: e.target.value
            })
        }
        onChangePassword(e) {
            this.setState({
              password: e.target.value
            })
        }
        onSubmit(e) {
            e.preventDefault();
            // window.axios = axios.create({
            //     baseURL: '/user',
            //     timeout: 10000,
            //     headers:{
            //         'X-Requested-With': 'XMLHttpRequest',
            //         // 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
            //         'Authorization': 'Bearer ' + localStorage.getItem('token')
            //     }
            // })
            // const history = useHistory();
            const user = {
              email: this.state.email,
              password: this.state.password,
            }
        
            // console.log(user);
    
            axios.post('http://localhost:5000/users/signin',user)
            .then(res => {
                const x = 'Bearer ' + res.data.token
                console.log(x)
                localStorage.setItem('token',x);
                // window.location.reload();
                // setTimeout(function() { localStorage.clear(); console.log('clear!'); window.location.reload(); }, (7200)); // 24 hours
                // window.axios.defaults.headers.common['Authorization'] = 'Berrer ' + localStorage.getItem('token');
                console.log('sucsess')
                if(localStorage.getItem('url')){
                    const accesslocationObj = localStorage.getItem("url");
                    window.location = accesslocationObj
                }
                else{
                    window.location = '/';
                }

            });
            this.setState({
                email: '',
                password: '',        
            })
            
    
        }
        render(){
            return ( 
                <div className="mt-36 ml-96 p-8 max-w-8xl w-full flex">
                    <div className="ml-12">
                    <div className="pb-8 font-primary2 text-6xl">
                        CUSTOMER <br></br>LOGIN
                    </div>
                    <form action="" onSubmit={this.onSubmit}>
                        <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mt-4 my-6 font-primary3 text-grey-500" type="text" placeholder="Email Address" value={this.state.email} onChange={this.onChangeEmail} required/>
                        <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 font-primary3 text-grey-500" type="Password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} required/>
                        <button className="rounded-none shadow bg-gray-400 hover:bg-gray-700 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">LOGIN</button>
                        <label class="inline-flex items-center mt-3">

            </label>
                        
                    </form>
                    </div>
                    <div className="mx-36 my-20 p-6 bg-gray-200 max-h-80 h-full font-primary4">
                    <div className=" font-primary2 text-2xl mb-6">
                        NEW CUSTOMER?
                    </div>
                    <p className=" ">
                    Create an account with us and you'll be able to:
        
                    </p>
                    <ul className="list-inside mt-1">
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>Check out faster</li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>Save multiple shipping addresses</li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>Access your order history</li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>Track new orders</li>
                    </ul>
                    <Link to="/register">
                        <button className="shadow rounded-none bg-gray-400 hover:bg-gray-700 mt-10 text-white font-bold py-4 px-36 font-primary focus:outline-none focus:shadow-outline">REGISTER</button>
                    </Link>
                    </div>
                </div>
             );
        }
}
// const User = () => {

// }
 
// export default User;