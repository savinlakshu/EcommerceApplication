import React,{useState,useContext} from 'react';
import {Card,CardBody,CardHeader,
    CardFooter,Container,Row,Col,Form,Input,Button,Label,FormGroup} from "reactstrap"
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/storage'
import {toast,ToastContainer} from 'react-toastify'
import clientContext from "../userContext/clientContext";
import '../Signup.css'



const Signup = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const [image,setImage] = useState(null)
    
    const [fetchedProgress,setFetchedProgress]= useState()
    const userContext = useContext(clientContext);
    
    
const handleSubmition = ()=>{
   firebase.auth().createUserWithEmailAndPassword(email,password).then((res)=>
   {
    userContext.setUser({resEmail:res.user?.email, resUid:res.user?.uid})
    toast(`User Registered Successfully..`,{type:"success"})
    })
   .catch(err=>{
       toast(err.message,{type:"error"})
   })
   setEmail('')
   setPassword('')
}
const uploadImage = () =>{
   const imgRef = firebase.storage().ref(`images/${image.name}`).put(image);
   imgRef.on("state_changed",
   snapshot=>{
       const progress= (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
       setFetchedProgress(progress)
       if(progress === 100){
           toast("Image uploaded sucessfully..",{type:"success"})
       }
   },
   error=>{
       toast("Image upload Failed!",{type:"error"});
   },
   ()=>{
       firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>{
          userContext.setFetchedUrl(url)
       })
   }
   )}

    
 const handleSubmit = (e)=>{
    e.preventDefault();
    handleSubmition();
    uploadImage();
    
  
 }
 const getImage = (e)=>{
      
     setImage(e.target.files[0]);
 }
 
    
    return(
        <div className="backGradient">
        
            <Container className="layout">
            <ToastContainer position="top-right"/>
                <Row>
                    <Col md={6} className="offset-md-3 ">
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader className="text-center text-grey font-weight-bold bg-dark text-white">
                                    Signup Here
                                </CardHeader>
                                <CardBody>
                                    <FormGroup className="mt-3">
                                    <Row>
                                    <Col md={2}>
                                    <Label for="email" className="font-weight-normal">Email :-</Label>
                                    </Col>
                                    <Col>
                                    <Input type="text"  placeholder="Enter email here.." value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email"/>
                                    </Col>
                                    </Row>
                                    </FormGroup>
                                    <FormGroup className="mt-4">
                                    <Row >
                                    <Col md={2}>
                                    <Label for="password" className="font-weight-normal">Password:-</Label>
                                    </Col>
                                    <Col>
                                    <Input type="password" placeholder="Enter password here.." value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password"/>
                                    </Col>
                                    </Row>
                                    </FormGroup>
                                    <FormGroup className="mt-4">
                                    <Row>
                                    <Col md={1}>
                                    <Label for="Image" className="font-weight-normal">Upload-Image:-</Label>
                                    </Col>
                                    <Col>
                                    <Input className="ml-4" type="file" onChange={getImage} name="image"/>
                                    </Col>
                                    <Col className="ml-3 pl-3 text-center">
                                        Progress:-{fetchedProgress}
                                         
                                    </Col>
                                    </Row>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button block color="primary" type="submit">Sign Me Up</Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Signup;