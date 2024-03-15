import { OrderHistoryItem } from "./SignForm/SignupForm-Interfaces";


interface OrderHistoryListProps {
  orderHistory: OrderHistoryItem[];
}

const OrderHistoryList: React.FC<OrderHistoryListProps> = ({ orderHistory }) => {
  return (
    <ul className="user-profile__order-history">
      {orderHistory.map((item) => (
        <li key={item.orderNr} className="user-profile__order-history-item">
          <>
            <section className="user-profile__order-details">
              <p className="user-profile__order-number">{`#${item.orderNr}`}</p>
              <p className="user-profile__order-date">{item.orderDate}</p>
            </section>
            <section className="user-profile__order-details">
              <p className="user-profile__order-total-label">total ordersumma</p>
              <p className="user-profile__order-total">{item.total} kr</p>
            </section>
            <br />
          </>
        </li>
      ))}
    </ul>
  );
};

export default OrderHistoryList;