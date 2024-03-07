import Header from "../components/UI/Header"
import headerImage from "../assets/svg/header-img.svg"
import footerImage from "../assets/svg/footer-img.svg"
import addIcon from "../assets/svg/add.svg"
import Nav from "../components/Nav/Nav";
import "../sass/menuPage.scss"
import Footer from "../components/UI/Footer";
import CoffeeMenuComponent from "../components/CoffeeMenuComponent";



const MenuPage:React.FC = () => {

  const leftComponent =  <Nav /> ;
 
  return (
    <section className="menu-page">
  
    <Header headerImage={headerImage} leftComponent={leftComponent} />
    <CoffeeMenuComponent addIconPath={addIcon} />
    <Footer footerImage={footerImage} />
    
    </section>
  )
}

export default MenuPage