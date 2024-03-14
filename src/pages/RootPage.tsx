import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Root/Header/Header";
import Nav from "../components/Root/Nav/Nav";
import headerImage from "../assets/svg/header-img.svg"
import Cart from "../components/Cart/Cart";
import useNavStore from "../store/useNavStore";
import "../sass/rootpage.scss"


const Root: React.FC = () => {

    const { pathname } = useLocation();
    const {isOpen} = useNavStore()
    

    const mainContentClass = isOpen ? "hidden" : "";
    
    const leftComponent = <Nav />;

    const rightComponent = pathname === '/menu' ? <Cart /> : null;
    const headerClass = pathname === '/profile' ? 'profile-header' : '';

    return (
      <>
        <section className="rootpage">
          <Header headerImage={headerImage} leftComponent={leftComponent} rightComponent={rightComponent} className={headerClass} />
          <main className={mainContentClass}>
            <Outlet />
          </main>
        </section>
      </>
    );
  };
  export default Root;