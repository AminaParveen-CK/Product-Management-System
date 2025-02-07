import { createContext, useEffect, useState } from 'react';
import './App.css';
import ProductForm from './Form';
import ProductTable from './Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import Editform from './Editform';
import { ToastContainer } from 'react-toastify';
const samplecontext =createContext();
function App() {
  const [products, setproducts] = useState([])
  const [filteredproduct, setfilteredproduct] = useState()
  const [productId, setproductId] = useState()
  const [ProductData, setProductData] = useState(
    {
     id:'',
     title:'',
     brand:'',
     price:'',
     stock:'',
   } );
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response)=>setproducts(response.data.products))
  }, [setproducts])
 
  
  return (
    <div className="App">
      <samplecontext.Provider value={{ProductData,setProductData,products,setproducts,filteredproduct,setfilteredproduct,productId,setproductId,}}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductTable/>}/>
        <Route path='/productform' element={<ProductForm/>}/>
        <Route path='/editform' element={<Editform/>}/>
      </Routes>
      </BrowserRouter>
      <ToastContainer />
      </samplecontext.Provider>   
    </div>
  );
}

export default App;
export {samplecontext}
