import ReactDOM from 'react-dom'
import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { browserHistory } from 'react-router'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';




export default class Address extends Component{
    
    constructor(props){
        
        
        super(props);
        this.onchangefn = this.onchangefn.bind(this)
        this.onchangeln = this.onchangeln.bind(this)
        this.onchangeaddname = this.onchangeaddname.bind(this)
        this.onchangeaddi1 = this.onchangeaddi1.bind(this)
        this.onchangeaddi2 = this.onchangeaddi2.bind(this)
        this.onchangedistrict = this.onchangedistrict.bind(this)
        this.onchangesdistrict = this.onchangesdistrict.bind(this)
        this.onchangepstcode = this.onchangepstcode.bind(this)
        this.onchangephnum = this.onchangephnum.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        
    
        this.state = {
            ctry: '',
            pvince: '' ,
            addname:'',
            fn:'',
            ln:'',
            addi1:'',
            addi2:'',
            district:'',
            sdistrict:'',
            pstcode:'',
            phnum:''

        };
    }
    selectCountry (val) {
      this.setState({ ctry: val });
    }
  
    selectRegion (val) {
      this.setState({ pvince: val });
    }
    onchangefn (e){
      this.setState({
          fn: e.target.value
      })
    }
    onchangeln (e){
      this.setState({
        ln: e.target.value
      })
    }
    onchangeaddname (e){
      this.setState({
        addname: e.target.value
      })
    }
    onchangeaddi1 (e){
      this.setState({
        addi1: e.target.value
      })
    }
    onchangeaddi2 (e){
      this.setState({
        addi2: e.target.value
      })
    }
    onchangedistrict (e){
      this.setState({
        district: e.target.value
      })
    }
    onchangesdistrict (e){
      this.setState({
        sdistrict: e.target.value
      })
    }
    onchangepstcode (e){
      this.setState({
        pstcode: e.target.value
      })
    }
    onchangephnum (e){
      this.setState({
        phnum: e.target.value
      })
    }
    onSubmit(e){

      const accessTokenObj = localStorage.getItem("token");
      const x = accessTokenObj
      const myHeaders = new Headers();
            myHeaders.append("Authorization", x)
            myHeaders.append("Content-Type","application/json")
            const address = {
              "ctry": this.state.ctry,
              "pvince": this.state.pvince ,
              "addname":this.state.addname,
              "fn":this.state.fn,
              "ln":this.state.ln,
              "addi1":this.state.addi1,
              "addi2":this.state.addi2,
              "district":this.state.district,
              "sdistrict":this.state.sdistrict,
              "pstcode":this.state.pstcode,
              "phnum":this.state.phnum
            }
      console.log(address)
      fetch('http://localhost:5000/address/add',{
              method:'Post',
              headers :myHeaders,
              body : JSON.stringify(address)
            })
    }


    render() {
        return (
            <div className="grid grid-cols-3 mx-72 my-12 font-primary4">
                <div className="col-span-2 px-12 border border-black py-12 grid">
                  <div className="font-primary2 text-3xl">ADD ADDRESS</div>
                  <form onSubmit={this.onSubmit}>
                  <div className="flex">
                  <div className="relative w-1/3 sm:w-full">
                 <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">address name</label>
                 <input className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangeaddname} value={this.state.addname} type="text"></input>
                </div>
                </div>
                  <div className="flex">
                  <div className="relative w-1/3 sm:w-full">
                 <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">country</label>
                <CountryDropdown className="rounded-none appearance-none border border-r-0 border-gray-500 w-full px-2 pt-5 py-3 mt-8 font-primary3 text-grey-500" value={this.state.ctry} onChange={(val) => this.selectCountry(val)} />
                </div>
                <div className="w-1/3 relative sm:w-full">
                 <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">province</label>
                <RegionDropdown className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" country={this.state.ctry} value={this.state.pvince} onChange={(val) => this.selectRegion(val)} />

                </div>
                </div>
                <div className="flex">
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">district</label>
                 <input className="rounded-none appearance-none border border-r-0 border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangedistrict} value={this.state.district} type="text"></input>
                </div>
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">subdistrict</label>
                 <input className="rounded-none appearance-none border border-r-0 border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangesdistrict} value={this.state.sdistrict} type="text"></input>
                </div>
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">postcode</label>
                 <input className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangepstcode} value={this.state.pstcode} type="text"></input>
                </div>
                </div>
                <div >
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">Address 1</label>
                 <input className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-12 mt-8 font-primary3 text-grey-500" onChange={this.onchangeaddi1} value={this.state.addi1} type="text"></input>
                </div>
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">Address 2</label>
                 <input className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangeaddi2} value={this.state.addi2} type="text"></input>
                </div>
                <div className="flex">
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">firstname</label>
                 <input className="rounded-none appearance-none border border-r-0 border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangefn} value={this.state.fn} type="text"></input>
                </div>
                <div className="w-1/3 relative sm:w-full">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">lastname</label>
                 <input className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangeln} value={this.state.ln} type="text"></input>
                </div>
                </div>
                <div className="w-1/3 relative sm:w-1/3">
                <label for="fn" className="absolute top-6 ml-2 bg-black px-2 font-primary2 uppercase text-white">phone number</label>
                 <input className="rounded-none appearance-none border border-gray-500 w-full px-4 pt-5 py-3 mt-8 font-primary3 text-grey-500" onChange={this.onchangephnum} value={this.state.ph} type="text"></input>
                </div>
                </div>
                <button className=" rounded-none shadow bg-gray-800 hover:bg-black my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">ADD</button>
                </form>
                </div>


                
                <div className="pl-16">
                    <Link to={"/profile/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">My Account</div>
                    </Link>
                    <br></br>
                    <Link to={"/personal/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">Personal Information</div>
                    </Link>
                    <br></br>
                    <Link to={"/book/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 bg-black text-white inline-block border-2 border-black hover:border-black hover:border-2">Address Book</div>
                    </Link>
                    <br></br>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">Order History</div>

                </div>
                
              
            </div>
        )
    }
}


