import useCartStore, { resetCart } from "../../store/useCartStore";
import { CartProps } from "./cartTypes";
import "../../sass/cart.scss"
import bagIcon from "../../assets/svg/bag.svg"
import { useNavigate } from "react-router-dom";
import { submitOrder } from "../../services/apiService";
import useOrderStore from "../../store/orderStore";
import "./cart.scss"



const Cart = () => {
   
    const { isOpen, toggle, decreaseQuantity, increaseQuantity, /* toggleCartItems, */  cartItems, totalPrice, totalItems } = useCartStore();
    const navigate = useNavigate();
    const { setOrder } = useOrderStore();

    const handleOrderSubmit = async() => {

      try {

/*         if (cartItems.length === 0) {
          console.warn('Cart is empty');
          return;
        } */

        const userListString = sessionStorage.getItem('userList') ?? '';

        let userToken;

        if (userListString) {
          const userList = JSON.parse(userListString);

          userToken = userList?.token;
  
          console.log('User Token:', userToken);
        } else {
          console.warn('User List is empty. No userToken available.');
        }

        

        const orderData = {
          details: {
            order: cartItems.flatMap((item) =>
          Array.from({ length: item.quantity ?? 0 }, () => ({
            name: item.title,
            price: item.price,
          }))
        ),
      },
    };

        console.log("Order Data:", orderData);

        let orderResponse;

    if (userToken) {
    
      orderResponse = await submitOrder(orderData, userToken);
    }  else {
      
      orderResponse = await submitOrder(orderData);
    } 

    console.log(JSON.stringify(orderResponse, null, 1));
      if (orderResponse.orderNr) {
     
        setOrder(orderResponse);
        resetCart();
        toggle();
        navigate('/status');

      } else {
        console.log('No order number received.');
      }
      } catch (error) {
        console.error('Error submitting : ', error);
      }
    };

    

  return (
    <section className="cart-section">
          <section className={`cart ${isOpen ? 'cart--overlay' : ''}`}>
      <section className="cart__header">
        {totalItems > 0 && <div className="cart__header-notification"><span className="cart__header-item-count">{totalItems}</span> </div>}
        <button className="cart__header-btn" onClick={() => toggle()}>
          <img
            className="cart__header-icon"
            src={bagIcon}
            alt="shopping bag" />

        </button>
      </section>

        {isOpen && (
          <section className="cart__content">
            <h2 className="cart__title">Din beställning</h2>

            {cartItems.length > 0 ? (

              <>
                <ul className="cart__items">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <p className="cart__item-title">{item.title}</p>
                      <p className="cart__item-price">{item.price} kr</p>
                      <section className="cart__item-actions">
                        <button className="cart__action" onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span className="cart__item-quantity">{item.quantity}</span>
                        <button className="cart__action" onClick={() => increaseQuantity(item.id)}>+</button>
                      </section>

                    </li>
                  ))}
                </ul>
                <p className="cart__total">Total: ${totalPrice}</p>
                <p className="cart__extra-info">inkl moms + drönarleverans</p>

                <button className="cart__order-btn" onClick={handleOrderSubmit}>
                  Take my money
                </button>
              </>
            ) : (
              <p className="cart__empty-message">Tom Varukorg</p>
            )}

          </section>
        )}
      </section>
    </section >
  )
}

export default Cart;



