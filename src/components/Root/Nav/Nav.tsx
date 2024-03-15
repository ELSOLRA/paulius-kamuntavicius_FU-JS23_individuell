import { Link } from "react-router-dom";
import useNavStore from "../../../store/useNavStore";
import './nav.scss'

const Nav: React.FC = () => {

  const { isOpen, toggle } = useNavStore();

  const navIconPath = isOpen ? "src/assets/svg/closeicon.svg" : "src/assets/svg/navicon.svg";

  return (
    <section className={`nav ${isOpen ? 'nav--overlay' : ''}`}>
      <div className="nav__img-container">
        <img
          className="nav__img"
          src={navIconPath}
          alt="Navigation"
          onClick={() => toggle()}
        />
      </div>
      <nav className="nav__links">
        {isOpen && (
          <>
            <Link to='/menu' className="nav__link" onClick={() => toggle()}>Meny</Link>
            <hr className="nav__line" />
            <Link to='/about' className="nav__link" onClick={() => toggle()}>Vårt kaffe</Link>
            <hr className="nav__line" />
            <Link to='/profile' className="nav__link" onClick={() => toggle()}>Min profil</Link>
            <hr className="nav__line" />
            <Link to='/status' className="nav__link" onClick={() => toggle()}>Oderstatus</Link>
          </>
        )}
      </nav>
    </section>
  )
}

export default Nav;