import React,{useContext, useEffect,useState} from 'react'
import {Button} from 'reactstrap'
import macbook from "../Img/mac-bookPro.jpg"
import faker from 'faker'
import {Link} from 'react-router-dom'
import {Container,Row,Col, CardBody,Card} from 'reactstrap'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import clientContext from '../userContext/clientContext'
import {productContext} from '../userContext/clientContext'
import { cartItems } from '../userContext/clientContext'
import {macProductContext} from '../userContext/clientContext'
import CartSection from './CartSection'
import ImageSlider from './imageSlider'
import Header from './Header';
import Footer from './Footer'
import firebase, { database } from 'firebase/app'
import 'firebase/firestore'
import { Paper } from '@material-ui/core'
import Apple from '@material-ui/icons/Apple'



// const url = 'https://api.pexels.com/v1/search?query=iMac&per_page=6'
// const key = '563492ad6f9170000100000110d7feaedfbe48ef87abcd813b619c4c';
let cartProducts = []
let macItems = []
const ShoppingStore= ()=>{
    
    const userContext = useContext(clientContext);
    const cartContext = useContext(productContext)
    const macCartContext = useContext(macProductContext);
    const itemContext = useContext(cartItems);

    const [databaseImac,setDatabaseImac] = useState([]);
    const [databaseMacbook,setDatabaseMacbook] = useState([])
    let emailLen = Number;
    if(userContext.user?.resEmail?.len <=0){
        emailLen = null; 
    } 
    else{
        emailLen = userContext.user?.resEmail?.len;
    }
    const setProduct =(pro)=>{
       
        firebase.firestore().collection('iMac')
        
        .add(
            {  description: pro.description,
                count:pro.count,
                name: pro.name,
                prize: pro.prize,
                url: pro.url,
                uid:pro.uid 

            })
            .then((snapshot)=>{
                console.log(snapshot);
                
            })
            .catch((err)=>{
                console.log(err)
            })
        
    }
    const retriveProduct = ()=>{
        firebase.firestore().collection(`iMac`)
        .get()
            .then(snapshot=>{
                snapshot.forEach(pro=>{
                    if(pro){
                    const data = pro.data();
                    cartProducts.push(data);
                    }
                    
                })
               
                setDatabaseImac(cartProducts)
               
            })
            .catch(err=>{
                console.log(err)
            })
            
    }

    const setmacProduct = (pro)=>{
        firebase.firestore().collection(`macbook`)
            .add(
                {
                    description: pro.description,
                    count:pro.count,
                    name:pro.name,
                    prize:pro.prize,
                    url:pro.url,
                    uid:pro.uid,
                }
            )
            .then(snapshot=>{
                console.log(`macbook stored in db ${snapshot}`);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const getmacProduct = ()=>{
        firebase.firestore().collection('macbook')
            .get()
            .then(snapshot=>{
                snapshot.forEach(pro=>{
                    if(pro){
                        const data = pro.data();
                        macItems.push(data);
                    }
            })
            setDatabaseMacbook(macItems);
            
            
            })
            .catch(err=>{
                console.log(err);
            })
    }
    
    

    
    let fetchedArr = []
    let resultArr = []
   
    let resData = [  
    "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg",
    "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg",
    "https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg",
    "https://images.pexels.com/photos/322338/pexels-photo-322338.jpeg",
    "https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg",
    "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg"];

    let resData1 = [
    "https://cdn.pocket-lint.com/r/s/1200x/assets/images/152137-laptops-review-apple-macbook-pro-2020-review-image1-pbzm4ejvvs.jpg",
    "https://icdn2.digitaltrends.com/image/digitaltrends/apple-macbook-pro-16-ry-14-2.jpg",
    "https://9to5toys.com/wp-content/uploads/sites/5/2019/11/16-inch-MacBook-Pro-2019-1.jpg?quality=82&strip=all&w=1600",
    "https://specials-images.forbesimg.com/imageserve/5de44d6e755ebf0006fbe825/960x0.jpg?fit=scale",
    "https://i.pcmag.com/imagery/reviews/0227QDT3xYwn3xEOpyiJpNU-1.v_1574212824.jpg"
    ]

    //Fetching data for all the 6 iMacs
    const fetchedData = ()=>{
       fetchedArr = resData.map(res=>(
            {
            url:res,
            name:faker.random.word(),
            prize:faker.random.number(4000),
            description:faker.random.words(),
            count:1,
            uid:faker.random.uuid(),
            }
        ))
        cartContext.setProductInfo(fetchedArr)
    }

    //Fetching data for all the 4 mac-books
    const proData = ()=>{
       resultArr = resData1.map(pro=>(
            {
                url: pro,
                name:faker.random.word(),
                prize:faker.random.number(2000),
                description:faker.random.words(),
                count:1,
                uid:faker.random.uuid(),

            }
        )) 
        macCartContext.setMacProductInfo(resultArr);
        
    }
    
    useEffect(()=>{
        fetchedData();
    },[])

    useEffect(()=>{
        proData();
    },[])

    //sending iMacs to db only if user exits in cart!
    //Retriving iMacs data from data base
    useEffect(()=>{  
        cartContext.productInfo.map(pro=>(
            setProduct(pro)
         ));
         retriveProduct()
    },[emailLen])
    

    
    // useEffect(()=>{
    //     retriveProduct();
    // },[userContext.user?.resEmail])
    
    //sending mac-books to db only if user exists
    //Retriving macbooks from db 
    useEffect(()=>{
        macCartContext.macProductInfo.map(pro=>(
            setmacProduct(pro)
        ))
        getmacProduct();
    },[userContext.user?.resEmail])
    
    
    return(
            <>
            <Header/>
            <Grid container spacing={2} style={{alignItems:"center",marginBottom:10}}>
            
                <Grid item xs={6}>
                    <ImageSlider />
                </Grid>
                
                <Grid item xs={6} >
                    <Paper >
                    <Grid item xs={12} style={{textAlign:"center"}}>
                    <h2>
                      <Apple style={{fontSize:45,paddingBottom:9}}/>MacBook Air, <br/>
                        <b>&nbsp;&nbsp;&nbsp;&nbsp;Light.Speed.</b>
                    </h2>
                    </Grid>
                        <p style={{fontSize:25,fontFamily:"EB Garamond"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Incredibly thin, light-weight, <b>Unibody </b> MacBook Air is now
                                more powerful than ever.
                                <br/>
                            
                                <span style={{paddingTop:10}}>  
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Introducing the all new Magic Keyboard which is more tactile ever enough,
                                    More secure due all new Techs like Touch-Id, secure-enclave and more...
                                    
                                </span>
                                    <br/>
                                    <a className="text-primary" href="https://www.apple.com/in/macbook-air/">
                                        Learn more about Macbook Air 2020.
                                    </a>
                        </p>        
                                <h1 style={{textAlign:"center",fontFamily:"Merienda One",paddingTop:5,paddingBottom:10}}>
                                    New MacBook Air 2020 Collection Arriving Soon...
                                </h1>
                            
                       
                    </Paper>
                </Grid>
            </Grid>
            <Divider className="bg-secondary" variant="middle"/>
            <Container fluid>
            
            <div style={{display:"flex",paddingTop:10}}>
                <Apple style={{fontSize:50}}  />
                <h2 className="text-left pl-1 pt-2" style={{fontFamily:"Candara",fontSize:40}}> iMacs Trending</h2>
                
            </div>
            <Card className="bg-light">
                    <CardBody>
                    {databaseImac.length ? (<Row>
                        {databaseImac.map(pro=>(
                        <Col md={4} key={pro.uid}>
                            <CartSection item={pro}/>
                        </Col>
                            ))}
                    </Row>) : (
                        <div style={{width:150, height: 450}}>
                        <h2 className="text-warning d-inline-block text-center" style={{textAlign:"center",
                        paddingTop:150, paddingBottom:50,paddingLeft:500}}>
                        No Data in Database....
                        </h2>
                        </div>
                    )
                    
                    }
                </CardBody>
            </Card>
            <Divider className="mt-3 bg-secondary mb-5"/>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                    <h2>
                      <Apple style={{fontSize:45,paddingBottom:9}}/>MacBook Pro, <br/>
                        <b>PowerHouse with speed.</b>
                    </h2>
                    </Grid>
            <Grid container spacing={2} direction="row">
                    <Grid item >
                    <Paper variant="outlined" elevation={3}>
                        <img src={macbook} width={450}/>
                    </Paper>
                </Grid>
            <Grid item xs={7} >
                <Paper className="bg-light text-center pb-3" >
                <h3>
                    16-inch MacBook Pro
                </h3>
                <Divider variant="middle" className="bg-dark"/>
                <Grid item >
                    <p className="font-weight-light ">
                    In November of 2019, Apple finally released the new high-end 16-inch MacBook Pro which replaced the 15-inch lineup. The model brings the return of the scissor switch mechanism with a ‘Magic Keyboard’,
                     a six-speaker system, up to 8-core processor, and up to 64GB RAM.
                     <br/>
                     Apple has also improved the thermal performance of the new laptop which helps sustain CPU and GPU performance to run at full speed for longer. 
                     The new models feature 6- and 8-core CPUs and up to 64GB RAM. The new baseline GPUs offer up to 2.1 times faster graphics performance than the previous standard configuration.
                     <br/>
                    Apple is claiming this is the first notebook in the world to offer an 8 TB option for internal storage. As standard, 
                    it now comes with 512GB SSD — double the previous generation.
                    </p>
                </Grid>
                <h4 className="pl-2">Starting from <b>$1,499.00 </b>only.</h4>
                <Button color="primary" >Buy Now.</Button>
                </Paper>
            </Grid>
            
            </Grid>
            <Divider variant="middle" className="mt-3 bg-secondary mb-3"/>
            <div style={{display:"flex",paddingTop:3}}>
                <Apple style={{fontSize:50}} className="" />
                <h2 className="text-left pl-1 pt-2" style={{fontFamily:"Candara",fontSize:40}}> MacBook Pro Trending</h2>
            </div>
            <Card className="bg-light">
                    <CardBody>
                        {databaseMacbook.length ? (<Row>
                            {databaseMacbook.map(pro=>(
                            <Col md={4} key={pro.uid}>
                                <CartSection item={pro}/>
                            </Col>
                                ))}
                        </Row>) : (
                            <div style={{width:150, height: 450}}>
                            <h2 className="text-warning d-inline-block text-center" style={{textAlign:"center",
                            paddingTop:150, paddingBottom:50,paddingLeft:500}}>
                            No Data in Database....
                            </h2>
                            </div>
                        )
                        }
                    
                    </CardBody>
            </Card>
            <Button color="dark" to={itemContext.items?.length > "0" ? "/cart" : "/store"} tag={Link} className="mt-2 mb-3">
                Check-Out
            </Button>            
        </Container>
        
        <Footer />
        
        </>
    )
}

export default ShoppingStore;