import ReactDOM from 'react-dom'
import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { browserHistory } from 'react-router'
// import { response } from 'express';

const Cartlist = props =>(


      <img className="w-40 h-40 object-cover justify-self-end pr-2 pt-2" src={props.img} />
      


)

export default class Profile extends Component{
    
    constructor(props){
        
        super(props);
        this.showCartlist = this.showCartlist.bind(this);
        this.findQuan=this.findQuan.bind(this);
    
        this.state = {
            cart:[],
        };
    }

    componentDidMount(){
        const accessTokenObj = localStorage.getItem("token");
        const x = accessTokenObj

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
                        })
                    })
                })
            }
            
        })


    }
    showCartlist(){
        if(this.state.cart!==undefined){
            // console.log(this.state.cart[0].prId[0][0].pimg[this.state.cart[0].prcolor][0])
            return this.state.cart.map(currentobj=>{
                
                return <Cartlist img={currentobj.prAr.pimg[currentobj.prcolor][0]} size={currentobj.prsize} datas={currentobj.prAr} formQuan={this.findQuan} pureData={currentobj} position={currentobj.prcolor}/>

            })}
    
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
    }
    render() {
        return (
            <div className="grid grid-cols-3 mx-48 my-12 font-primary4">
                <div className="col-span-2 relative px-4">
                        <div className="font-primary2 text-4xl ">HELLO MEMBER</div>
                        <div className="absolute top-0 right-0">Not YOU? <Link to="/signout">LOGOUT</Link></div>
                        <div className="border-black border-2 p-8 mt-8 font-primary2 ">IN YOUR CART ({this.state.cart.length})
                        <Link c>
                            <div className="grid grid-cols-6 ">{this.showCartlist()}</div>
                            </Link>
                        </div>
                        
                    
                </div>
                
                <div className="pl-16">
                    <Link to={"/profile/"+this.props.match.params.id}>
                    <div className=" text-center mb-2 py-3 text-lg px-2 bg-black text-white inline-block border-2 border-black hover:border-black hover:border-2">My Account</div>
                    </Link>
                    <br></br>
                    <Link to={"/personal/"+this.props.match.params.id}>
                    <div className="text-center mb-2 py-3 text-lg px-2 inline-block border-2 border-white hover:border-black hover:border-2">Personal Information</div>
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


