import { OrderHistoryItem } from "./SignupForm";

interface OrderHistoryListProps {
  orderHistory: OrderHistoryItem[];
}

const OrderHistoryList: React.FC<OrderHistoryListProps> = ({ orderHistory }) => {
  return (
    <ul>
      {orderHistory.map((item) => (
        <li key={item.orderNr}>
          Order #{item.orderNr}, Date: {item.orderDate}, Total: {item.total}
        </li>
      ))}
    </ul>
  );
};

export default OrderHistoryList;