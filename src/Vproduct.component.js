

import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { response } from 'express';

const Vproduct = props =>(


      <img className="cursor-pointer w-16 h-16 object-cover justify-self-end ml-2" src={props.img} onClick={props.setMainImg.bind(props.img)} />

)

const Disproduct = props =>(
  <img className="cursor-pointer w-12 h-12 object-cover ml-0.5 border border-black" src={props.img} onClick={props.setMainImg2.bind(props.img)}/>
)

const Select = props =>(
  <button onClick={props.onClickR.bind()} className={props.classR(props)}>{props.Rvalue}</button>
)

export default class ViewProduct extends Component{
    constructor(props){
        super(props);
        this.onClickleft = this.onClickleft.bind(this);
        this.onClickright = this.onClickright.bind(this);
        this.sizeRender = this.sizeRender.bind(this);
        this.setMainImg = this.setMainImg.bind(this);
        this.addtoCart = this.addtoCart.bind(this);
        this.productList = this.productList.bind(this);
        this.sizeChoose = this.sizeChoose.bind(this);
        this.setClassName = this.setClassName.bind(this);
        this.state = {product: [],
                    img:[],
                    isAuth: false,
                    mainImg:'',
                    thispositon:0,
                    specstp:0,
                    sizeSelect:'',
                    toId:'',
                    doShare:true};
                    
    }
    addtoCart(){
      const accessTokenObj = localStorage.getItem("token");
      const x = accessTokenObj
      const myHeaders = new Headers();
            myHeaders.append("Authorization", x)
            myHeaders.append("Content-Type","application/json")
      // console.log(this.state.product._id)
      const cart = {
        "prId":this.state.product._id,
        "prAr":this.state.product,
        "qunt":1,
        "prcolor":this.state.thispositon,
        "prsize":this.state.sizeSelect
      }
      console.log(cart)
      axios.get('http://localhost:5000/users/protected',{headers:{Authorization:x}})
      .then(res=>{
          this.setState({
            toId:res.data._id
          })
        
      }).then(none=>{
        console.log(this.state.toId)
        axios.get('http://localhost:5000/cart/'+this.state.toId,{headers:{Authorization:x}})
        .then(res=>{
          if(res.data.length===0){
            fetch('http://localhost:5000/cart/add/',{
              method:'Post',
              headers :myHeaders,
              body : JSON.stringify(cart)
            })
            .then(res => console.log(res))
            this.setState({
              doShare:false
            })
            window.location = ("/cart/"+this.state.toId)

          }
          for(let num=0; num<res.data.length; num++){
            if(res.data[num].prId===cart.prId&&res.data[num].prcolor===cart.prcolor&&res.data[num].prsize===cart.prsize){
              this.setState({
                doShare:false
              })
            }
          }
          console.log(this.state.doShare)
          if(this.state.doShare===true){
            fetch('http://localhost:5000/cart/add/',{
              method:'Post',
              headers :myHeaders,
              body : JSON.stringify(cart)
            })
            .then(res => console.log(res))
            window.location = ("/cart/"+this.state.toId)

          }
          this.setState({
            doShare:true
          })
            
      })
      
          // this.setState({
          //     cart:res.data
          // })
          
      })
    }

    componentDidMount(){
      localStorage.setItem("isDes",0)
      console.log(this.props)
      localStorage.setItem('url','/product/'+this.props.match.params.id);
        axios.get('http://localhost:5000/product/'+this.props.match.params.id)
        .then(res =>{
          console.log(res)
            this.setState({ img: res.data.pimg,product: res.data,mainImg: res.data.pimg[0][0]})
            console.log('test')
            
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
            .then(res => res.json() )
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
      let x=0;
      for(x=0;x<this.state.product.pimg.length;x++){
        if(this.state.product.pimg[x][0]===img.target.src){
          break;
        }
      }
      if(x!==this.state.product.pimg.length){
        console.log('here',img.target.src,x)
        this.setState({
          mainImg: img.target.src,
          thispositon: x,
          sizeSelect:''
        })
      }
      else{
        this.setState({
          mainImg: img.target.src,
          // thispositon: x
        })
      }

      // console.log(img.target.src)
      
    }
    // setMainImg2(img){
    //   let x=0;
    //   if(this.state.product.pimg!==undefined){
    //     for(x=0;x<this.state.product.pimg.length;x++){
    //       if(this.state.product.pimg[x][0]===img.target.src){
    //         break;
    //       }
    //     }
    //     console.log('here',img.target.src,x)
    //     this.setState({
    //       mainImg: img.target.src,
    //     })
    //     console.log(img.target.src)
        
    //   }

    // }
    listforthisimg(){
      if(this.state.product){
        let wtf = this.state.img[this.state.thispositon]
        console.log(wtf)
        if(wtf!==undefined){
        return wtf.map(currentimg=>
          {
                // let x = 1;
                console.log(currentimg)
                return <Disproduct img={currentimg} setMainImg2={this.setMainImg}/>;
          })
        }
      }

    }

    onClickleft()
    {
      // console.log(this.state.mainImg)
      for(let i=0;i<this.state.product.pimg.length;i++){
        for(let j=0;j<this.state.product.pimg[i].length;j++){
          if(this.state.product.pimg[i][j]===this.state.mainImg){
            // console.log(this.state.product.pimg[i][j])
            if(j-1<0){
              this.setState({
                mainImg:this.state.product.pimg[i][this.state.product.pimg[i].length-1]
              })

            }
            else{
              this.setState({
                mainImg:this.state.product.pimg[i][j-1]
              })
            }
          }
        }
      }
    }
    onClickright()
    {
      // console.log(this.state.mainImg)
      for(let i=0;i<this.state.product.pimg.length;i++){
        for(let j=0;j<this.state.product.pimg[i].length;j++){
          if(this.state.product.pimg[i][j]===this.state.mainImg){
            // console.log(this.state.product.pimg[i][j])
            if(j+1>this.state.product.pimg[i].length-1){
              this.setState({
                mainImg:this.state.product.pimg[i][0]
              })

            }
            else{
              this.setState({
                mainImg:this.state.product.pimg[i][j+1]
              })
            }
          }
        }
      }
    }
    sizeRender(){
      let setClassName = 'rounded-base border mt-3 h-12 w-28 flex-1 items-center justify-center cursor-pointer font-primary3 text-sm'
      if(this.state.product.pquan!==undefined){
        
      return this.state.product.pquan.map(currentsize=>
        {
          console.log(currentsize[this.state.thispositon+1])
          if(currentsize[this.state.thispositon+1]>0){
            return <Select Rvalue={currentsize[0]} onClickR={this.sizeChoose} classR={this.setClassName}/>
          }
          else if(currentsize[this.state.thispositon+1]===0)
          {
            return <button className="rounded-base border mt-3 h-12 w-28 flex-1 items-center bg-gray-200 text-gray-400 justify-center font-primary3 cursor-not-allowed text-sm" disabled>{currentsize[0]}</button>
          }
          
        })
      }
    }
    setClassName(x){
      // if(this.state.sizeSelect!==undefined){
        // console.log()
      // }
        if(this.state.sizeSelect===x.Rvalue){
          return "rounded-base border-2 border-black mt-3 h-12 w-28 flex-1 items-center justify-center cursor-pointer font-primary3 text-sm"
        }
        else{
          return "rounded-base border mt-3 h-12 w-28 flex-1 items-center justify-center cursor-pointer font-primary3 text-sm"
        }
      // console.log(x.Rvalue)
      
    }
    sizeChoose(svalue){
      // console.log()
      this.setState(
        {
          sizeSelect:svalue.target.innerText
        }
      )
      setTimeout(() => {
        console.log(this.state.sizeSelect)
      }, 50);
      
    }
    productList(){

        if(this.state.product){
          // console.log(wtf,wtf)
          if(this.state.img!==undefined){
          return this.state.img.map(currentimg=>
            {
                  // let x = 1;
                  console.log(currentimg)
                  return <Vproduct img={currentimg[0]} product={this.state.product} isAuth = {this.state.isAuth} setMainImg={this.setMainImg} />;
            })
          }
        }


    }
    render() {
        return (
            <div className="px-36 pt-12 flex">
                <div className="grid grid-cols-2 justify-center">
                  <div className="col-span-2 relative ">
                  <div className="" style={{width: '70rem',height:'50rem',backgroundColor:'rgba(237,238,240)'}}>
                  <img className="object-cover ml-36 h-full"  src={this.state.mainImg} alt=""/>
                  </div>           
                    <div className="flex absolute bottom-0 left-0 bg-grey">

                      {this.listforthisimg()}
                    </div>
                  </div>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={this.onClickleft} className="rounded-full cursor-pointer  h-12 w-12 absolute ml-7 mt-36 top-96 border-2 border-black p-2 bg-white stroke-current text-black hover:text-white hover:border-black hover:bg-black" fill="none" viewBox="0 0 24 24" >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>

                  <svg xmlns="http://www.w3.org/2000/svg" onClick={this.onClickright}  className="rounded-full cursor-pointer h-12 w-12 absolute left-2/4 ml-56 mt-36 top-96 border-2 border-black p-2 bg-white stroke-current text-black hover:text-white hover:border-black hover:bg-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                  </div>


                    </div>
                <div className="ml-12 sm:w-2/3 pt-2 pb-2 text-right">

                  <h3 className="ml-96 text-orange text-3xl font-primary2 ">{this.state.product.pname}</h3>  
                  <p className="text-grey-dark text-sm leading-normal font-primary ">{this.state.product.pdesc}</p>
                  <p className="text-grey-dark text-2xl leading-normal font-primary">฿{this.state.product.pprice}</p>
                  <p className="text-grey-dark text-sm leading-normal font-primary">{this.state.product.ptcolor}</p>
                  <div className="flex flex-row-reverse mt-24">                    
                  {this.productList()} </div>
                  <div className="ml-80 grid grid-cols-4 mt-4">
                  {this.sizeRender()}

                  </div>
                  {/* <form>
                    <label className="rounded-base border mt-3 h-12 w-28 flex-1 py-3 px-5 items-center justify-center cursor-pointer font-primary3">hghggh
                    <input type="radio" />
                    </label>
                  </form> */}
                  {this.state.isAuth && <div className="bg-black shadow text-white rounded-full py-3 px-6 mt-12 ml-96 md:bg-orange text-center cursor-pointer font-primary2" onClick={this.addtoCart}>ADD TO CART</div>}
                  <Link to="/user">{!this.state.isAuth && <div className="bg-black shadow text-white rounded-full py-5 px-6 mt-12 ml-96 md:bg-orange text-center cursor-pointer font-primary2 " >ADD TO CART</div>}</Link>
                </div>  
</div>
        )
    }
}


