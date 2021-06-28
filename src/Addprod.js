import React ,{ Component, useState } from 'react';
import axios from 'axios';

export default class Addprod extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTypeQuantity = this.onChangeTypeQuantity.bind(this);
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeDivision = this.onChangeDivision.bind(this);
        this.onChangeSex = this.onChangeSex.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.letkillthislove = this.letkillthislove.bind(this);
        this.setNum = this.setNum.bind(this);

        this.state = {
            pname: '',
            pprice: '',
            pdesc: '',
            pquan: [],
            ptquan:[],
            ptype: '',
            pdivn: '',
            psex:'',              
            pbrand: '',    
            pimg: [[],[],[],[],[]],
            useimg:[],
            purl:'' ,
            showOption:false,
            showOptionFoot:false,
            showOptionAppe:false,
            showOptionAsse:false,
            file:[],
            preparefile1:[],
            preparefile2:[],
            preparefile3:[],
            preparefile4:[],
            preparefile5:[],
            fileReady:false,
            errormsg:false,
            memptquan:[],
            ptnamecol:[],
            ptcolor: 0,
            ptcolotcrea: []
        }
    }
    // postDetails=()=>{
    //     const data = new FormData()
    //     console.log(this.state.pimg)
    //     data.append("file",this.state.pimg)
    //     data.append("upload_preset","valyoo")
    //     data.append("cloud_name","ProjectWhite")
    //     fetch("https://api.cloudinary.com/v1_1/projectwhite/image/upload",{
    //         method:"post",
    //         body:data
    //     })
    //     .then(res=>res.json())
    //     .then(data =>{
    //         this.setState({
    //             pimg: data.url
    //         })
    //         console.log(this.state.purl)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
    handleOption(e){
        console.log(e.target.value)
        if(e.target.value===""){
            this.setState({
                showOptionFoot:false,
                showOptionAppe:false,
                showOptionAsse:false,
                
            })
        }
        else if(e.target.value==="1"){
            let prototypeShoe = [["4US",-1,-1,-1,-1,-1],["4.5US",-1,-1,-1,-1,-1],["5US",-1,-1,-1,-1,-1],["5.5US",-1,-1,-1,-1,-1],["6US",-1,-1,-1,-1,-1],["6.5US",-1,-1,-1,-1,-1],["7US",-1,-1,-1,-1,-1],["7.5US",-1,-1,-1,-1,-1],["8US",-1,-1,-1,-1,-1],["8.5US",-1,-1,-1,-1,-1],["9US",-1,-1,-1,-1,-1],["9.5US",-1,-1,-1,-1,-1],["10US",-1,-1,-1,-1,-1],["10.5US",-1,-1,-1,-1,-1],["11US",-1,-1,-1,-1,-1],["11.5US",-1,-1,-1,-1,-1],["12US",-1,-1,-1,-1,-1],["12.5US",-1,-1,-1,-1,-1],["13US",-1,-1,-1,-1,-1],["13.5US",-1,-1,-1,-1,-1],["14US",-1,-1,-1,-1,-1],]
            this.setState({
                showOptionFoot:true,
                showOptionAppe:false,
                showOptionAsse:false,
                pdivn:"shoes",
                memptquan:prototypeShoe
            })
        }
        else if(e.target.value==="2"){
            let prototypeCloth = [["XS",-1,-1,-1,-1,-1],["S",-1,-1,-1,-1,-1],["M",-1,-1,-1,-1,-1],["L",-1,-1,-1,-1,-1],["XL",-1,-1,-1,-1,-1],["2XL",-1,-1,-1,-1,-1],]
            this.setState({
                showOptionAppe:true,
                showOptionFoot:false,
                showOptionAsse:false,
                pdivn:"clothing",
                memptquan:prototypeCloth
                
            })
        }
        else if(e.target.value==="3"){
            let prototypeAsse = [["OSFM",-1,-1,-1,-1,-1],["OSFW",-1,-1,-1,-1,-1]]
            this.setState({
                showOptionAsse:true,
                showOptionFoot:false,
                showOptionAppe:false,
                pdivn:"accessories",
                memptquan:prototypeAsse
            })
        }
        // this.setState({
        //     showOptionAppe:true,
        //     showOptionFoot:false
        // })
        // console.log(this.state.showOptionAppe)
        // console.log(this.state.showOptionFoot)
    }
    onChangeProductName(e) {
        this.setState({
          pname: e.target.value
        })
      }
    onChangePrice(e) {
        this.setState({
            pprice: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            pdesc: e.target.value
        })
    }
    onChangeTypeQuantity(e,num) {
        // console.log(e.target.value)
        // console.log(e.target.placeholder)
        let k=0;
        for(k=0;k<this.state.memptquan.length;k++){
            // console.log(this.state.memptquan[k][0])
            if(this.state.memptquan[k][0]===e.target.placeholder){
                let ram = this.state.memptquan
                ram[k][num] = Number(e.target.value)
                
                this.setState({
                    memptquan : ram
                })
                console.log(this.state.memptquan)
            }

            
            
        }
            if('Color name'===e.target.placeholder){
            num=num-1
            let ram = this.state.ptnamecol
            ram[num] = e.target.value 
            console.log(ram)
            this.setState({
                ptnamecol:ram
            })
            // console.log(this.state.ptnamecol)
        }
        // this.setState({
        //     ptquan: e.target.value
        // })
    }
    onChangeType(e) {
        this.setState({
            ptype: e.target.value
        })
    }
    onChangeDivision(e) {
        this.setState({
            pdivn: e.target.value
        })
    }
    onChangeSex(e) {
        this.setState({
            psex: e.target.value
        })
    }
    onChangeBrand(e) {
        this.setState({
            pbrand: e.target.value
        })
    }
    setNum(e){
        this.setState({
            ptcolor: e.target.value
        })
        setTimeout(() => {
            let tester = 1
            let testarray= []
            for(tester=1;tester<=this.state.ptcolor;tester++){
                testarray.push(tester)
            }
            this.setState({
                ptcolotcrea: testarray
            })
            let xram = this.state.ptcolotcrea.length
            let xram2 = xram+1
            if(xram===1||xram===2||xram===3||xram===4){
                let rename = this.state.ptnamecol
                let requan = this.state.memptquan
                let k = 0
            for(k=0;k<this.state.memptquan.length;k++){
                requan[k][xram2]=-1
            }
            let reimg = this.state.pimg
            if(xram===1){
                this.setState(
                    {
                        preparefile2:[]
                    }
                )
            }
            else if(xram===2){
                this.setState(
                    {
                        preparefile3:[]
                    }
                )
            }
            else if(xram===3){
                this.setState(
                    {
                        preparefile4:[]
                    }
                )
            }
            else if(xram===4){
                this.setState(
                    {
                        preparefile5:[]
                    }
                )
            }
                reimg[xram]=[]
                rename[xram]=''
                // console.log(requan)
                console.log(this.state.memptquan)

                this.setState({
                    ptnamecol: rename,
                    pimg:reimg

                })
                console.log(this.state.pimg)
            }
        }, 1);
        
        
    }
    onChangeImg(e,num){
        let filearray = []
        let j = 1
        let position = num-1
        console.log(position)
        let rpimg = this.state.pimg
        let rfile = e.target.files
        console.log(rpimg)
        console.log(rfile)
        let trypush = this.state.pimg.concat(e.target.files)
        rpimg.splice(position,1,rfile)
        console.log(rpimg)
        this.setState({
            pimg: rpimg,

        })

        setTimeout(() => {
            console.log(this.state.pimg)
            console.log(this.state.pimg.length)
            let check = false
            for(j=0;j<this.state.pimg[position].length;j++){
                console.log(this.state.pimg[position][j])
                if(this.state.pimg[position][j].type==="image/apng"||this.state.pimg[position][j].type==="image/avif"||this.state.pimg[position][j].type==="image/gif"||this.state.pimg[position][j].type==="image/jpeg"||this.state.pimg[position][j].type==="image/png"||this.state.pimg[position][j].type==="image/svg+xml"||this.state.pimg[position][j].type==="image/webp"){
                }
                else{
                    check = true
                }
                filearray.push(URL.createObjectURL(e.target.files[j]))
                
            }
            if(check){
                this.setState({
                    fileReady: false
                })
                
            }
            else{
                this.setState({
                    fileReady: true
                })
                if(position===0){
                    this.setState({
                        preparefile1: filearray
                    })
                }
                if(position===1){
                    this.setState({
                        preparefile2: filearray
                    })
                }
                if(position===2){
                    this.setState({
                        preparefile3: filearray
                    })
                }
                if(position===3){
                    this.setState({
                        preparefile4: filearray
                    })
                }
                if(position===4){
                    this.setState({
                        preparefile5: filearray
                    })
                }
            }
            console.log(this.state.fileReady)
            this.setState({
                errormsg: true
            })
            // console.log(this.state.preparefile1)
            // console.log(filearray)
        }, 1000);
    }

    letkillthislove(num){
        if(num===1){
        return this.state.preparefile1.map(currentfile=>
            {
                return <img src={currentfile} className="w-24 h-24 object-cover"/>
            }
        )
    }
        else if(num===2){
        return this.state.preparefile2.map(currentfile=>
            {
                return <img src={currentfile} className="w-24 h-24 object-cover"/>
            }
        )
    }
    else if(num===3){
        return this.state.preparefile3.map(currentfile=>
            {
                return <img src={currentfile} className="w-24 h-24 object-cover"/>
            }
        )
    }
    else if(num===4){
        return this.state.preparefile4.map(currentfile=>
            {
                return <img src={currentfile} className="w-24 h-24 object-cover"/>
            }
        )
    }
    else if(num===5){
        return this.state.preparefile5.map(currentfile=>
            {
                return <img src={currentfile} className="w-24 h-24 object-cover"/>
            }
        )
    }
    }

    onSubmit(e) {
        e.preventDefault();
            let data = new FormData()

            let lenimg = this.state.pimg.length

            let i = 0;
            let j = 0;
            for(j=0;j<5;j++){
                let url = []
                for(i=0;i<this.state.pimg[j].length;i++){
                    console.log(this.state.pimg[j][i])
                    data.append("file",this.state.pimg[j][i])
                    data.append("upload_preset","valyoo")
                    data.append("cloud_name","ProjectWhite")
                    fetch("https://api.cloudinary.com/v1_1/projectwhite/image/upload",{
                        method:"post",
                        body:data
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        // mem = this.state.pimg[j][i]
                        // // mem.splice(i,1,data.url)
                        // console.log(mem)
                        url.push(data.url) 
                        // console.log(url)
                        // let mem = this.state.pimg
                        // mem.splice((j,i),1,url)
                        // console.log(mem)
                        // // mem[j][i] = url
                        // this.setState({
                        //     pimg:mem
                        // })
                        // console.log(mem)
                    })
                    .catch(err=>{
                        console.log(err)
                    })


            
                    }
                    setTimeout(() => {
                        console.log(url)
                        const please = this.state.pimg.slice(1)
                        please.splice(j,0,url)
                        this.setState({
                            pimg: please
                        })
                        console.log(this.state.pimg)
                    }, 1000);

            }



        setTimeout(() => {
                this.setsent()
                window.location = '/'
        }, 35000);



        

    }
    valueSet(){
        if(this.state.showOptionFoot===true){
    return this.state.ptcolotcrea.map( currentnum=>{
        return  <div onChange={(e)=>this.onChangeTypeQuantity(e,currentnum)} className="border p-2 ml-3">
        <input type="text" className="rounded-none appearance-none border w-48 px-4 py-3 mb-3 font-primary3 " placeholder="Color name" required/><br></br>
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="4US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="4.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="5.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="6US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="6.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="7US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="7.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="8US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="8.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="9US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="9.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="10US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="10.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="11US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="11.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="12US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="12.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="13US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="13.5US" />
        <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="14US" />
        <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3  font-primary3 text-grey-500" type="file" multiple placeholder="IMG" onChange={(e)=>this.onChangeImg(e,currentnum)} />
        <div className="flex">
                 {this.letkillthislove(currentnum)}
                 </div>

    </div>   
                            })
    }
    else if(this.state.showOptionAppe===true){
        return this.state.ptcolotcrea.map( currentnum=>{
            return  <div onChange={(e)=>this.onChangeTypeQuantity(e,currentnum)} className="border p-2">
            <input type="text" className="rounded-none appearance-none border w-48 px-4 py-3 mb-3 font-primary3 " placeholder="Color name" required/><br></br>
            <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="XS" />
            <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="S" />
            <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="M" />
            <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="L" />
            <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="XL" />
            <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="2XL" />
            <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3  font-primary3 text-grey-500" type="file" multiple placeholder="IMG" onChange={(e)=>this.onChangeImg(e,currentnum)} />
        <div className="flex">
                 {this.letkillthislove(currentnum)}
                 </div>
        </div>
                                })
        
    }
    else if(this.state.showOptionAsse===true){
        return this.state.ptcolotcrea.map( currentnum=>{
            return  <div onChange={(e)=>this.onChangeTypeQuantity(e,currentnum)} className="border p-2">
                <input type="text" className="rounded-none appearance-none border w-48 px-4 py-3 mb-3 font-primary3 " placeholder="Color name" required/><br></br>
                <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="OSFM" />
                <input type="number" min="0" className="rounded-none appearance-none border w-16 pl-2 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="OSFW" />
                <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3  font-primary3 text-grey-500" type="file" multiple placeholder="IMG" onChange={(e)=>this.onChangeImg(e,currentnum)} />
        <div className="flex">
                 {this.letkillthislove(currentnum)}
                 </div>
        </div>
                                })
        
    }
}


    setsent(e){
        this.setState({
            pquan: this.state.memptquan,
        })
        let slot = this.state.pimg
        let i = 0
        for (i=0;i<slot.length;i++){
            if(slot[i].length===0){
                slot.splice(i,slot.length)
            }
        }
        const prod = {
            pname: this.state.pname,
            pprice: this.state.pprice,
            pdesc: this.state.pdesc,
            pquan: this.state.pquan,
            ptype: this.state.ptype,
            pdivn: this.state.pdivn,              
            pbrand: this.state.pbrand,      
            pimg: slot, 
            psex: this.state.psex,
            ptcolor: this.state.ptnamecol
        }
    
        console.log(prod);

        axios.post('http://localhost:5000/product/add',prod)
        .then(res => console.log(res.data));

        this.setState({
            pname: '',
            pprice: '',
            pdesc: '',
            pquan: '',
            ptquan:'',
            ptype: '',
            pdivn: '',              
            pbrand: '',      
            pimg: '',    
            psex: ''  
        })

    }

    render() {
        return (
            <div className="flex flex-col ">
            <form className="max-w-lg self-center" action="#" onSubmit={this.onSubmit}>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 mt-8 font-primary3 text-grey-500" type="text" placeholder="Product Name" value={this.state.pname}
                    onChange={this.onChangeProductName} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Price" value={this.state.pprice}
                    onChange={this.onChangePrice} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Description" value={this.state.pdesc}
                    onChange={this.onChangeDescription} required/>

                <select required onChange={this.handleOption} className="rounded-none appearance-none border w-full px-4 py-3 mb-6 font-primary3 ">
                    <option value="" selected disabled hidden>Division</option>
                    <option value="1" >Shoes</option>
                    <option value="2" >Clothing</option>
                    <option value="3" >Accessories</option>
                </select>
                <select required onChange={this.onChangeSex} className="rounded-none appearance-none border w-36 px-4 py-3 mb-6 font-primary3 " >
                            <option value="" selected disabled hidden>Sex</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                </select>
                <select required onChange={this.onChangeBrand} className="rounded-none appearance-none border w-36 px-4 py-3 mb-6 ml-4 font-primary3 " >
                            <option value="" selected disabled hidden>Brand</option>
                            <option value="adidas">Adidas</option>
                            <option value="nike">Nike</option>
                            <option value="new_balance">New Balance</option>
                            <option value="fila">Fila</option>
                            <option value="under_armour">Under Armour</option>
                            <option value="puma">Puma</option>
                            {/* <option value="champion">Champion</option> */}
                </select>

                        
                {this.state.showOptionAppe && 
                            <select onChange={this.onChangeType} required className="rounded-none appearance-none border w-36 px-4 py-3 mb-6 ml-4 font-primary3 " >
                            <option value="" selected disabled hidden>Product Type</option>
                            <option value="t-shirts">T-Shirts</option>
                            <option value="shorts">Shorts</option>
                            <option value="pants">Pants</option>
                            <option value="jerseys">Jerseys</option>
                            <option value="hoodies">Hoodies</option>
                            <option value="tracksuits">Tracksuits</option>
                            <option value="jackets">Jackets</option>
                            <option value="sweatshirts">Sweatshirts</option>
                </select>
       }
                {this.state.showOptionFoot &&                
                            <select onChange={this.onChangeType} required className="rounded-none appearance-none border w-36 px-4 py-3 mb-6 ml-4 font-primary3 " >
                            <option value="" selected disabled hidden>Product Type</option>
                            <option value="sneakers">Sneakers</option>
                            <option value="football boots">Football Boots</option>
                            <option value="slides flip flops">Slides & Flip Flops</option>
                            <option>Other Sports Shoes</option>
                </select>}
                {this.state.showOptionAsse &&                
                            <select onChange={this.onChangeType} required className="rounded-none appearance-none border w-36 px-4 py-3 mb-6 ml-4 font-primary3 " >
                            <option value="" selected disabled hidden>Product Type</option>
                            <option value="bags">Bags</option>
                            <option value="headwear">Headwear</option>
                            <option value="socks leg warmers">Socks & Leg Warmers</option>
                            </select>
                            }
                            <div>
                <label className="rounded-none appearance-none px-0 py-3 mb-3 font-primary3 text-xs text-center" for="typen">Color amount :</label>
                <input id="typen" type="number" className="rounded-none appearance-none border w-18 py-3 mb-6 ml-1 text-center font-primary3 "value={this.state.ptcolor} onChange={e => this.setNum(e)} min="1" max="5" required/>
                </div>
                {this.state.showOptionFoot && this.valueSet()}
                {this.state.showOptionAppe && this.valueSet()}
                {this.state.showOptionAsse && this.valueSet()}
                 {/* <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Quantity" value={this.state.pquan}
                    onChange={this.onChangeQuantity} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Category" value={this.state.pdivn}
                    onChange={this.onChangeDivision} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Brand" value={this.state.pbrand}
                    onChange={this.onChangeBrand} required/> */}

                 {!this.state.fileReady &&  this.state.errormsg &&<div className="font-primary3 text-red-500">Please upload only image/type file</div> }
                 {!this.state.fileReady&&<button className=" rounded-none shadow bg-gray-400 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline" disabled>Add</button>}
                 {this.state.fileReady &&<button className=" rounded-none shadow bg-gray-800 hover:bg-gray-700 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">Add</button>}
                
             </form>
        </div>
        )
    }

}