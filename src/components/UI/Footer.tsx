import "../../sass/footer.scss"

type FooterProps = {

    footerImage: string;
}

const Footer: React.FC<FooterProps> = ({ footerImage }) => {

    const footerStyle = {
        backgroundImage: `url(${footerImage})`,
    }


  return (
    <footer className="footer" style={footerStyle} />
  )
}

export default Footer;