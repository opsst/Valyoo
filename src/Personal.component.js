import ReactDOM from 'react-dom'
import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { browserHistory } from 'react-router'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';



export default class Personal extends Component{
    
    constructor(props){
        
        
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYears = this.onChangeYears.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    
        this.state = {
            user:[],
            firstname:'',
            lastname:'',
            bday:1,
            bmonth:1,
            byear:2021

        };
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
    onChangeDay(e) {
        this.setState({
          bday: e.target.value
        })
    }
    onChangeMonth(e) {
        this.setState({
          bmonth: e.target.value
        })
    }
    onChangeYears(e) {
        this.setState({
          byear: e.target.value
        })
    }
    deleteAccount(e){
        confirmAlert({
            title: 'Are you sure to delete this account?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {

                    axios.delete('http://localhost:5000/users/d/'+this.props.match.params.id)
                    .then(res => console.log(res.data));
                    localStorage.clear();
                    window.location = '/';
                }
              },
              {
                label: 'No',
                onClick: () => console.log('nothings')
              }
            ]
          });
    }
    onSubmit(e) {
        e.preventDefault();
    


        confirmAlert({
            title: 'UPDATE YOUR PERSONAL INFORMATION?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    const user = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    bday: this.state.bday,
                    bmonth: this.state.bmonth,
                    byear: this.state.byear
                    }
                
                    console.log(user);

                    axios.post('http://localhost:5000/users/q/'+this.props.match.params.id,user)
                    .then(res => console.log(res.data));
                
                    window.location = '/personal/'+this.props.match.params.id;
                }
              },
              {
                label: 'No',
                onClick: () => console.log('nothing')
              }
            ]
          });

    }

    componentDidMount(){
        const accessTokenObj = localStorage.getItem("token");
        const x = accessTokenObj
        axios.get('http://localhost:5000/users/protected/',{headers:{Authorization:x}})
        .then(res=>{
            console.log(res.data)
            this.setState({
                user:res.data,
                firstname:res.data.firstname,
                lastname:res.data.lastname,
                bday:res.data.bday,
                bmonth:res.data.bmonth,
                byear:res.data.byear
            })
        })


    }
    render() {
        return (
            <div className="grid grid-cols-3 mx-48 my-12 font-primary4">
                <div className="col-span-2 relative px-6 border border-black py-6">
                <form className="max-w-lg" onSubmit={this.onSubmit} >
                <div className="font-primary2 text-xl">YOUR INFORMATION</div>
                <div className="relative">
             <label for="fn" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white">FIRST NAME</label>
             <label for="fn" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>
                 <input id="fn" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" type="text" value={this.state.firstname} onChange={this.onChangeFirstname} required/>
                    </div>
                    <div className="relative mt-8 mb-2">
             <label for="ln" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">Last name</label>
             <label for="ln" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>
             <input id="ln" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="text" value={this.state.lastname} onChange={this.onChangeLastname} required/>
                    </div>
<div className="font-primary2 text-xl mt-4">DATE OF BIRTH</div>
                <div className="grid grid-cols-3">
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">DD</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="Number" placeholder="DD" min="1" max="31" onChange={this.onChangeDay} value={this.state.bday}
                    onChange={this.onChangeDay} required/>
                    </div>
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">MM</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 border-l-0 w-full px-4 pt-5 py-3 font-primary3 text-grey-500" type="Number" placeholder="MM" min="1" max="12" onChange={this.onChangeMonth} value={this.state.bmonth}
                    onChange={this.onChangeMonth} required/>
                    </div>
                    <div className="relative mt-8">
             <label for="em" className="absolute bottom-11 ml-2 bg-black px-2 font-primary2  text-white uppercase">YYYY</label>
             <label for="em" className="absolute bottom-7 right-0  px-2 font-primary text-xl text-red-500">*</label>

             <input id="em" className="rounded-none appearance-none border border-gray-500 border-l-0 w-full px-4 pt-5 py-3 font-primary3 text-grey-500"  type="Number" placeholder="YYYY" min="1950" max="2021" onChange={this.onChangeYears} value={this.state.byear}
                    onChange={this.onChangeYears} required/>
                    </div>
                    </div>
                 <button className=" rounded-none shadow bg-gray-800 hover:bg-black my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">UPDATE</button>

             </form>
                    <div onClick={this.deleteAccount} className="text-xs mt-8 underline inline-block cursor-pointer hover:bg-black hover:text-white">DELETE ACCOUNT</div>
                </div>
                
                <div className="pl-16">
                    <Link to={"/profile/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">My Account</div>
                    </Link>
                    <br></br>
                    <Link to={"/personal/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 bg-black text-white inline-block border-2 border-black hover:border-black hover:border-2">Personal Information</div>
                    </Link>
                    <br></br>
                    <Link to={"/book/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">Address Book</div>
                    </Link>
                    <br></br>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">Order History</div>

                </div>
                

            </div>
        )
    }
}


