import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,BrowserRouter as Router,Switch,Link, Redirect } from "react-router-dom"
import  Signin from "./components/Signin"
import  Signup from "./components/Signup"
import  ShoppingStore from "./components/ShoppingStore"
import Pagenotfound from "./components/Pagenotfound"
import Cart from './components/Cart'
import Home from "./components/Home"
import firebase from 'firebase/app'
import firebaseConfig from './firebase/firebase'
import clientContext from "./userContext/clientContext";
import {productContext} from './userContext/clientContext'
import {macProductContext} from './userContext/clientContext'
import {cartItems} from './userContext/clientContext'
import "react-toastify/dist/ReactToastify.css"

firebase.initializeApp(firebaseConfig);

const App = ()=> {
  const [user,setUser] = useState({});
  const [fetchedUrl,setFetchedUrl] = useState("")
  const [productInfo,setProductInfo] = useState([])
  const [macProductInfo,setMacProductInfo] = useState([])
  const [items,setItems] = useState([]);
  return (
    
      <Router>
        
        <clientContext.Provider value={{user,setUser,fetchedUrl,setFetchedUrl}} >
        <productContext.Provider value={{productInfo,setProductInfo}}>
        <macProductContext.Provider value={{macProductInfo,setMacProductInfo}} >
        <cartItems.Provider value={{items,setItems}}>
        <Switch>
        <Route exact  path="/" component={Home} />
        <Route exact  path="/signin" component={Signin}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/store" component={ShoppingStore}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact  path="*" component={Pagenotfound}/>
        </Switch>
        </cartItems.Provider>
        </macProductContext.Provider>
        </productContext.Provider>
        </clientContext.Provider>
        
        
      </Router>
    
  );
}

export default App;
