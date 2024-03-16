import { useEffect, useState } from "react";
import AuthForm from "../components/Signup/SignForm/SignupForm"
import ProfileInfo from "../components/Signup/Profile/ProfileInfo";
import "../sass/profilepage.scss"
import { OrderHistoryItem, OrderHistoryResponse } from "../components/Signup/SignForm/SignupForm-Interfaces";
import { useLoggedStore } from "../store/loggedStore";
import { fetchOrderHistory } from "../services/apiService";


const ProfilePage = () => {

  const [userInfo, setUserInfo] = useState<{ username: string; email: string } | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [ totalSpent, setTotalSpent ] = useState<number | null>(null);
  const {isLoggedIn, logout} = useLoggedStore()
  
 

/*   const handleLoginSuccess = (username: string, email: string, orderHistory: OrderHistoryItem[]) => {
    
    setUserInfo({ username, email });
    console.log('info pick up from logginSucces:', userInfo);
    
    setOrderHistory(orderHistory);
    const newTotalSpent = orderHistory.reduce((total, item) => total + item.total, 0);
    setTotalSpent(newTotalSpent);
  
  }; */
  

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

/*   useEffect(() => {

    const authToken = JSON.parse(sessionStorage.getItem('userList') ?? '')?.token;
    if (authToken) {

    }
  }, []); */

  useEffect(() => {
    if (isLoggedIn) {
        const currentUser = JSON.parse(sessionStorage.getItem('userList') || '{}');
        if (currentUser) {
            setUserInfo(currentUser);
            console.log('This user-info that should be set to state :', currentUser);
            
            const authToken = currentUser.token;
            console.log('authToken:',authToken);
            
            const fetchUserOrderHistory = async (token: string) => {
                try {
                    const orderHistoryResponse: OrderHistoryResponse = await fetchOrderHistory(token);

                    console.log('fetchorderhisory response: ' ,orderHistoryResponse)

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

            if (authToken) {
                fetchUserOrderHistory(authToken);
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


export default ProfilePage