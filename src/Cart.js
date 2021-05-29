

import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { response } from 'express';

const Cart = props =>(


      <img className="w-16 h-16 object-cover justify-self-end ml-2" src={props.img} onClick={props.setMainImg.bind(props.img)}/>

)

export default class ViewProduct extends Component{
    constructor(props){
        super(props);
        this.setMainImg = this.setMainImg.bind(this);
        this.state = {product: [],
                    img:[],
                    isAuth: false,
                    mainImg:''};
                    
    }

    // componentDidMount(){
    //   localStorage.setItem('url','/product/'+this.props.match.params.id);
    //     axios.get('http://localhost:5000/product/'+this.props.match.params.id)
    //     .then(res =>{
    //         this.setState({ img: res.data.pimg})
    //         this.setState({ product: res.data})
    //         this.setState({mainImg: this.state.img[0]})
    //         console.log(this.state.isAuth)
            
    //     })
    //     const accessTokenObj = localStorage.getItem("token");
    //     if(accessTokenObj){
    //         // myHeaders.append("Authorization", accessTokenObj.toString())
    //         const x = accessTokenObj
    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", x)
    //         this.setState({isAuth:true})
    //         fetch('http://localhost:5000/users/protected',{
    //           method : 'Get',
    //           headers : myHeaders,
    //         })
    //         .then(res => res.json())
    //         .then(data => console.log(data));
    //       }
    //       else{
    //         console.log('no token');
    //       }
    // }
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
    }

    productList(){

        if(this.state.product){
            return this.state.img.map(currentimg=>
              {
                    let x = 1;
                    return <Cart img={currentimg} product={this.state.product} isAuth = {this.state.isAuth} setMainImg={this.setMainImg}/>;
              })
        }
    }
    render() {
        return (
            <div className="px-36 pt-12 flex">
                Cart
</div>
        )
    }
}


