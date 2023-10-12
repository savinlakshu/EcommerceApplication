import React,{useContext} from 'react'
import {Container,Navbar,NavbarBrand,Nav,NavLink,NavItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import clientContext from '../userContext/clientContext'
import { cartItems } from '../userContext/clientContext'
import "../Header.css"
import defaultProfile from '../Img/defaultProfile.png'
import Badge from '@material-ui/core/Badge'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import "bootstrap/dist/css/bootstrap.min.css"
import { toast,ToastContainer } from 'react-toastify'



const Header = () =>{
    const userContext = useContext(clientContext)
    const cartContext = useContext(cartItems)
    const handleLog = ()=>{
        userContext.setUser({});
        toast("User logged-out.",{type:"info"})
    }
    return(
        <Container fluid className="pr-0 pl-0 ">
        <ToastContainer position="top-right"/>
        <Navbar  className="bg-info navbar-light mainHeader">
        <NavbarBrand className="text-light font-weight-bold "><h3>Top-10 Store</h3></NavbarBrand>
        
        <div className="userInfo">
        <img className="clientImg rounded-circle img-thumbnail" src={userContext.user?.resEmail ? userContext.fetchedUrl : defaultProfile} alt="tag-img"/>
        {userContext.user?.resEmail ? <span className="text-white pt-1 clientEmail">Hello, <h6 className="font-weight-bold">{userContext.user.resEmail}</h6></span> : <h6 className="text-white pt-1 clientEmail">Default-email</h6>}
        
        </div>
            <Nav >
            <NavItem >
                <NavLink tag={Link} to="/" className="text-light ">
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-light">
                    About
                </NavLink>
            </NavItem>
            
            <NavItem>
               {userContext.user?.resEmail ? 
               (<NavLink tag={Link} onClick={handleLog} to="/" className="text-light">
                Log-Out
                </NavLink>) : 
                (<NavLink tag={Link} to="/signup" className="text-light">
                Sign-Up
                </NavLink>) }
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/cart" >
                    <Badge badgeContent={cartContext.items.length} color="primary">
                    <ShoppingCart fontSize="large" className="text-dark"/> 
                    </Badge>                  
                </NavLink>
            </NavItem>
            
            
            </Nav>
            </Navbar>
            </Container>
    )
}

export default Header;