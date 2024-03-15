import imagePath from "../../assets/png/loader.png"
import "./loader.scss"

const Loader = () => (
  <div className="loader-container">
    <img
      src={imagePath}
      className="loader-container__loader"
      alt="Loader"
    />
    Loading...
  </div>
);

export default Loader;