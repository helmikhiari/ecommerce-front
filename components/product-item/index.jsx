import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleProduct } from "./../../APIS/wishList";
import { toggleFavourite } from "reducers/wishListSlice";
const ProductItem = ({ image, id, name, price, currentPrice, discount }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { wishList } = useSelector((state) => state.wishList);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dipatch = useDispatch();
  useEffect(() => {
    if (id && wishList) {
      let exist = wishList.includes(id);

      setIsFavourite(exist);
    }
  }, [wishList, id]);

  const toggleFav = async () => {
    if (isAuthenticated) {
      const response = await toggleProduct(id);
      console.log(response);
      if (response) {
        dipatch(toggleFavourite(id));
      }
    }
    // else
    // {

    // }
  };

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart"></i>
        </button>

        <Link href={`/product/${id}`}>
          <a>
            <img src={image || ""} alt="product" />
            {!!discount && (
              <span className="product__discount">{discount * 100}%</span>
            )}
          </a>
        </Link>
      </div>

      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={
            "product__price " + (discount ? "product__price--discount" : "")
          }
        >
          <h4>${currentPrice - currentPrice * discount}</h4>

          {!!discount && <span>${currentPrice}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
