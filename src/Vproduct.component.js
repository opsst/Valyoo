

import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { response } from 'express';

const Vproduct = props =>(


      <img className="w-16 h-16 object-cover justify-self-end ml-2" src={props.img} onClick={props.setMainImg.bind(props.img)}/>

)

export default class ViewProduct extends Component{
    constructor(props){
        super(props);
        this.setMainImg = this.setMainImg.bind(this);
        this.addtoCart = this.addtoCart.bind(this);
        this.state = {product: [],
                    img:[],
                    isAuth: false,
                    mainImg:''};
                    
    }
    addtoCart(){
      const accessTokenObj = localStorage.getItem("token");
      const x = accessTokenObj
      const myHeaders = new Headers();
            myHeaders.append("Authorization", x)
            myHeaders.append("Content-Type","application/json")
      const cart = {
        "prId":this.state.product._id,
        "qunt":3
      }
      console.log(cart)
      fetch('http://localhost:5000/cart/add/',{
        method:'Post',
        headers :myHeaders,
        body : JSON.stringify(cart)
      })
      .then(res => console.log(res))
    }

    componentDidMount(){
      localStorage.setItem('url','/product/'+this.props.match.params.id);
        axios.get('http://localhost:5000/product/'+this.props.match.params.id)
        .then(res =>{
            this.setState({ img: res.data.pimg})
            this.setState({ product: res.data})
            this.setState({mainImg: this.state.img[0]})
            console.log(this.state.product._id)
            
        })
        const accessTokenObj = localStorage.getItem("token");
        if(accessTokenObj){
            // myHeaders.append("Authorization", accessTokenObj.toString())
            const x = accessTokenObj
            const myHeaders = new Headers();
            myHeaders.append("Authorization", x)
            this.setState({isAuth:true})
            fetch('http://localhost:5000/users/protected',{
              method : 'Get',
              headers : myHeaders,
            })
            .then(res => res.json())
            .then(data => console.log(data));
          }
          else{
            console.log('no token');
          }
    }
    // viewproduct(id){
    //     axios.get('http://http://localhost:5000/product/'+id)
    //     .then(response => {console.log(response.data)})

    //     this.setState({
    //         product: this.state.product.filter(el => el._id !== id)
    //     })
    // }
    // imgList(){
    //   let i = 0;
    //   while(this.state.img[i]){
    //     i++
    //     return <img className="w-96 mr-6 md:border-white md:border-solid md:border-4 h-auto object-cover" src={this.state.img[i]}/>
    //   }
    // }
    setMainImg(img){
      this.setState({mainImg: img.target.src})
      console.log(img.target.src)
      console.log(this.state.product)
    }

    productList(){

        if(this.state.product){
            return this.state.img.map(currentimg=>
              {
                    let x = 1;
                    return <Vproduct img={currentimg} product={this.state.product} isAuth = {this.state.isAuth} setMainImg={this.setMainImg}/>;
              })
        }
    }
    render() {
        return (
            <div className="px-36 pt-12 flex">
                <div className="grid grid-cols-2 justify-center">
                  <div className="col-span-2 relative">
                  <img className=" object-cover " style={{width: '120rem',height:'50rem'}} src={this.state.mainImg} alt="" />
                  </div>

                    </div>
                <div className="sm:w-2/3 pt-2 pb-2 text-right">

                  <h3 className="text-orange text-6xl font-primary2 ">{this.state.product.pname}</h3>  
                  <p className="text-grey-dark text-sm leading-normal font-primary ">{this.state.product.pquan}</p>
                  <p className="text-grey-dark text-2xl leading-normal font-primary">฿{this.state.product.ptquan}</p>
                  <div className="flex flex-row-reverse mt-24">                    
                  {this.productList()} </div>
                  <div className="flex flex-row-reverse mt-4">

                  <div class="border rounded-full mt-3 ml-3 h-12 w-12 flex items-center justify-center cursor-pointer font-primary">XS</div>
                  <div class="border rounded-full mt-3 ml-3 h-12 w-12 flex items-center justify-center cursor-pointer font-primary">S</div>
                  <div class="border rounded-full mt-3 ml-3 h-12 w-12 flex items-center justify-center cursor-pointer font-primary">M</div>
                  <div class="border rounded-full mt-3 ml-3 h-12 w-12 flex items-center justify-center cursor-pointer font-primary">L</div>
                  <div class="border rounded-full mt-3 ml-3 h-12 w-12 flex items-center justify-center cursor-pointer font-primary">XL</div>
                  <div class="border rounded-full mt-3 ml-3 h-12 w-12 flex items-center justify-center cursor-pointer font-primary">2XL</div>
                  </div>
                  {this.state.isAuth && <div className="bg-black shadow text-white rounded-full py-3 px-6 mt-12 ml-96 md:bg-orange text-center cursor-pointer font-primary2" onClick={this.addtoCart}>ADD TO CART</div>}
                  <Link to="/user">{!this.state.isAuth && <div className="bg-black shadow text-white rounded-full py-3 px-6 mt-12 ml-96 md:bg-orange text-center cursor-pointer font-primary2 " >ADD TO CART</div>}</Link>
                </div>  
</div>
        )
    }
}


