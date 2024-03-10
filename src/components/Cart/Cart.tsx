import useCartStore, { resetCart } from "../../store/useCartStore";
import { CartProps } from "./cartTypes";
import "../../sass/cart.scss"
import bagIcon from "../../assets/svg/bag.svg"
import { useNavigate } from "react-router-dom";
import submitOrder from "../../services/apiService";


const Cart = () => {
   
    const { isOpen, toggle, decreaseQuantity, increaseQuantity, /* toggleCartItems, */  cartItems, totalPrice, totalItems } = useCartStore();
    const navigate = useNavigate();

    const handleOrderSubmit = async() => {

      try {
        const orderData = {
          details: {
            order: cartItems.map((item) => ({
              name: item.title,
              price: item.price,
            })),
          },
        };

      const response = await submitOrder(orderData);
      console.log(JSON.stringify(response, null, 1));

      resetCart();
      toggle()
 
      navigate('/status', { state: { response } })

      } catch (error) {
        console.error('Error submitting : ', error);
      }
    };

    

  return (
    <section className="cart-section">
      <section className="cart-header">
        {totalItems > 0 && <span className="cart-header__item-count">{totalItems}</span>}
        <button className="cart-header__btn" onClick={() => toggle()}>
          <img
            className="cart-header__icon"
            src={bagIcon}
            alt="shopping bag" />

        </button>
      </section>
      <section className={`cart ${isOpen ? 'cart--overlay' : ''}`}>
        {isOpen && (
          <>
            <h2 className="cart__title">Din beställning</h2>

            <ul className="cart__items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <p className="cart__item-title">{item.title}</p>
                  <p className="cart__item-price">{item.price} kr</p>
                  <section className="cart__item-actions">
                  <button className="cart__action" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="cart__item-quantity">{item.quantity}</span>
                  <button  className="cart__action" onClick={() => increaseQuantity(item.id)}>+</button>
                  </section>

                </li>
              ))}
            </ul>
            <p className="cart__total">Total: ${totalPrice}</p>
            <p className="cart__extra-info">inkl moms + drönarleverans</p>
 
            <button className="cart__order-btn"onClick={handleOrderSubmit}>
              Take my money
            </button>
          </>
        )}
      </section>
    </section >
  )
}

export default Cart;