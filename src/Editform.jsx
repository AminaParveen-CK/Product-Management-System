import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { samplecontext } from './App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Editform = () => {
  const navigate=useNavigate()
  const {products,filteredproduct,productId}=useContext(samplecontext)
 
 const [editProductdata, seteditProductdata] = useState({
    id:filteredproduct?.id,
    title:filteredproduct?.title,
    brand:filteredproduct?.brand,
    price:filteredproduct?.price,
    stock:filteredproduct?.stock,
  })

  const getEditdata=(e)=>{
    seteditProductdata({...editProductdata,[e.target.name]:e.target.value})
  }

  const submitdata=(e)=>{
    e.preventDefault()
    const filter=products?.filter((product)=>
      product?.id===productId)[0]
    console.log(filter);
    
    const indexval=products?.indexOf(filter);
    const editedproducts=products?.splice(indexval,1,{...editProductdata});
    console.log(editedproducts);
    toast.success('Edited Successfully!');
    navigate('/')
  }

  return (
    <div className='edit-form-page' >
      <h1 className='m-auto text-center p-5'>Edit Product</h1>
     <Form className='edit-form' onSubmit={submitdata}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Id</Form.Label>
        <Form.Control type="number"  placeholder="Enter Product Id" name='id' onChange={getEditdata}  defaultValue={filteredproduct?.id} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name" name='title' onChange={getEditdata} defaultValue={filteredproduct?.title}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Brand</Form.Label>
        <Form.Control type="text" placeholder="Enter the brand" name='brand' onChange={getEditdata}  defaultValue={filteredproduct?.brand} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" name='price' onChange={getEditdata} defaultValue={filteredproduct?.price}/>
      </Form.Group>
      <div className="text-center">
      <Button  variant="primary" type="submit">Submit</Button>
      </div>
    </Form>
    </div>
  )
}

export default Editform