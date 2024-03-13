

import footerImage from "../assets/svg/footer-img.svg"
import addIcon from "../assets/svg/add.svg"

import "../sass/menuPage.scss"
import Footer from "../components/UI/Footer";
import CoffeeMenuComponent from "../components/CoffeeMenuComponent";




const MenuPage:React.FC = () => {



/*   const leftComponent =  <Nav /> ;
  const rightComponent = <Cart />; */

 
  return (
    <section className="menu-page">
  
    {/* <Header headerImage={headerImage} leftComponent={leftComponent} rightComponent={rightComponent} /> */}
    <CoffeeMenuComponent addIconPath={addIcon} />
    <Footer footerImage={footerImage} />
    
    </section>
  )
}

export default MenuPage