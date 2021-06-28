import React ,{ Component } from 'react';
import axios from 'axios';

export default class Register extends Component{
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYears = this.onChangeYears.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',        
            day:1,
            month:1,
            years:2021,
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
    onChangeDay(e) {
        this.setState({
          day: e.target.value
        })
    }
    onChangeMonth(e) {
        this.setState({
          month: e.target.value
        })
    }
    onChangeYears(e) {
        this.setState({
          years: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
    
        const user = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          bday: this.state.day,
          bmonth: this.state.month,
          byear: this.state.years
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
                 <div className="font-primary2 text-xl">YOUR INFORMATION</div>
             <div className="relative">
             <label for="fn" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white">FIRST NAME</label>
             <label for="fn" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>
                 <input id="fn" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" type="text" value={this.state.firstname}
                    onChange={this.onChangeFirstname} required/>
                    </div>
            <div className="relative mt-8 mb-2">
             <label for="ln" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">Last name</label>
             <label for="ln" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>
             <input id="ln" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="text" value={this.state.lastname}
                    onChange={this.onChangeLastname} required/>
                    </div>
                    {/* <div className="relative mt-8 ">
             <label for="ln" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">GENDER</label>
             <label for="ln" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>
             <div className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500">
             <input className="mr-2" type="radio" id="age1" name="age" value="men"/>
            <label className="mr-6" for="age1">MALE</label>
            <input className="mr-2" type="radio" id="age1" name="age" value="women"/>
            <label className="mr-6" for="age1">FEMALE</label>
            <input className="mr-2" type="radio" id="age1" name="age" value="other"/>
            <label className="mr-6" for="age1">OTHER</label>
            </div>
                    </div> */}
                 <div className="font-primary2 text-xl mt-4">LOGIN DETAILS</div>

            <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">email</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="email" value={this.state.email}
                    onChange={this.onChangeEmail} required/>
                    </div>
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">password</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500"  type="Password" value={this.state.password}
                    onChange={this.onChangePassword}  required/>
                    </div>
                    <div className="font-primary2 text-xl mt-4">DATE OF BIRTH</div>
                <div className="grid grid-cols-3">
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">DD</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="Number" placeholder="DD" min="1" max="31" value={this.state.day}
                    onChange={this.onChangeDay} required/>
                    </div>
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">MM</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 border-l-0 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="Number" placeholder="MM" min="1" max="12" value={this.state.month}
                    onChange={this.onChangeMonth} required/>
                    </div>
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">YYYY</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 border-l-0 w-full px-4 pt-5 py-3 font-primary3 text-grey-500"  type="Number" placeholder="YYYY" min="1950" max="2021" value={this.state.years}
                    onChange={this.onChangeYears} required/>
                    </div>
</div>

                 <input type="checkbox" class="form-checkbox mt-8" required />
                 <span class="ml-2 text-xs ">I agree that I have read and accepted Terms & Conditions and the valyoo <span class="underline text-red-500">privacy policy.<br></br></span></span>
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