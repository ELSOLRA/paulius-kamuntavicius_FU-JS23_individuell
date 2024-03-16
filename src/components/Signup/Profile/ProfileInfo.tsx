import Avatar from "../../common/Avatar/Avatar";
import profilImg from "../../../assets/png/ProfileIcon.png"
import OrderHistoryList from "../OrderHistoryList";
import './profileinfo.scss'
import { OrderHistoryItem } from "../SignForm/SignupForm-Interfaces";

interface UserInfo {
    username: string;
    email: string;
  }
  
  interface ProfileInfoProps {
    userInfo: UserInfo | null;
    orderHistory: OrderHistoryItem[];
    totalSpent: number | null;
  }


const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo, orderHistory, totalSpent }) => {

  if (!userInfo) {
    return <div className="noUserInfo">No user information available.</div>;
  }

    return (
      <section className="user-profile">
        <Avatar
          size={'big'}
          avatar={profilImg}
          name={userInfo.username}
          addlInfo={userInfo.email}
          textmode={'second'}
        />

        <h2 className="user-profile__title">Orderhistorik</h2>
        <OrderHistoryList orderHistory={orderHistory} />
        <section className="user-profile__total-spent">
        <p className="user-profile__total-spent-label">Totalt spenderat</p>
        <p className="user-profile__total-spent-value"> {totalSpent} kr</p>
        </section>
      </section>
    );
  };
  
  export default ProfileInfo;