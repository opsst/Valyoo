import React ,{ Component, useState } from 'react';
import axios from 'axios';
import { ConnectionBase } from 'mongoose';
import { fireEvent } from '@testing-library/dom';
import { findAllByTestId } from '@testing-library/dom';

// // Import React FilePond
// import { FilePond, registerPlugin } from "react-filepond";
// import "filepond/dist/filepond.min.css";

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default class Addprod extends Component{
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeTypeQuantity = this.onChangeTypeQuantity.bind(this);
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeDivision = this.onChangeDivision.bind(this);
        this.onChangeSex = this.onChangeSex.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.letkillthislove = this.letkillthislove.bind(this);

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
            pimg: '',
            purl:'' ,
            showOption:false,
            showOptionFoot:false,
            showOptionAppe:false,
            showOptionAsse:false,
            file:[],
            fileReady:false,
            errormsg:false,
            memptquan:[]
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
            let prototypeShoe = [["4US",0],["4.5US",0],["5US",0],["5.5US",0],["6US",0],["6.5US",0],["7US",0],["7.5US",0],["8US",0],["8.5US",0],["9US",0],["9.5US",0],["10US",0],["10.5US",0],["11US",0],["11.5US",0],["12US",0],["12.5US",0],["13US",0],["13.5US",0],["14US",0],["15US",0],]
            this.setState({
                showOptionFoot:true,
                showOptionAppe:false,
                showOptionAsse:false,
                pdivn:"shoes",
                memptquan:prototypeShoe
            })
        }
        else if(e.target.value==="2"){
            let prototypeCloth = [["XS",0],["S",0],["M",0],["L",0],["XL",0],["2XL",0],]
            this.setState({
                showOptionAppe:true,
                showOptionFoot:false,
                showOptionAsse:false,
                pdivn:"clothing",
                memptquan:prototypeCloth
                
            })
        }
        else if(e.target.value==="3"){
            let prototypeAsse = [["OSFM",0],["OSFW",0]]
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
    onChangeTypeQuantity(e) {
        // console.log(e.target.value)
        // console.log(e.target.placeholder)
        let k=0;
        for(k=0;k<this.state.memptquan.length;k++){
            // console.log(this.state.memptquan[k][0])
            if(this.state.memptquan[k][0]===e.target.placeholder){
                let ram = this.state.memptquan
                ram[k][1] = Number(e.target.value)
                
                this.setState({
                    memptquan : ram
                })
                console.log(this.state.memptquan)
            }
            
        }
        // this.setState({
        //     ptquan: e.target.value
        // })
    }
    onChangeQuantity(e) {
        // console.log(e.target.value)
        // console.log(e.target.placeholder)
        let x = []
        let y = []
        if(this.state.pdivn==="clothing"){
            if(e.target.placeholder==="XS"){
                x.push(e.target.value)
                y.push(e.target.placeholder)
            }
        }
        console.log(x)
        console.log(y)
        // this.setState({
        //     pquan: e.target.value
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
    onChangeImg(e){
        let filearray = []
        let j = 1



        this.setState({
            pimg: e.target.files,

        })
        setTimeout(() => {
            console.log(this.state.pimg.length)
            let check = false
            for(j=0;j<this.state.pimg.length;j++){

                if(e.target.files[j].type==="image/apng"||e.target.files[j].type==="image/avif"||e.target.files[j].type==="image/gif"||e.target.files[j].type==="image/jpeg"||e.target.files[j].type==="image/png"||e.target.files[j].type==="image/svg+xml"||e.target.files[j].type==="image/webp"){
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
            }
            console.log(this.state.fileReady)
            this.setState({
                file: filearray,
                errormsg: true
            })
            console.log(filearray)
            console.log(this.state.file[0])
        }, 1000);
    }

    letkillthislove(){
        return this.state.file.map(currentfile=>
            {
                return <img src={currentfile} className="w-24 h-24 object-cover"/>
            }
        )
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.pimg.length)
        const data = new FormData()
        let lenimg = this.state.pimg.length
        let mem = []
        let i = 0;
        for(i=0;i<lenimg;i++){
        data.append("file",this.state.pimg[i])
        data.append("upload_preset","valyoo")
        data.append("cloud_name","ProjectWhite")
        fetch("https://api.cloudinary.com/v1_1/projectwhite/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            mem.push(data.url)
            console.log(mem)

        })
        .catch(err=>{
            console.log(err)
        })


        }
        setTimeout(() => {
            if(i===(lenimg)){
                this.setState({
                    pimg: mem
                })
                this.setsent()
                // window.location = '/'
            }
        }, 5000);

        // mem.push(this.state.pimg[0])
        // mem.push(this.state.pimg[1])
        
        // console.log(this.state.pimg[0])
        // console.log(this.state.pimg[1])
        // data.append("file",this.state.pimg)
        // data.append("upload_preset","valyoo")
        // data.append("cloud_name","ProjectWhite")
        // fetch("https://api.cloudinary.com/v1_1/projectwhite/image/upload",{
        //     method:"post",
        //     body:data
        // })
        // .then(res=>res.json())
        // .then(data =>{
        //     this.setState({
        //         pimg: data.url
        //     })
            // console.log(this.state.pimg)
            
        // })



        

    }
    setsent(e){
        let x = 0
        let ramForpquan = []
        let ramForptquan = []
        for (x=0;x<this.state.memptquan.length;x++){
            ramForptquan.push(this.state.memptquan[x][0])
            ramForpquan.push(this.state.memptquan[x][1])
        }
        this.setState({
            pquan: ramForpquan,
            ptquan: ramForptquan
        })
        const prod = {
            pname: this.state.pname,
            pprice: this.state.pprice,
            pdesc: this.state.pdesc,
            pquan: this.state.pquan,
            ptquan:this.state.ptquan,
            ptype: this.state.ptype,
            pdivn: this.state.pdivn,              
            pbrand: this.state.pbrand,      
            pimg: this.state.pimg, 
            psex: this.state.psex     
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
                            <option value="new balance">New Balance</option>
                            <option value="fila">Fila</option>
                            <option value="under armour">Under Armour</option>
                            <option value="puma">Puma</option>
                            <option value="champion">Champion</option>
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
                </select>}
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
                {this.state.showOptionFoot && <div onChange={this.onChangeTypeQuantity} className="">
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="4US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="4.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="5.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="6US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="6.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="7US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="7.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="8US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="8.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="9US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="9.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="10US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="10.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="11US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="11.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="12US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="12.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="13US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="13.5US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="14US" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-6 mr-1 font-primary3 text-xs text-center" placeholder="15US" />
                    
                </div>        
                            }
                {this.state.showOptionAppe && <div onChange={this.onChangeTypeQuantity} className="">
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="XS" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="S" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="M" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="L" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="XL" />
                    <input type="text"className="rounded-none appearance-none border w-10 px-0 py-3 mb-6 mr-1 font-primary3 text-xs text-center" placeholder="2XL" />
                    
                </div>        
                            }
                {this.state.showOptionAsse && <div onChange={this.onChangeTypeQuantity} className="">
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="OSFM" />
                    <input type="text" className="rounded-none appearance-none border w-10 px-0 py-3 mb-3 mr-1 font-primary3 text-xs text-center" placeholder="OSFW" />

                    
                </div>        
                            }
                 {/* <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Quantity" value={this.state.pquan}
                    onChange={this.onChangeQuantity} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Category" value={this.state.pdivn}
                    onChange={this.onChangeDivision} required/>
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3 mb-6 font-primary3 text-grey-500" type="text" placeholder="Brand" value={this.state.pbrand}
                    onChange={this.onChangeBrand} required/> */}
                 <input className="rounded-none appearance-none border bg-gray-200 w-full px-4 py-3  font-primary3 text-grey-500" type="file" multiple placeholder="IMG" onChange={this.onChangeImg} />
                 <div className="flex">
                 {this.letkillthislove()}
                 </div>
                 {!this.state.fileReady &&  this.state.errormsg &&<div className="font-primary3 text-red-500">Please upload only image/type file</div> }
                 {!this.state.fileReady&&<button className=" rounded-none shadow bg-gray-400 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline" disabled>Add</button>}
                 {this.state.fileReady &&<button className=" rounded-none shadow bg-gray-800 hover:bg-gray-700 my-10 text-white font-bold py-4 px-8 font-primary2  focus:outline-none focus:shadow-outline">Add</button>}
                
             </form>
        </div>
        )
    }

}