import ReactDOM from 'react-dom'
import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { browserHistory } from 'react-router'
// import { response } from 'express';

const Allproduct = props =>(
    <Link to={"/product/"+ props.product._id}>
    <div className="bg-white shadow-sm m-3 pb-2 md:bg-orange hover:shadow group">
          <div className="group">  
            {/* <img className="w-96 h-96 md:border-white md:border-solid md:border-4 object-cover" id={props.product._id} src={props.product.pimg[props.imghovers][0]} onMouseOver={e=>(e.currentTarget.src = props.product.pimg[props.imghovers][1])} onMouseLeave={e=>(e.currentTarget.src = props.product.pimg[props.imghovers][0])}/> */}
            <img className="w-96 h-96 md:border-white md:border-solid md:border-4 object-cover" id={props.product._id} src={props.product.pimg[props.imghovers][0]} onMouseOver={e=>(props.onMouseOverset(props))} onMouseLeave={e=>(props.onMouseLeaveset(props))}/>
         
  
          </div>
          <div className="w-full pt-2 pl-3">
   
                    <h3 className="truncate text-base font-primary2 ">{props.product.pname}</h3>  
                    
            <p className="text-grey-dark text-xs leading-normal font-primary mt-2">
            {props.product.pdesc}
            </p>
            <p className="text-gray-600 text-xs leading-normal font-primary">
            ฿{props.product.pprice}
            </p>
            <div className="text-grey-dark text-xs leading-normal font-primary">{props.color(props.product.ptcolor)}</div>
          </div>  
          <div className=" pt-1 ml-2 flex" >
              {props.hoverimglist}
            {/* <img className="w-14 h-14 border-black border-solid border-b-2 object-cover" onMouseOver={e=>(props.toggleHover(e))} onMouseLeave={e=>(e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-0 object-cover")} src={props.product.pimg[0][0]}/>
            <img className="w-14 h-14 border-black border-solid border-b-0 object-cover" onMouseOver={e=>(e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-2 object-cover")} onMouseLeave={e=>(e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-0 object-cover")} src={props.product.pimg[1][0]}/>
            <img className="w-14 h-14 border-black border-solid border-b-0 object-cover" onMouseOver={e=>(e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-2 object-cover")} onMouseLeave={e=>(e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-0 object-cover")} src={props.product.pimg[2][0]}/> */}
            </div>
      </div></Link>
)

export default class ProductList extends Component{
    
    constructor(props){
        
        super(props);
        this.onClickchk = this.onClickchk.bind(this);
        // this.onClickchk2 = this.onClickchk2.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.Dropdownbar = this.Dropdownbar.bind(this);
        this.DropdownItem = this.DropdownItem.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.productList = this.productList.bind(this);
        this.state = {
            product: [],
            imghover:0,
            countimg:[],
            isOpen:false,
            bool:0,
            descending:false,
            heading:'',
            productCount:0,
        };
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.match.params.filter==="all"){
            // console.log(localStorage.getItem("isDes")==="0")
            // if(localStorage.getItem("isDes")==="0"){
                sessionStorage.clear()
                // localStorage.setItem("isDes",0)
                axios.get('http://localhost:5000/product/all/')
                .then(res =>{
                    this.setState({ product: res.data.prod,
                        heading: 'ALL PRODUCT',
                        productCount: res.data.prod.length})
                    // console.log(this.state.product)
                    // console.log(this.state.product.reverse())
                })
                .catch((error)=>{
                    console.log(error);
                })
            // }
            // else{
            //     sessionStorage.clear()
            //     axios.get('http://localhost:5000/product/alldes/')
            //     .then(respond =>{
            //         console.log(respond.data)
            //         this.setState({ product: respond.data.prod})
            //     })
            //     .catch((error)=>{
            //         console.log(error);
            //     })

            // }




            

    }
    else{
        console.log('http://localhost:5000/product/all'+this.props.match.params.filter)
        axios.get('http://localhost:5000/product/all/'+this.props.match.params.filter)
        .then(res =>{
            this.setState({ product: res.data
                            ,heading:this.headingexecute(this.props.match.params.filter),
                            productCount: res.data.length})
            console.log(res.data)
            this.setStatebyUrl()
        })
        .catch((error)=>{
            console.log(error);
        })
        
        // // for ( var i = 0, len = sessionStorage.length; i < len; ++i ) {
        // //     console.log( sessionStorage.getItem( sessionStorage.key ) );
        // //   }
        // // console.log(Object.entries(sessionStorage))
        // let x = Object.entries(sessionStorage)
        // // console.log(x)
        // const y = {
        //     "psex":"men"
        // }
        // let z = JSON.stringify(y)
        // console.log(z)
        // // let y = JSON.stringify(Object.assign({},x))
        // // console.log(y)
        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type","application/json")

        // fetch('http://localhost:5000/product/all/filter',{
        //     method:'POST',
        //     headers :myHeaders,
        //     body : z
        //   }).then(res=>{
        //       console.log(res)
        //   })
    }
    // console.log(typeof(JSON.parse(sessionStorage.getItem("genderm"))))

}
    onMouseOverset(e){
        var element = document.getElementById(e.product._id);
        let x=0
        for(x=0;x<e.product.pimg.length;x++){
            if(e.product.pimg[x][0]===element.src){
                element.src= e.product.pimg[x][1]
            }
        }
        // console.log(e.product.pimg)
        // console.log(element.src)
    }
    onMouseLeaveset(e){
        var element = document.getElementById(e.product._id);
        let x=0
        for(x=0;x<e.product.pimg.length;x++){
            if(e.product.pimg[x][1]===element.src){
                element.src= e.product.pimg[x][0]
            }
        }
        // console.log(e.product.pimg)
        // console.log(element.src)
    }
    viewproduct(id){
        axios.get('http://http://localhost:5000/product/'+id)
        .then(response => {console.log(response.data)})

        this.setState({
            product: this.state.product.filter(el => el._id !== id)
        })
    }
    hoverimglist(currentproduct){
        var slot = currentproduct.pimg
        // var reslot = slot.join('');
        // console.log(slot)
        let i=0
        let max = slot.length
        for(i=0;i<slot.length;i++){
            if(slot[i].length===0)
            {
                slot.splice(i,max)
            }
        }
        console.log(slot)
        let count = 1
        return slot.map( currentimg =>{
            // console.log(currentimg)
            // count++
            return <img className="w-14 h-14 border-black border-solid border-b-0 object-cover" onMouseOver={e=>(this.toggleHover(e,currentimg))} onMouseLeave={e=>(e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-0 object-cover")} src={currentimg[0]}/>
        })
    }
    colorcheck(ptcolor){
        console.log(ptcolor)
        var i=0
        var value = 0
        for(i=0;i<ptcolor.length;i++){
            if(ptcolor[i]!=="")
            {
                
                value++
                // console.log(value)
            }
        }
        if(value===0){
            return " "
        }
        else{
            return value+" Colours"
        }

    }
    toggleHover(e,count){
        // e.target.parentElement.parentElement.children[0].children[0].currentSrc
        // console.log(e.target.parentElement.parentElement.children[0].children[0].id)
        var d = e.target.parentElement.parentElement.children[0].children[0].id;
        console.log(d)
        // console.log(count[0])
        // const element = <h1>Hello World</h1>;
        var element = document.getElementById(d);
        console.log(element)
        element.src= count[0]
        // ReactDOM.render(element, document.getElementById('boom'));
        e.currentTarget.className = "w-14 h-14 border-black border-solid border-b-2 object-cover"
        // this.setState({
        //     imghover:1
        // })
        this.setState({
            countimg:count
        })

    }
    productList(){
        console.log(this.state.product);
        if(this.state.product){
            if(this.state.productCount===0){
                return <div className='font-primary2 '>SORRY, THE ITEMS THAT YOU FIND CAN'T BE FOUND. PLEASE TRY AGAIN<br></br></div>
            }
            else{
                return this.state.product.map(currentproduct=>
                    {
                        return <Allproduct hoverimglist={this.hoverimglist(currentproduct)} onMouseOverset={this.onMouseOverset} onMouseLeaveset={this.onMouseLeaveset} product={currentproduct} imghovers={this.state.imghover} viewproduct={this.viewproduct} key={currentproduct._id} toggleHover={this.toggleHover} color={this.colorcheck}/>;
                    })
            }

        }
    }
    Dropdownbar(){
        return(
            <div className="bg-white border-t-2 border-b-2 rounded m-8 md:bg-orange flex relative h-14">
                <ul className="flex absolute right-6">
                    {this.DropdownItem()}
                </ul>
            </div>
        )
    }
    setStatebyUrl(){
        let checkURL = this.props.match.params.filter
        if(checkURL==="men"){
            sessionStorage.clear()
            sessionStorage.setItem('genderm','1')
          }
        else if(checkURL==="women"){
            sessionStorage.clear()
            sessionStorage.setItem('genderwm','1')
        }

    }
    nextLink(){
        let url = '/all/'
            if((JSON.parse(sessionStorage.getItem("sType")))===1){
                url=url+"t1"
            }
            else if((JSON.parse(sessionStorage.getItem("sType")))===2){
                url=url+"t2"
            }
            else if((JSON.parse(sessionStorage.getItem("sType")))===3){
                url=url+"t3"
            }
            else if((JSON.parse(sessionStorage.getItem("sType")))===4){
                url=url+"t4"
            }
            if((JSON.parse(sessionStorage.getItem("genderm")))===1&&(JSON.parse(sessionStorage.getItem("genderwm")))!==1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "men"
            }
            if((JSON.parse(sessionStorage.getItem("genderwm")))===1&&(JSON.parse(sessionStorage.getItem("genderm")))!==1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "women"
            }
            if((JSON.parse(sessionStorage.getItem("genderwm")))===1&&(JSON.parse(sessionStorage.getItem("genderm")))===1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "men%7cwomen"
            }

            if((JSON.parse(sessionStorage.getItem("shoes")))===1&&(JSON.parse(sessionStorage.getItem("cloth")))===1&&(JSON.parse(sessionStorage.getItem("assess")))===1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "shoes%7cclothing%7caccessories"
            }else if((JSON.parse(sessionStorage.getItem("shoes")))===1&&(JSON.parse(sessionStorage.getItem("cloth")))===1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "shoes%7cclothing"
            }else if((JSON.parse(sessionStorage.getItem("shoes")))===1&&(JSON.parse(sessionStorage.getItem("assess")))===1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "shoes%7caccessories"
            }else if((JSON.parse(sessionStorage.getItem("cloth")))===1&&(JSON.parse(sessionStorage.getItem("assess")))===1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "cloth%7caccessories"
            }
            if(((JSON.parse(sessionStorage.getItem("shoes")))===1&&(JSON.parse(sessionStorage.getItem("cloth")))!==1&&(JSON.parse(sessionStorage.getItem("assess")))!==1)){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "shoes"
            }
            if((JSON.parse(sessionStorage.getItem("cloth")))===1&&(JSON.parse(sessionStorage.getItem("shoes")))!==1&&(JSON.parse(sessionStorage.getItem("assess")))!==1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "clothing"
            }
            if((JSON.parse(sessionStorage.getItem("assess")))===1&&(JSON.parse(sessionStorage.getItem("shoes")))!==1&&(JSON.parse(sessionStorage.getItem("cloth")))!==1){
                if(url!=="/all/"){
                    url = url + "-"
                }
                url = url + "accessories"
            }
            if((JSON.parse(sessionStorage.getItem("lt1500")))===1){
                if(url!=="/all/"){
                    url = url + "-lt15"
                }else{
                    url= url+"lt15"
                }
            }
            if((JSON.parse(sessionStorage.getItem("ld3000")))===1){
                if(url!=="/all/"){
                    url = url + "-ld30"
                }else{
                    url= url+"ld30"
                }
            }
            if((JSON.parse(sessionStorage.getItem("ld4500")))===1){
                if(url!=="/all/"){
                    url = url + "-ld45"
                }else{
                    url= url+"ld45"
                }
            }
            if((JSON.parse(sessionStorage.getItem("ld6000")))===1){
                if(url!=="/all/"){
                    url = url + "-ld60"
                }else{
                    url= url+"ld60"
                }
            }
            if((JSON.parse(sessionStorage.getItem("ld7500")))===1){
                if(url!=="/all/"){
                    url = url + "-ld75"
                }else{
                    url= url+"ld75"
                }
            }
            if((JSON.parse(sessionStorage.getItem("md7500")))===1){
                if(url!=="/all/"){
                    url = url + "-md75"
                }else{
                    url= url+"md75"
                }
            }
            let brandnm = ["adidas","nike","new_balance","fila","under_armour","puma"]
            let brand = [(JSON.parse(sessionStorage.getItem("adidas"))),(JSON.parse(sessionStorage.getItem("nike"))),(JSON.parse(sessionStorage.getItem("new_balance"))),(JSON.parse(sessionStorage.getItem("fila"))),(JSON.parse(sessionStorage.getItem("under_armour"))),(JSON.parse(sessionStorage.getItem("puma")))]
            let last = -1;
            let ram = 0;
            for(let i=0;i<brand.length;i++){
                if(brand[i]===1){
                    ram=ram+1
                    last=i
                }
            }
            let ram2 = ram
            for(let l=0;l<brand.length;l++){
                if(ram===1&brand[l]===1){
                    if(url!=="/all/"){
                        url = url + "-"
                    }
                    url = url + brandnm[l]
                }
                if(ram>1&&brand[l]===1){

                    if(ram2===ram){
                        if(url!=="/all/"){
                            url = url + "-"
                        }
                        
                        url = url + brandnm[l]
                        ram2 = ram2-1
                    }
                    else{

                        url = url +"%7c"+brandnm[l]
                    }
                }
            }

            setTimeout(() => {
                console.log(url)
                if(url==="/all/"){
                    url="/all/all"
                    this.props.history.push(url)
                    axios.get('http://localhost:5000/product/all/')
                    .then(res =>{
                        this.setState({ product: res.data.prod,
                                        heading:'ALL PRODUCT',
                                        productCount: res.data.prod.length})
    
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }else{
                    this.props.history.push(url)
                    url = url.toUpperCase()
                    axios.get('http://localhost:5000/product/all/'+this.props.match.params.filter)
                    .then(res =>{
                        this.setState({ product: res.data,
                            heading:this.headingexecute(this.props.match.params.filter)
                            ,productCount: res.data.length})
                        console.log(res.data)
                        this.forceUpdate();
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }
                
            }, 10);



            // window.location = url ;
            
    }
    headingexecute(url){
        url = url.toUpperCase()
        if (url==='LT15'||url==='LD30'||url==='LD45'||url==='LD60'||url==='LD75'||url==='MD75'){
            url = url.replace('LT15',' UNDER ฿1,500 ')
            url = url.replace('LD30',' ฿1,500-฿3,000 ')
            url = url.replace('LD45',' ฿3,000-฿4,500 ')
            url = url.replace('LD60',' ฿4,500-฿6,000 ')
            url = url.replace('LD75',' ฿6,000-฿7,500 ')
            url = url.replace('MD75',' OVER ฿7,500')
            return url

        }

        if(url.includes('LT15-')||url.includes('LD30-')||url.includes('LD45-')||url.includes('LD60-')||url.includes('LD75-')||url.includes('MD75-')){
            url = url.replaceAll('-',' ')
            url = url.replaceAll('|',',')
            url = url.replaceAll('_',' ')
            url = url.replace('LT15',' UNDER ฿1,500 OF')
            url = url.replace('LD30',' ฿1,500-฿3,000 OF')
            url = url.replace('LD45',' ฿3,000-฿4,500 OF')
            url = url.replace('LD60',' ฿4,500-฿6,000 OF')
            url = url.replace('LD75',' ฿6,000-฿7,500 OF')
            url = url.replace('MD75',' OVER ฿7,500 OF')
        }
        else{
            url = url.replaceAll('-',' ')
            url = url.replaceAll('|',',')
            url = url.replaceAll('_',' ')
            url = url.replace('LT15',' UNDER ฿1,500 ')
            url = url.replace('LD30',' ฿1,500-฿3,000 ')
            url = url.replace('LD45',' ฿3,000-฿4,500 ')
            url = url.replace('LD60',' ฿4,500-฿6,000 ')
            url = url.replace('LD75',' ฿6,000-฿7,500 ')
            url = url.replace('MD75',' OVER ฿7,500')
        }



        return url
    }
    // onClickchk2(){
    //     let x = localStorage.getItem("isDes")
    //     if(x==="0"){
    //     localStorage.setItem("isDes",1)
    //         window.location.reload()
    //     }
    //     else{
    //     localStorage.setItem("isDes",0)
    //     window.location.reload()

    //     }


    // }
    onClickchk(){
        setTimeout(() => {
            if(document.getElementById('gmen')!==null){
                if((JSON.parse(sessionStorage.getItem("genderm")))===1){
                    document.getElementById('gmen').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("genderwm")))===1){
                    document.getElementById('wmen').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("shoes")))===1){
                    document.getElementById('shoes').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("cloth")))===1){
                    document.getElementById('cloth').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("assess")))===1){
                    document.getElementById('assess').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("adidas")))===1){
                    document.getElementById('adidas').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("nike")))===1){
                    document.getElementById('nike').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("new_balance")))===1){
                    document.getElementById('new_balance').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("fila")))===1){
                    document.getElementById('fila').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("under_armour")))===1){
                    document.getElementById('under_armour').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("puma")))===1){
                    document.getElementById('puma').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("lt1500")))===1){
                    document.getElementById('lt1500').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("ld3000")))===1){
                    document.getElementById('ld3000').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("ld4500")))===1){
                    document.getElementById('ld4500').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("ld6000")))===1){
                    document.getElementById('ld6000').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("ld7500")))===1){
                    document.getElementById('ld7500').checked = true;
                }
                if((JSON.parse(sessionStorage.getItem("md7500")))===1){
                    document.getElementById('md7500').checked = true;
                }
            }

        }, 10);
        if(this.state.isOpen===false){
        this.setState({isOpen:true})
    }
    else{
        this.setState({isOpen:false})
    }
    }
    filterGender(){
        return(<div className="flex flex-col">                            
                <div className="font-primary mb-2">GENDER</div>
                            
            <label class="items-center item-center "  >
                <input type="checkbox" value="men" id="gmen" onChange={this.changeFilter.bind(this)}  className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle" >MALE</span>
            </label>
            <label class="items-center item-center " >
                <input type="checkbox" value="wmen" id="wmen" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">FEMALE</span>
            </label>   
            <hr className="border-0 bg-gray-200 mt-4 text-gray-200 h-px"/>
            <div className="font-primary mt-4 mb-2 ">DIVISION</div>
                        
            <label class="items-center item-center ">
                <input type="checkbox" value="shoes" id="shoes" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">SHOES</span>
            </label>
            <label class="items-center item-center ">
                <input type="checkbox" value="cloth" id="cloth" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">CLOTHING</span>
            </label>     
            <label class="items-center item-center ">
                <input type="checkbox" value="assess" id="assess" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">ACCESSORIES</span>
            </label>   
            <hr className="border-0 bg-gray-200 mt-4 text-gray-200 h-px"/>
            <div className="font-primary mt-4 mb-2 ">BRAND</div>
        
            <label class="items-center item-center ">
                <input type="checkbox" value="adidas" id="adidas" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">ADIDAS</span>
            </label>
            <label class="items-center item-center ">
                <input type="checkbox" value="nike" id="nike" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">NIKE</span>
            </label>     
            <label class="items-center item-center ">
                <input type="checkbox" value="new_balance" id="new_balance" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">NEW BALANCE</span>
            </label>   
            <label class="items-center item-center ">
                <input type="checkbox" value="fila" id="fila" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">FILA</span>
            </label>   
            <label class="items-center item-center ">
                <input type="checkbox" value="under_armour" id="under_armour" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">UNDER ARMOUR</span>
            </label>   
            <label class="items-center item-center ">
                <input type="checkbox" value="puma" id="puma" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">PUMA</span>
            </label>   
            <hr className="border-0 bg-gray-200 mt-4 text-gray-200 h-px"/>
            <div className="font-primary mt-4 mb-2 ">ฺPRICE</div>
        
            <label class="items-center item-center ">
                <input type="checkbox" value="lt1500" id="lt1500" onChange={this.changeFilter.bind(this)}  className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">UNDER ฿1,500</span>
            </label>
            <label class="items-center item-center ">
                <input type="checkbox" value="ld3000" id="ld3000" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">฿1,500-฿3,000</span>
            </label>     
            <label class="items-center item-center ">
                <input type="checkbox" value="ld4500" id="ld4500" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">฿3,000-฿4,500</span>
            </label>   
            <label class="items-center item-center ">
                <input type="checkbox" value="ld6000" id="ld6000" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">฿4,500-฿6,000</span>
            </label>   
            <label class="items-center item-center ">
                <input type="checkbox" value="ld7500" id="ld7500" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">฿6,000-฿7,500</span>
            </label>   
            <label class="items-center item-center ">
                <input type="checkbox" value="md7500" id="md7500" onChange={this.changeFilter.bind(this)} className="form-checkbox h-4 w-4 text-gray-600 align-middle" /><span className="ml-2 pb-6 text-gray-700 text-sm align-middle">OVER ฿7,500</span>
            </label>
        </div>)
    }
    changeFilter(e){
        console.log(e.target.value,e.target.checked)
        if(e.target.checked===true){
            this.setState({
                bool:1
            })
        }else if(e.target.checked===false){
            this.setState({
                bool:0
            })
        }
        setTimeout(() => {
            if(e.target.value==="men"){
                sessionStorage.setItem('genderm',this.state.bool)
              }
              else if(e.target.value==="wmen"){
                sessionStorage.setItem('genderwm',this.state.bool)
              }
              else if(e.target.value==="shoes"){
                sessionStorage.setItem('shoes',this.state.bool)
              }
              else if(e.target.value==="cloth"){
                sessionStorage.setItem('cloth',this.state.bool)
              }
              else if(e.target.value==="assess"){
                sessionStorage.setItem('assess',this.state.bool)
              }
              else if(e.target.value==="adidas"){
                sessionStorage.setItem('adidas',this.state.bool)
              }
              else if(e.target.value==="nike"){
                sessionStorage.setItem('nike',this.state.bool)
              }
              else if(e.target.value==="new_balance"){
                sessionStorage.setItem('new_balance',this.state.bool)
              }
              else if(e.target.value==="fila"){
                sessionStorage.setItem('fila',this.state.bool)
              }
              else if(e.target.value==="under_armour"){
                sessionStorage.setItem('under_armour',this.state.bool)
              }
              else if(e.target.value==="puma"){
                sessionStorage.setItem('puma',this.state.bool)
              }
              else if(e.target.value==="lt1500"){
                sessionStorage.setItem('lt1500',this.state.bool)
                sessionStorage.setItem('ld3000',"0")
                sessionStorage.setItem('ld4500',"0")
                sessionStorage.setItem('ld6000',"0")
                sessionStorage.setItem('ld7500',"0")
                sessionStorage.setItem('md7500',"0")

                document.getElementById('ld3000').checked = false;
                document.getElementById('ld4500').checked = false;
                document.getElementById('ld6000').checked = false;
                document.getElementById('ld7500').checked = false;
                document.getElementById('md7500').checked = false;

              }
              else if(e.target.value==="ld3000"){
                sessionStorage.setItem('ld3000',this.state.bool)
                sessionStorage.setItem('lt1500',"0")
                sessionStorage.setItem('ld4500',"0")
                sessionStorage.setItem('ld6000',"0")
                sessionStorage.setItem('ld7500',"0")
                sessionStorage.setItem('md7500',"0")

                document.getElementById('lt1500').checked = false;
                document.getElementById('ld4500').checked = false;
                document.getElementById('ld6000').checked = false;
                document.getElementById('ld7500').checked = false;
                document.getElementById('md7500').checked = false;
              }
              else if(e.target.value==="ld4500"){
                sessionStorage.setItem('ld4500',this.state.bool)
                sessionStorage.setItem('lt1500',"0")
                sessionStorage.setItem('ld3000',"0")
                sessionStorage.setItem('ld6000',"0")
                sessionStorage.setItem('ld7500',"0")
                sessionStorage.setItem('md7500',"0")

                document.getElementById('lt1500').checked = false;
                document.getElementById('ld3000').checked = false;
                document.getElementById('ld6000').checked = false;
                document.getElementById('ld7500').checked = false;
                document.getElementById('md7500').checked = false;
              }
              else if(e.target.value==="ld6000"){
                sessionStorage.setItem('ld6000',this.state.bool)
                sessionStorage.setItem('lt1500',"0")
                sessionStorage.setItem('ld3000',"0")
                sessionStorage.setItem('ld4500',"0")
                sessionStorage.setItem('ld7500',"0")
                sessionStorage.setItem('md7500',"0")

                document.getElementById('lt1500').checked = false;
                document.getElementById('ld3000').checked = false;
                document.getElementById('ld4500').checked = false;
                document.getElementById('ld7500').checked = false;
                document.getElementById('md7500').checked = false;
              }
              else if(e.target.value==="ld7500"){
                sessionStorage.setItem('ld7500',this.state.bool)
                sessionStorage.setItem('lt1500',"0")
                sessionStorage.setItem('ld3000',"0")
                sessionStorage.setItem('ld4500',"0")
                sessionStorage.setItem('ld6000',"0")
                sessionStorage.setItem('md7500',"0")

                document.getElementById('lt1500').checked = false;
                document.getElementById('ld3000').checked = false;
                document.getElementById('ld4500').checked = false;
                document.getElementById('ld6000').checked = false;
                document.getElementById('md7500').checked = false;
              }
              else if(e.target.value==="md7500"){
                sessionStorage.setItem('md7500',this.state.bool)
                sessionStorage.setItem('lt1500',"0")
                sessionStorage.setItem('ld3000',"0")
                sessionStorage.setItem('ld4500',"0")
                sessionStorage.setItem('ld6000',"0")
                sessionStorage.setItem('ld7500',"0")

                document.getElementById('lt1500').checked = false;
                document.getElementById('ld3000').checked = false;
                document.getElementById('ld4500').checked = false;
                document.getElementById('ld6000').checked = false;
                document.getElementById('ld7500').checked = false;

              }
              this.nextLink()
        }, 10);

          
    
         



        
        // if(e.target.value==="men"||e.target.value==="women"){

        //     this.setState({
        //         genderMen
        //     })
        //     // sessionStorage.setItem ('psex',e.target.value)

        //     window.location = '/all/'+e.target.value
        // }
    }
    handleOption(e){
        sessionStorage.setItem('sType',e.target.value)
        setTimeout(() => {
            this.nextLink()

        }, 10);

    }
    DropdownItem(){
        return (
            <div className= "flex">
                    <div classname="">

    <select onChange={this.handleOption} class="mr-2 relative py-4 px-4 font-primary3 sm:block text-sm focus:outline-none appearance-none" dir="rtl">

    <option selected disabled hidden>SORT BY</option>
    <option value="1">Newest</option>
    <option value="2">Oldest</option>
    <option value="3">Price: High-Low</option>
    <option value="4">Price: Low-High</option>
  </select>
    </div>


            <li className="relative py-4 font-primary3 sm:block text-sm cursor-pointer" onClick={this.onClickchk.bind()}>
                FILTER

            </li>
<svg xmlns="http://www.w3.org/2000/svg" onClick={this.onClickchk.bind()} class="h-5 w-5 mt-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
</svg>



            </div>
        )
    }
    render() {
        return (
            <div className="px-28 pt-16 flex relative">
            {this.state.isOpen&&<div className=" bg-white w-80 h-full mt-20 p-6 pl-4 flex-col font-primary3 border-l-2 flex sticky">
                            
                            {this.filterGender()}
   

                
                </div>}
                    
            <div className="">
                <div className=" font-primary2 pl-10 text-4xl">{this.state.heading}({this.state.productCount})</div>
                {this.Dropdownbar()}
                
                
            <div className="grid grid-cols-4 mx-6 ">
                    {this.productList()}
            </div>
            </div>
            </div>
        )
    }
}


