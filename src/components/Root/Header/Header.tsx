import "../../../sass/header.scss"
import { HeaderProps } from "./headerTypes"




const Header: React.FC<HeaderProps> = ({ leftComponent, rightComponent, headerImage }) => {

    const headerStyle = {
        backgroundImage: `url(${headerImage})`,
    }

  return (
      <header className="header" style={headerStyle}>
          <section className="header__left">
              {leftComponent && <>{leftComponent}</>}
          </section>
          <section className="header__right">
              {rightComponent && <>{rightComponent}</>}
          </section>
      </header>
  )
}

export default Header;