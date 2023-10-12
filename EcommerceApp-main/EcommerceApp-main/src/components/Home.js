import React,{useContext} from 'react'
import webStore03 from "../Img/webStore03.jpg";
import defaultProfile from "../Img/defaultProfile.png"
import "../Header.css"
import {NavbarBrand,Navbar,NavItem,NavLink,Nav,Button} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../Home.css"

import { Link } from 'react-router-dom';
import clientContext from '../userContext/clientContext'
import { toast,ToastContainer } from 'react-toastify';

const Home = ()=>{
        const userContext = useContext(clientContext)

        const handleLog =()=>{
            userContext.setUser({});
            toast("user Logged-out.",{type:"success"})
        }
        
    return(
        <>
        <ToastContainer position="top-right"/>
        <Navbar  className="bg-dark navbar-light sticky-top" >
        <NavbarBrand className="text-light font-weight-bold "><h3>Top-10 Store</h3></NavbarBrand>
        <div className="userInfo">
            <img className="clientImg rounded-circle img-thumbnail" src={userContext.user?.resEmail ? userContext.fetchedUrl : defaultProfile} alt="tag-img"/>
            {userContext.user?.resEmail ? <span className="text-white pt-1 clientEmail">Hello, <h6 className="font-weight-bold">{userContext.user.resEmail}</h6></span> : <h6 className="text-white pt-1 clientEmail">Default-email</h6>}
        </div>
            <Nav >
            
            <NavItem>
               {userContext.user?.resEmail ? 
               (<NavLink tag={Link} onClick={handleLog} className="text-light">
                Log-Out
                </NavLink>) : 
                (<div className="navBox">
                <NavLink tag={Link} to="/signup" className="text-light">
                Sign-Up
                </NavLink>
            
                 </div>)}
            </NavItem>
            </Nav>

        </Navbar>
        
        <div className="home">
            
            <img className="mainImg" src={webStore03} alt="Home-img"/>
            <div>
            <h3 className="newFont">New here,then go to Sign-Up.</h3>
            <br/>
            <h2>Upto 30% OFF on all Products...</h2>
            <br/>
            <h1 className="font-weight-bold text-danger">BLACK FRIDAY SALE.</h1>
            <Button color="dark" className="btn-lg" to={userContext.user?.resEmail ? "/store" : "/signup"} tag={Link} >Shop-Now</Button>
            </div>
        </div>
        </>    

    )
}
export default Home;