import { useEffect, useState } from "react";
import AuthForm from "../components/Signup/SignForm/SignupForm"
import ProfileInfo from "../components/Signup/Profile/ProfileInfo";
import "../sass/profilepage.scss"
import { OrderHistoryItem } from "../components/Signup/SignForm/SignupForm-Interfaces";


const ProfilePage = () => {

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
    <div className="page-common  profile-section">
      {userInfo ? (
        <ProfileInfo userInfo={userInfo} orderHistory={orderHistory} totalSpent={totalSpent} />

      ) : (
        <AuthForm defaultEndpoint="signup" loginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};


export default ProfilePage