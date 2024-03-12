import { Link } from "react-router-dom";
import useNavStore from "../../store/useNavStore";
import '../../sass/nav.scss'


const Nav: React.FC = () => {

  const { isOpen, toggle } = useNavStore();

  const navIconPath = isOpen? "src/assets/svg/closeicon.svg" : "src/assets/svg/navicon.svg";



  return (
    <section className={`nav ${isOpen ? 'nav--overlay' : ''}`}>
      <div className="nav__img-container">
      <img
        className="nav__img"
        src={navIconPath}
        alt="Navigation"
        onClick={()=> toggle()}
      />
      </div>
      <nav className="nav__links">
      {isOpen && (
        <>
          <Link to='/' onClick={() => toggle()}>Let's land</Link>
          <Link to='/menu' onClick={() => toggle()}>Meny</Link>
          <Link to='/about' onClick={() => toggle()}>Vårt kaffe</Link>
          <Link to='/profile' onClick={() => toggle()}>Min profil</Link>
          <Link to='/status' onClick={() => toggle()}>Oderstatus</Link>
       </>
      )}
         </nav>
    </section>
  )
}

export default Nav;