import { useDispatch, useSelector } from "react-redux";
import CheckoutStatus from "../checkout-status";
import Item from "./item/index";
import { useState, useEffect } from "react";
import { setPrice } from "reducers/cartSlice";
import { useRouter } from "next/router";

const ShoppingCart = () => {
  const { cart } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const disaptch = useDispatch();
  const router=useRouter()
  const saveTotalPrice = () => disaptch(setPrice(totalPrice));

  const handleClick=()=>
  {
    saveTotalPrice();
    router.push("/cart/checkout");
  }

  useEffect(() => {
    if (cart.length > 0) {
      let s = cart.reduce(
        (acc, p) => p.quantity * p.variant.productID.price + acc,
        0
      );
      setTotalPrice(s);
    }
  }, [cart]);

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cart.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cart.map((item) => (
                  <Item
                    key={item._id}
                    id={item._id}
                    thumb={item.variant.productID.image}
                    name={item.variant.productID.name}
                    color={item.variant.color}
                    price={item.variant.productID.price}
                    size={item.variant.size}
                    stock={item.variant.quantity}
                    qte={item.quantity}
                  />
                ))}
              </tbody>
            </table>
          )}

          {cart.length === 0 && <p>Nothing in the cart</p>}
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left"></i> Continue Shopping
          </a>
          <input
            type="text"
            placeholder="Promo Code"
            className="cart__promo-code"
          />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Total cost <strong>${totalPrice}</strong>
            </p>
            <button className="btn btn--rounded btn--yellow" onClick={handleClick}>
              
                Checkout
             
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
