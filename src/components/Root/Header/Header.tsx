
import { HeaderProps } from "./headerTypes"




const Header: React.FC<HeaderProps> = ({ leftComponent, rightComponent, headerImage, className }) => {

    const headerStyle = {
        backgroundImage: `url(${headerImage})`,
    }

  return (
      <header className={`header ${className}`} style={headerStyle}>
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