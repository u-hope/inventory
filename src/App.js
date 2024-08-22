import './App.css';
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

function App() {
  const [newName,setNewName]=useState("");
  const [newBrand,setNewBrand] = useState("");
  const [newAmout,setNewAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const productCollectionRef = collection(db, "Products")

  const putProduct = async () => {
    await addDoc(productCollectionRef,{name:newName, brand:newBrand, amount:newAmout});
    await window.location.reload();
  }
  const deletUser = async (id) =>{
    const productDoc = doc(db, "Products", id);
    await deleteDoc(productDoc);
  }
  const decreaseField = async (id,amount)=> {
    const productDoc =doc(db,"Products",id);
    const newData = {amount: amount - 1};
    await updateDoc (productDoc,newData);
    await window.location.reload();
  }
  const updateField = async (id, amount) => {
    const userDoc = doc(db,"Products",id);
    const newFields = {amount: amount + 1};
    await updateDoc (userDoc,newFields);
    await window.location.reload();
  }
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef)
      // console.log(data)
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);
  return (<div className='app'>
    <div className='dashboard'>
      <div className='left'>
        <p>AI Based Inventory Management System</p>
        <div className='leftBottom'>
          <ul>
            <li><a href='#' >Dashboard</a></li>
            <li><a href='#'>Inventory</a></li>
            <li><a href='#'>Products</a></li>
            <li><a href='#'>Users</a></li>
            <li><a href='#'>Settings</a></li>
            <li><a href='#'>Expences</a></li>
          </ul>
        </div>
      </div>
      <div className='right'>
        <div className='rightTop'>
        
          <p>
              <div className='topTable'>
                <div>Name</div>
                <div>Brand</div>
                <div>Amount in Stock</div>
              </div> 
          {products.map((product) => {
            return<div className='dataTable'> 
              <div className='bottomTable'>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.amount}</td>
              <div className='tableButton'>
              <button onClick={()=>{updateField(product.id,product.amount)}}>Increase</button>
              <button onClick={()=>{decreaseField(product.id,product.amount)}}>Decrease</button>
              <button onClick={()=>{deletUser(product.id)}}>Delete Product</button>
              </div>
              </div>
            </div>
          })}
          </p>
        </div>
        <div className='rightBottom'>
          <input placeholder='Name of Product' onChange={(event)=>{setNewName(event.target.value)}}/>
          <input placeholder='Brand' onChange={(event)=>setNewBrand(event.target.value)}/>
          <input placeholder='Stock' type='number'onChange={(event)=>{setNewAmount(event.target.value)}}/>
          <button onClick={putProduct}>Add Product</button>
        </div>
      </div>
    </div>
  </div>

  );
}

export default App;
