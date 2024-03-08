import useCartStore from "../../store/useCartStore";
import { CartProps } from "./cartTypes";
import "../../sass/cart.scss"


const Cart = () => {
   
    const { isOpen, toggle, decreaseQuantity, increaseQuantity, /* updateCartItem, */  cartItems, totalPrice, totalItems } = useCartStore();



    return (
        <>
        <button className="cart-btn" onClick={()=> toggle()}></button>
        <section className={`cart ${isOpen ? 'cart--overlay' : ''}`}>
        {isOpen && (
            <>
      <h2>Din beställning</h2>
      
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            {/* <button onClick={() => updateCartItem(item.id, (item.quantity || 0) + 1)}>Update</button> */}
  
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice}</p>
      <p>items : {totalItems}</p>
      </>
      )}
    </section>
    </>
    )
}

export default Cart;