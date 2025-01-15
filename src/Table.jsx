// ...............notes..................
// This is the homepage of the project where the table of products is diplayed. 
// here products is the usestate which is updated with the values taken from api in the app.jsx page. 
// we display the products in the table by mapping inside the table body. 
// In the table we add an extra column with the View,edit and delete buttons for each row in the table. 
// Also we add a button create product below the table to add new products to the table.and link the button to the form page. The form page has the whole logic to add the new product to the table.


// Since we have to use the filtered product based on the one we clicked in both the view and edit in the editform page we create the usestates productId and filteredproduct in the parent page App.jsx and pass it to this page using useContext.

// ...............view button..................
// The whole logic of view button is in this page.
// 1 First create a button with view icon from react icons. 
// 2 Copy paste code of modal component from react bootstrap which also include a usestate show and 2 functions handleClose and handleShow. 
// 3 In the onclick of the button set the function handleshow by passing item.id as a callback so that we can filter the product with the passed id from the products object.
// 4 Inside the handleshow since we passed id as callback we recieve the id in the arguement of the function and we can update the productId with the passed id.
// 5 We apply filter method to the products object by comparing each product's id with the id we passed as productId to find the product we selected to view and assign it to a variable filter.
// here since products is an array and the filter method returns an array with the filtered product, we have to use [0] to access the only first element of the filter array.
// 6 set the filteredproduct usestate as filter because we need the filteredproduct also in the edit page.
// 7 since filteredproduct is an object we dont need mapping and all we can access values from filteredproduct using dot opeerator. 
// 8 in the modal body, add the fields to display in the view of products with values as filteredproduct.value in the products api. 
// here the ? is used to make sure the code after that works only after fetching data to the filteredproduct.
// Also images in api are given as arrays so while using them use images[0]

import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GrEdit } from "react-icons/gr";
import { FaRegEye } from "react-icons/fa";
import {  RiDeleteBinFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { samplecontext } from './App';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './table.css'
import { toast } from 'react-toastify';
const ProductTable = () => {
  const navigates=useNavigate()
  const {products,setproducts,filteredproduct,setfilteredproduct,productId,setproductId}=useContext(samplecontext)

const [show, setShow] = useState(false);
const [deleteShow, setdeleteShow] = useState(false);
const [searchitem, setsearchitem] = useState('');
const [searchfilter,setsearchfilter] = useState('')
// ......view ......
const viewhandleShow = (id) => {
  setproductId(id)
     setShow(true);
     const filter=products?.filter((product)=>
      product.id===productId)[0]
     setfilteredproduct(filter)
   }
const viewhandleClose = () => setShow(false);

 // ........edit...........
    const handleShow = (item) => {
   setproductId(item.id)
      setShow(true); }
    
      // ........delete...........
      const deletehandleShow=(id)=>{
      setproductId(id)
       setdeleteShow(true)
      }
      const deletehandleClose=()=>setdeleteShow(false);

      const deleteitem=()=>{
        setproducts((e) =>
          e?.filter((product) => product?.id !== productId))
        setdeleteShow(false);
        toast.error('Deleted Successfully!');
        navigates('/');
      }
    

    // ......search ......
  const searching=(e)=>{
    e.preventDefault()
setsearchitem(e.target.value)
  }
  useEffect(() => {
    if(searchitem?.length===0){
      setsearchfilter(products)  
    }
    else if(searchitem?.length>0){
      console.log(searchitem);
      
      const results = products?.filter(
        (item) =>
          item?.title?.toLowerCase().includes(searchitem?.toLowerCase())||
          item?.brand?.toLowerCase().includes(searchitem?.toLowerCase())
      )
      setsearchfilter(results)
    }
  }, [products,searchitem])
  
  return (
    <div className='whole-page'>
     <Form inline>
        <Row  className='search'>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              name='search' 
              onChange={searching}
            />
          </Col>
        </Row>
      </Form>

      <h2 className='text-center p-4'>PRODUCTS TABLE</h2>
<Table className='table p-5 m-5 w-75 m-auto'  bordered hover>
      <thead>
        <tr >
          <th>Id</th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
      {(searchitem?.length===0 ? products : searchfilter )?.map((item)=>{
        return(
        <tr>
           <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.brand}</td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
    
         <td>

         <Button className='view-btn' onClick={()=>viewhandleShow(item.id)} variant="warning m-2"><FaRegEye /></Button>
        
         <Modal  show={show} onHide={viewhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>{filteredproduct?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
         <img src={filteredproduct?.images[0]} alt="" width={'100%'} height={'auto'} />
         </div>
           <h4> <strong>Price : $</strong>{filteredproduct?.price}</h4>
           <h6><strong>Discount</strong> : {filteredproduct?.discountPercentage} % </h6>
           <p> <strong>Description :</strong>{filteredproduct?.description}</p>
           <p><strong>Category :</strong> {filteredproduct?.category}</p>
          <p><strong>Brand :</strong> {filteredproduct?.brand}</p>
           <p><strong>Rating :</strong> {filteredproduct?.rating}</p>
           <p><strong>Stock :</strong> {filteredproduct?.stock}</p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={viewhandleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

        <Link to={'/editform'} > 
         <Button className='edit-btn' onClick= {()=>handleShow(item)} variant="primary"> <GrEdit color='black'/></Button>
         </Link>
         
          <Button className='delete-btn' onClick={()=>deletehandleShow(item.id)} variant="danger m-2"><RiDeleteBinFill color='black'/></Button>
          <Modal show={deleteShow} onHide={deletehandleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>Are you sure to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deletehandleClose}>
            cancel
          </Button>
          <Button variant="danger" onClick={deleteitem}>
            Delete
          </Button>
       
        </Modal.Footer>
      </Modal>

           </td>
        </tr>
         )
        })}
      </tbody>
    </Table>
    <div className='text-center '>
     <Link to={'/productform'} > 
       <Button className='create-btn' variant="primary m-5">CREATE PRODUCT</Button>
    </Link>
    </div>

   </div>
  )
}

export default ProductTable