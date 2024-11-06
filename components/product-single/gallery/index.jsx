import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Gallery = ({ id }) => {
 const {products}=useSelector(state=>state.products);
  const [image,setImage]=useState('');
 useEffect(()=>{
  if (products&&id)
  {
    const pr=products.find((pr)=>pr._id==id)
    setImage(pr?.image);
  }
 },[products,id])

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        
          <div key={image} className="product-gallery__thumb">
            <img src={image} alt="" />
          </div>
      
      </div>

      <div className="product-gallery__image">
        <img src={image} alt="" />
      </div>
    </section>
  );
};
  
export default Gallery;
  