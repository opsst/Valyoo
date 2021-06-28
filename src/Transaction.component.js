import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreditCardInput from 'react-credit-card-input';

const AddressDetail = props=>(
    <div  className="border border-black mb-4 p-4 hover:bg-black hover:text-white ">
        
        <div className="font-primary2 text-xl uppercase flex relative">
            {props.detail.addname}
        <svg className="w-4 h-4 absolute right-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
        <input onChange={props.choosing} className="absolute right-0 text-green-600" type="radio" name="address" value={props.detail._id}></input>
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

const Cartlist = props =>(

    <div className="flex text-xs ">

      <Link to={"/product/"+props.datas._id}><div className="w-20 h-20 mt-1"><img className=" w-full object-cover justify-self-end " src={props.img} /></div></Link>
      
      <div className="ml-4 ">

          <Link to={"/product/"+props.datas._id}><div className="font-primary2 text-left uppercase">{props.datas.pname}</div></Link>
          
          <div className="font-primary4 uppercase">{props.datas.pbrand} {props.datas.pdesc}</div>
          <div className="font-primary3 ">{props.datas.ptcolor[props.position]}</div>
          
          <div className="font-primary3 py-1">QUANTITY: {props.pureData.qunt} /SIZE: {props.size}</div>

          <div className="font-primary text-xs">฿{props.datas.pprice*props.pureData.qunt}</div>
          
      </div>
      
      </div>

)


export default class Transaction extends Component{
    constructor(props){
        super(props);

        this.showAddress = this.showAddress.bind(this)
        this.haveAddress = this.haveAddress.bind(this)
        this.chooseAdd = this.chooseAdd.bind(this)
        this.Delifree = this.Delifree.bind(this)
        this.changePay = this.changePay.bind(this)
        this.handleCardNumberChange  = this.handleCardNumberChange.bind(this)
        this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this)
        this.handleCardCVCChange = this.handleCardCVCChange.bind(this)
        this.toPlaceorder = this.toPlaceorder.bind(this)
        this.state = {
            cart:[],
            address:[],
            isAddress:false,
            chooseID:"",
            cusId:"",
            tItem:0,
            tTotal:0,
            tDeli:0,
            pmeth:"",
            isCard:false,
            cardNumber:"",
            expiry:"",
            cvc:"",
            useaddress:[],
            ram:[]

            };
                    
    }
    componentDidMount(){
        const accessTokenObj = localStorage.getItem("token");
        const accessCheckout = localStorage.getItem("checkout")
        const x = accessTokenObj
        const checkout = accessCheckout
        this.setState({
            cusId:checkout
        })
        // fetch('http://localhost:5000/cart/'+this.props.match.params.id,{
        //     method:'Get',
        //     headers : myHeaders
        // })
        // .then(res => console.log(res.data))
        axios.get('http://localhost:5000/cart/'+checkout,{headers:{Authorization:x}})
        .then(res=>{
            console.log(res.data)
            this.setState({
                cart:res.data
            })
            for(let x=0; x<this.state.cart.length; x++){

                axios.get('http://localhost:5000/product/'+this.state.cart[x].prId)
                .then(res=>{

                    console.log(this.state.cart[x]._id)
                    axios.post('http://localhost:5000/cart/'+this.state.cart[x]._id,res.data)
                    .then(res=>{
                        console.log(res)
                        const accessTokenObj = localStorage.getItem("token");
                        const x = accessTokenObj
                        axios.get('http://localhost:5000/cart/'+checkout,{headers:{Authorization:x}})
                        .then(res=>{ 
                            console.log(res)
                            this.setState({
                                cart:res.data
                            })
                            this.Counter()
                        })
                    })
                })
            }
            
        })
        console.log(this.state.cart)
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
        
    }
    Counter(){
        let Total = 0
        let Deli = 0
        let TotalItem = 0
        for(let x=0; x<this.state.cart.length;x++){
            Total = Total+(this.state.cart[x].prAr.pprice*this.state.cart[x].qunt)
            TotalItem = TotalItem + this.state.cart[x].qunt
        }
        console.log(Total)
        if(Total<3500){
            Deli = 150
        }
        this.setState({
            tItem:TotalItem,
            tTotal:Total,
            tDeli:Deli
        })
    }
    haveAddress(){
        return this.state.address.map(current=>{
            // console.log(current)
            return <AddressDetail detail={current} choosing={this.chooseAdd} />
        })
    }
    showAddress(){

            if(this.state.isAddress===true){
                return(<div className="m-4">{this.haveAddress()}</div> )
            }
            else{
                return(<div className="w-full h-12 py-3 my-4 uppercase text-center text-white bg-black">You don't have any address please add before checkout.</div>)
            }


    }   
    chooseAdd(e){
        
        console.log(e.target.value)
        this.setState({
            chooseID:e.target.value
        })
    }
    Delifree(){
        if(this.state.tDeli===0){

            return "Free"
        }
        else{
            return ("฿"+this.state.tDeli)
        }
    }
    showCartlist(){
        if(this.state.cart!==undefined){
            // console.log(this.state.cart[0].prId[0][0].pimg[this.state.cart[0].prcolor][0])
            return this.state.cart.map(currentobj=>{
                
                return <div className="mt-2">

                            <Cartlist img={currentobj.prAr.pimg[currentobj.prcolor][0]} size={currentobj.prsize} datas={currentobj.prAr} pureData={currentobj} position={currentobj.prcolor}/>
                    </div>
            })}
    
    }
    changePay(e){
        console.log(e.target.value)
        if(e.target.value==="card"){
            this.setState({
                pmeth:e.target.value,
                isCard:true
            })
        }
        else{
            this.setState({
                pmeth:e.target.value,
                isCard:false
            })
        }

    }
    handleCardNumberChange(e){
        this.setState({
            cardNumber:e.target.value
        })
    }
    handleCardExpiryChange(e){
        this.setState({
            expiry:e.target.value
        })
    }
    handleCardCVCChange(e){
        this.setState({
            cvc:e.target.value
        })
    }
    toPlaceorder(){
        axios.delete('http://localhost:5000/cart/clear/'+this.state.cusId)
        axios.get('http://localhost:5000/address/find/'+this.state.chooseID)
        .then(res=>{
            this.setState({
                useaddress:res.data
            })
            const accessTokenObj = localStorage.getItem("token");
            const x = accessTokenObj
            const myHeaders = new Headers();
                  myHeaders.append("Authorization", x)
                  myHeaders.append("Content-Type","application/json")
                  const transaction = {
                    "crAr": this.state.cart,
                    "add": this.state.useaddress ,
                    "payMet":this.state.pmeth
                  }
            console.log(transaction)
            fetch('http://localhost:5000/transaction/add',{
                method:'Post',
                headers :myHeaders,
                body : JSON.stringify(transaction)
              })
              .then(response => response.json())
              .then(data => {
                //   let i=0;
                //   this.setState({
                //       ram:data
                //   })
                //   for(i=0;i<this.state.ram.transaction.crAr.length;i++)
                //   {
                //       axios.get('http://localhost:5000/product/'+this.state.ram.transaction.crAr[i].prId)
                //       .then(res=>{
                //           console.log(i)
                //             // console.log(this.state.ram.transaction.crAr[i])
                //           let update = res.data
                //           for(let j=0; j<update.pquan.length;j++){
                //               if(update.pquan[j][0]===this.state.ram.prsize){
                //                   console.log(update.pquan[j][0])
                //               }
                //           }
                //       })
                //       console.log(this.state.ram.transaction.crAr[i].prId)
                //   }
                  window.location = ("/transaction/"+data.transaction._id)
                });
        })



        
    }
    render() {
        return (
            <div className="mt-20 mx-96 h-full min-h-screen ">
                <div className="bg-black text-3xl text-white font-primary2 px-6 py-8">REVIEW
                <div className="font-primary4 text-base">
                    Just a few step before checkout.
                    </div></div>
                    <div className="grid grid-cols-3 font-primary ">
                        <div className="px-6 py-16 col-span-2 font-primary2 text-xl ">DELIVERY INFORMATION
                        <div className="text-xs border-b-2 pb-6">
                            <form >
                            {this.showAddress()}

                            </form>
                            <div className=" inline-block cursor-pointer hover:bg-black hover:text-white px-2">
                                <Link to={"/address/"+this.state.cusId}>
                                NEW ADDRESS?
                                </Link>
                            
                            </div>
                        </div>
                        <div className="mt-6 border-b-2 pb-6">DELIVERY METHODS
                        <div className="grid grid-cols-2">

                        <div className="mt-4 mx-5 border border-gray text-sm px-6 py-10 relative text-white bg-black cursor-pointer">STANDARD SHIPPING
                        <svg class="w-6 h-6 absolute right-2 top-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <div className="text-xs font-primary4">DHL eCommerce (Within 2-7 working days)
                        <div className="">FREE</div>
                        </div></div>
                        <div className="mt-4 mx-5 border border-gray text-sm px-6 py-10 text-gray-300">EXPRESS SHIPPING
                        <div className="text-xs font-primary4">DHL eCommerce (Within 1-2 working days)
                        <div className="">฿250</div>
                        </div></div>

                        </div>

                        </div>
                        <div className="mt-4">PAYMENT METHODS
                        <form >
                        <div className="ml-4 mt-2">
                        <input onChange={this.changePay}  className="w-4 h-4 mr-2" type="radio" name="payment" value="card"></input>
                         <label className="text-base ">Credit/Debit card</label>
                         <br></br>
                         {this.state.isCard &&<CreditCardInput
  cardNumberInputProps={{ value: this.state.cardNumber, onChange: this.handleCardNumberChange }}
  cardExpiryInputProps={{ value: this.state.expiry, onChange: this.handleCardExpiryChange }}
  cardCVCInputProps={{ value: this.state.cvc, onChange: this.handleCardCVCChange }}
  fieldClassName="input"
/>}
                        </div>
                         <div className="ml-4 mt-1">
                         <input onChange={this.changePay} className="w-4 h-4 mr-2" type="radio" name="payment" value="cash"></input>
                         <label className="text-base ">Cash on delivery</label>
                         </div>
 
                        </form>
                        </div>
                        </div>
                        <div>
                        <div className="mx-6 mt-12 px-4 pt-4 pb-12 font-primary2 text-xl h-52 border-gray-300 border">ORDER SUMMARY
                        <div className="font-primary4 text-sm my-2 flex text-left overflow-clip">{this.state.tItem}<div className="ml-1">ITEM</div><div className=" w-full text-right">฿{this.state.tTotal}</div></div>
                <div className="font-primary4 text-sm my-2 flex text-left overflow-clip">DELIVERIES<div className=" w-full text-right">{this.Delifree()}</div></div>
                <div className="font-primary2 text-base mt-14 flex text-left overflow-clip">TOTAL<div className=" w-full text-right">฿{this.state.tTotal+this.state.tDeli}</div></div></div>


                <div className="mx-6 mt-4 px-4 pt-4 pb-12 font-primary2 text-xl h-52 border-gray-300 border border-r-0 border-l-0 border-b-0">ORDER DETAIL
                        {this.showCartlist()}
                        </div>

                        </div>
                        <div className="bg-black shadow text-white py-5 px-6 ml-4 mt-12 md:bg-orange text-center cursor-pointer font-primary text-base" onClick={this.toPlaceorder}>PLACE ORDER</div>
       
                        
            
                    </div>
                
            </div>

            
        )
    }
}
