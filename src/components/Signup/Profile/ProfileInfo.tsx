import Avatar from "../../common/Avatar/Avatar";
import profilImg from "../../../assets/png/ProfileIcon.png"
import { OrderHistoryItem } from "../SignupForm";

interface UserInfo {
    username: string;
    email: string;
  }
  
  interface ProfileInfoProps {
    userInfo: UserInfo;
    orderHistory: OrderHistoryItem[];
    totalSpent: number | null;
  }


const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo, orderHistory, totalSpent }) => {
    return (
      <section className="profile-info">
        <Avatar
          size={'big'}
          avatar={profilImg}
          name={userInfo.username}
          addlInfo={userInfo.email}
          textmode={'second'}
        />

        <h2 className="profile-info__title">Orderhistorik</h2>
        <ul className="profile-info__order-history">
          {orderHistory.map((item) => (
            <li key={item.orderNr} className="profile-info__order-history-item">
                <>
                      <section className="profile-info__order-details">
                          <p className="profile-info__order-number">{`#${item.orderNr}`}</p>
                          <p className="profile-info__order-date">{item.orderDate}</p>
                      </section>
                      <section className="profile-info__order-details">
                          <p className="profile-info__order-total-label">total ordersumma</p>
                          <p className="profile-info__order-total">{item.total}</p>
                      </section>
                      <br />
                  </>
              </li>
          ))}
        </ul>
        <section className="profile-info__total-spent">
        <p className="profile-info__total-spent-label">Totalt spenderat</p>
        <p className="profile-info__total-spent-value"> {totalSpent}!</p>
        </section>
      </section>
    );
  };
  
  export default ProfileInfo;