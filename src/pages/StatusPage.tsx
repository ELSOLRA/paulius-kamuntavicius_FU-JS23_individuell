import { useNavigate } from "react-router-dom";
import droneImg from "../assets/svg/drone.svg"
import useOrderStore from "../store/orderStore";
import { useEffect, useState } from "react";
import { getOrderStatus } from "../services/apiService";





const StatusPage = () => {
  // const { state } = useLocation() as { state: { orderResponse: any; statusData: any } };
  const navigate = useNavigate();
  const { orderInfo } = useOrderStore();

  const [statusData, setStatusData] = useState<any>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {

        const userListString = sessionStorage.getItem('userList') ?? '';

        let userToken;

        if (userListString) {
          const userList = JSON.parse(userListString);

          userToken = userList?.token;
  
          console.log('User Token:', userToken);
        } else {
          console.warn('User List is empty. No userToken available.');
        }

        let orderResponse;

        if (userToken && orderInfo?.orderNr) {
    
          orderResponse = await getOrderStatus(orderInfo.orderNr, userToken);

          setStatusData(orderResponse);
        }  else if (orderInfo?.orderNr) {
          
          orderResponse = await getOrderStatus(orderInfo.orderNr);
          setStatusData(orderResponse);
        } 
    
      } catch (error) {
        console.error('Error fetching order status: ', error);
      }
    };

    fetchOrderStatus();
  }, [orderInfo]);

  return (
    <section>
    {orderInfo && (
      <section>
        <p>{`Ordernummer: #${orderInfo?.orderNr}`}</p>

        <img src={droneImg} alt="Dron" />

        
        <h2>Din beställning är på väg!</h2>
        {statusData && <p>{statusData.eta} minuter</p>}
      </section>
    )}
    <button onClick={() => navigate('/menu')}>Ok, cool!</button>
  </section>
);
};

export default StatusPage