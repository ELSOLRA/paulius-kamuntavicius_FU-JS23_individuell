import { Link } from "react-router-dom";
import "./landingsection.scss"


interface LandingSectionProps {
    
    leftImage: string;
    rightImage: string;
    landingIcon: string;
}


const LandingSection: React.FC<LandingSectionProps> = ({ leftImage, rightImage, landingIcon }) => {
    return (
      <section className="landing-container">
        <img className="landing-container__left-img" src={leftImage} alt="left-side image" />
        <section className="landing-container__header">
          <Link className="landing-container__header__link" to="/menu">
            <img className="landing-container__header__icon" src={landingIcon} alt="Airbean sign image" />
          </Link>
        </section>
        <img className="landing-container__right-img" src={rightImage} alt="right-side image" />
      </section>
    );
  };
  
  export default LandingSection;