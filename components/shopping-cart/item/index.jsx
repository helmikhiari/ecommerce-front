
import { deleteItemFromCart } from 'APIS/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from 'reducers/cartSlice';


const ShoppingCart = ({ thumb, name, id, color, size, stock, price,qte }) => {
  const [quantity,setQuantity]=useState(qte);
  const plus=()=>setQuantity(++quantity)
  const minus=()=>setQuantity(--quantity);
  const dispatch=useDispatch()
  const handleDelete=async()=>
  {
    
    const res=await deleteItemFromCart(id);
    if (res)
    {
      dispatch(deleteFromCart(id));
    }
  }

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">{color}</td>
      <td className="cart-item-before" data-label="Size">{size}</td>
      <td>
        <div className="quantity-button">
          <button type="button"  className="quantity-button__btn" onClick={minus} disabled={quantity<=1}>
            -
          </button>
          <span>{ quantity }</span>
          <button type="button"  className="quantity-button__btn" onClick={plus} disabled={quantity>=stock}>
            +
          </button>
        </div>
      </td>
      <td>${price}</td>
      <td className="cart-item-cancel"><button onClick={handleDelete} className="icon-cancel"></button></td>
    </tr>
  )
};

  
export default ShoppingCart