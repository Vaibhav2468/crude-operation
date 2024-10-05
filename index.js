const express=require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const { Timestamp } = require('mongodb');
const app=express();
app.use(cors());
app.use(express.json())
const schemaData = mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    Timestamp:true
})
const userModel = mongoose.model("user",schemaData)
app.get('/',async(req,res)=>{ 
const userModel = mongoose.model("user",schemaData)

    console.log(req.body)
    const data =await userModel.find({})
res.json({success:true,data:data})
})
//create data//save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data= new userModel(req.body)
    await data.save()
    res.send({succes:true,message :"data save succesfully",data:data})
})
//update data
app.put("/update",async(req,res)=>{
    //console.log(req.body)
    const {_id,...rest}=req.body
    const data =await  userModel.updateOne({_id :_id},rest)
    res.send({succes:true,message :"data updated succesfully",data:data})
    console.log(data)
})
//delete api
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    res.send({succes:true,message :"data deleted succesfully",data:data})
})
mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{ 
    console.log("connect to DB")
    app.listen(4000);
})
.catch((err)=>console.log(err))
////////////////////////////////////
