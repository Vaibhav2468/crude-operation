import React, { useState,useEffect } from 'react'
import "./App.css"
import axios from 'axios'
import FormTable from './components/FormTable'
axios.defaults.baseURL ="http://localhost:4000/"
const App = () => {
  const [addSection,setAddSection]=useState(false)
  const [editSection,setEditSection]=useState(false)
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    mobile:"",
  })
  const [formDataEdit,setFormDataEdit]=useState({
    name:"",
    email:"",
    mobile:"",
    _id:"",
  })
  const [dataList,setDataList]=useState([])
  const handleOnChange=(e)=>{
    const {value,name}=e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }
  const  handleSubmit= async(e)=>{
    e.preventDefault()
    const data= await axios.post("http://localhost:4000/create",formData)
    //console.log(data)
    if(data.data.succes){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name :"",
        email :"",
        mobile :"kk"
      })
    }
  }
  const getFetchData=async()=>{
    const data=await axios.get("/")
   // console.log(data,"jjj")
    if(data.data.success){
      setDataList(data.data.data)
      //alert(data.data.message)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])
  
  
  const handleDelete= async(id)=>{
    const data=await axios.delete("/delete/"+id)
  
      if(data.data.succes){
        getFetchData()
        alert(data.data.message)
      }
    }
    const handleUpdate = async(e)=>{
      e.preventDefault()
      const data = await axios.put("/update",formDataEdit)
      if(data.data.succes){
        getFetchData()
        alert(data.data.message)
        setEditSection(false)
      }
    }
    const handleEditOnChange=async(e)=>{
      const {value,name}=e.target
        setFormDataEdit((preve)=>{
          return{
            ...preve,
            [name]:value
          }
        })
    
    }
    const handleEdit = (el)=>{
      //console.log(el,"eeeeeeeeeeee")
      setFormDataEdit(el)
      setEditSection(true)
    }
  return (
    <>
    <div className='container'>
      <button className='btn-add btn'onClick={()=>setAddSection(true)}>Add</button>
      {
        addSection &&(
          <FormTable
           handleClose={()=>setAddSection(false)}
           handleSubmit={handleSubmit}
           handleOnChange={handleOnChange}
           rest={formData}
           />
        )
      }
      {
          editSection &&(
            <FormTable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleClose= {()=>setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }

<div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th className='th'>Name</th>
                <th className='th'>Email</th>
                <th className='th'>Mobile</th>
                <th className='th'>
                  
                </th>
              </tr>
              
              </thead>
             
                { dataList[0]?(
                  dataList.map((el,index)=>{
                    
                    return(
                      <tbody>
                      <tr key={index}>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td>
                        <button className='btn btn-edit'onClick={()=>handleEdit(el)}>Edit</button>
                        <button className='btn btn-delete'onClick={()=>handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                      </tbody>
                    )
                  })):(
                    
                      <tbody>
                        <tr>
                          <td>Empty data</td>
                          <td>Empty data</td>
                          <td>Empty data</td>
                          </tr>
                        </tbody>
                  )
                }
              
           
          </table>
        </div>
    </div>
    </>
  )
}

export default App;
