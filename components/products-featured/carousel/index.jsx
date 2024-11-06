// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "components/product-item";
import { useSelector } from "react-redux";

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

const ProductsCarousel = () => {
  const {products}=useSelector(state=>state.products);
  
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop={true}
        centeredSlides={centeredSlides}
        watchOverflow={true}
        slidesPerView={slidesPerView}
        className="swiper-wrapper"
      >
        {products.map((item) => {
         
          return (
            <SwiperSlide key={item._id}>
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                color={item.color}
                discount={item.onSale}
                currentPrice={(item.price-(item.price*item.onSale))}
                key={item._id}
                image={item.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;
