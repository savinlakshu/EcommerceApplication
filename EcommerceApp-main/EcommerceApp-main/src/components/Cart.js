import React,{useContext, useEffect,useState} from 'react';
import {Container,Row,Col,Nav,NavbarBrand,NavItem,NavLink,Navbar,Button} from 'reactstrap'
import {toast,ToastContainer} from 'react-toastify'
import {Link} from "react-router-dom"
import { cartItems } from '../userContext/clientContext'
import clientContext from '../userContext/clientContext'
import defaultProfile from '../Img/defaultProfile.png'
import Badge from '@material-ui/core/Badge'
import emptyCart from '../Img/empty_cart.jpg'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import "bootstrap/dist/css/bootstrap.min.css"



const Cart = ()=>{
    let newCart =[]
    let iniCart = []
    
    let incPrize
    let temp=0;
    const userContext = useContext(clientContext)
    const cartContext = useContext(cartItems)
    
    const handleLog = ()=>{
        userContext.setUser({});
        toast("User logged-out.",{type:"info"})
    }

    const handleCountInc =(pro)=>{
    
    
      newCart=cartContext.items.filter(i=>i.uid !== pro.uid);
      const count = pro.count;
      const prize = (pro.prize / count);
      const incCount = pro.count + 1;
      incPrize = ( pro.prize + prize )
      
        cartContext.setItems([...newCart,{...pro,count : incCount,prize:incPrize}])
      
    }

    

    const handleCountDec =(pro)=>{
        iniCart=cartContext.items.filter(i=>i.uid !== pro.uid);
        const count = pro.count;
        const decPrize = (pro.prize / count);
        const decCount = pro.count - 1;
        const prize = (pro.prize - decPrize)
        cartContext.setItems([...iniCart,{...pro,count : decCount,prize:prize}])
        
    }
    
    //Removing a Item from cart
    const removeItem = (i)=>{
        toast("Item removed Sucessfully.",{type:"error"});
        let newCart = cartContext.items.filter(pro=>pro.uid !== i.uid)
        cartContext.setItems(newCart);
    }
    //Subtotal of cart
     cartContext.items.map(pro=>(
            temp = parseInt(temp) + parseInt(pro.prize)
        )) 
    //final Payment for cart
    const handlePayment = ()=>{
        cartContext.setItems([])
        toast("Purchase Complete...",{type:"success"});
    }
    
    return(
        <div className="bg-light">
        <Container fluid className="pl-0 pr-0 ">
            <Navbar className="bg-dark sticky-top">
                <NavbarBrand className="text-white"><h3>Top-10 Store</h3> </NavbarBrand>
                
                <div className="userInfo">
                    <img className="clientImg rounded-circle img-thumbnail" src={userContext.user?.resEmail ? userContext.fetchedUrl : defaultProfile} alt="tag-img"/>
                </div>
                <Nav >
            
            
            <NavItem >
               {userContext.user?.resEmail ? 
               (<NavLink tag={Link} onClick={handleLog} to="/" className="text-light">
                Log-Out
                </NavLink>) : 
                (<NavLink tag={Link} to="/signup" className="text-light">
                Sign-Up
                </NavLink>) }
                
            </NavItem>
            <NavItem>
                <NavLink tag={Link}>
                    <Badge badgeContent={cartContext.items.length} color="secondary">
                    <ShoppingCart fontSize="large"/> 
                    </Badge>                  
                </NavLink>
            </NavItem>
            </Nav>
            
            </Navbar>
        </Container>
        
        <Grid container direction="row" spacing={3} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ToastContainer position="top-right"/>
            <Grid item xs={11}>
                <Paper className="mt-5">
                    <h2 className="pl-3">Items in Your Cart.</h2>
                    <Divider variant="middle" className="bg-grey"/>
                    {cartContext.items.length > 0 ? 
                    (<div> {cartContext.items.map((i,index)=>(
                    <div key={i.uid}>
                    <Row >
                    <Grid item xs={3}>
                        <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <img src={i.url} width={120} height={100} className="mt-3 mb-4 img-thumbnail"/>
                        </Col>
                    </Grid>
                    <Grid item xs={4}>
                        <Col>
                            <h4 className="pt-5">Name:
                              <b> {i.name}</b>
                            </h4>
                           
                        </Col>
                        </Grid>
                        
                            <Grid item xs={2} >
                                <Col className="pt-5">
                                <Link onClick={()=>handleCountDec(i)}>
                                    <RemoveCircleOutline tag={Link} className="text-primary"/>
                                </Link>
                                <span className="pr-1 pl-1">
                                    <b>
                                        {i.count}
                                    </b>
                                </span>
                                <Link onClick={()=>handleCountInc(i)}>
                                    <AddCircleOutline tag={Link} className="text-primary"/>
                                </Link>
                                </Col>
                            </Grid>
                            
                        <Grid item xs={2} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Col >
                                <h5>
                                    <b>${i.prize}</b>
                                </h5>
                                <button className="btn btn-outline-danger" onClick={()=>removeItem(i)}>
                                    Remove
                                </button>
                            </Col>
                        </Grid>   
                    </Row>
                    <Divider variant="inset" className="bg-grey"/>
                    
                    </div>
                    ))}
                    <Grid container justify="flex-end" alignContent="center" >
                        <Grid item xs={2}>
                            <Row>
                                <Col className=" text-center pt-1 mr-0 pr-0">
                                    <h5>
                                            <b>
                                                Cart-total
                                            </b>
                                    </h5>
                                    
                                </Col>
                                <Col className="text-center pl-0">
                                    <h3>
                                        <b className="ml-2 mr-2">
                                            ${temp}
                                        </b>
                                    </h3>
                                </Col>
                            </Row>
                            
                        </Grid>
                        
                    </Grid>
                    <Row>
                        <Col>
                            <Divider variant="fullWidth"/>
                            <Grid container justify="flex-end" >
                                <Grid item xs={3} style={{paddingLeft:150,paddingTop:10,paddingBottom:10}}>
                                    <Button color="primary" onClick={()=>handlePayment()}>Pay-Now</Button>
                                </Grid>
                            </Grid>
                        </Col>
                    </Row>
                    </div>) : (
                        <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
                            <Grid item xs={4} className="text-center mt-3">
                                <h4>Oops, Your Cart is Empty!!!</h4>
                            </Grid>
                            <Grid item xs={4} >
                                <img src={emptyCart} width={350} alt="NoItem"/>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>
        </Grid>
        
    </div>  
    )
}

export default Cart;