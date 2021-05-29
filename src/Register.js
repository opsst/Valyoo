import React ,{ Component } from 'react';
import axios from 'axios';

export default class Register extends Component{
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',        
        }
    }
    onChangeFirstname(e) {
        this.setState({
          firstname: e.target.value
        })
      }
    onChangeLastname(e) {
        this.setState({
          lastname: e.target.value
        })
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
    
        const user = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
        }
    
        console.log(user);

        axios.post('http://localhost:5000/users/register',user)
        .then(res => console.log(res.data));
    
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',        
        })
        window.location = '/user';

    }

    render() {
        return (
            <div className= "flex h-screen ">
             <div className="m-auto mt-12">
             <div className="pb-8 font-primary2 text-6xl text-center">
                 REGISTER
             </div>
             <form className="max-w-lg" action="" onSubmit={this.onSubmit}>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 mt-8 font-primary3 text-grey-500" type="text" placeholder="Firstname" value={this.state.firstname}
                    onChange={this.onChangeFirstname} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Lastname" value={this.state.lastname}
                    onChange={this.onChangeLastname} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="email" placeholder="Email" value={this.state.email}
                    onChange={this.onChangeEmail} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3  font-primary3 text-grey-500" type="Password" placeholder="Password" value={this.state.password}
                    onChange={this.onChangePassword} required/>
                 <input type="checkbox" class="form-checkbox mt-8" required />
                 <span class="ml-2">I agree to the <span class="underline">privacy policy<br></br></span></span>
                 <button className=" rounded-none shadow bg-gray-400 hover:bg-gray-700 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">Register</button>
                
             </form>
             <div></div>
             </div>
         </div>
        )
    }

}

// const Register = () => {
//     return ( 
//                 <div className= "flex h-screen ">
//             <div className="m-auto mt-12">
//             <div className="pb-8 font-primary2 text-6xl text-center">
//                 REGISTER
//             </div>
//             <form className="max-w-lg" action="">
//                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 mt-8 font-primary3 text-grey-500" type="text" placeholder="Firstname"  required/>
//                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="email" placeholder="Lastname"  required/>
//                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="Password" placeholder="Email"  required/>
//                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3  font-primary3 text-grey-500" type="Password" placeholder="Password"  required/>
//                 <input type="checkbox" class="form-checkbox mt-8" />
//                 <span class="ml-2">I agree to the <span class="underline">privacy policy<br></br></span></span>
//                 <button className=" rounded-none shadow bg-gray-400 hover:bg-gray-700 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">Register</button>
                
//             </form>
//             </div>
//         </div>
//      );
// }
 
// export default Register;