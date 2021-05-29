
import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { response } from 'express';

const Allproduct = props =>(
    <Link to={"/product/"+ props.product._id}>
    <div className="bg-white shadow-sm rounded m-1 md:bg-orange">
          <div className=" hidden sm:block">  
            <img className="w-96 h-96 md:border-white md:border-solid md:border-4 object-cover"  src={props.product.pimg[0]}/>
         
  
          </div>
          <div className="sm:w-2/3 pt-2 pl-3 pb-2">
   
                    <h3 className="text-orange text-lg font-primary2 ">{props.product.pname}</h3>  
                    
            <p className="text-grey-dark text-sm leading-normal font-primary ">
            {props.product.pdesc}
            </p>
            <p className="text-grey-dark text-lg leading-normal font-primary">
            ฿{props.product.pprice}
            </p>
          </div>  
      </div></Link>
)

export default class ProductList extends Component{
    constructor(props){
        super(props);
        this.state = {product: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/product/all')
        .then(res =>{
            this.setState({ product: res.data.prod})
            console.log(res.data.prod)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    viewproduct(id){
        axios.get('http://http://localhost:5000/product/'+id)
        .then(response => {console.log(response.data)})

        this.setState({
            product: this.state.product.filter(el => el._id !== id)
        })
    }
    productList(){
        console.log(this.state.product);
        if(this.state.product){
            return this.state.product.map(currentproduct=>
                {
                    return <Allproduct product={currentproduct} viewproduct={this.viewproduct} key={currentproduct._id} />;
                })
        }
    }
    render() {
        return (
            <div className="px-36 pt-16">
            <div className="">
                <div className=" font-primary2 pl-10 text-5xl">ALL PRODUCT</div>
            <div className="bg-white border-t-2 border-b-2 rounded m-8 md:bg-orange flex">
                <div className="hidden py-4 pl-4 pr-2 font-primary sm:block text-sm cursor-pointer">DIVISION</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
<div className="hidden py-4 pl-4 pr-2 ml-4 font-primary3 sm:block text-sm cursor-pointer">PRODUCT TYPE</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
<div className="hidden py-4 pl-4 pr-2 ml-4 font-primary3 sm:block text-sm cursor-pointer">BRAND</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
<div className="hidden py-4 pl-4 pr-2 ml-4 font-primary3 sm:block text-sm cursor-pointer">SIZE</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
<div className="hidden py-4 pl-4 pr-2 ml-4 font-primary3 sm:block text-sm cursor-pointer">COLOR</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>
                
            </div>
            <div className="grid grid-cols-4 mx-6 ">
                    {this.productList()}
            </div>
            </div>
            </div>
        )
    }
}


