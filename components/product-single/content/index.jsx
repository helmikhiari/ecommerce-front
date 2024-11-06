import { useEffect, useState } from "react";

import CheckboxColor from "../../products-filter/form-builder/checkbox-color";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import Product from "./../../../pages/product/[pid]";
import { setProducts } from "reducers/productSlice";
import {addVariantToCart} from "../../../APIS/cart"
import { getUser } from "APIS/user";
import { setCart } from "reducers/cartSlice";
const Content = ({ variants, id }) => {
  const dispatch = useDispatch();
  const pr = useSelector((state) => state.products.products);
  const [product, setProduct] = useState();

  const [productsColors, setProductColors] = useState([]);
  const [productsSizes, setProductSizes] = useState({});
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [activeQuantity,setActiveQuantity]=useState(1)
  const [stock,setStock]=useState(1);
  const onColorSet = (e) => setActiveColor(e);
  const onSelectChange = (e) => setActiveSize(e.target.value);

useEffect(()=>{
 if (id&&pr)
  { let a=pr.find((p) => p._id == id)
  setProduct(a);}
},[id,pr])

  useEffect(() => {
    if (variants) {
      let colors = variants.map((variant) => variant.color);

      let uniqueColors = [...new Set(colors)];
      setProductColors(uniqueColors);
      let sizes = {};
      variants.forEach((variant) => {
        if (!sizes[variant.color]) sizes[variant.color] = [];
        sizes[variant.color].push(variant.size);
      });

      setProductSizes(sizes);
    }
  }, [variants]);

  const toggleFav = () => {};

useEffect(()=>{
  setActiveSize('');
},[activeColor])

useEffect(()=>{
  if (activeColor&&activeSize)
  {
    let variant=variants?.find((v)=>v.color==activeColor&&v.size==activeSize);
    console.log(variant);
    setStock(variant.quantity);
  }
  setActiveQuantity(1)
},
[activeColor,activeSize])

const addToCart=async()=>
{if (activeColor&&activeSize){


  const variant=variants?.find((v)=>v.color==activeColor&&v.size==activeSize)
  const res=await addVariantToCart(variant._id,activeQuantity)
  console.log(res);
  if (res)
  {
    const response=await getUser();
    dispatch(setCart(response.cart));
  
  }
}
else
alert("SIZE AND COLOR *")
}

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product?._id}
        </h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product?.name}</h2>

        <div className="product__prices">
          <h4>${ product?.price-(product?.price*product?.onSale) }</h4>
          {product?.onSale &&
            <span>${ product?.price }</span>
          }
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {productsColors.map((color) => (
              <CheckboxColor
                type={"radio"}
                name="product-color"
                color={color}
                valueName={color}
                onChange={onColorSet}
              />
            ))}
          </div>
        </div>
        <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option selected disabled>
                  Choose size
                </option>
                {productsSizes[activeColor]?.map((size) => (
                  <option value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setActiveQuantity(activeQuantity - 1)}
                className="quantity-button__btn"
                disabled={! (activeQuantity>1)}
              >
                -
              </button>
              <span>{activeQuantity}</span>
              <button
                type="button"
                onClick={() => setActiveQuantity(activeQuantity + 1)}
                className="quantity-button__btn"
                disabled={activeQuantity>=stock}
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart
            </button>
            {/* <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
            >
              <i className="icon-heart"></i>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
