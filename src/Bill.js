import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreditCardInput from 'react-credit-card-input';



export default class Transaction extends Component{
    constructor(props){
        super(props);
        this.state = {
            trans:[],
            add:[],
            cart:[]
            };
                    
    }
   componentDidMount(){
       axios.get('http://localhost:5000/transaction/get/'+this.props.match.params.id)
       .then(res=>{
           this.setState({
               trans:res.data[0],
               add:res.data[0].add[0],
               cart:res.data[0].crAr
           })
           console.log(this.state.add)
       })
   }
   executer(){
       if(this.state.trans!==undefined){
        return <div className="font-primary4">
        <div>Purchase date:{this.state.trans.createdAt}</div>
        <div>Pay methods:{this.state.trans.payMet}</div>
        <div>Address name:{this.state.add.addname}</div>
        <div>Address :{this.state.add.addi1},{this.state.add.addi2}</div>
        <div>Country : {this.state.add.ctry} District : {this.state.add.district} Subdistrict : {this.state.add.sdistrict}</div>



    </div>
       }

       
   }
    render() {
        return (
            <div className="mt-20 mx-96 h-full min-h-screen border">
               <div className="bg-black text-xl text-white font-primary2 px-4 py-8">
                   Transaction Id :{this.state.trans._id}
               </div>
                {this.executer()}
                
            </div>

            
        )
    }
}
