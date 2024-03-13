import AboutContent from "../components/About/AboutContent"
import Footer from "../components/UI/Footer"
import footerImage from "../assets/svg/footer-img.svg"
import "../sass/pages.scss"




const AboutPage = () => {
  return (
    <section className="page-common about-section">

    <AboutContent />
    <Footer footerImage={footerImage} />
      
    </section>
  )
}

export default AboutPage;