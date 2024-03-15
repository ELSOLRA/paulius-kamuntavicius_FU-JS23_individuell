

import footerImage from "../assets/svg/footer-img.svg"
import addIcon from "../assets/svg/add.svg"
import "../sass/menuPage.scss"
import Footer from "../components/UI/Footer";
import CoffeeMenuComponent from "../components/CoffeeMenu/CoffeeMenuComponent";

const MenuPage:React.FC = () => {

 
  return (
    <section className="menu-page">
  
    <CoffeeMenuComponent addIconPath={addIcon} />
    <Footer footerImage={footerImage} />
    
    </section>
  )
}

export default MenuPage