import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { samplecontext } from './App';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
 const navigate=useNavigate()
 const {ProductData,setProductData,products,setproducts}=useContext(samplecontext)

 const getinputdata=(event)=>{
  setProductData({...ProductData,[event.target.name]: event.target.value})
 } 

 // .........create product.........
 const submitdata=(e)=>{
   e.preventDefault();
   const Allproducts=[...products,ProductData];
   setproducts(Allproducts);
   console.log(products);
   navigate('/')
   e.target.reset();
 }

  return (
    <div className='create-form-page'>
      <h1 className=' text-center p-5'>Create Product</h1>
     <Form className='create-form' onSubmit={submitdata}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Id</Form.Label>
        <Form.Control type="number" placeholder="Enter Product Id" name='id'  onChange={getinputdata}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name" name='title' onChange={getinputdata}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Brand</Form.Label>
        <Form.Control type="text" placeholder="Enter the brand" name='brand' onChange={getinputdata}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" name='price' onChange={getinputdata}/>
      </Form.Group>
     
     <div className="text-center">
      <Button variant="primary" type="submit">Submit</Button>
     </div>
    </Form>
    </div>
  )
}

export default ProductForm