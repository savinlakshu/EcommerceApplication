import React from 'react'
import {Navbar,NavbarBrand,NavbarText,Nav} from 'reactstrap'
import {FaApple, FaWindows} from 'react-icons/fa'
import {MdCall} from 'react-icons/md'
import "../Footer.css"
const Footer = ()=>{
    return(
        <Navbar className="bottom text-white bg-info ">
            <NavbarBrand>
                <FaApple className="mr-4"/>
                <FaWindows className="mr-4"/>
                <MdCall/>
            </NavbarBrand>
            <div className="textFooter">
               <Nav>
                   <NavbarText className="text-white font-weight-bold justify-content-center">Top-10 Store</NavbarText>
               </Nav>
            </div>
        </Navbar>
    )
}

export default Footer;