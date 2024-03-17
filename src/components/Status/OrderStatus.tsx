import { useNavigate } from "react-router-dom";
import droneImg from "../../assets/svg/drone.svg"
import useOrderStore from "../../store/OrderStore";
import { useEffect, useState } from "react";
import { getOrderStatus } from "../../services/apiService";
import ActionButton from "../common/ActionButton/ActionButton";
import "./orderstatus.scss"

const OrderStatus = () => {

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
       
        } else {
          console.warn('User List is empty. No userToken available.');
        }

        let orderResponse;

        if (userToken && orderInfo?.orderNr) {

          orderResponse = await getOrderStatus(orderInfo.orderNr, userToken);

          setStatusData(orderResponse);
        } else if (orderInfo?.orderNr) {

          orderResponse = await getOrderStatus(orderInfo.orderNr);
          setStatusData(orderResponse);
        }

      } catch (error) {
        console.error('Error fetching order status: ', error);
      }
    };

    fetchOrderStatus();
  }, [orderInfo]);

  const handleClick = () => {
    navigate('/menu')
  }

  return (
    <section className="status-info">
      {!orderInfo ? (
        <div className="status-info__no-status">
          <p className="status-info__message">
            Du har inte gjort någon beställning.
            <br />
            Gör en beställning för att få status.
          </p>
          <ActionButton label="Beställa" onClick={handleClick} />
        </div>
      ) : (
        <>
          <section className="status-info__details">
            <p className="status-info__order-number">
              Ordernummer
              <span className="order-number">
                {` #${orderInfo?.orderNr}`}
              </span>
            </p>
            <div className="status-info__drone-container">
              <img className="drone-image" src={droneImg} alt="Dron" />
            </div>

            <h2 className="status-info__heading">Din beställning är på väg!</h2>
            {statusData && <p className="status-info__eta">
              <span className="eta">
                {`${statusData.eta || 0} `}
              </span>
              {statusData.eta === 1 ? "minut" : "minuter"}
            </p>}
          </section>

          <ActionButton label="Ok, cool!" onClick={handleClick} />
        </>
      )}
    </section>
  )
};

export default OrderStatus;