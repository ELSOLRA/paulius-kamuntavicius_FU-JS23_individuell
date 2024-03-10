import { useLocation, useNavigate } from "react-router-dom";
import droneImg from "../assets/svg/drone.svg"





const StatusPage = () => {
  const { state } = useLocation() as { state: { response: any } };
  const navigate = useNavigate();

  return (
    <section>
    {state?.response && (
      <section>
        <p>{`Ordernummer: #${state.response.orderNr}`}</p>

        <img src={droneImg} alt="Dron" />

        
        <h2>Din beställning är på väg!</h2>
        <p>{state.response.eta} minuter</p>
      </section>
    )}
    <button onClick={() => navigate('/menu')}>Ok, cool!</button>
  </section>
);
};

export default StatusPage