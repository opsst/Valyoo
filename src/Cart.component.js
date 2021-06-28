

import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { response } from 'express';

const DeleteBut = props=>(
    <div>
            <button onClick={props.delfunc.bind(this,props.obj)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute right-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg></button>
    </div>
)

const Cartlist = props =>(

    <div className="flex text-sm ">

      <Link to={"/product/"+props.datas._id}><img className=" w-48 h-48 object-cover justify-self-end " src={props.img} /></Link>
      
      <div className="ml-4 ">

          <Link to={"/product/"+props.datas._id}><div className="font-primary2 text-left uppercase">{props.datas.pname}</div></Link>
          
          <div className="font-primary4 uppercase">{props.datas.pbrand} {props.datas.pdesc}</div>
          <div className="font-primary3 ">{props.datas.ptcolor[props.position]}</div>
          <div className="flex">
          
          <form className="relative " onChange={props.changeQ.bind(this,props)}>
          <select className="rounded-none appearance-none border w-24 px-1 py-3 mb-6 font-primary3 text-xs ">         
          {/* <option value="1" selected >1</option> */}
                {props.formQuan(props.pureData)}
                </select> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute top-3 left-16 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
</svg>
          </form>
          <div className="font-primary3 px-1 py-3 mb-6 ">SIZE: {props.size}</div>
          </div>

          <div className="font-primary text-base">฿{props.datas.pprice*props.pureData.qunt}</div>
          
      </div>
      
      </div>

)

export default class ViewProduct extends Component{
    constructor(props){
        super(props);
        this.toTransaction = this.toTransaction.bind(this);
        this.Counter = this.Counter.bind(this);
        this.ChangeQuan = this.ChangeQuan.bind(this);
        this.onClicker = this.onClicker.bind(this);
        this.showCartlist = this.showCartlist.bind(this);
        this.findQuan = this.findQuan.bind(this);
        this.state = {
            cart:[],
            test:[],
            tItem:0,
            tTotal:0,
            tDeli:0,
            inCart:false
            };
                    
    }
    componentDidMount(){
        const accessTokenObj = localStorage.getItem("token");
        const x = accessTokenObj
        // fetch('http://localhost:5000/cart/'+this.props.match.params.id,{
        //     method:'Get',
        //     headers : myHeaders
        // })
        // .then(res => console.log(res.data))
        axios.get('http://localhost:5000/cart/'+this.props.match.params.id,{headers:{Authorization:x}})
        .then(res=>{
            // console.log(res)
            this.setState({
                cart:res.data
            })
            for(let x=0; x<this.state.cart.length; x++){

                axios.get('http://localhost:5000/product/'+this.state.cart[x].prId)
                .then(res=>{

                    console.log(res)
                    axios.post('http://localhost:5000/cart/'+this.state.cart[x]._id,res.data)
                    .then(res=>{
                        console.log(res)
                        const accessTokenObj = localStorage.getItem("token");
                        const x = accessTokenObj
                        axios.get('http://localhost:5000/cart/'+this.props.match.params.id,{headers:{Authorization:x}})
                        .then(res=>{
                            this.setState({
                                cart:res.data
                            })
                            if(this.state.cart.length!==0){
                                this.setState({
                                    inCart:true
                                })
                            }
                            this.Counter()
                        })
                    })
                })
            }
            
        })
        
        
    }
    ChangeQuan(obj,e){
        // console.log(e.target.value,obj.pureData._id )
        axios.post('http://localhost:5000/cart/q/'+obj.pureData._id,{qunt:e.target.value})
        window.location.reload();
      
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

    findQuan(obj){
    for (let i=0;i<obj.prAr.pquan.length;i++){
        if(obj.prAr.pquan[i][0]===obj.prsize){
            let optionList = obj.prAr.pquan[i][obj.prcolor+1]
            let arrayList = []
            for(let j=1;j<=optionList;j++)
            {
                arrayList.push(j)
                if(j===10){
                    break;
                }

            }
            // console.log(arrayList)
            return arrayList.map(currentList=>{
                // console.log(currentList)
                if(obj.qunt===currentList){
                    return <option value={currentList} selected>{currentList}</option>
                }
                return <option value={currentList} >{currentList}</option>
            })
            
        }
    }
    
    


        // console.log()
        // console.log(obj.qunt,obj.prsize,obj.prcolor,obj.prId[0][0].pquan[0][0])
        // let thsize = ''
        // for(let x=0; x< obj.prId[0][0].pquan.length;x++){
        //     if(obj.prId[0][0].pquan[x][0]===obj.prsize)
        //     {
        //         thsize = obj.prId[0][0].pquan[x]
        //         break;
        //     }
        // }
        // console.log(thsize)

    }
    onClicker(obj){
        const accessTokenObj = localStorage.getItem("token");
        const x = accessTokenObj
        const myHeaders = new Headers();
              myHeaders.append("Authorization", x)
              myHeaders.append("Content-Type","application/json")
        axios.delete('http://localhost:5000/cart/'+obj,{headers:{Authorization:x}})
        window.location.reload();
    }
    toTransaction(){
        let x = this.props.match.params.id
        localStorage.setItem('checkout',x);
        window.location = '/checkout'

    }
    showCartlist(){
        if(this.state.cart!==undefined){
            // console.log(this.state.cart[0].prId[0][0].pimg[this.state.cart[0].prcolor][0])
            return this.state.cart.map(currentobj=>{
                
                return <div className="m-2 p-0 mr-96 pr-64 border-b-2 w-full pb-6 mb-6 relative">

                            <DeleteBut delfunc={this.onClicker} obj={currentobj._id} />
                            <Cartlist changeQ={this.ChangeQuan} img={currentobj.prAr.pimg[currentobj.prcolor][0]} size={currentobj.prsize} datas={currentobj.prAr} formQuan={this.findQuan} pureData={currentobj} position={currentobj.prcolor}/>
                    </div>
            })}
    
    }

    render() {
        return (
            <div className="mt-20 mx-96 h-full flex">
                {/* <button onClick={this.showCartlist} >test</button> */}
                {!this.state.inCart&&<div className="font-primary2 text-6xl">YOUR CART IS EMPTY<br></br><div className="text-lg ml-2 mt-4">Once you add something to your bag - it will appear here. Ready to get started?</div><br></br>
                <Link to="/"> <button className="px-4 inline font-primary4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-black active:bg-blue-600 hover:bg-blue-700 uppercase">get started</button>
                  </Link></div>}
                {this.state.inCart&&<div className="font-primary2">
                    <div className="font-primary2 text-3xl px-2">CART</div>
                    <div className="font-primary3 text-sm px-2 mb-4">Total ({this.state.tItem} items)</div>
                
                    {this.showCartlist()}
                </div>}
                {this.state.inCart&&<div className="w-full h-52 border py-4 px-4 ml-8 mt-16 font-primary2 text-xl">ORDER SUMMARY
                <div className="font-primary4 text-sm my-2 flex text-left overflow-clip">{this.state.tItem}<div className="ml-1">ITEM</div><div className=" w-full text-right">฿{this.state.tTotal}</div></div>
                <div className="font-primary4 text-sm my-2 flex text-left overflow-clip">DELIVERIES<div className=" w-full text-right">฿{this.state.tDeli}</div></div>
                <div className="font-primary2 text-base mt-14 flex text-left overflow-clip">TOTAL<div className=" w-full text-right">฿{this.state.tTotal+this.state.tDeli}</div></div>
                <div className="bg-black shadow text-white rounded-full py-5 px-6 mt-12 md:bg-orange text-center cursor-pointer font-primary text-base" onClick={this.toTransaction}>CHECK OUT</div>
                </div>}

                

                    
                
            </div>
            
        )
    }
}


