import useHeaderStore from "../../store/HeaderStore";
import Modal from "./Modal";
import Nav from "../Nav/Nav";
import "../../sass/header.scss"



type HeaderProps = {

    headerImage: string;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ headerImage }) => {

    const { includeNav, includeModal } = useHeaderStore();


    const headerStyle = {
        backgroundImage: `url(${headerImage})`,
    }

  return (
      <header className="header" style={headerStyle}>
          <section className="header__left">
              {includeNav && <Nav />}
          </section>
          <section className="header__right">
              {includeModal && <Modal />}
          </section>
      </header>
  )
}

export default Header