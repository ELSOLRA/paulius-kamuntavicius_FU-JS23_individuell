import left from "../assets/svg/landing-header-left.svg"
import right from "../assets/svg/landing-header-right.svg"
import landingIcon from "../assets/svg/Airbean-landing-sign.svg"
import LandingSection from "../components/Landing/LandingSection"



const HomePage = () => {
  return (
    <section>
      <LandingSection

        leftImage={left}
        rightImage={right}
        landingIcon={landingIcon}

      />
    </section>
  )
}

export default HomePage;