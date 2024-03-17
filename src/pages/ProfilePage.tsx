import { useEffect, useState } from "react";
import AuthForm from "../components/Signup/SignForm/SignupForm"
import ProfileInfo from "../components/Signup/Profile/ProfileInfo";
import "../sass/profilepage.scss"
import { OrderHistoryItem, OrderHistoryResponse } from "../components/Signup/SignForm/SignupForm-Interfaces";
import { useLoggedStore } from "../store/loggedStore";
import { authTokenStatus, fetchOrderHistory } from "../services/apiService";


const ProfilePage = () => {

  const [userInfo, setUserInfo] = useState<{ username: string; email: string } | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [ totalSpent, setTotalSpent ] = useState<number | null>(null);
  const {isLoggedIn, logout} = useLoggedStore()
  

  const handleSignupSuccess = (username: string, email: string) => {
    setUserInfo({ username, email });
  };

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem('userList');
    setUserInfo(null);
    setOrderHistory([]);
    setTotalSpent(null);
  };

  const fetchUserOrderHistory = async (token: string) => {
    try {
      const orderHistoryResponse: OrderHistoryResponse = await fetchOrderHistory(token);
      console.log('fetchorderhisory response: ', orderHistoryResponse);
      if (orderHistoryResponse.success) {
        setOrderHistory(orderHistoryResponse.orderHistory || []);
        const newTotalSpent = orderHistory.reduce((total, item) => total + item.total, 0);
        setTotalSpent(newTotalSpent);
      } else {
        console.error("Failed to fetch order history:", orderHistoryResponse.error);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const checkTokenValidity = async (token: string) => {
    console.log(' token in checkTokenValdity: ', token)
    if (token) {
      const isValidToken = await authTokenStatus(token);
      console.log('token validation response:', isValidToken);
      
      if (!isValidToken) {
        console.log('token is not valid proceeding to log out', !isValidToken);
        
        handleLogout();
        return;
      }
    } else {
      console.error("No authToken found in user data.");
      return;
    }
  };


  useEffect(() => {
    if (isLoggedIn) {
        const currentUser = JSON.parse(sessionStorage.getItem('userList') || '{}');
        if (currentUser) {
          const authToken = currentUser.token;

          checkTokenValidity(authToken);
         
          
            console.log('authToken:',authToken);
            console.log('This user-info that should be set to state :', currentUser);
            if (authToken) {
                fetchUserOrderHistory(authToken);
                setUserInfo(currentUser);
            } else {
                console.error("No authToken found in user data.");
            }
        } else {
            console.error("No user data found in sessionStorage.");
        }
    }
}, [isLoggedIn]);

  console.log('user logged in:', isLoggedIn);

 useEffect(() => {
      

    if (userInfo && orderHistory.length > 0) {
      const newTotalSpent = orderHistory.reduce((total, item) => total + item.total, 0);
      setTotalSpent(newTotalSpent);
    }
  }, [userInfo, orderHistory]);
 
  console.log('user info to display:', userInfo, orderHistory)
 

  return (
    <div className="page-common  profile-section">
      {isLoggedIn ? (
        <div>
        <button onClick={handleLogout}>Logga ut</button>
        <ProfileInfo userInfo={userInfo} orderHistory={orderHistory} totalSpent={totalSpent} />
        </div>
      ) : (
        <AuthForm defaultEndpoint="signup" /* loginSuccess={handleLoginSuccess} */ signupSuccess={handleSignupSuccess}/>
      )}
    </div>
  );
};


export default ProfilePage;