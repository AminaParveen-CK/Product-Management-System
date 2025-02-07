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

  // ......view ......
  const viewhandleShow = (id) => {
  setproductId(id)
     setShow(true);
     const filter=products?.filter((product)=>
      product.id===id)[0]
     setfilteredproduct(filter)
  }
  const viewhandleClose = () => setShow(false);

  // ........edit...........
  const handleShow = (item) => {
   setproductId(item.id)
      // setShow(true);
  }
    
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

      <h2 className=' text-center p-4'>PRODUCTS TABLE</h2>
      <Table responsive="sm" className='table responsive p-5 m-auto'  bordered hover>
       <thead>
        <tr >
          <th >Id</th>
          <th className='w-auto'>Product Name</th>
          <th>Brand</th>
          <th>Price</th>
        </tr>
       </thead>
       <tbody>
       {(searchitem?.length===0 ? products : searchfilter )?.map((item)=>{
        return(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.brand}</td>
          <td>{item.price}</td>

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
             <p><strong>Description :</strong>{filteredproduct?.description}</p>
             <p><strong>Category :</strong> {filteredproduct?.category}</p>
             <p><strong>Brand :</strong> {filteredproduct?.brand}</p>
             <p><strong>Rating :</strong> {filteredproduct?.rating}</p>
             <p><strong>Stock :</strong> {filteredproduct?.stock}</p>
            </Modal.Body>
            <Modal.Footer>
             <Button variant="primary" onClick={viewhandleClose}>Close </Button>
            </Modal.Footer>
           </Modal>

          <Link to={'/editform'} > 
           <Button className='edit-btn' onClick= {()=>handleShow(item)} variant="primary"> <GrEdit color='black'/></Button>
          </Link>
         
          <Button className='delete-btn' onClick={()=>deletehandleShow(item.id)} variant="danger m-2"><RiDeleteBinFill color='black'/></Button>
           <Modal show={deleteShow} onHide={deletehandleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>Are you sure to delete?</Modal.Body>
            <Modal.Footer>
             <Button variant="secondary" onClick={deletehandleClose}> Cancel </Button>
             <Button variant="danger" onClick={deleteitem}> Delete </Button>
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