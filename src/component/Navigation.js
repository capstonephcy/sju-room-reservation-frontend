import './Navigation.css';
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  const toggleHome = () => {
    navigate("/");
  }

  const toggleMyPage = () => {
    navigate("/mypage")
  }

  return (
    <div className='navigation'>
      <img className='logo-img cursor-pointer' src="/img/sejong.png" />
      <div className='menu-box'>
          <div className='menu-item-box background-red cursor-pointer' onClick={toggleHome}>
              <img className='menu-item-logo-img' src="/img/home.png" />
              <a className='menu-item-text semi-bold'>홈</a>
          </div>
      </div>
      <img className='mypage-img cursor-pointer' src="/img/mypage.png" onClick={toggleMyPage} />
    </div>
  );
}

export default Navigation;