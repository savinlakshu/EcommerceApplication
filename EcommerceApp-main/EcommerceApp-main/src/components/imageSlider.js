import React from 'react';
import {Slide} from 'react-slideshow-image';
import img3 from '../Img/MacBook-Air-2020/Air_2020_03.jpg'
import img1 from '../Img/MacBook-Air-2020/Air-2020_01.jpg'
import img2 from '../Img/MacBook-Air-2020/Air-2020_02.jpg'
import img4 from '../Img/MacBook-Air-2020/Air-2020_04.jpg'
import img5 from '../Img/MacBook-Air-2020/Air-2020_05.jpg'

import "react-slideshow-image/dist/styles.css"
import '../imageSlider.css'

const properties = {
    duration:5000,
    transitionDuration: 500,
    infinite:true,
    arrows:true,
    indicators: true,
    pauseOnHover:true,
}

const ImageSlider = ()=>{
    return(
        <div className="containerSlide">
            <Slide {...properties} >
                <div className="each-slide">
                    <div>
                    <img src={img1} alt="mac01"/>
                    </div>
                    
                </div>
                <div className="each-slide">
                    <div>
                    <img src={img2} alt="mac02"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src={img3} alt="mac03"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src={img4} alt="mac04"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src={img5} alt="mac05"/>
                    </div>
                </div>
                
            </Slide>
        </div>
    )
}

export default ImageSlider;