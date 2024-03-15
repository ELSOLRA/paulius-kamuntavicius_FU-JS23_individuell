import OrderStatus from "../components/Status/OrderStatus";
import "../sass/pages.scss"
import "../sass/statuspage.scss"


const StatusPage = () => {
  return (

    <section className="page-common status-section">
      <OrderStatus />
    </section>

  )
 
};

export default StatusPage