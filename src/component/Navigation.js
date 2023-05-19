import './Navigation.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Navigation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.permissions[0].endsWith("ADMIN");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const url = window.location.href;
    if (isAdmin) {
      if (url.endsWith("mypage")) {
        setIndex(-1);
      } else if (url.endsWith("statics")) {
        setIndex(0);
      } else {
        setIndex(1);
      }
    } else {
      if (url.endsWith("mypage")) {
        setIndex(-1);
      } else {
        setIndex(0);
      }
    }
  }, []);

  const toggleLogin = () => {
    navigate("/login");
  }

  const toggleHome = () => {
    navigate("/");
  }

  const toggleMyPage = () => {
    navigate("/mypage")
  }

  const toggleStatics = () => {
    navigate("/statics");
  }

  const toggleManage = () => {
    navigate("/manage");
  }

  return (
    <div className='navigation'>
      <img className='logo-img cursor-pointer' src="/img/sejong.png" onClick={toggleLogin} />
      { !isAdmin &&
      <div className='menu-box'>
        <div className={`${index == 0 ? 'background-red' : ''} menu-item-box cursor-pointer`} onClick={toggleHome}>
          <img className='menu-item-logo-img' src={index == 0 ? `/img/home_white.png` : `/img/home_black.png`} />
          <a className={`${index == 0 ? 'menu-item-text' : 'menu-item-text-off'} menu-item-text semi-bold`}>홈</a>
        </div>
      </div>
      }
      { isAdmin &&
      <div className='menu-box'>
        <div className={`${index == 0 ? 'background-red' : ''} menu-item-box cursor-pointer`} onClick={toggleStatics}>
          <img className='menu-item-logo-img' src={index == 0 ? `/img/statics_white.png` : `/img/statics_black.png`} />
          <a className={`${index == 0 ? 'menu-item-text' : 'menu-item-text-off'} menu-item-text semi-bold`}>통계</a>
        </div>
        <div className={`${index == 1 ? 'background-red' : ''} menu-item-box cursor-pointer`} onClick={toggleManage}>
          <img className='menu-item-logo-img' src={index == 1 ? `/img/manage_white.png` : `/img/manage_black.png`} />
          <a className={`${index == 1 ? 'menu-item-text' : 'menu-item-text-off'} semi-bold`}>관리</a>
        </div>
      </div>
      }
      <img className='mypage-img cursor-pointer' src="/img/mypage.png" onClick={toggleMyPage} />
    </div>
  );
}

export default Navigation;