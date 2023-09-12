import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import nk from '../assests/nk.jpg'
import gh2 from '../assests/gh2.mp4'


 


const ImageGenerator = () => {

    const [image_url,setImage_url]= useState("/");
    let inputRef= useRef(null);
    const[loading,setLoading]= useState(false);


    const imageGenerator = async ()=>{
      if (inputRef.current.value===""){
        return 0;
      }
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers:{
            "content-Type":"application/json",
            Authorization:
            "Bearer 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",
            "User-Agent":"Chrome",
          },
          body:JSON.stringify({
            prompt: inputRef.current.value,
            n:1,
            size:"512x512",
          }),
          
        } 


      );
      let data = await response.json();
      let data_array = data.data;
      setImage_url(data_array[0].url);
      setLoading(false);
    }


  
  return (
    <div className='ai-image-generator'>


      <video autoPlay muted loop playsInline className='back-video'>
        <source src={gh2} type='video/mp4'/>
      </video>  


      <div className='header'>
        <h1>Ai image <span>Generator</span></h1>
      </div>
      <div className="img-loading">
        <div className="image"><img src={image_url==="/"?nk:image_url} alt=""/></div>
        <div className="loading">
          <div className={loading?"loading-bar-full":"loading-bar"}></div>
        <div className={loading?"loading-text":"display-none"}>Loading.....</div>
        </div>
      </div>
      <div className="search-box"><input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
      <div className="generate-media" onClick={()=>{imageGenerator()}}>generate</div></div>
    </div>
  )
  }
export default ImageGenerator;
