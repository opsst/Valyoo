import ReactDOM from 'react-dom'
import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { browserHistory } from 'react-router'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


const AddressDetail = props=>(
    <div  className="border border-black mb-4 p-4 hover:bg-black hover:text-white ">
        <div className="font-primary2 text-xl uppercase flex relative">
            {props.detail.addname}
        <svg className="w-6 h-6 absolute right-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
        <svg class="w-6 h-6 absolute right-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </div>
        <div className="mt-3">
            {props.detail.fn} {props.detail.ln},{props.detail.addi1}
        </div>
        <div>
            {props.detail.ctry}, {props.detail.pvince}, {props.detail.district}, {props.detail.sdistrict}
        </div>
        <div>
            {props.detail.pstcode}
        </div>
        <div>
            {props.detail.phnum}
        </div>
    </div>
    
)

export default class Book extends Component{
    
    constructor(props){
        
        
        super(props);
        // this.onchangefn = this.onchangefn.bind(this)
        // this.onchangeln = this.onchangeln.bind(this)
        // this.onchangeaddname = this.onchangeaddname.bind(this)
        // this.onchangeaddi1 = this.onchangeaddi1.bind(this)
        // this.onchangeaddi2 = this.onchangeaddi2.bind(this)
        // this.onchangedistrict = this.onchangedistrict.bind(this)
        // this.onchangesdistrict = this.onchangesdistrict.bind(this)
        // this.onchangepstcode = this.onchangepstcode.bind(this)
        // this.onchangephnum = this.onchangephnum.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
           this.showAddress = this.showAddress.bind(this)
           this.haveAddress = this.haveAddress.bind(this)
        
    
        this.state = {
            address:[],
            isAddress:false

        };
    }
    componentDidMount(){
        const accessTokenObj = localStorage.getItem("token");
        const x = accessTokenObj
        const myHeaders = new Headers();
              myHeaders.append("Authorization", x)
              myHeaders.append("Content-Type","application/json")
        axios.get('http://localhost:5000/address/get',{headers:{Authorization:x}})
        .then(res=>{
            console.log(res.data)
            if(res.data.length!==0){
                this.setState({
                    address:res.data,
                    isAddress:true
                })
            }
            console.log(this.state.isAddress)
            this.forceUpdate();
            
            // this.setState({
            // toId:res.data._id
            // })
        })
        // fetch('http://localhost:5000/address/get',{
        // method:'get',
        // headers :myHeaders,
        // }).then(res => {
        //     console.log(res.product)
        //     this.setState({
        //         address:res
        //     })
        // }
        //     )
    }
    haveAddress(){
        return this.state.address.map(current=>{
            console.log(current)
            return <AddressDetail detail={current} />
        })
    }
    showAddress(){

            if(this.state.isAddress===true){
                return(<div className="m-8">{this.haveAddress()}</div> )
            }
            else{
                return(<div className="w-full h-12 py-3 uppercase text-center text-white bg-black">You don't have any address please add before checkout.</div>)
            }


    }


    render() {
        return (
            <div className="grid grid-cols-3 mx-48 my-12 font-primary4">
                <div className="col-span-2 px-36 grid">
                <div className="font-primary2 text-3xl uppercase mb-4 flex relative">your address book
                <Link to={"/address/"+this.props.match.params.id}>
                <div className="right-0 text-xs absolute flex">
                    ADD Address
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                </div>
                </Link>
                </div>
                    {this.showAddress()}
                  {/* {!this.isAddress&&<div className="w-full text-center bg-">You don't have any address please add before checkout</div>}
                  {this.isAddress&&<div>Yey</div>} */}
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


