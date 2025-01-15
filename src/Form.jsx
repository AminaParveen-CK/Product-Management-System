// ...............notes..................
// This form is for adding a new product to the table products. here usenavigate hook is used to navigate to the home page when the form is submitted. 
// ProductData is a usestate variable to store the values submitted from the form as an object.
// Set a unique name for each form control and set a same functionname getinputdata in the onchange of each form control.
// Inside the getinputdata update the ProductData using spread operator with the datas entered in the form by formdata getting method.
// In the form tag set a function submitdata in the onsubmit. 
// Inside submit data :
//    e.preventDefault is used to avoid the automatic refreshing property.
//       create a variable Allproducts and set it with an array spreading elements of products which has values got by the api integration and add the ProductData to theend of Allproducts. Now Allproducts has the array with the newly added product. In the table page we are mapping to the table from the products. therefore we have to update the products with the Allproducts so that the added product get updated in the table.
// here e.target.reset() is used to refresh the form after submission

import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { samplecontext } from './App';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate=useNavigate()
 const {ProductData,setProductData,products,setproducts}=useContext(samplecontext)

// const idvalue=ProductForm.getElementById('formid').innerHTML;
// console.log(idvalue);
// defaultValue={products.length+1}

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
     <Form className='p-5' onSubmit={submitdata} style={{width:'40%',margin:'auto',border:'2px solid skyblue',borderRadius:'3%',backgroundColor:'rgb(239, 246, 248)'}}>
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
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="Enter Stock" name='stock' onChange={getinputdata}/>
      </Form.Group>
     
      <Button  variant="primary" type="submit">
        Submit
      </Button>
      
    </Form>
    </div>
  )
}

export default ProductForm