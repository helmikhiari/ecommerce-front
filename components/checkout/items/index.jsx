import { useSelector } from 'react-redux';

const CheckoutItems = () => {
  const {cart}=useSelector(state=>state.cart);


  return (
    <ul className="checkout-items">
      {cart.map(item => (
        <li className="checkout-item">
          <div className="checkout-item__content">
            <div className="checkout-item__img">
              <img src={item.variant.productID.image} />
            </div>

            <div className="checkout-item__data">
              <h3>{item.variant.productID.name}</h3>
              <span>#{item.variant._id}</span>
            </div>
          </div>
          <h3>${item.variant.productID.price}</h3>
        </li>
      ))}
    </ul>
  )
};

  
export default CheckoutItems