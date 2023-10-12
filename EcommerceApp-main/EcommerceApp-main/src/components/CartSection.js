import React,{useState,useContext} from 'react'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { cartItems } from '../userContext/clientContext'
import {Card,CardBody,CardTitle,CardText,CardImg, Container, Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../CartSection.css"
const CartSection = ({item})=>{
    
    const itemContext = useContext(cartItems);
    
    const addItem = (item) =>{
      
       const pos = itemContext.items.findIndex(i=>i.uid === item.uid)
        
        if(pos !== -1){
            toast("Product Already added.",{type:"warning"})
            return;
        }
        else{
        itemContext.setItems([...itemContext.items,item])
        toast("Product Added Successfully..",{type:"success"});
        }
    }
    
      
    return(
        
        <Container >    
                    <Card className="text-center mb-2 mt-2 ">
                        <CardImg src={item.url} top height="200" width="auto" className="img-thumbnail "/>
                        <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <CardText>Prize:$ {item.prize}</CardText>
                            <CardText>Description: {item.description}</CardText>
                            <Button color="primary" onClick={()=>addItem(item)}>
                            Buy-Now
                            </Button>
                            
                        </CardBody>
                    </Card>
        </Container>  
           
        
    )
}

export default CartSection