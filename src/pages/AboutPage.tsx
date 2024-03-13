import AboutContent from "../components/About/AboutContent"
import Footer from "../components/UI/Footer"
import footerImage from "../assets/svg/footer-img.svg"


type Props = {}

const AboutPage = (props: Props) => {
  return (
    <section className="page-common about-section">

    <AboutContent />
    <Footer footerImage={footerImage} />
      
    </section>
  )
}

export default AboutPage;