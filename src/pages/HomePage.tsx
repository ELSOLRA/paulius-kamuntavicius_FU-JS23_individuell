import { Link } from "react-router-dom"
import left from "../assets/svg/landing-header-left.svg"
import right from "../assets/svg/landing-header-right.svg"
import landingIcon from "../assets/svg/Airbean-landing-sign.svg"
import "../sass/homepage.scss"



const HomePage = () => {
  return (
    <section>
      <section className="landing-container">
        <img
          className="landing-container__left-img"
          src={left}
          alt="left-side image"
        />
                <section className="landing-container__header">
          < Link className="landing-container__header__link" to= "/menu">
            <img 
            className="landing-container__header__icon"
            src={landingIcon} 
            alt="Airbean sign image" />
          </Link>

        </section>
        <img
          className="landing-container__right-img"
          src={right}
          alt="right-side image"
        />


      </section>
    </section>
  )
}

export default HomePage