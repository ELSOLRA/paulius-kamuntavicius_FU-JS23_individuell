import { useEffect, useState } from "react";
import AuthForm, { OrderHistoryItem } from "../components/Signup/SignupForm"



type Props = {};



const ProfilePage = (props: Props) => {

  const [userInfo, setUserInfo] = useState<{ username: string; email: string } | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [ totalSpent, setTotalSpent ] = useState<number | null>(null);

  const handleLoginSuccess = (username: string, email: string, orderHistory: OrderHistoryItem[]) => {
    setUserInfo({ username, email });
    setOrderHistory(orderHistory);
    const newTotalSpent = orderHistory.reduce((total, item) => total + item.total, 0);
    setTotalSpent(newTotalSpent);
  };

  useEffect(() => {

    if (userInfo && orderHistory.length > 0) {
      const newTotalSpent = orderHistory.reduce((total, item) => total + item.total, 0);
      setTotalSpent(newTotalSpent);
    }
  }, [userInfo, orderHistory]);

  

  return (
    <div>
      {userInfo ? (
        <>
          <p>{userInfo.username}!</p>
          <p>{userInfo.email}</p>
          <br/>
          <p>Order History:</p>
          <ul>
            {orderHistory.map((item) => (
              <li key={item.orderNr}>Order #{item.orderNr}, Date: {item.orderDate}, Total: {item.total}</li>
            ))}
          </ul>
          <p>Total {totalSpent}!</p>
        </>
      ) : (
        <AuthForm defaultEndpoint="signup" loginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};


export default ProfilePage