import Logo from '../assets/logo.svg'

const LogoImg = ({imgClass}) => {
  return (
    <img
        className={`${imgClass}`}
        src={Logo}
        alt="Survey_Logo"
    />
  )
}

export default LogoImg
