import Header from "../components/UI/Header"
import headerImage from "../assets/svg/header-img.svg"
import Nav from "../components/Nav/Nav";
import useHeaderStore from "../store/HeaderStore";
import "../sass/menuPage.scss"



const MenuPage:React.FC = () => {

  const { includeNav } = useHeaderStore();

  
  const leftComponent = includeNav ? <Nav /> : null;
 
  return (
    <Header headerImage={headerImage} leftComponent={leftComponent}/>
  )
}

export default MenuPage