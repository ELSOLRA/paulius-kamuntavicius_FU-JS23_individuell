import { Link } from "react-router-dom";
import useNavStore from "../../store/store";
import '../../sass/nav.scss'




const Nav: React.FC = () => {

  const { isOpen, toggleNav } = useNavStore();

  const navIconPath = isOpen? "src/assets/svg/closeicon.svg" : "src/assets/svg/navicon.svg";

  const handleClick = () => {
    toggleNav();
  }

  return (
    <section className={`nav ${isOpen ? 'nav--overlay' : ''}`}>
      <img
        className="nav__btn"
        src={navIconPath}
        alt="Navigation"
        onClick={handleClick}
      />
      {isOpen && (
        <nav>
          <Link to='/'>Let's land</Link>
          <Link to='/about' onClick={() => toggleNav()}>About</Link>
          <Link to='/profile' onClick={() => toggleNav()}>Profile</Link>
          <Link to='/status' onClick={() => toggleNav()}>Oder status</Link>
        </nav>
      )}

    </section>
  )
}

export default Nav;