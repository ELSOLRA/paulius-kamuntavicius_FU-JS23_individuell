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
      <div className="nav__img-container">
      <img
        className="nav__img"
        src={navIconPath}
        alt="Navigation"
        onClick={handleClick}
      />
      </div>
      <nav className="nav__links">
      {isOpen && (
        <>
          <Link to='/' onClick={() => toggleNav()}>Let's land</Link>
          <Link to='/about' onClick={() => toggleNav()}>About</Link>
          <Link to='/profile' onClick={() => toggleNav()}>Profile</Link>
          <Link to='/status' onClick={() => toggleNav()}>Oder status</Link>
       </>
      )}
         </nav>
    </section>
  )
}

export default Nav;