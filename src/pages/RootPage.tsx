import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Root/Header/Header";
import Nav from "../components/Root/Nav/Nav";
import headerImage from "../assets/svg/header-img.svg"
import Cart from "../components/Cart/Cart";


const Root: React.FC = () => {

    const { pathname } = useLocation();

    const leftComponent = <Nav />;

    const rightComponent = pathname === '/menu' ? <Cart /> : null;

    return (
      <>
        <section className="rootpage">
          <Header headerImage={headerImage} leftComponent={leftComponent} rightComponent={rightComponent}  />
          <main>
            <Outlet />
          </main>
        </section>
      </>
    );
  };
  export default Root;