import React,{useState} from 'react';
import {Card,CardBody,CardHeader,
    CardFooter,Container,Row,Col,Form,Input,Button,Label,FormGroup} from "reactstrap"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import {toast,ToastContainer} from 'react-toastify'


const Signin = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState({});
    // const [image,setImage] = useState(null)
    // const [fetchedUrl,setFetchedUrl] = useState('')
    // const [fetchedProgress,setFetchedProgress]= useState()
    
    
const handleSubmition = ()=>{
   firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>
   {
    setUser({resEmail:res.user.email, resUid:res.user.uid})
    toast(`User loggedIn Successfully..`,{type:"success"})
    })
   .catch(err=>{
       toast(err.message,{type:"error"})
   })
   setEmail('')
   setPassword('')
}
// const uploadImage = () =>{
//    const imgRef = firebase.storage().ref(`images/${image.name}`).put(image);
//    imgRef.on("state_changed",
//    snapshot=>{
//        const progress= (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
//        setFetchedProgress(progress)
//        if(progress == 100){
//            toast("Image uploaded Successfully..",{type:"success"})
//        }
//    },
//    error=>{
//        toast("Image upload Failed!",{type:"error"});
//    },
//    ()=>{
//        firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>{
//            setFetchedUrl(url)
//        })
//    }
//    )}

    
 const handleSubmit = (e)=>{
    e.preventDefault();
    handleSubmition();
    // uploadImage();
  
 }
//  const getImage = (e)=>{
      
//      setImage(e.target.files[0]);
//  }
 
    
    return(
        <div>
            <Container>
            <ToastContainer position="top-right"/>
                <Row className="mt-5 pt-5">
                    <Col md={6} className="offset-md-3 ">
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader className="text-center bg-warning font-weight-bold text-white">
                                    Signin Here
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
                                    
                                </CardBody>
                                <CardFooter>
                                    <Button block color="primary" type="submit">Sign Me In</Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Signin;